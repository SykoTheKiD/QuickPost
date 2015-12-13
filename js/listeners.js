// Selection listener
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSelection"){
  	text = window.getSelection().toString();
  }
  if (text.length == 0){
  	sendResponse({data: null});
  }else
  	sendResponse({data: text});
});

