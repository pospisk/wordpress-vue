import "babel-polyfill";
import Vue from "vue";
require("./bootstrap");
import router from "./router";
import App from "./App.vue";
import store from "./store";
import * as types from "./store/mutation-types";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import "./assets/css/styles.css";
import "./assets/scss/app.scss";

new Vue({
  el: "#app",
  store,
  router,
  render: (h) => h(App),
  created() {
    this.$store.commit(types.RESET_LOADING_PROGRESS);
    this.$store.dispatch("getAllCategories");
    this.$store.dispatch("getAllPages");
  },
});
