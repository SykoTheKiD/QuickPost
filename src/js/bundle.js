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
    $('#submit_post').click(function(){
      submitPost();
    });
});

function submitPost(){
	var TITLE = document.getElementById("post_title").value,
	    SUBREDDIT = document.getElementById("post_subreddit").value,
	    LINK = document.getElementById("post_link").value,
      STATUS = document.getElementById("post_response");
  STATUS.innerHTML = "Submitting Link to ".concat(subreddit).concat("...");
	$.ajax({
        type: "GET",
        url: SYKO_API_REDDIT_URL,
        data: {
            post_title: TITLE,
            post_subreddit: SUBREDDIT,
            post_link: LINK
        },
        success: function(response) {
            STATUS.innerHTML = "Link Submitted to ".concat(subreddit);
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
	        success: function(response) {
            if(typeof response=="object"){
              username = response.name;
              localStorage.setItem('expiry_date', DATE + MILISECS_IN_AN_HOUR);
              localStorage.setItem('username', username);
              callback(username);
            }else{
              window.open(SYKO_API_REDDIT_URL);
            }
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
