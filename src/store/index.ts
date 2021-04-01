import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { data } from "@/store/state";
import { State } from "@/store/types";
import { mutations } from "@/store/mutations";

Vue.use(Vuex);

const store: StoreOptions<State> = {
  state: {
    data,
  },
  modules: {
    mutations,
  },
};
export default new Vuex.Store<State>(store);
