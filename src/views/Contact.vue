<template>
  <div class="contact">
    <div class="row text-center mb-3">
      <div class="col">
        <h1>The Contact Object</h1>
        <hr />
      </div>
    </div>

    <section
      id=""
      class="row mb-3"
    >
      <div class="col">
        <div class="card">
          <div class="card-header">
            <button
              v-if="errored"
              class="btn btn-danger"
            >ERROR!!</button>
            <h5>All Contacts list</h5>
          </div>
          <div class="card-body">
            <div class="list-group">
              <a
                v-for="(contact, index) in contacts"
                :key="index"
                @click="getSingleContact(contact.Id, contact.Name)"
                class="list-group-item list-group-item-action"
              >
                {{ contact.Name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <b-modal
      id="modal-1"
      :title="contactName"
    >
      <div class="row">
        <div class="col">
          <ul>
            <pre>
              {{ contactDetail.data }}
            </pre>
          </ul>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "ContactPage",
  data () {
    return {
      contacts: [],
      errored: false,
      contactId: '',
      contactName: '',
      contactDetail: {
        data: {}
      }
    };
  },
  mounted () {
    this.getContacts()
  },
  methods: {
    getContacts () {
      this.axios.get("http://localhost:3000/contact/all")
        .then((response) => (this.contacts = response.data))
        .catch((error) => {
          console.log(error)
          this.errored = true
        })
    },
    getSingleContact (contactId, contactName) {
      this.contactId = contactId
      this.contactName = contactName
      this.$bvModal.show('modal-1')
      this.getSingleContactDetail(contactId)
    },
    getSingleContactDetail (contactId) {
      this.axios.get("http://localhost:3000/contact/" + contactId)
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
          this.contactDetail.data = response.data
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
