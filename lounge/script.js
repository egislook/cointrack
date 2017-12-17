var elems = $(".match");
var BpItems = $("#betreturns").find('.item').find('.value');

var sum = 0, s2=0;
BpItems.each(function(key, BpItem){
	var num = Number(($(BpItem).text()).replace('$ ', '')) * 100;
	sum = sum + num;
})

var sumMain = Number(sum/100);
sumMain = sumMain.toFixed(2);
var sumSafe = Number((sum*0.05)/100);
sumSafe = sumSafe.toFixed(2);

var str = 	'Returns '+
			'<span class="sl50">' + sumMain +'$</span> ' +
			'Safe bet '+
			'<span class="sl70">' + sumSafe + '$</span>'

$(".title:contains('returns')").html(str);

var href, a, game, s, items, temp, it;

games = [];
elems.each(function( k, elem ) {
	elem = $(elem);
	game = {};
	a = elem.find('a').eq(0);
	href = a.attr('href');
	items = elem.find('.item').not('.notavailable');
	
	game.type = href.indexOf('match') != -1 ? 'match' : href.indexOf('predict') != -1 ? 'predict' : false;
	game.matchId = href.split('?m=')[1];
	
	if(game.type == 'match'){
		s = a.find('span:first');
		game.win = s.text().indexOf('your type') != -1 ? 't1' : 't2';
		s = a.find('span:last');
	}
	
	temp = [];
	var value = 0;
	if(items){
		items.each(function( i, item ){
			it = $(item);
			item = {};
			item.value = it.find('.value').text().replace('$ ', '');
			item.img = it.find('img').attr('src');
			item.name = it.find('img').attr('alt');
			temp.push(item);
			value = Number(item.value) + value;
		});
	}
	
	game.pot = elem.find('.potwin').find('b').text();
	game.items = temp;
	game.value = value;
	games.push(game);
});
//console.log(games);
chrome.runtime.sendMessage({'ok' : true, 'games' : games}, function(response) {});
