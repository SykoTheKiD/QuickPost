  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '437756749767327',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }


// $(function() {
    // $('#paste').click(function(){
			// getText(function(text){
			// document.getElementById("post_link").value = text;
			// document.getElementById("link_label").innerHTML = "";
        // });
    // })
// });

// $(function() {
    // $('#submit_post').click(function(){
    	// submitPost();
    // });
// });

// function submitPost(){
	// var title = document.getElementById("post_title").value;
	// var subreddit = document.getElementById("post_subreddit").value;
	// var link = document.getElementById("post_link").value;
	// $.ajax({
        // type: "POST",
        // url: '//api.jaysyko.com/projects/QuickPost/post',
        // data: {
            // post_title: title,
            // post_subreddit: subreddit,
            // post_link: link
        // },
        // success: function(response) {
            // console.log(response);
            // var reposnse_json = JSON.parse(response);
            // if (reposnse_json.response != null) {
            	// document.getElementById("post_response").innerHTML = reposnse_json.response;
            // };
            // return;
        // }
    // });
// }

// function getText(callback) {
    // chrome.tabs.query({
        // active: true,
        // windowId: chrome.windows.WINDOW_ID_CURRENT
    // }, function(tab) {
        // chrome.tabs.sendMessage(tab[0].id, {
            // method: "getSelection"
        // }, function(response) {
            // if (response.data === null) {
                // chrome.tabs.query({
                    // currentWindow: true,
                    // active: true
                // }, function(tabs) {
                    // callback(tabs[0].url);
                // });
            // } else {
                // callback(response.data);
            // }
        // });
    // });
// }

// function login(callback){
	// var milisecsInAndHour = 3.6e+6;
	// var date = Date.now();
	// var expiryDate = parseInt(localStorage.getItem('expiry_date'));
	// var username = null;
	// if (expiryDate != NaN && date < expiryDate){
		// username = localStorage.getItem('username');
		// callback(username);
	// }else{
		// $.ajax({
	        // type: "GET",
	        // url: 'http://api.jaysyko.com/projects/QuickPost/login',
	        // success: function(response) {
                // console.log(response);
	        	// username = response.username.name;
    			// localStorage.setItem('expiry_date', Date.now() + milisecsInAndHour);
    			// localStorage.setItem('username', username);
    			// callback(username);
	        // }
	    // });
	// }
// }

// window.onload = login(function(username){
	// var PROFILE_LINK = "https://www.reddit.com/user/";
	// document.getElementById("submit_link_form").style.visibility = "visible";
	// document.getElementById("logged_in_status_reddit").href = PROFILE_LINK + username;
	// document.getElementById("logged_in_status_reddit").innerHTML = username;
// });