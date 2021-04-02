import { fillData, checkBMI } from "@/store/modules/utils";
import { ActionTree } from "vuex";
import { State } from "@/store/types";
import { ActionsTypes } from "@/store/modules/actions-types";
import { MutationsTypes } from "@/store/modules/mutations-types";

export interface Actions {
  [ActionsTypes.CACLULATE_BMR]({ commit }, payload): void;
  [ActionsTypes.CACLULATE_LBM]({ commit }, payload): void;
  [ActionsTypes.CACLULATE_PERFWEIGHT]({ commit }, payload): void;
  [ActionsTypes.CACLULATE_TDEE]({ commit }, payload): void;
  [ActionsTypes.CACLULATE_BMI]({ commit }, payload): void;
  [ActionsTypes.CACLULATE_MACRO]({ commit }, payload): void;
  [ActionsTypes.SET_NEWDATE]({ commit }, payload): void;
  [ActionsTypes.SET_BASICINFO]({ commit }, payload): void;
  [ActionsTypes.CACLULATE_GOAL]({ commit }, payload): void;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionsTypes.CACLULATE_BMR]({ commit }, data) {
    if (data.formula === "mifflin") {
      let value =
        10 * data.weight + 6.25 * data.height - 5 * data.age + data.gendDiff;
      commit(MutationsTypes.UPDATE_BMR, value);
    }
    if (data.formula === "katch") {
      let value = Math.round(370 + 21.6 * this.state.result.lbm);
      commit(MutationsTypes.UPDATE_BMR, value);
    }
    if (data.formula === "harris") {
      if (data.gender === "male") {
        let value = Math.floor(
          13.397 * data.weight +
            4.799 * data.height -
            5.677 * data.age +
            data.gendDiff
        );
        commit(MutationsTypes.UPDATE_BMR, value);
      } else {
        let value = Math.floor(
          9.247 * data.weight +
            3.098 * data.height -
            4.33 * data.age +
            data.gendDiff
        );
        commit(MutationsTypes.UPDATE_BMR, value);
      }
    }
  },
  [ActionsTypes.CACLULATE_LBM]({ commit }, data) {
    let lbmFat = (data.weight * data.bodyfat) / 100;
    let lbm = data.weight - lbmFat;
    let value = {
      lbm: lbm,
      lbmFat: lbmFat,
    };
    commit(MutationsTypes.UPDATE_LBM, value);
  },
  [ActionsTypes.CACLULATE_PERFWEIGHT]({ commit }) {
    let height = this.state.basic.height / 100;
    let value = 2.2 * 22 + 3.5 * 22 * (height - 1.5);
    commit(MutationsTypes.UPDATE_PERFWEIGHT, value);
  },
  [ActionsTypes.CACLULATE_TDEE]({ commit }, data) {
    let value = Math.floor(data.activity * this.state.result.bmr);
    commit(MutationsTypes.UPDATE_TDEE, value);
  },
  [ActionsTypes.CACLULATE_BMI]({ commit }, data) {
    let bmi = Math.floor(
      data.weight / ((data.height / 100) * (data.height / 100))
    );
    let bmiText = checkBMI(bmi);
    let value = {
      bmi: bmi,
      bmiText: bmiText,
    };
    commit(MutationsTypes.UPDATE_BMI, value);
  },
  [ActionsTypes.CACLULATE_MACRO]({ commit }, data) {
    let value = data;
    let tdee = this.state.result.tdee;
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
