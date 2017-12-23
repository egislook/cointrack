const sibling 	= document.querySelector('.overvies');
sibling.parentNode.insertBefore(document.createElement('tag-app'), sibling.nextSibling);
sibling.parentNode.insertBefore(document.createElement('tag-test'), sibling.nextSibling);

const riothing = new Riothing({
	viewFilePath: 	'app/tags.html',
	actionFilePath: 'app/actions.js',
	storeFilePath:	'app/stores.js',
	actions:	riothingActions(),
	stores: 	riothingStores()
});

riothing.act('APP_INIT', {
	symbol: getSymbol(location)
});

chrome.runtime.onMessage.addListener(({ url }) => {
	riothing.act('APP_INIT', {
		symbol: getSymbol(url)
	});
});

function getSymbol(url){
	let symbol = (new URL(url)).searchParams.get('symbol');
	return symbol && symbol.replace('_', '') || 'TRXBTC';
}
