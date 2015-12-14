$(function() {
    $('#paste').click(function(){
			getText(function(text){
			document.getElementById("post_link").value = text;
        });
    })
});

$(function() {
    $('#submit_post').click(function(){
    	submitPost();
    });
});

function submitPost(){
	var title = document.getElementById("post_title").value;
	var subreddit = document.getElementById("post_subreddit").value;
	var link = document.getElementById("post_link").value;
	console.log(link);
	$.ajax({
        type: "POST",
        url: 'http://jaysyko.com/projects/QuickPost/quickpost.php',
        data: {
            post_title: title,
            post_subreddit: subreddit,
            post_link: link
        },
        success: function(response) {
            console.log(response);
            return;
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
	var milisecsInAndHour = 3.6e+6;
	var date = Date.now();
	var expiryDate = parseInt(localStorage.getItem('expiry_date'));
	var username = null;
	if (expiryDate != NaN && date < expiryDate){
		username = localStorage.getItem('username');
		console.log(username);
		callback(username);
	}else{
		$.ajax({
	        type: "GET",
	        url: 'http://jaysyko.com/projects/QuickPost/quickpost.php',
	        success: function(response) {
	        	try{
	        		var reposnse_json = JSON.parse(response);
	        	}catch(err){
	        		window.open("http://jaysyko.com/projects/QuickPost/quickpost.php");
	        	}
	        	username = reposnse_json.username;
	        	console.log("API " + username);
    			localStorage.setItem('expiry_date', Date.now() + milisecsInAndHour);
    			localStorage.setItem('username', username);
    			callback(username);
	        }
	    });
	}
}

window.onload = login(function(username){
	document.getElementById("submit_link_form").style.visibility = "visible";
	document.getElementById("logged_in_status_reddit").innerHTML = username;
});