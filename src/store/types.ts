//State
export interface State {
  utils: Utils;
  basic: BasicInfo;
  calcs: Calcs;
  macro: Macro;
  summary: Summary;
  tableItems?: TableItems[];
}
//Models
export interface Utils {
  page: number;
  disclaimerCheck: boolean;
}
export interface BasicInfo {
  height?: number;
  weight?: number;
  age?: number;
  activity?: number;
  gender?: string;
  bodyfat?: number;
  gendDiff?: number;
  formula: string;
}
export interface Calcs {
  bmr?: number;
  tdee?: number;
  lbm?: number;
  lbmFat?: number;
  bmi?: number;
  perfWeight?: number;
  bmiText?: string;
}
export interface Macro {
  dpc: number;
  wpc: number;
  restPercent: number;
  workoutPercent: number;
  workoutKcal?: number;
  restKcal?: number;
}
export interface Summary {
  cycleTee?: number;
  cycleKcal?: number;
  cycleOU?: number;
  cycleChangeKG?: number;
  goal: number;
  date?: string;
}
export interface TableItems {
  date?: number;
  cycle?: number;
  days?: number;
  weight?: number;
  change?: number;
  total?: number;
}
