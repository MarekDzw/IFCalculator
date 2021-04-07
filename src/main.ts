import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "@/store";
import vuetify from "@/plugins/vuetify";
import VueGtag from "vue-gtag";

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: "G-C9YJ711Q0C" },
});
new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
