import text from "@/data/text.json";
import { BasicInfo } from "@/store/types";

export function calculateBMI(weight: number, height: number): number {
  return Math.floor(weight / ((height / 100) * (height / 100)));
}

export function calculateTDEE(activity: number, bmr: number): number {
  return Math.floor(activity * bmr);
}

export function checkBMI(bmi: number): string {
  let array = text.bmiIndicator;
  let bmiText: string = "";
  for (let i = 0; i < array.length; i++) {
    if (array[i].min < bmi && array[i].max > bmi) {
      bmiText = array[i].text;
    }
  }
  return bmiText;
}
export function calculatePerfWeight(height: number): number {
  return 2.2 * 22 + 3.5 * 22 * (height - 1.5);
}
export function calculateLBMFat(weight: number, bodyfat: number): number {
  return (weight * bodyfat) / 100;
}
export function calculateMinus(x: number, y: number): number {
  return x - y;
}
export function calculateKcal(tdee: number, percent: number) {
  return (tdee * (100 + percent)) / 100;
}
export function calculateMulti(x: number, y: number): number {
  return x * y;
}
export function toFixedNumber(
  num: number,
  digits: number,
  base?: number
): number {
  let pow = Math.pow(base || 10, digits);
  return Math.round(num * pow) / pow;
}
export function calculateBMR(lbm: number, data: BasicInfo): number {
  let value: number = 0;
  if (data.formula === "mifflin") {
    value =
      10 * (data.weight ? data.weight : 0) +
      6.25 * (data.height ? data.height : 0) -
      5 * (data.age ? data.age : 0) +
      (data.gendDiff ? data.gendDiff : 0);
  }
  if (data.formula === "katch") {
    value = Math.round(370 + 21.6 * lbm);
  }
  if (data.formula === "harris") {
    if (data.gender === "male") {
      value = Math.floor(
        13.397 * (data.weight ? data.weight : 0) +
          4.799 * (data.height ? data.height : 0) -
          5.677 * (data.age ? data.age : 0) +
          (data.gendDiff ? data.gendDiff : 0)
      );
    } else {
      value = Math.floor(
        9.247 * (data.weight ? data.weight : 0) +
          3.098 * (data.height ? data.height : 0) -
          4.33 * (data.age ? data.age : 0) +
          (data.gendDiff ? data.gendDiff : 0)
      );
    }
  }
  return value;
}
export function addDays(date: string, days: number): string {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy.toISOString().substr(0, 10);
}
export function fillData(value: any) {
  let i = 0;
  let items = [];
  let { goal, cycleChangeKG, date } = value.summary;
  let { weight } = value.basic;
  let change;
  let x = goal / cycleChangeKG;
  let item = {
    date: date,
    cycle: 0,
    days: 0,
    weight: weight,
    change: 0,
    total: 0
  };
  i++;
  items.push(item);
  while (x > 0) {
    item = {
      date: addDays(items[i - 1].date, value.macro.dpc),
      cycle: i,
      days: items[i - 1].days + value.macro.dpc,
      weight: toFixedNumber(items[i - 1].weight + cycleChangeKG, 2),
      change: cycleChangeKG,
      total: toFixedNumber(items[i - 1].total + cycleChangeKG, 2)
    };
    goal += change;
    i++;
    x--;
    items.push(item);
  }
  return items;
}
