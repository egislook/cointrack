function riothingStores(){
  return {
    app: new appStore(),
  }


  function appStore(){

    this.model = appStoreState;
    this.state = false;

    this.actions = {
      'DEPTH': function(payload, cb){
        console.log('DEPTH_ACTION');
      }
    }

    function appStoreState(data){
      this.bids = data.bids && data.bids.map(bid => new Wall(bid));
      this.asks = data.asks && data.asks.map(ask => new Wall(ask));
      this.id   = data.lastUpdateId;
      return this;
    }

    function Wall(data){
      this.price  = Number(data[0]);
      this.amount = Number(data[1]);
      return this;
    }
  }


}
