import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import { State } from "@/store/types";
import { mutations } from "@/store/modules/mutations";
import { actions } from "@/store/modules/actions";

Vue.use(Vuex);

const store: StoreOptions<State> = {
  state: {
    utils: {
      page: 1,
      disclaimerCheck: false,
      date: new Date(),
    },
    basic: {
      formula: "mifflin",
    },
    calcs: {},
    macro: {
      dpc: 7,
      wpc: 2,
      restPercent: -20,
      workoutPercent: 20,
    },
    summary: {
      goal: -5,
    },
  },
  mutations: mutations,
  actions: actions,
};
export default new Vuex.Store<State>(store);
