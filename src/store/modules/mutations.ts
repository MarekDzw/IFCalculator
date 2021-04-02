import { State } from "@/store/types";
import { MutationTree } from "vuex";
import { MutationsTypes } from "@/store/modules/mutations-types";

export type Mutations = {
  [MutationsTypes.UPDATE_DISCLAIMER](state: State, payload: boolean): void;
  [MutationsTypes.UPDATE_PAGE](state: State, payload: number): void;
  [MutationsTypes.UPDATE_BMR](state: State, payload): void;
  [MutationsTypes.UPDATE_LBM](state: State, payload): void;
  [MutationsTypes.UPDATE_BMI](state: State, payload): void;
  [MutationsTypes.UPDATE_MACRO](state: State, payload): void;
  [MutationsTypes.UPDATE_SUMMARY](state: State, payload): void;
  [MutationsTypes.UPDATE_PERFWEIGHT](state: State, payload): void;
  [MutationsTypes.UPDATE_DATE](state: State, payload): void;
  [MutationsTypes.UPDATE_BASICINFO](state: State, payload): void;
  [MutationsTypes.UPDATE_GOAL](state: State, payload): void;
};
export const mutations: MutationTree<State> & Mutations = {
  [MutationsTypes.UPDATE_DISCLAIMER](state, payload) {
    state.utils.disclaimerCheck = payload;
  },
  [MutationsTypes.UPDATE_PAGE](state, payload) {
    state.utils.page = payload;
  },
  [MutationsTypes.UPDATE_BMR](state, payload) {
    console.log(payload);
    state.calcs.bmr = payload.toFixed(0);
  },
  [MutationsTypes.UPDATE_LBM](state, payload) {
    state.calcs.lbm = payload.lbm.toFixed(2);
    state.calcs.lbmFat = payload.lbmFat;
  },
  [MutationsTypes.UPDATE_TDEE](state, payload) {
    state.calcs.tdee = payload;
  },
  [MutationsTypes.UPDATE_BMI](state, payload) {
    state.calcs.bmiText = payload.bmiText;
    state.calcs.bmi = payload.bmi;
  },
  [MutationsTypes.UPDATE_MACRO](state, payload) {
    state.macro.restPercent = payload.restPercent;
    state.macro.workoutPercent = payload.workoutPercent;
    state.macro.workoutKcal = payload.workoutKcal.toFixed(0);
    state.macro.restKcal = payload.restKcal.toFixed(0);
  },
  [MutationsTypes.UPDATE_SUMMARY](state, payload) {
    state.summary.cycleTee = payload.cycleTee.toFixed(0);
    state.summary.cycleKcal = payload.cycleKcal.toFixed(0);
    state.summary.cycleOU = payload.cycleOU.toFixed(0);
    state.summary.cycleChangeKG = payload.cycleChangeKG.toFixed(2);
  },
  [MutationsTypes.UPDATE_PERFWEIGHT](state, payload) {
    state.calcs.perfWeight = payload.toFixed(2);
  },
  [MutationsTypes.UPDATE_DATE](state, payload) {
    state.tableItems[0].date = payload;
  },
  [MutationsTypes.UPDATE_BASICINFO](state, payload) {
    let { height, weight, age, activity, gender, bodyfat } = payload;
    state.basic.height = height;
    state.basic.weight = weight;
    state.basic.age = age;
    state.basic.activity = activity;
    state.basic.gender = gender;
    state.basic.bodyfat = bodyfat;
  },
  [MutationsTypes.UPDATE_GOAL](state, payload) {
    state.tableItems = payload;
  },
};
