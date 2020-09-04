<template>
  <div class="container">
    <div class="row mb-5">
      <div class="col-12"></div>
      <div class="col">
        <div class="card">
          <div class="card-header">
            <h5>Web-To-Case</h5>
          </div>
          <div class="card-body">
            <web-to-case />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header"><h5>Bitcoin Price Index</h5></div>
          <div class=" card-body">
            <section v-if="errored">
              <p>
                We're sorry, we're not able to retrieve this information at the
                moment, please try back later
              </p>
            </section>

            <section v-else>
              <div v-if="loading">Loading...</div>

              <div
                v-else
                v-for="(currency, index) in info"
                :key="index"
                class="currency"
              >
                {{ currency.description }}:
                <span class="lighten">
                  <span v-html="currency.symbol"></span
                  >{{ currency.rate_float | currencydecimal }}
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "web-to-case": require("../components/WebToCase.vue").default,
  },
  data() {
    return {
      info: null,
      loading: true,
      errored: false,
    };
  },
  mounted() {
    this.axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => (this.info = response.data.bpi))
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  filters: {
    currencydecimal(value) {
      return value.toFixed(2);
    },
  },
};
</script>

<style></style>
