<template>
  <div class="about">
    <div class="row text-center mb-3">
      <div class="col">
        <h1>The Account Object</h1>
        <hr />
      </div>
    </div>

    <section id="" class="row mb-3">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <button v-if="errored" class="btn btn-danger">ERROR!!</button>
            <h5>All Accounts list</h5>
          </div>
          <div class="card-body">
            <!-- TODO: Turn this into a modal which pass the current account id and then this queries -->

            <div class="list-group">
              <!-- <router-link
                v-for="(account, index) in accounts"
                :key="index"
                tag="a"
                :to="'account/query/' + account.Id"
                class="list-group-item list-group-item-action"
                >{{ account.Name }}</router-link
              > -->
              <a
                v-for="(account, index) in accounts"
                :key="index"
                @click="getSingleAccount(account.Id)"
                class="list-group-item list-group-item-action"
              >
                {{ account.Name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "AccountPage",
  data() {
    return {
      accounts: [],
      errored: false,
    };
  },
  mounted() {
    this.getAccounts();
  },
  methods: {
    getAccounts() {
      this.axios
        .get("http://localhost:3000/account/query/all")
        .then((response) => (this.accounts = response.data))
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
    getSingleAccount(accountId) {
      alert(accountId);
    },
  },
};
</script>
<style></style>
