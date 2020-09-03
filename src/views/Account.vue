<template>
  <div class="about">
    <div class="row text-center mb-5">
      <div class="col">
        <h1>The Account Object</h1>
        <hr />
      </div>
    </div>
    <section id="" class="row my-3">
      <div class="card col">
        <div class="card-body">
          <h6>Section 1</h6>
          Details
        </div>
      </div>
      <div class="card col">
        <div class="card-body">
          <pre><code>&lt;p&gt;Sample text here...&lt;/p&gt;
&lt;p&gt;And another line of sample text here...&lt;/p&gt;
</code></pre>
        </div>
      </div>
    </section>
    <section id="" class="row my-3">
      <div class="card col">
        <div class="card-body">
          <h6>Section 1</h6>
          Details
        </div>
      </div>
    </section>
  </div>
</template>
<script>
let jsforce = require("jsforce");
let conn = new jsforce.Connection();
// const accountName = "Testing";
const email = process.env.USERNAME;
const passAndToken = process.env.PASSWORD + process.env.SECURITY_TOKEN;

conn.login(email, passAndToken, function(err, res) {
  if (err) {
    return console.error(err);
  }
  console.log(res);
  conn
    .sobject("Account")
    .retrieve("0014K000004X8MNQA0", function(err, account) {
      if (err) {
        return console.error(err);
      }
      console.log(account);
      // ...
    });
});

export default {
  data() {
    return {
      conn: {},
      accountName: "Testing",
    };
  },
  methods: {
    get1() {
      this.conn.query("SELECT Id, Subject FROM Case", function(err, res) {
        if (err) {
          return console.error(err);
        }
        console.log(res.records[0]);
      });
    },
  },
  mounted() {},
};
</script>

<style></style>
