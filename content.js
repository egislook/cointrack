// ws = new WebSocket(socketURL);
//
// ws.onmessage = function(event){
//   console.log(JSON.parse(event.data));
// };
// ws.onerror = 	() => console.log('WebSocket error');
// ws.onopen = 	() => console.log('WebSocket connection established');
// ws.onclose = 	() => console.log('WebSocket connection closed');
//locate and add new elements
//elem-main
const sibling 	= document.querySelector('.overvies');
sibling.parentNode.insertBefore(document.createElement('tag-app'), sibling.nextSibling);
sibling.parentNode.insertBefore(document.createElement('tag-test'), sibling.nextSibling);


new Riothing({
	viewFilePath: 	'app/tags.html',
	actionFilePath: 'app/actions.js',
	storeFilePath:	'app/stores.js',
	actions:	riothingActions(),
	stores: 	riothingStores()
});

//Load tag file


//console.log('riot', riot, fucss);



//init(getSymbol());

function init(symbol = 'TRXBTC'){

	let trades 		= [];
	let need 			= 0;
	let btcPrice 	= 17500;

	//dom stuff
	let elemNeed, elemStart, elemLast;

	const sibling 	= document.querySelector('.overvies');
	const container = document.createElement('DIV');
	sibling.parentNode.insertBefore(container, sibling.nextSibling);

	//initDom(elemNeed, elemStart, elemLast);

	const aggSocketURL = `wss://stream2.binance.com:9443/ws/${symbol.toLowerCase()}@aggTrade.b10`;
	const aggTickerURL = `https://www.binance.com/api/v1/aggTrades?limit=500&symbol=${symbol}`;
	console.log(symbol);

	const socket = new WebSocket(aggSocketURL);

	fetch(aggTickerURL)
		.then(res => res.json())
		.then(json => {
			need += updateNeed(json);
			setDom(container, { start: [ need, json[0].p ] });
			console.log(need, json[0].p);
			//trades = trades.concat(json);
		});

	socket.onmessage = (e) => {
		let trade = JSON.parse(e.data);
		let tradeQuantity = updateNeed([trade]);
		need += tradeQuantity;

		let priceQuantity 		= Number(trade.q) * Number(trade.p);
		let btcQuantityPrice 	= Math.round(priceQuantity * btcPrice).toFixed(2);
		setDom(elemLast, [ need, trade.p, tradeQuantity, btcQuantityPrice + '$' ]);
		trade.m
			? console.warn(need, trade.p, tradeQuantity, btcQuantityPrice + '$')
			: console.log(need, trade.p, tradeQuantity, btcQuantityPrice + '$');
		//trades.push(trade);
		//console.log(need, trade);
	}

	// socket.onmessage = function(event){
	//   console.log(JSON.parse(event.data));
	// };

}

function initDom(elemStart, elemLast){
	const sibling = document.querySelector('.overvies');
	const elem 		= document.createElement('DIV');
	elemNeed 			= document.createElement('SPAN');
	elemStart 		= document.createElement('STRONG');
	elemLast			= document.createElement('I');
	elem.appendChild(elemNeed);
	elem.appendChild(elemStart);
	elem.appendChild(elemLast);
	sibling.parentNode.insertBefore(elem, sibling.nextSibling);
}

function setDom(elem, values){
	elem.textContent = values.join(', ');
}

function updateNeed(trades){
	let sum = 0;
	//console.log(trades);
	trades.forEach(trade => {
		sum += trade.m ? -Number(trade.q) : Number(trade.q);
		//console.log(sum, trade.q);
	});

	//console.log(sum);

	//need = trade.m ? need + Number(trade.q) : need - Number(trade.q);
	return sum;
}

function getSymbol(){
	const params = (new URL(location)).searchParams;
	return params.get('symbol').replace('_', '');
}



// window.addEventListener('popstate', urlHandler, false);
//
// function urlHandler(){
// 	const params = (new URL(location)).searchParams;
// 	const symbol = params.get('symbol');
// 	console.log(symbol);
// }

//console.log(chrome);

// var elems = $(".match");
// var BpItems = $("#betreturns").find('.item').find('.value');
//
// var sum = 0, s2=0;
// BpItems.each(function(key, BpItem){
// 	var num = Number(($(BpItem).text()).replace('$ ', '')) * 100;
// 	sum = sum + num;
// })
//
// var sumMain = Number(sum/100);
// sumMain = sumMain.toFixed(2);
// var sumSafe = Number((sum*0.05)/100);
// sumSafe = sumSafe.toFixed(2);
//
// var str = 	'Returns '+
// 			'<span class="sl50">' + sumMain +'$</span> ' +
// 			'Safe bet '+
// 			'<span class="sl70">' + sumSafe + '$</span>'
//
// $(".title:contains('returns')").html(str);
//
// var href, a, game, s, items, temp, it;
//
// games = [];
// elems.each(function( k, elem ) {
// 	elem = $(elem);
// 	game = {};
// 	a = elem.find('a').eq(0);
// 	href = a.attr('href');
// 	items = elem.find('.item').not('.notavailable');
//
// 	game.type = href.indexOf('match') != -1 ? 'match' : href.indexOf('predict') != -1 ? 'predict' : false;
// 	game.matchId = href.split('?m=')[1];
//
// 	if(game.type == 'match'){
// 		s = a.find('span:first');
// 		game.win = s.text().indexOf('your type') != -1 ? 't1' : 't2';
// 		s = a.find('span:last');
// 	}
//
// 	temp = [];
// 	var value = 0;
// 	if(items){
// 		items.each(function( i, item ){
// 			it = $(item);
// 			item = {};
// 			item.value = it.find('.value').text().replace('$ ', '');
// 			item.img = it.find('img').attr('src');
// 			item.name = it.find('img').attr('alt');
// 			temp.push(item);
// 			value = Number(item.value) + value;
// 		});
// 	}
//
// 	game.pot = elem.find('.potwin').find('b').text();
// 	game.items = temp;
// 	game.value = value;
// 	games.push(game);
// });
// //console.log(games);
// chrome.runtime.sendMessage({'ok' : true, 'games' : games}, function(response) {});
