require("dotenv").config();

const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Custom imports as per https://medium.com/netscape/first-time-dev-building-a-fullstack-js-app-for-salesforce-with-oauth-login-jsforce-react-redux-ca5962fb7fe3

const httpClient = require("request");
const express = require("express");
const jsforce = require("jsforce");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

//initialize session
app.use(session({ secret: "S3CRE7", resave: true, saveUninitialized: true }));

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cors
app.use(cors());

//jsForce connection
const oauth2 = new jsforce.OAuth2({
  // you can change loginUrl to connect to sandbox or prerelease env.
  // ACTUALLY: use https://test.salesforce.com as per https://test.salesforce.com
  // ERROR: BUT, it appears we dont have an account for test.salesforce.com
  // Will have to connect to production / partial version to completely test this properly
  // loginUrl: "https://test.salesforce.com",
  loginUrl: "https://um6.lightning.force.com/",
  //clientId and Secret will be provided when you create a new connected app in your SF developer account
  clientId:
    "3MVG9sh10GGnD4DsBJOCTcfDPtTsctS52qE6xJVGY4ipIVixbsdXu.MiRUrWk88pFrazROf9jvQXBugY86eXi",
  clientSecret:
    "C881ED40987E184B3EEFFA96D3702B06F82D5980611999E02E0832C994618695",
  //redirectUri : 'http://localhost:' + port +'/token'
  redirectUri: "http://localhost:3000/token",
});

app.get("/auth/login", function(req, res) {
  // Redirect to Salesforce login/authorization page
  res.redirect(
    oauth2.getAuthorizationUrl({ scope: "api id web refresh_token" })
  );
});

app.get("/token", function(req, res) {
  const conn = new jsforce.Connection({ oauth2: oauth2 });
  const code = req.query.code;
  conn.authorize(code, function(err, userInfo) {
    if (err) {
      return console.error("This error is in the auth callback: " + err);
    }
    console.log("Access Token: " + conn.accessToken);
    console.log("Instance URL: " + conn.instanceUrl);
    console.log("refreshToken: " + conn.refreshToken);
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    req.session.accessToken = conn.accessToken;
    req.session.instanceUrl = conn.instanceUrl;
    req.session.refreshToken = conn.refreshToken;
    var string = encodeURIComponent("true");
    // res.redirect("http://localhost:3000/?valid=" + string);
  });
});

app.get("/api/accounts", function(req, res) {
  // if auth has not been set, redirect to index
  if (!req.session.accessToken || !req.session.instanceUrl) {
    res.redirect("/");
  }
  //SOQL query
  let q = "SELECT id, name FROM account LIMIT 10";
  //instantiate connection
  let conn = new jsforce.Connection({
    oauth2: { oauth2 },
    accessToken: req.session.accessToken,
    instanceUrl: req.session.instanceUrl,
  });
  //set records array
  let records = [];
  let query = conn
    .query(q)
    .on("record", function(record) {
      records.push(record);
    })
    .on("end", function() {
      console.log("total in database : " + query.totalSize);
      console.log("total fetched : " + query.totalFetched);
      res.json(records);
    })
    .on("error", function(err) {
      console.error(err);
    })
    .run({ autoFetch: true, maxFetch: 4000 });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
