<template>
  <div class="about">
    <div class="row text-center mb-3">
      <div class="col">
        <h1>The Account Object</h1>
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
                @click="getSingleAccount(account.Id, account.Name)"
                class="list-group-item list-group-item-action"
              >
                {{ account.Name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <b-modal
      id="modal-1"
      :title="accountName"
    >
      <div class="row">
        <div class="col">
          <ul>
            <li>
              {{ accountDetail.type }}
            </li>
            <li>
              {{ accountDetail.description }}
            </li>
            <li>
              {{ accountDetail.website }}
            </li>
            <li>
              {{ accountDetail.industry }}
            </li>
            <li>
              {{ accountDetail.accountNumber }}
            </li>
            <li>
              {{ accountDetail.phone }}
            </li>
            <li>
              {{ accountDetail.annualRevenue }}
            </li>
            <li>
              {{ accountDetail.numberOfEmployees }}
            </li>
            <li>
              {{ accountDetail.rating }}
            </li>
            <strong>Shipping:</strong>
            <pre>
              {{ accountDetail.shipping }}
            </pre>
          </ul>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "AccountPage",
  data () {
    return {
      accounts: [],
      errored: false,
      accountId: '',
      accountName: '',
      accountDetail: {
        type: '',
        description: '',
        website: '',
        industry: '',
        accountNumber: '',
        phone: '',
        annualRevenue: '',
        numberOfEmployees: '',
        rating: '',
        shipping: {
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
          latitude: '',
          longitude: '',
          address: {
            city: '',
            country: '',
            latitude: '',
            longitude: '',
            postalCode: '',
            state: '',
            street: ''
          }
        }
      }
    };
  },
  mounted () {
    this.getAccounts();
  },
  methods: {
    getAccounts () {
      this.axios
        .get("http://localhost:3000/account/all")
        .then((response) => (this.accounts = response.data))
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
    getSingleAccount (accountId, accountName) {
      this.accountId = accountId
      this.accountName = accountName
      this.$bvModal.show('modal-1')
      this.getSingleAccountDetail(accountId)
    },
    getSingleAccountDetail (accountId) {
      this.axios.get("http://localhost:3000/account/" + accountId)
        .then((response) => {
          this.accountDetail.type = response.data.Type,
            this.accountDetail.description = response.data.Description,
            this.accountDetail.website = response.data.Website,
            this.accountDetail.industry = response.data.Industry,
            this.accountDetail.accountNumber = response.data.AccountNumber,
            this.accountDetail.phone = response.data.Phone,
            this.accountDetail.annualRevenue = response.data.AnnualRevenue,
            this.accountDetail.numberOfEmployees = response.data.NumberOfEmployees,
            this.accountDetail.rating = response.data.Rating
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
