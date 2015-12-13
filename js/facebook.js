 window.fbAsyncInit = function() {
    FB.init({
      appId      : '437756749767327',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


//   FB.getLoginStatus(function(response) {
//   if (response.status === 'connected') {
//     console.log('Logged in.');
//   }
//   else {
//     FB.login();
//   }
// });

//  <script>
// // Only works after `FB.init` is called
// function myFacebookLogin() {
//   FB.login(function(){}, {scope: 'publish_actions'});
// }
// </script>
// <button onclick="myFacebookLogin()">Login with Facebook</button>

// FB.login(function(){
//   // Note: The call will only work if you accept the permission request
//   FB.api('/me/feed', 'post', {message: 'Hello, world!'});
// }, {scope: 'publish_actions'});