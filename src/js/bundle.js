var SYKO_API_REDDIT_URL = "https://api.jaysyko.com/projects/QuickPost/reddit";

$(function() {
    $('#paste').click(function(){
			getText(function(text){
			document.getElementById("post_link").value = text;
			document.getElementById("link_label").innerHTML = "";
        });
    })
});

$(function() {
    $('#submit_post').click(submitPost());
});

function submitPost(){
	var title = document.getElementById("post_title").value;
	var subreddit = document.getElementById("post_subreddit").value;
	var link = document.getElementById("post_link").value;
	$.ajax({
        type: "GET",
        url: SYKO_API_REDDIT_URL,
        data: {
            type: "post"
            post_title: title,
            post_subreddit: subreddit,
            post_link: link
        },
        success: function(response) {
            document.getElementById("post_response").innerHTML = "Link Submitted to ".concat(subreddit);
        }
    });
}

function getText(callback) {
    chrome.tabs.query({
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT
    }, function(tab) {
        chrome.tabs.sendMessage(tab[0].id, {
            method: "getSelection"
        }, function(response) {
            if (response.data === null) {
                chrome.tabs.query({
                    currentWindow: true,
                    active: true
                }, function(tabs) {
                    callback(tabs[0].url);
                });
            } else {
                callback(response.data);
            }
        });
    });
}

function login(callback){
  var MILISECS_IN_AN_HOUR = 3.6e+6,
      EXPIRY_DATE = parseInt(localStorage.getItem('expiry_date')),
      DATE = Date.now();
	var username;
	if (EXPIRY_DATE != NaN && DATE < EXPIRY_DATE){
		username = localStorage.getItem('username');
		callback(username);
	}else{
		$.ajax({
	        type: "GET",
	        url: SYKO_API_REDDIT_URL,
          data:{
            type: "getUser"
          },
	        success: function(response) {
            username = response.name;
            localStorage.setItem('expiry_date', DATE + MILISECS_IN_AN_HOUR);
            localStorage.setItem('username', username);
            callback(username);
	        }
	    });
	}
}

window.onload = login(function(username){
	var REDDIT_PROFILE_LINK = "https://www.reddit.com/user/";
	document.getElementById("submit_link_form").style.visibility = "visible";
	document.getElementById("logged_in_status_reddit").href = REDDIT_PROFILE_LINK + username;
	document.getElementById("logged_in_status_reddit").innerHTML = username;
});
