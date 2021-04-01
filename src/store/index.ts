import Vue from "vue";
import Vuex from "vuex";
import actions from "@/store/actions";
import mutations from "@/store/mutations";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    page: 1,
    disclaimerCheck: false,
    data: {
      height: null,
      weight: null,
      age: null,
      activity: null,
      gender: null,
      bodyfat: undefined,
      date: new Date().toISOString().substr(0, 10),
      formula: "mifflin",
      gendDiff: undefined,
      goal: -5,
      result: {
        bmr: null,
        tdee: null,
        lbm: null,
        lbmFat: null,
        bmi: null,
        perfWeight: null,
        bmiText: null
      },
      macro: {
        dpc: 7,
        wpc: 2,
        workoutKcal: null,
        restKcal: null,
        restPercent: -20,
        workoutPercent: 20
      },
      summary: {
        cycleTee: null,
        cycleKcal: null,
        cycleOU: null,
        cycleChangeKG: null
      },
      tableItems: [
        {
          date: new Date().toISOString().substr(0, 10),
          cycle: 0,
          days: 0,
          weight: null,
          change: null,
          total: null
        }
      ]
    }
  },
  mutations,
  actions
});
