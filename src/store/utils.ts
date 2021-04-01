import text from "@/data/text.json";

export function checkBMI(value) {
  let array = text.bmiIndicator;
  for (let i = 0; i < array.length; i++) {
    if (array[i].min < value && array[i].max > value) {
      return array[i].text;
    }
  }
}
export function fillData(value) {
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
