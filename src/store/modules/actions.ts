import {
  fillData,
  checkBMI,
  calculateBMR,
  calculateBMI,
  calculateTDEE,
  calculatePerfWeight,
  calculateLBMFat,
  calculateLBM,
  toFixedNumber,
} from "@/store/modules/utils";
import { ActionTree } from "vuex";
import { BasicInfo, State } from "@/store/types";
import { ActionsTypes } from "@/store/modules/actions-types";
import { MutationsTypes } from "@/store/modules/mutations-types";

export interface Actions {
  [ActionsTypes.CACLULATE_BMR]({ commit }, payload: BasicInfo): void;
  [ActionsTypes.CACLULATE_MACRO]({ commit }, payload): void;
  [ActionsTypes.SET_NEWDATE]({ commit }, payload): void;
  [ActionsTypes.SET_BASICINFO]({ commit }, payload: BasicInfo): void;
  [ActionsTypes.CACLULATE_GOAL]({ commit }, payload): void;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionsTypes.CACLULATE_BMR]({ commit }, data) {
    let lbmFat = toFixedNumber(calculateLBMFat(data.weight, data.bodyfat), 1);
    let lbm = toFixedNumber(calculateLBM(data.weight, lbmFat), 1);
    let height = data.height / 100;
    let bmr = toFixedNumber(calculateBMR(lbm, data), 0);
    let bmi = calculateBMI(data.weight, data.height);
    let bmiText = checkBMI(bmi);
    let tdee = calculateTDEE(data.activity, bmr);
    let perfWeight = toFixedNumber(calculatePerfWeight(height), 1);
    let objLBM = {
      lbm: lbm,
      lbmFat: lbmFat,
    };
    let objBMI = {
      bmi: bmi,
      bmiText: bmiText,
    };
    commit(MutationsTypes.UPDATE_PERFWEIGHT, perfWeight);
    commit(MutationsTypes.UPDATE_TDEE, tdee);
    commit(MutationsTypes.UPDATE_LBM, objLBM);
    commit(MutationsTypes.UPDATE_BMI, objBMI);
    commit(MutationsTypes.UPDATE_BMR, bmr);
  },

  [ActionsTypes.CACLULATE_MACRO]({ commit }, data) {
    let value = data;
    let tdee = this.state.calcs.tdee;
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
    commit(MutationsTypes.UPDATE_MACRO, value);
    commit(MutationsTypes.UPDATE_SUMMARY, valueSummary);
  },
  [ActionsTypes.SET_NEWDATE]({ commit }, data) {
    commit(MutationsTypes.UPDATE_DATE, data);
  },
  [ActionsTypes.SET_BASICINFO]({ commit }, data) {
    commit(MutationsTypes.UPDATE_BASICINFO, data);
  },
  [ActionsTypes.CACLULATE_GOAL]({ commit }, data) {
    let value = fillData(data);
    commit(MutationsTypes.UPDATE_GOAL, value);
  },
};
