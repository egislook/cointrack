function riothingActions(){

  let socket;

  return {

    'APP_INIT': function({ symbol }, cb){

      this.act('GET_TRADES', { symbol })
        .then(state => this.trigger('APP_INIT', state))
        .then(() => this.act('SET_TRADE_SOCKET', { symbol }))
    },

    'GET_DEPTH': function({ symbol }, cb){
      const self = this;
      const depthTickerUrl = `https://www.binance.com/api/v1/depth?symbol=${symbol}`;

      return fetch(depthTickerUrl)
        .then(res   => res.json())
        .then(({ bids, asks, id })  => self.store('app').set({ bids, asks, id}))
    },

    'GET_TRADES': function({ symbol }, cb){
      const self    = this;
      const aggTickerURL = `https://www.binance.com/api/v1/aggTrades?limit=500&symbol=${symbol}`;

      return fetch(aggTickerURL)
        .then(res    => res.json())
        .then(trades => self.store('app').act('ADD_TRADES', trades))
    },

    'SET_TRADE_SOCKET': function({ symbol }, cb){
      const self          = this;
      const aggSocketURL  = `wss://stream2.binance.com:9443/ws/${symbol.toLowerCase()}@aggTrade.b10`;

      socket && socket.close();
      socket = new WebSocket(aggSocketURL);

      socket.onmessage = (e) => self.store('app').act('ADD_TRADE', JSON.parse(e.data));
      return true;
    }
  }
}
