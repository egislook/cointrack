let lastUrl;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  const url = tab.url;
  console.log(url);
  if(lastUrl === url)
    return;
  lastUrl = url;
  chrome.tabs.sendMessage(tabId, { url }, console.log);
});
