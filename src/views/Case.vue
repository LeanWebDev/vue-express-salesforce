<template>
  <div class="container">
    <div class="row text-center mb-3">
      <div class="col">
        <h1>The Case Object</h1>
        <hr />
      </div>
    </div>
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
    <div class="row mb-5">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <h5>Bitcoin Price Index</h5>
          </div>
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
                  <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <section
      id=""
      class="row mb-5"
    >
      <div class="col">
        <div class="card">
          <div class="card-header">
            <button
              v-if="errored"
              class="btn btn-danger"
            >ERROR!!</button>
            <h5>All Cases list</h5>
          </div>
          <div class="card-body">
            <div class="list-group">
              <a
                v-for="(caseting, index) in cases"
                :key="index"
                @click="getSingleCase(caseting.Id, caseting.Subject)"
                class="list-group-item list-group-item-action"
              >
                {{ caseting.Subject }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <b-modal
      id="modal-1"
      :title="caseSubject"
    >
      <div class="row">
        <div class="col">
          <ul>
            <pre>
              {{ caseDetail.data }}
            </pre>
          </ul>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  components: {
    "web-to-case": require("../components/WebToCase.vue").default,
  },
  data () {
    return {
      cases: [],
      errored: false,
      caseId: '',
      caseSubject: '',
      caseDetail: {
        data: {}
      },
      info: null,
      loading: true,
    };
  },
  mounted () {
    this.getCases()
    this.axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => (this.info = response.data.bpi))
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    getCases () {
      this.axios.get("http://localhost:3000/case/all")
        .then((response) => (this.cases = response.data))
        .catch((error) => {
          console.log(error)
          this.errored = true
        })
    },
    getSingleCase (caseId, caseSubject) {
      this.caseId = caseId
      this.caseSubject = caseSubject
      this.$bvModal.show('modal-1')
      this.getSingleCaseDetail(caseId)
    },
    getSingleCaseDetail (caseId) {
      this.axios.get("http://localhost:3000/case/" + caseId)
        .then((response) => {
          // this.contactDetail.type = response.data.Type,
          // this.contactDetail.description = response.data.Description,
          // this.contactDetail.website = response.data.Website,
          // this.contactDetail.industry = response.data.Industry,
          // this.contactDetail.accountNumber = response.data.AccountNumber,
          // this.contactDetail.phone = response.data.Phone,
          // this.contactDetail.annualRevenue = response.data.AnnualRevenue,
          // this.contactDetail.numberOfEmployees = response.data.NumberOfEmployees,
          // this.contactDetail.rating = response.data.Rating
          this.caseDetail.data = response.data
        })
        .catch((error) => {
          console.log(error);
          this.errored = true
        })
    }
  },
  filters: {
    currencydecimal (value) {
      return value.toFixed(2);
    },
  },
};
</script>

<style></style>
