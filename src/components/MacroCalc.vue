<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-card class="pa-2">
            <v-card-title class="text-center">Schedule:</v-card-title>
            <v-text-field
              v-model.number="dataInfo.macro.dpc"
              label="Days per cycle"
              type="number"
              @change="calculateMacro(dataInfo)"
            />
            <v-text-field
              v-model.number="dataInfo.macro.wpc"
              label="Workouts per cycle"
              type="number"
              @change="calculateMacro(dataInfo)"
            />
          </v-card>
        </v-col>

        <v-col cols="6" md="4">
          <v-card class="pa-2">
            <v-card-title class="text-lg-center">Summary:</v-card-title>
            <v-card-text class="text-left"
              >Cycle TEE: {{ dataInfo.summary.cycleTee }} kcal
            </v-card-text>
            <v-card-text class="text-left"
              >TDEE: {{ dataInfo.calcs.tdee }} kcal</v-card-text
            >
            <v-card-text class="text-left"
              >Cycle Calories: {{ dataInfo.summary.cycleKcal }} kcal
            </v-card-text>
            <v-card-text class="text-left"
              >Cycle Over/Under: {{ dataInfo.summary.cycleOU }} kcal
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" md="4">
          <v-card class="pa-2">
            <v-card-title>Cycle change in kg:</v-card-title>
            <v-card-text class="title text-lg-center">
              {{ dataInfo.summary.cycleChangeKG }} kg
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="text-left">
          Rest
          <v-row>
            <v-col cols="3" md="6">
              <v-text-field
                v-model.number="dataInfo.macro.restPercent"
                :suffix="textTDEE"
                cols="1"
                solo
                type="number"
                @change="calculateMacro(dataInfo)"
              />
            </v-col>
            <v-col cols="3" md="6">
              <v-text-field
                :hint="dataInfo.macro.restKcal - dataInfo.calcs.tdee + ' kcal'"
                :value="dataInfo.macro.restKcal"
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
            <v-col cols="3" md="6">
              <v-text-field
                v-model.number="dataInfo.macro.workoutPercent"
                :suffix="textTDEE"
                cols="1"
                solo
                @change="calculateMacro(dataInfo.macro)"
              />
            </v-col>
            <v-col cols="3" md="6">
              <v-text-field
                :hint="
                  dataInfo.macro.workoutKcal - dataInfo.calcs.tdee + ' kcal'
                "
                :value="dataInfo.macro.workoutKcal"
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

<script>
import { ActionsTypes } from "@/store/modules/actions-types";
import { MutationsTypes } from "@/store/modules/mutations-types";

export default {
  name: "MacroCalc",
  data() {
    return {
      textTDEE: "% Under/Over TDEE"
    };
  },

  computed: {
    dataInfo() {
      return this.$store.state;
    }
  },
  methods: {
    updatePage(value) {
      this.$store.commit(MutationsTypes.UPDATE_PAGE, value);
    },
    calculateMacro(value) {
      this.$store.dispatch(ActionsTypes.CACLULATE_MACRO, value);
    }
  }
};
</script>
