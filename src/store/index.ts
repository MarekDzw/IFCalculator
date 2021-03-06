import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { State } from "@/store/types";
import { mutations } from "@/store/modules/mutations";
import { actions } from "@/store/modules/actions";
import { getters } from "@/store/modules/getters";

Vue.use(Vuex);

const store: StoreOptions<State> = {
  state: {
    utils: {
      page: 1,
      disclaimerCheck: false,
    },
    basic: {
      formula: "mifflin",
    },
    calcs: {},
    macro: {
      dpc: 7,
      wpc: 2,
      workoutPercent: 20,
      restPercent: -20,
    },
    summary: {
      date: new Date().toISOString().substr(0, 10),
      cycleChangeKG: 0,
      goal: -5,
    },
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default new Vuex.Store<State>(store);
