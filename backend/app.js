// Dependencies
const express = require("express");
const jsforce = require("jsforce");
const path = require("path");
const bodyParser = require("body-parser");
const conn = new jsforce.Connection();
const cors = require("cors");
const dotenv = require("dotenv");

// Environment
dotenv.config();
console.log("Is it working? Ping ->", process.env.PING);

// Express config
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// JSForce connection initial test
conn.login(
  process.env.SF_USERNAME,
  process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN,
  function(loginErr, loginResult) {
    if (loginErr) {
      return console.error(loginErr);
    }
    console.log("We logged in", loginResult);
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    console.log("User ID: " + loginResult.id);
    console.log("Org ID: " + loginResult.organizationId);
  }
);

/* Routes */

//////////// Account /////////////

// Account -> all

app.get("/account/query/all", function(req, res) {
  let records = [];
  let q = "SELECT Id, Name FROM Account";
  // Connection login setup
  conn.login(
    process.env.SF_USERNAME,
    process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN,
    function(loginErr, loginResult) {
      if (loginErr) {
        return console.error(loginErr);
      }
      console.log("Account -> all");

      /* Start query logic */

      let query = conn
        .query(q)
        .on("record", function(record) {
          // console.log(record);
          records.push(record);
          // console.log(records);
        })
        .on("end", function() {
          console.log("total in database : " + query.totalSize);
          console.log("total fetched : " + query.totalFetched);
          res.json(records);
        })
        .on("error", function(err) {
          console.error(err);
        })
        .run({ autoFetch: true, maxFetch: 4000 }); // synonym of Query#execute();

      /* End query logic */
    }
  );
});

// Account -> single (getAccountInfo)

app.get("/account/query/:id", function(req, res) {
  let accountId = req.params.id;
  console.log(accountId);
  let account = {};
  let q = "SELECT Id, Name FROM Account";
  // Connection login setup
  conn.login(
    process.env.SF_USERNAME,
    process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN,
    function(loginErr, loginResult) {
      if (loginErr) {
        return console.error(loginErr);
      }
      console.log("Account -> single(:id)");

      /* Start query logic */

      let query = conn
        .sobject("Account")
        .retrieve(accountId, function(queryError, queryResult) {
          if (queryError) {
            return console.error(queryError);
          }
          console.log("Name : " + queryResult.Name);
          account = queryResult;
          console.log(account);
          res.send(account);
        });
      /* End query logic */
    }
  );
});

// Contact

// Cases

//get case info for selected case
// app.get('/api/getCaseInfo', function(req, res){
//      if (!req.session.accessToken || !req.session.instanceUrl) { res.redirect('/'); }

//     //instantiate connection
//     let conn = new jsforce.Connection({
//         oauth2 : {oauth2},
//         accessToken: req.session.accessToken,
//         instanceUrl: req.session.instanceUrl
//    });

//    var c = conn.sobject("Case").retrieve("500410000011nue", function(err, account) {
//        if (err) { return console.error(err); }
//        console.log("Name : " + account.Name);
//        // ...
//      });
//      console.log(c)
// });

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

module.exports = app;
