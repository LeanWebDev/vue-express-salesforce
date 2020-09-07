<template>
  <div id="app">
    <div
      id="nav"
      class="container"
    >
      <div class="row">
        <div class="col">
          <!-- Nav tabs -->
          <ul
            class="nav nav-pills justify-content-center"
            id="navId"
          >
            <li class="nav-item">
              <router-link
                to="/"
                class="nav-link"
              >Home</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/about"
                class="nav-link"
              >Account</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/contact"
                class="nav-link"
              >Contact</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/case"
                class="nav-link"
              >Case</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/email-message"
                class="nav-link"
              >EmailMessage</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/about"
                class="nav-link"
              >Activity</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/about"
                class="nav-link"
              >Contract</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/about"
                class="nav-link"
              >Knowledge</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/about"
                class="nav-link"
              >CPQ</router-link>
            </li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">
            <div
              class="tab-pane fade show active"
              id="tab1Id"
              role="tabpanel"
            ></div>
            <div
              class="tab-pane fade"
              id="tab2Id"
              role="tabpanel"
            ></div>
            <div
              class="tab-pane fade"
              id="tab3Id"
              role="tabpanel"
            ></div>
            <div
              class="tab-pane fade"
              id="tab4Id"
              role="tabpanel"
            ></div>
            <div
              class="tab-pane fade"
              id="tab5Id"
              role="tabpanel"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <router-view class="container pt-5" />
  </div>
</template>

<style></style>
