import { State } from "@/store/types";
import { actions } from "@/store/actions";
import { mutations } from "@/store/mutations";

const state: State = {
  data: {
    page: 1,
    disclaimerCheck: false,
    date: new Date().toISOString().substr(0, 10),
    formula: "mifflin",
    goal: -5,
    macro: {
      dpc: 7,
      wpc: 2,
      restPercent: -20,
      workoutPercent: 20,
    },
    tableItems: [
      {
        cycle: 0,
        days: 0,
      },
    ],
  },
};

export const data: any = {
  state,
  actions,
  mutations,
};
