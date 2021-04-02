import {
  fillData,
  checkBMI,
  calculateBMR,
  calculateBMI,
  calculateTDEE,
  calculatePerfWeight,
} from "@/store/modules/utils";
import { ActionTree } from "vuex";
import { State } from "@/store/types";
import { ActionsTypes } from "@/store/modules/actions-types";
import { MutationsTypes } from "@/store/modules/mutations-types";

export interface Actions {
  [ActionsTypes.CACLULATE_BMR]({ commit }, payload): void;
  [ActionsTypes.CACLULATE_MACRO]({ commit }, payload): void;
  [ActionsTypes.SET_NEWDATE]({ commit }, payload): void;
  [ActionsTypes.SET_BASICINFO]({ commit }, payload): void;
  [ActionsTypes.CACLULATE_GOAL]({ commit }, payload): void;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionsTypes.CACLULATE_BMR]({ commit }, data) {
    console.log("actions: ", data);
    let bmr: number = calculateBMR(this, data);
    let bmi: number = calculateBMI(data);
    let bmiText = checkBMI(bmi);
    let lbmFat = (data.weight * data.bodyfat) / 100;
    let lbm = data.weight - lbmFat;
    let value1 = {
      lbm: lbm,
      lbmFat: lbmFat,
    };

    let value2 = {
      bmi: bmi,
      bmiText: bmiText,
    };
    let value3: number = calculateTDEE(this, data);
    let height = this.state.basic.height / 100;
    let value4 = calculatePerfWeight(height);
    commit(MutationsTypes.UPDATE_BMR, bmr);
    commit(MutationsTypes.UPDATE_PERFWEIGHT, value4);
    commit(MutationsTypes.UPDATE_TDEE, value3);
    commit(MutationsTypes.UPDATE_LBM, value1);
    commit(MutationsTypes.UPDATE_BMI, value2);
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
