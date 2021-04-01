import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import { State } from "@/store/types";
import { mutations } from "@/store/mutations";
import { actions } from "@/store/actions";

Vue.use(Vuex);

const store: StoreOptions<State> = {
  state: {
    page: 1,
    disclaimerCheck: false,
    date: new Date().toISOString().substr(0, 10),
    formula: "mifflin",
    goal: -5,
    result: {
      bmr: 1,
      tdee: 2,
      lbm: 3,
      lbmFat: 4,
      bmi: 5,
      perfWeight: 6,
      bmiText: "",
    },
    macro: {
      dpc: 7,
      wpc: 2,
      restPercent: -20,
      workoutPercent: 20,
    },
    tableItems: [
      {
        cycle: 0,
        days: 0,
      },
    ],
  },
  mutations: mutations,
  actions: actions,
};
export default new Vuex.Store<State>(store);
