import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "@/store";
import vuetify from "@/plugins/vuetify";
import VueAnalytics from "vue-analytics";

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: "G-C9YJ711Q0C",
});
new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
