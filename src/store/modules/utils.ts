import text from "@/data/text.json";

export function calculateBMI(data) {
  return Math.floor(data.weight / ((data.height / 100) * (data.height / 100)));
}
export function calculateTDEE(x, data) {
  return Math.floor(data.activity * x.state.calcs.bmr);
}

export function checkBMI(value: any) {
  let array = text.bmiIndicator;
  for (let i = 0; i < array.length; i++) {
    if (array[i].min < value && array[i].max > value) {
      return array[i].text;
    }
  }
}
export function calculatePerfWeight(data) {
  return 2.2 * 22 + 3.5 * 22 * (data - 1.5);
}
export function calculateBMR(x, data) {
  if (data.formula === "mifflin") {
    let value =
      10 * data.weight + 6.25 * data.height - 5 * data.age + data.gendDiff;
    return value;
  }
  if (data.formula === "katch") {
    let value = Math.round(370 + 21.6 * x.state.calcs.lbm);
    return value;
  }
  if (data.formula === "harris") {
    if (data.gender === "male") {
      let value = Math.floor(
        13.397 * data.weight +
          4.799 * data.height -
          5.677 * data.age +
          data.gendDiff
      );
      return value;
    } else {
      let value = Math.floor(
        9.247 * data.weight +
          3.098 * data.height -
          4.33 * data.age +
          data.gendDiff
      );
      return value;
    }
  }
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
