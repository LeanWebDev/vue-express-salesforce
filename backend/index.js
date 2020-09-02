// Environment
console.log("No value for FOO yet:", process.env.FOO);

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log("Now the value for FOO is:", process.env.FOO);

// Dependencies
const express = require("express");
const jsforce = require("jsforce");

// JSForce

var oauth2 = new jsforce.OAuth2({
  // you can change loginUrl to connect to sandbox or prerelease env.
  // loginUrl : 'https://test.salesforce.com',
  clientId: "<your Salesforce OAuth2 client ID is here>",
  clientSecret: "<your Salesforce OAuth2 client secret is here>",
  redirectUri: "<callback URI is here>",
});
// Express config
const app = express();
const port = 3000;

//
// Get authorization url and redirect to it.
//
app.get("/oauth2/auth", function(req, res) {
  res.redirect(oauth2.getAuthorizationUrl({ scope: "api id web" }));
});
//
// Pass received authorization code and get access token
//
app.get("/oauth2/callback", function(req, res) {
  var conn = new jsforce.Connection({ oauth2: oauth2 });
  var code = req.param("code");
  conn.authorize(code, function(err, userInfo) {
    if (err) {
      return console.error(err);
    }
    // Now you can get the access token, refresh token, and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.refreshToken);
    console.log(conn.instanceUrl);
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    // ...
    res.send("success"); // or your desired response
  });
});

// Endpoint1
app.get("/enpoint1", (req, res) => {
  console.log(req, res);
});

// Endpoint - Create post
app.post("/endpoint2", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send(req.headers);
});

// Listen
app.listen(port, () =>
  console.log(`Example app listening as https://localhost:${port}`)
);
