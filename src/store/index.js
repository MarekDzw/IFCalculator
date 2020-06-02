import Vue from 'vue';
import Vuex from 'vuex';

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
      formula: 'mifflin',
      gendDiff: undefined,
    },
    result: {
      bmr: null,
      tdee: null,
      lbm: null,
      lbmFat: null,
      bmi: null,
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
  },
  mutations: {
    updateDisclaimerCheckbox(state, value) {
      state.disclaimerCheck = value;
    },
    updatePage(state, value) {
      state.page = value;
    },
    updateBMR(state, value) {
      state.result.bmr = value;
    },
    updateLBM(state, value) {
      state.result.lbm = value.lbm;
      state.result.lbmFat = value.lbmFat;
    },
    updateTDEE(state, value) {
      state.result.tdee = value;
    },
    updateBMI(state, value) {
      state.result.bmi = value;
    },
    updateMacro(state, value) {
      state.macro.restPercent = value.restPercent;
      state.macro.workoutPercent = value.workoutPercent;
      state.macro.workoutKcal = value.workoutKcal;
      state.macro.restKcal = value.restKcal;
    },
    updateSummary(state, value) {
      state.summary.cycleTee = value.cycleTee;
      state.summary.cycleKcal = value.cycleKcal;
      state.summary.cycleOU = value.cycleOU;
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
        let value = Math.round(370 + 21.6 * this.state.result.lbm);
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
    calculateTDEE({ commit }, data) {
      let value = Math.floor(data.activity * this.state.result.bmr);
      commit('updateTDEE', value);
    },
    calculateBMI({ commit }, data) {
      let value = Math.floor(
        data.weight / ((data.height / 100) * (data.height / 100))
      );
      commit('updateBMI', value);
    },
    calculateMacro({ commit }, data) {
      let value = data;

      let tdee = this.state.result.tdee;

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
