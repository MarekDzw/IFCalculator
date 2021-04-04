import {
  calculateBMI,
  calculateBMR,
  calculateKcal,
  calculateLBMFat,
  calculateMinus,
  calculateMulti,
  calculatePerfWeight,
  calculateTDEE,
  checkBMI,
  toFixedNumber
} from "@/store/modules/utils";
import { ActionContext, ActionTree } from "vuex";
import { BasicInfo, Calcs, Macro, State } from "@/store/types";
import { ActionsTypes } from "@/store/modules/actions-types";
import { MutationsTypes } from "@/store/modules/mutations-types";

export interface Actions {
  [ActionsTypes.CACLULATE_MACRO](
    { commit }: ActionContext<State, State>,
    payload: Calcs & Macro
  ): void;
  [ActionsTypes.SET_NEWDATE](
    { commit }: ActionContext<State, State>,
    payload: string
  ): void;
  [ActionsTypes.SET_BASICINFO](
    { commit }: ActionContext<State, State>,
    payload: BasicInfo
  ): void;
  [ActionsTypes.SET_GOAL](
    { commit }: ActionContext<State, State>,
    payload: number
  ): void;
}

export const actions: ActionTree<State, State> & Actions = {
         [ActionsTypes.CACLULATE_BMR]({ commit }, data) {
           let lbmFat = toFixedNumber(
             calculateLBMFat(data.weight, data.bodyfat),
             1
           );
           let lbm = toFixedNumber(calculateMinus(data.weight, lbmFat), 1);
           let height = data.height / 100;
           let bmr = toFixedNumber(calculateBMR(lbm, data), 0);
           let bmi = calculateBMI(data.weight, data.height);
           let bmiText = checkBMI(bmi);
           let tdee = calculateTDEE(data.activity, bmr);
           let perfWeight = toFixedNumber(calculatePerfWeight(height), 1);
           let objLBM = {
             lbm: lbm,
             lbmFat: lbmFat
           };
           let objBMI = {
             bmi: bmi,
             bmiText: bmiText
           };
           commit(MutationsTypes.UPDATE_PERFWEIGHT, perfWeight);
           commit(MutationsTypes.UPDATE_TDEE, tdee);
           commit(MutationsTypes.UPDATE_LBM, objLBM);
           commit(MutationsTypes.UPDATE_BMI, objBMI);
           commit(MutationsTypes.UPDATE_BMR, bmr);
         },

         [ActionsTypes.CACLULATE_MACRO]({ commit }, data) {
           let workoutKcal = toFixedNumber(
             calculateKcal(data.tdee, data.workoutPercent),
             0
           );
           let restKcal = toFixedNumber(
             calculateKcal(data.tdee, data.restPercent),
             0
           );
           let restDays = calculateMinus(data.dpc, data.wpc);
           let cycleTee = calculateMulti(data.tdee, data.dpc);
           let cycleKcal = restDays * restKcal + data.wpc * workoutKcal;
           let cycleOU = toFixedNumber(calculateMinus(cycleKcal, cycleTee), 0);
           let cycleChangeKG = toFixedNumber(
             calculateMulti(0.000133, cycleOU),
             2
           );
           data.restKcal = restKcal;
           data.workoutKcal = workoutKcal;
           let valueSummary = {
             cycleKcal: cycleKcal,
             cycleTee: cycleTee,
             cycleOU: cycleOU,
             cycleChangeKG: cycleChangeKG
           };
           commit(MutationsTypes.UPDATE_MACRO, data);
           commit(MutationsTypes.UPDATE_SUMMARY, valueSummary);
         },
         [ActionsTypes.SET_NEWDATE]({ commit }, data) {
           commit(MutationsTypes.UPDATE_DATE, data);
         },
         [ActionsTypes.SET_BASICINFO]({ commit }, data) {
           commit(MutationsTypes.UPDATE_BASICINFO, data);
         },
         [ActionsTypes.SET_GOAL]({ commit }, data) {
           commit(MutationsTypes.UPDATE_GOAL, data);
         }
       };
