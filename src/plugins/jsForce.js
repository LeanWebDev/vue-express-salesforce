// var jsforce = require("jsforce");
// var conn = new jsforce.Connection();
// conn.login(
//   "jrenzel66@protonmail.com",
//   "Hishem1993!lbvUE196ou7lzwOm8TO6qsDB",
//   function(err, res) {
//     if (err) {
//       return console.error(err);
//     }
//     console.log(conn.accessToken);
//     console.log(conn.instanceUrl);
//     conn.query("SELECT Id, Name FROM Account", function(err, res) {
//       if (err) {
//         return console.error(err);
//       }
//       console.log(res);
//     });
//     var records = [];
//     conn.query("SELECT Id, Name FROM Account", function(err, result) {
//       if (err) {
//         return console.error(err);
//       }
//       console.log("total : " + result.totalSize);
//       console.log("fetched : " + result.records.length);
//     });
//     console.log;
//   }
// );

// jsforce.install = function(Vue, options) {
//   Vue.
// }
