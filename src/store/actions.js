import { fillData, checkBMI } from "@/store/utils";

export default {
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
};
