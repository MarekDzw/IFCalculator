import { State } from "@/store/types";
import { MutationTree } from "vuex";

export const mutations: MutationTree<State> = {
  updateDisclaimerCheckbox(state, value) {
    state.data.disclaimerCheck = value;
  },
  updatePage(state: State, value: number) {
    state.data.page = value;
  },
  updateBMR(state: State, value) {
    state.data.result.bmr = value.toFixed(0);
  },
  updateLBM(state: State, value) {
    state.data.result.lbm = value.lbm.toFixed(2);
    state.data.result.lbmFat = value.lbmFat;
  },
  updateTDEE(state: State, value) {
    state.data.result.tdee = value;
  },
  updateBMI(state: State, value) {
    state.data.result.bmiText = value.bmiText;
    state.data.result.bmi = value.bmi;
  },
  updateMacro(state: State, value) {
    state.data.macro.restPercent = value.restPercent;
    state.data.macro.workoutPercent = value.workoutPercent;
    state.data.macro.workoutKcal = value.workoutKcal.toFixed(0);
    state.data.macro.restKcal = value.restKcal.toFixed(0);
  },
  updateSummary(state: State, value) {
    state.data.summary.cycleTee = value.cycleTee.toFixed(0);
    state.data.summary.cycleKcal = value.cycleKcal.toFixed(0);
    state.data.summary.cycleOU = value.cycleOU.toFixed(0);
    state.data.summary.cycleChangeKG = value.cycleChangeKG.toFixed(2);
  },
  updatePerfWeight(state: State, value) {
    state.data.result.perfWeight = value.toFixed(2);
  },
  updateDate(state: State, value) {
    state.data.tableItems[0].date = value;
  },
  updateBasicInfo(state: State, value) {
    let { height, weight, age, activity, gender, bodyfat } = value;
    state.data.height = height;
    state.data.weight = weight;
    state.data.age = age;
    state.data.activity = activity;
    state.data.gender = gender;
    state.data.bodyfat = bodyfat;
  },
  updateGoal(state: State, value) {
    state.data.tableItems = [];
    state.data.tableItems = value;
  },
};
