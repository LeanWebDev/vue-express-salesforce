<template>
  <div class="home text-center">
    <div class="row">
      <div class="col">
        <img alt="Vue logo" src="../assets/logo.png" />
      </div>
      <div class="col">
        <img
          alt="X"
          style="max-width: 80px"
          src="https://i7.pngguru.com/preview/759/205/100/multiplication-sign-mathematics-multiplication-table-clip-art-cary-vector.jpg"
        />
      </div>
      <div class="col">
        <img
          alt="Vue logo"
          style="max-width: 200px"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Salesforce_logo.svg/1200px-Salesforce_logo.svg.png"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Vue x Salesforce</h3>
            <p class="card-text">Playground</p>
          </div>
        </div>
      </div>
      <div class="col">
        <b-alert show>
          <strong>Active account details</strong>
          <hr />
          <b-list-group>
            <b-list-group-item variant="primary">
              Username: {{ username }}
            </b-list-group-item>
            <b-list-group-item variant="primary">
              Password: {{ password }}
            </b-list-group-item>
            <b-list-group-item variant="primary">
              Security Token: {{ security_token }}
            </b-list-group-item>
            <b-list-group-item variant="primary">
              Org URL: {{ orgUrl }}
            </b-list-group-item>
            <b-list-group-item variant="primary">
              Org ID: {{ orgId }}
            </b-list-group-item>
            <b-list-group-item variant="primary">
              User ID: {{ userId }}
            </b-list-group-item>
          </b-list-group>
        </b-alert>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      security_token: "",
      orgUrl: "",
      orgId: "",
      userId: "",
    };
  },
  mounted() {
    this.username = process.env.VUE_APP_SF_USERNAME;
    this.password = process.env.VUE_APP_SF_PASSWORD;
    this.security_token = process.env.VUE_APP_SF_SECURITY_TOKEN;
    this.orgUrl = process.env.VUE_APP_SF_URL;
    this.userId = process.env.VUE_APP_SF_USER_ID;
    this.orgId = process.env.VUE_APP_SF_ORD_ID;
  },
};
</script>
