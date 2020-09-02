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
              Email: jrenzel66@protonmail.com
            </b-list-group-item>
            <b-list-group-item variant="primary">
              Email: jrenzel66@protonmail.com
            </b-list-group-item>
            <b-list-group-item variant="primary">
              Email: jrenzel66@protonmail.com
            </b-list-group-item>
            <b-list-group-item variant="primary">
              Email: jrenzel66@protonmail.com
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
};
</script>
