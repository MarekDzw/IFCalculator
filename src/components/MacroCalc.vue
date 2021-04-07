<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-card class="pa-2">
            <v-card-title class="text-center">Schedule:</v-card-title>
            <v-text-field
              v-model.number="macroInfo.dpc"
              label="Days per cycle"
              type="number"
              @change="calculateMacro(macroInfo)"
              @input="calculateMacro(macroInfo)"
            />
            <v-text-field
              v-model.number="macroInfo.wpc"
              label="Workouts per cycle"
              type="number"
              @change="calculateMacro(macroInfo)"
              @input="calculateMacro(macroInfo)"
            />
          </v-card>
        </v-col>

        <v-col cols="6" md="4">
          <v-card class="pa-2">
            <v-card-title class="text-lg-center">Summary:</v-card-title>
            <v-card-text class="text-left"
              >Cycle TEE: {{ summaryInfo.cycleTee }} kcal
            </v-card-text>
            <v-card-text class="text-left"
              >TDEE: {{ macroInfo.tdee }} kcal</v-card-text
            >
            <v-card-text class="text-left"
              >Cycle Calories: {{ summaryInfo.cycleKcal }} kcal
            </v-card-text>
            <v-card-text class="text-left"
              >Cycle Over/Under: {{ summaryInfo.cycleOU }} kcal
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" md="4">
          <v-card class="pa-2">
            <v-card-title>Cycle change in kg:</v-card-title>
            <v-card-text class="title text-lg-center">
              {{ summaryInfo.cycleChangeKG }} kg
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="text-left">
          Rest
          <v-row>
            <v-col cols="3" md="7">
              <v-text-field
                v-model.number="macroInfo.restPercent"
                :suffix="textTDEE"
                cols="1"
                solo
                type="number"
                @change="calculateMacro(macroInfo)"
                @input="calculateMacro(macroInfo)"
              />
            </v-col>
            <v-col cols="3" md="5">
              <v-text-field
                :hint="macroInfo.restKcal - macroInfo.tdee + ' kcal'"
                :value="macroInfo.restKcal"
                disabled
                persistent-hint
                solo
                suffix="kcal"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" class="text-left">
          Workout

          <v-row>
            <v-col cols="3" md="7">
              <v-text-field
                v-model.number="macroInfo.workoutPercent"
                :suffix="textTDEE"
                cols="1"
                solo
                type="number"
                @change="calculateMacro(macroInfo)"
                @input="calculateMacro(macroInfo)"
              />
            </v-col>
            <v-col cols="3" md="5">
              <v-text-field
                :hint="macroInfo.workoutKcal - macroInfo.tdee + ' kcal'"
                :value="macroInfo.workoutKcal"
                disabled
                persistent-hint
                solo
                suffix="kcal"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-container class="d-flex justify-center">
      <v-btn class="mr-4" color="primary" @click="updatePage(2)"
        >Back step
      </v-btn>

      <v-btn class="ml-4" color="primary" @click="updatePage(4)"
        >Next step
      </v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import { ActionsTypes } from "@/store/modules/actions-types";
import { MutationsTypes } from "@/store/modules/mutations-types";
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class MacroCalc extends Vue {
  textTDEE: string = "% Under/Over TDEE";

  get macroInfo() {
    return this.$store.state.macro;
  }

  get summaryInfo() {
    return this.$store.state.summary;
  }

  updatePage(value: number) {
    this.$gtag.event("updated-macro", {
      event_category: "updated-macro-page",
      event_label: "Updated macro page",
      value: 1
    });
    this.$store.commit(MutationsTypes.UPDATE_PAGE, value);
  }

  calculateMacro(value: any) {
    this.$store.dispatch(ActionsTypes.CACLULATE_MACRO, value);
  }
}
</script>
