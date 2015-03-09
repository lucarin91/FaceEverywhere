var express = require('express');
var fs = require('fs');
var router = express.Router();

var OAuth = require('oauth').OAuth,
oauth = new OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    "FcmX2d1on9kL4gcK1Zrgvsh9K",
    "v0ZbzxIfAG9A9ykDPRFKtLsqbqcIyohdwqKess1AuifFxnXRPK",
    "1.0",
    "http://127.0.0.1:8080/twitter/callback",
    "HMAC-SHA1"
  );

/* GET /twitter listing. */
router.get('/', function(req, res, next) {
  oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
    if (error) {
      console.log(error);
      res.send("Authentication Failed!");
    }
    else {
      req.session.oauth = {
        token: oauth_token,
        token_secret: oauth_token_secret
      };
      console.log(req.session.oauth);
      res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token)
    }
  });
});

/* GET /twitter/callback */
router.get('/callback', function(req, res, next) {
  if (req.session.oauth) {
    req.session.oauth.verifier = req.query.oauth_verifier;
    var oauth_data = req.session.oauth;

    oauth.getOAuthAccessToken(
      oauth_data.token,
      oauth_data.token_secret,
      oauth_data.verifier,
      function(error, oauth_access_token, oauth_access_token_secret, results) {
        if (error) {
          console.log(error);
          res.send("Authentication Failure!");
        }
        else {
          req.session.oauth.access_token = oauth_access_token;
          req.session.oauth.access_token_secret = oauth_access_token_secret;
          console.log(results, req.session.oauth);

          /*
          fs.writeFile("/home/app/app-face/test", "Hey there!", function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
          });
          */

          var img = fs.readFileSync('/home/app/app-face/test.jpg');
          // convert binary data to base64 encoded string
          var base64Img = new Buffer(img).toString('base64');

          oauth.post(
            'https://api.twitter.com/1.1/account/update_profile_image.json',
            req.session.oauth.access_token, //test user token
            req.session.oauth.access_token_secret, //test user secret
            {"image":base64Img},
            function (e, data, res){
              if (e) console.error(e);
              console.log(require('util').inspect(data));
              //done();

            });

            res.send("Authentication Successful " +data);
          // res.redirect('/'); // You might actually want to redirect!
        }
      }
    );
  }else {
    res.redirect('/'); // Redirect to login page
  }
});

module.exports = router;
