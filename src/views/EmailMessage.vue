<template>
  <div class="contact">
    <div class="row text-center mb-3">
      <div class="col">
        <h1>The EmailMessage Object</h1>
        <hr />
      </div>
    </div>
    <div class="row">
      <b-card-group columns>
        <b-card
          v-for="(caseting, index) in cases"
          :key="index"
          @click="getSingleCase(caseting.Id, caseting.Subject)"
        >
          <strong>{{ caseting.Subject }} <b-badge variant="secondary">{{ caseting.Type }}</b-badge>
          </strong>
          <b-card-text>
            {{ caseting.Description }}
          </b-card-text>
          <b-card-text class="small text-muted">{{ caseting.CaseNumber }}</b-card-text>
        </b-card>
      </b-card-group>
    </div>
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
      <div class="row">
        <div class="col">
          <div class="list-group">
            <a
              href="#"
              v-for="(email, index) in relatedEmailMessages"
              :key="index"
              class="list-group-item list-group-item-action"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ email.Subject }}</h5>
                <small>{{ email.Status }}</small>
              </div>
              <p class="mb-1">{{ email.TextBody }}</p>
              <small>{{ email.MessageDate }}</small>
            </a>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "EmailMessagePage",
  data () {
    return {
      cases: [],
      relatedEmailMessages: [],
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
      this.getRelatedEmailMessages(caseId)
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
    },
    getRelatedEmailMessages (caseId) {
      console.log(caseId)
      this.axios.get("http://localhost:3000/email-message/related/" + caseId)
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
          this.relatedEmailMessages = response.data
        })
        .catch((error) => {
          console.log(error);
          this.errored = true
        })
    }
  },
};
</script>
<style></style>
