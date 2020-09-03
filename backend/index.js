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

// var oauth2 = new jsforce.OAuth2({
//   // you can change loginUrl to connect to sandbox or prerelease env.
//   // loginUrl : 'https://test.salesforce.com',
//   clientId: "<your Salesforce OAuth2 client ID is here>",
//   clientSecret: "<your Salesforce OAuth2 client secret is here>",
//   redirectUri: "<callback URI is here>",
// });
// Express config
const app = express();
const port = 3000;

var conn = new jsforce.Connection();
conn.login(
  process.env.USERNAME,
  process.env.PASSWORD + process.env.SECURITY_TOKEN,
  function(err, res) {
    if (err) {
      return console.error(err);
    }
    console.log(conn.res);
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    conn.query("SELECT Id, Subject FROM Case", function(err, res) {
      if (err) {
        return console.error(err);
      }
      console.log(res);
    });
    // var records = [];
    conn.query("SELECT Id, Subject FROM Case", function(err, result) {
      if (err) {
        return console.error(err);
      }
      console.log("total : " + result.totalSize);
      console.log("fetched : " + result.records.length);
      console.log(result);
    });
    console.log(res);
  }
);

//////////////// Routes

app.get("/home", function(req, res) {
  var conn = new jsforce.Connection();
  let records = [];
  conn.login(
    process.env.USERNAME,
    process.env.PASSWORD + process.env.SECURITY_TOKEN,
    function(err, res) {
      if (err) {
        return console.error(err);
      }
      console.log(conn.res);
      console.log(conn.accessToken);
      console.log(conn.instanceUrl);
      conn.query("SELECT Id, Name FROM Account", function(err, res) {
        if (err) {
          return console.error(err);
        }
        console.log(res);
      });
      var query = conn
        .query("SELECT Id, Name FROM Account")
        .on("record", function(record) {
          records.push(record);
        })
        .on("end", function() {
          console.log("total in database : " + query.totalSize);
          console.log("total fetched : " + query.totalFetched);
        })
        .on("error", function(err) {
          console.error(err);
        })
        .run({ autoFetch: true, maxFetch: 4000 });
      console.log(res);
    }
  );
  res.json(records);
});

////////////// OAuth2.0 flow

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
