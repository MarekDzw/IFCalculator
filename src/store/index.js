import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import text from '../data/text.json';
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
      formula: 'mifflin',
      gendDiff: undefined,
      result: {
        bmr: null,
        tdee: null,
        lbm: null,
        lbmFat: null,
        bmi: null,
        perfWeight: null,
        bmiText: null,
      },
      macro: {
        dpc: 7,
        wpc: 2,
        workoutKcal: null,
        restKcal: null,
        restPercent: -20,
        workoutPercent: 20,
      },
      summary: {
        cycleTee: null,
        cycleKcal: null,
        cycleOU: null,
      },
      tableItems: [
        {
          date: '1/13/2021',
          cycle: 0,
          days: 0,
          weight: 99,
          change: 0.69,
          total: 0.69,
        },
      ],
    },
  },
  mutations: {
    updateDisclaimerCheckbox(state, value) {
      state.disclaimerCheck = value;
    },
    updatePage(state, value) {
      state.page = value;
    },
    updateBMR(state, value) {
      state.data.result.bmr = value.toFixed(0);
    },
    updateLBM(state, value) {
      state.data.result.lbm = value.lbm.toFixed(2);
      state.data.result.lbmFat = value.lbmFat;
    },
    updateTDEE(state, value) {
      state.data.result.tdee = value;
    },
    updateBMI(state, value) {
      state.data.result.bmiText = value.bmiText;
      state.data.result.bmi = value.bmi;
    },
    updateMacro(state, value) {
      state.data.macro.restPercent = value.restPercent;
      state.data.macro.workoutPercent = value.workoutPercent;
      state.data.macro.workoutKcal = value.workoutKcal.toFixed(0);
      state.data.macro.restKcal = value.restKcal.toFixed(0);
    },
    updateSummary(state, value) {
      state.data.summary.cycleTee = value.cycleTee.toFixed(0);
      state.data.summary.cycleKcal = value.cycleKcal.toFixed(0);
      state.data.summary.cycleOU = value.cycleOU.toFixed(0);
    },
    updatePerfWeight(state, value) {
      state.data.result.perfWeight = value.toFixed(2);
    },
  },
  actions: {
    calculateBMR({ commit }, data) {
      if (data.formula == 'mifflin') {
        let value =
          10 * data.weight + 6.25 * data.height - 5 * data.age + data.gendDiff;
        commit('updateBMR', value);
      }
      if (data.formula == 'katch') {
        let value = Math.round(370 + 21.6 * this.state.data.result.lbm);
        commit('updateBMR', value);
      }
      if (data.formula == 'harris') {
        if (data.gender == 'male') {
          let value = Math.floor(
            13.397 * data.weight +
              4.799 * data.height -
              5.677 * data.age +
              data.gendDiff
          );
          commit('updateBMR', value);
        } else {
          let value = Math.floor(
            9.247 * data.weight +
              3.098 * data.height -
              4.33 * data.age +
              data.gendDiff
          );
          commit('updateBMR', value);
        }
      }
    },
    calculateLBM({ commit }, data) {
      let lbmFat = (data.weight * data.bodyfat) / 100;
      let lbm = data.weight - lbmFat;
      let value = {
        lbm: lbm,
        lbmFat: lbmFat,
      };
      commit('updateLBM', value);
    },
    calculatePerfWeight({ commit }) {
      let height = this.state.data.height / 100;
      let value = 2.2 * 22 + 3.5 * 22 * (height - 1.5);
      commit('updatePerfWeight', value);
    },
    calculateTDEE({ commit }, data) {
      let value = Math.floor(data.activity * this.state.data.result.bmr);
      commit('updateTDEE', value);
    },
    calculateBMI({ commit }, data) {
      let bmi = Math.floor(
        data.weight / ((data.height / 100) * (data.height / 100))
      );
      let bmiText = checkBMI(bmi);
      let value = {
        bmi: bmi,
        bmiText: bmiText,
      };
      commit('updateBMI', value);
    },
    calculateMacro({ commit }, data) {
      let value = data;

      let tdee = this.state.data.result.tdee;

      let workoutKcal = (tdee * (100 + Number(value.workoutPercent))) / 100;
      let restKcal = (tdee * (100 + Number(value.restPercent))) / 100;

      let restDays = value.dpc - value.wpc;

      let cycleTee = tdee * value.dpc;
      let cycleKcal = restDays * restKcal + value.wpc * workoutKcal;
      let cycleOU = cycleKcal - cycleTee;

      value.restKcal = restKcal;
      value.workoutKcal = workoutKcal;
      let valueSummary = {
        cycleKcal: cycleKcal,
        cycleTee: cycleTee,
        cycleOU: cycleOU,
      };
      commit('updateMacro', value);
      commit('updateSummary', valueSummary);
    },
  },
});
function checkBMI(value) {
  let array = text.bmiIndicator;
  for (let i = 0; i < array.length; i++) {
    if (array[i].min < value && array[i].max > value) {
      return array[i].text;
    }
  }
}
