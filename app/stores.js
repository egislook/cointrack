function riothingStores(){
  return {
    app: new appStore(),
  }


  function appStore(){

    this.model = appStoreState;
    this.state = false;

    this.actions = {
      'ADD_TRADE': function(trade, cb){
        let state = this.state.addTrades([trade]);
        //console.log(state);
        this.trigger('ADD_TRADE', state);
      },

      'ADD_TRADES': function(trades, cb){
        return this.restate({ trades });
      },

      'SET_STATS': function(){

      }
    }

    function appStoreState({ bids, asks, trades, need }){

      this.trades   = [];
      this.position = null;
      this.powers    = [];

      this.addTrades = (trades) => {
        this.trades.push(...trades.map(trade => {
          trade = new Trade(trade);

          if(!this.position)
            this.position = new Position(trade)
          else
            this.position.add(trade);

          return trade;
        }));

        this.powers = [
          new Power(5, this.trades),
          new Power(60, this.trades),
          new Power(300, this.trades),
          new Power(600, this.trades)
        ];

        return this;
      }

      trades && this.addTrades(trades);

      console.log(this);
      return this;


      // bids && (this.bids = bids.map(bid => new Wall(bid)));
      // asks && (this.asks = asks.map(ask => new Wall(ask)));
      //trades && (this.trades = trades.map(trade => new Trade(trade)));
      //this.id   = data.lastUpdateId;
    }

    function Power(since, trades){
      let sinceTimestamp = new Date().getTime() - (since * 1000);
      this.buys     = 0;
      this.sales    = 0;
      this.salePrices = [];
      this.buyPrices  = [];
      this.buyLowPrice    = 0;
      this.buyHighPrice   = 0;
      this.saleLowPrice   = 0;
      this.saleHighPrice  = 0;

      trades.forEach(trade => {
        if(trade.timestamp < sinceTimestamp)
          return;

        if(trade.sold){
          this.sales  += trade.amount;
          this.salePrices.push(trade.price);

          this.saleLowPrice = this.saleLowPrice && this.saleLowPrice > trade.price || !this.saleLowPrice
            ? trade.price
            : this.saleLowPrice;

          this.saleHighPrice = this.saleHighPrice < trade.price ? trade.price : this.saleHighPrice;

        } else{
          this.buys   += trade.amount;
          this.buyPrices.push(trade.price);

          this.buyLowPrice = this.buyLowPrice && this.buyLowPrice > trade.price || !this.buyLowPrice
            ? trade.price
            : this.buyLowPrice;

          this.buyHighPrice = this.buyHighPrice < trade.price ? trade.price : this.buyHighPrice;
        }
      });

      this.secBuys      = Number((this.buys / since).toFixed(2));
      this.secSales     = Number((this.sales / since).toFixed(2));
      this.need         = Number((this.buys - this.sales).toFixed(2));
      this.kof          = Number((this.buys / this.sales).toFixed(2));
      this.secNeed      = Number((this.secBuys - this.secSales).toFixed(2));
      this.secKof       = Number((this.secBuys / this.secSales).toFixed(2));
      this.avgBuyPrice  = this.buyPrices.length && Number((this.buyPrices.reduce((all, price) => (all + price)) / this.buyPrices.length).toFixed(8));
      this.avgSalePrice = this.salePrices.length && Number((this.salePrices.reduce((all, price) => (all + price)) / this.salePrices.length).toFixed(8));

      this.buys   = Number(this.buys.toFixed(2));
      this.sales  = Number(this.sales.toFixed(2));

      this.since  = since;
      this.up     = this.kof >= 1;

      return this;
    }

    function Position(trade){
      this.price        = trade.price;
      this.timestamp    = trade.timestamp;
      this.need         = 0;

      this.add = ({ amount, sold }) => {
        this.need += sold ? -amount : amount;
      }

      return this;
    }

    function Wall(data){
      this.price  = Number(data[0]);
      this.amount = Number(data[1]);
      return this;
    }

    function Trade(data){
      this.price  = Number(data.p);
      this.amount = Number(data.q);
      this.timestamp = data.T;
      this.sold = data.m;
      return this;
    }
  }


}
