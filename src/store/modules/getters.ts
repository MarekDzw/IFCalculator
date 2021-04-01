import { State, TableItems } from "@/store/types";
import { GetterTree } from "vuex";
import { fillData } from "@/store/modules/utils";

export type Getters = {
  tableItems(state: State): TableItems[];
};
export const getters: GetterTree<State, State> & Getters = {
  tableItems: (state) => {
    return fillData(state);
  },
};
