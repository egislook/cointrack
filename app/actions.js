function riothingActions(){
  return {

    'APP_INIT': function(payload, cb){
      console.log('ACTION', 'APP_INIT', payload);
      this.act('GET_DEPTH').then( ({ bids, asks }) => this.trigger('APP_INIT', {
        text: new Date().getTime(), 
        bids,
        asks
      }));
    },

    'GET_DEPTH': function(payload, cb){
      const self = this;

      return fetch(chrome.extension.getURL('test/content.json'))
        .then(res   => res.json())
        .then(data  => self.store('app').set(data))
    }
  }
}
