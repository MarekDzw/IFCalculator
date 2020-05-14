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
      bodyfat: null,
      formula: 'mifflin',
      gendDiff: null,
    },
    result: {
      bmr: null,
      tdee: null,
      lbm: null,
      lbmFat: null,
      bmi: null,
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
  },
  actions: {
    calculateBMR({ commit }, data) {
      console.log(data);
      if (data.formula == 'mifflin') {
        let value =
          10 * data.weight + 6.25 * data.height - 5 * data.age + data.gendDiff;
        commit('updateBMR', value);
      }
      if (data.formula == 'harris') {
        if (data.gender == 'male') {
          let value =
            13.397 * data.weight +
            4.799 * data.height -
            5.677 * data.age +
            data.gendDiff;
          commit('updateBMR', value);
        } else {
          let value =
            9.247 * data.weight +
            3.098 * data.height -
            4.33 * data.age +
            data.gendDiff;
          commit('updateBMR', value);
        }
      }
    },
  },
  getters: {},
});
