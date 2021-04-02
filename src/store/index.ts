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
    result: {
      bmr: 0,
      tdee: 0,
      lbm: 0,
      lbmFat: 0,
      bmi: 0,
      perfWeight: 0,
      bmiText: "",
    },
    macro: {
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
