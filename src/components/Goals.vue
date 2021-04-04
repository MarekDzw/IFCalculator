<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="2">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="summaryInfo.date"
                label="Pick a start date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="summaryInfo.date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="
                  setNewDate(summaryInfo.date);
                  menu = false;
                "
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            :step="0.5"
            type="number"
            v-model.number="summaryInfo.goal"
            label="Set goal in kg"
            @change="setGoal(summaryInfo.goal)"
            suffix="kg"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-data-table
        :headers="text.headers"
        :items="tableItems"
        :items-per-page="10"
        class="elevation-1"
      ></v-data-table>
    </v-container>
    <v-divider></v-divider>
    <v-container class="d-flex justify-center">
      <v-btn color="primary" @click="updatePage(3)">Back step</v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import { ActionsTypes } from "@/store/modules/actions-types";
import { MutationsTypes } from "@/store/modules/mutations-types";
import text from "../data/text.json";
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Goals extends Vue {
  text: object = text;
  menu: boolean = false;

  get summaryInfo() {
    return this.$store.state.summary;
  }

  get tableItems() {
    return this.$store.getters.tableItems;
  }

  updatePage(value: number) {
    this.$store.commit(MutationsTypes.UPDATE_PAGE, value);
  }

  setNewDate(value: string) {
    this.$store.dispatch(ActionsTypes.SET_NEWDATE, value);
  }

  setGoal(value: number) {
    this.$store.dispatch(ActionsTypes.SET_GOAL, value);
  }
}
</script>
<style lang=""></style>
