<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-card class="pa-2">
            <v-card-title class="text-center">Schedule:</v-card-title>
            <v-text-field
              v-model="dataInfo.macro.dpc"
              label="Days per cycle"
              type="number"
              @change="calculateMacro(dataInfo.macro)"
            />
            <v-text-field
              v-model="dataInfo.macro.wpc"
              label="Workouts per cycle"
              type="number"
              @change="calculateMacro(dataInfo.macro)"
            />
          </v-card>
        </v-col>

        <v-col cols="6" md="4">
          <v-card class="pa-2">
            <v-card-title class="text-lg-center">Summary:</v-card-title>
            <v-card-text
              >Cycle TEE:{{ dataInfo.summary.cycleTee }} kcal
            </v-card-text>
            <v-card-text>TDEE: {{ dataInfo.result.tdee }} kcal</v-card-text>
            <v-card-text
              >Cycle Calories: {{ dataInfo.summary.cycleKcal }} kcal
            </v-card-text>
            <v-card-text
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
        <v-col cols="12" md="6">
          Rest
          <v-row>
            <v-col cols="3" md="6">
              <v-text-field
                v-model="dataInfo.macro.restPercent"
                :suffix="textTDEE"
                cols="1"
                solo
                type="number"
                @change="calculateMacro(dataInfo.macro)"
              />
            </v-col>
            <v-col cols="3" md="6">
              <v-text-field
                :hint="dataInfo.macro.restKcal - dataInfo.result.tdee + ' kcal'"
                :value="dataInfo.macro.restKcal"
                disabled
                persistent-hint
                solo
                suffix="kcal"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          Workout

          <v-row>
            <v-col cols="3" md="6">
              <v-text-field
                v-model="dataInfo.macro.workoutPercent"
                :suffix="textTDEE"
                cols="1"
                solo
                type="number"
                @change="calculateMacro(dataInfo.macro)"
              />
            </v-col>
            <v-col cols="3" md="6">
              <v-text-field
                :hint="
                  dataInfo.macro.workoutKcal - dataInfo.result.tdee + ' kcal'
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
export default {
  name: "MacroCalc",
  data() {
    return {
      textTDEE: "% Under/Over TDEE"
    };
  },

  computed: {
    dataInfo() {
      return this.$store.state.data;
    }
  },
  methods: {
    updatePage(value) {
      this.$store.commit("updatePage", value);
    },
    calculateMacro(value) {
      this.$store.dispatch("calculateMacro", value);
    }
  }
};
</script>
