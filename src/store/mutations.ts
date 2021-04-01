import { State } from "@/store/types";
import { MutationTree } from "vuex";

export const mutations: MutationTree<State> = {
  updateDisclaimer(state, value) {
    state.disclaimerCheck = value;
  },
  updatePage(state, value: number) {
    state.page = value;
  },
  updateBMR(state, value) {
    state.result.bmr = value.toFixed(0);
  },
  updateLbm(state, value) {
    state.result.lbm = value.lbm.toFixed(2);
    state.result.lbmFat = value.lbmFat;
  },
  updateTDEE(state, value) {
    state.result.tdee = value;
  },
  updateBMI(state, value) {
    state.result.bmiText = value.bmiText;
    state.result.bmi = value.bmi;
  },
  updateMacro(state, value) {
    state.macro.restPercent = value.restPercent;
    state.macro.workoutPercent = value.workoutPercent;
    state.macro.workoutKcal = value.workoutKcal.toFixed(0);
    state.macro.restKcal = value.restKcal.toFixed(0);
  },
  updateSummary(state, value) {
    state.summary.cycleTee = value.cycleTee.toFixed(0);
    state.summary.cycleKcal = value.cycleKcal.toFixed(0);
    state.summary.cycleOU = value.cycleOU.toFixed(0);
    state.summary.cycleChangeKG = value.cycleChangeKG.toFixed(2);
  },
  updatePerfWeight(state, value) {
    state.result.perfWeight = value.toFixed(2);
  },
  updateDate(state, value) {
    state.tableItems[0].date = value;
  },
  updateBasicInfo(state, value) {
    let { height, weight, age, activity, gender, bodyfat } = value;
    state.height = height;
    state.weight = weight;
    state.age = age;
    state.activity = activity;
    state.gender = gender;
    state.bodyfat = bodyfat;
  },
  updateGoal(state, value) {
    state.tableItems = value;
  },
};
