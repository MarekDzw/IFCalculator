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
      10 * data.weight + 6.25 * data.height - 5 * data.age + data.gendDiff;
  }
  if (data.formula === "katch") {
    value = Math.round(370 + 21.6 * lbm);
  }
  if (data.formula === "harris") {
    if (data.gender === "male") {
      value = Math.floor(
        13.397 * data.weight +
          4.799 * data.height -
          5.677 * data.age +
          data.gendDiff
      );
    } else {
      value = Math.floor(
        9.247 * data.weight +
          3.098 * data.height -
          4.33 * data.age +
          data.gendDiff
      );
    }
  }
  return value;
}
export function fillData(value: any) {
  let i = 0;
  let items = [];
  let goal = Number(value.goal);
  let change = Number(value.summary.cycleChangeKG);
  let x = goal / change;
  console.log(value);
  let item = {
    date: new Date().toISOString().substr(0, 10),
    cycle: i,
    days: i,
    weight: Number(value.weight),
    change: Number(value.summary.cycleChangeKG),
    total:
      Number(value.summary.cycleChangeKG) + Number(value.summary.cycleChangeKG),
  };
  i++;
  items.push(item);
  console.log(items);
  while (x > 0) {
    item = {
      date: items[i - 1].date + 1,
      cycle: i,
      days: items[i - 1].days + Number(value.macro.dpc),
      weight: items[i - 1].weight + Number(value.summary.cycleChangeKG),
      change: value.summary.cycleChangeKG,
      total: items[i - 1].total + Number(value.summary.cycleChangeKG),
    };

    goal += change;
    i++;
    x--;
    items.push(item);
  }
  return items;
}
