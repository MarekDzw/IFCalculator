import Vue from "vue";
import Vuex from "vuex";
import text from "../data/text.json";

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
        cycleChangeKG: null,
      },
      tableItems: [
        {
          date: new Date().toISOString().substr(0, 10),
          cycle: 0,
          days: 0,
          weight: null,
          change: null,
          total: null,
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
      state.data.summary.cycleChangeKG = value.cycleChangeKG.toFixed(2);
    },
    updatePerfWeight(state, value) {
      state.data.result.perfWeight = value.toFixed(2);
    },
    updateDate(state, value) {
      state.data.tableItems[0].date = value;
    },
    updateBasicInfo(state, value) {
      let { height, weight, age, activity, gender, bodyfat } = value;
      state.data.height = height;
      state.data.weight = weight;
      state.data.age = age;
      state.data.activity = activity;
      state.data.gender = gender;
      state.data.bodyfat = bodyfat;
    },
    updateGoal(state, value) {
      state.data.tableItems = [];
      state.data.tableItems = value;
    },
  },
  actions: {
    calculateBMR({ commit }, data) {
      if (data.formula === "mifflin") {
        let value =
          10 * data.weight + 6.25 * data.height - 5 * data.age + data.gendDiff;
        commit("updateBMR", value);
      }
      if (data.formula === "katch") {
        let value = Math.round(370 + 21.6 * this.state.data.result.lbm);
        commit("updateBMR", value);
      }
      if (data.formula === "harris") {
        if (data.gender === "male") {
          let value = Math.floor(
            13.397 * data.weight +
              4.799 * data.height -
              5.677 * data.age +
              data.gendDiff
          );
          commit("updateBMR", value);
        } else {
          let value = Math.floor(
            9.247 * data.weight +
              3.098 * data.height -
              4.33 * data.age +
              data.gendDiff
          );
          commit("updateBMR", value);
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
      commit("updateLBM", value);
    },
    calculatePerfWeight({ commit }) {
      let height = this.state.data.height / 100;
      let value = 2.2 * 22 + 3.5 * 22 * (height - 1.5);
      commit("updatePerfWeight", value);
    },
    calculateTDEE({ commit }, data) {
      let value = Math.floor(data.activity * this.state.data.result.bmr);
      commit("updateTDEE", value);
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
      commit("updateBMI", value);
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
      let cycleChangeKG = 0.000133 * cycleOU;
      value.restKcal = restKcal;
      value.workoutKcal = workoutKcal;
      let valueSummary = {
        cycleKcal: cycleKcal,
        cycleTee: cycleTee,
        cycleOU: cycleOU,
        cycleChangeKG: cycleChangeKG,
      };
      commit("updateMacro", value);
      commit("updateSummary", valueSummary);
    },
    setNewDate({ commit }, data) {
      let value = data;
      commit("updateDate", value);
    },
    setBasicInfo({ commit }, data) {
      commit("updateBasicInfo", data);
    },
    calculateGoal({ commit }, data) {
      let value = fillData(data);
      commit("updateGoal", value);
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
function fillData(value) {
  let i = 0;
  let items = [];
  let goal = Number(value.goal);
  let change = Number(value.summary.cycleChangeKG);
  let x = goal / change;
  console.log(value);
  let item = {
    date: new Date().toISOString().substr(0, 10),
    cycle: i,
    days: i,
    weight: Number(value.weight),
    change: Number(value.summary.cycleChangeKG),
    total:
      Number(value.summary.cycleChangeKG) + Number(value.summary.cycleChangeKG),
  };
  i++;
  items.push(item);
  console.log(items);
  while (x > 0) {
    item = {
      date: items[i - 1].date + 1,
      cycle: i,
      days: items[i - 1].days + Number(value.macro.dpc),
      weight: items[i - 1].weight + Number(value.summary.cycleChangeKG),
      change: value.summary.cycleChangeKG,
      total: items[i - 1].total + Number(value.summary.cycleChangeKG),
    };

    goal += change;
    i++;
    x--;
    items.push(item);
  }
  return items;
}
