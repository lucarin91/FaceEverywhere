(function() {
  /*
  var OAuth = require('oauth').OAuth,
  oauth = new OAuth(
      "https://api.twitter.com/oauth/request_token",
      "https://api.twitter.com/oauth/access_token",
      "your_twitter_consumer_key",
      "your_twitter_consumer_secret",
      "1.0",
      "http://127.0.0.1:8080/twitter/callback",
      "HMAC-SHA1"
    );

  module.exports.getOAuth = function(){
    return oauth;
  }*/
  /*module.exports.getAppToken = function() {
    var options = {
      hostname: 'https://api.twitter.com',
      port: 80,
      path: '/oauth/request_token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    };

    var req = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      var tmp="";

		  res.on('end', function() {
			   return tmp;
      });
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
        tmp += chunk;
      });
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    // write data to request body
    //req.write(postData);
    req.end();
  };*/
}());
