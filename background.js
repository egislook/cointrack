// localStorage.name = localStorage.name || 'name';
// localStorage.password = localStorage.password || 'password';
// localStorage.lastBets = localStorage.lastBets || false;
//
// var url = 'http://bets.wdpwp.com/stats';
// chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
// 	var msg = 'error on client side. Can not collect games data';
// 	if(request.ok && request.games){
// 		var games = JSON.stringify(request.games);
// 		if(localStorage.lastBets != games){
// 			$.post(url, {games : games, user : localStorage.name, password : localStorage.password}, function(a){
// 				if(a.ok){
// 					msg = 'data was delivered to the server';
// 					localStorage.lastBets = games;
// 				} else {
// 					msg = 'server side error'
// 				}
// 			  console.log(msg);
// 			}, 'json');
// 		} else console.log('no need to update data');
// 	} else
// 		console.log(msg);
// });

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//         console.log(changeInfo.status,changeInfo.url);
// 				chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"}, function(response) {});
//         //var urlMap = [];
//         // if (changeInfo.status == "loading" && changeInfo.url != "undefined"){
//         //         urlMap[tabId] = true;
//         //         // the tab just changed url
//         // }
//         // else if (urlMap[tabId] && changeInfo.status == "complete"){
//         //         urlMap[tabId] = false;
//         // }
// }
