<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-card class="pa-2 ">
            <v-card-title>Schedule</v-card-title>
            <v-text-field
              type="number"
              v-model="dataInfo.macro.dpc"
              label="Days per cycle"
              @change="calculateMacro(dataInfo.macro)"
            />
            <v-text-field
              type="number"
              v-model="dataInfo.macro.wpc"
              label="Workouts per cycle"
              @change="calculateMacro(dataInfo.macro)"
            />
          </v-card>
        </v-col>

        <v-col cols="6" md="4">
          <v-card class="pa-2 ">
            <v-card-title>Summary</v-card-title>
            <v-card-text
              >Cycle TEE:{{ dataInfo.summary.cycleTee }} kcal</v-card-text
            >
            <v-card-text>TDEE: {{ dataInfo.result.tdee }} kcal</v-card-text>
            <v-card-text
              >Cycle Calories:
              {{ dataInfo.summary.cycleKcal }} kcal</v-card-text
            >
            <v-card-text
              >Cycle Over/Under:
              {{ dataInfo.summary.cycleOU }} kcal</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          Rest
          <!-- <pie-chart :chart-data="datacollection"></pie-chart> -->
          <v-row>
            <v-col cols="3" md="6">
              <v-text-field
                solo
                cols="1"
                type="number"
                :suffix="textTDEE"
                v-model="dataInfo.macro.restPercent"
                @change="calculateMacro(dataInfo.macro)"
              />
            </v-col>
            <v-col cols="3" md="6">
              <v-text-field
                persistent-hint
                :hint="dataInfo.macro.restKcal - dataInfo.result.tdee + ' kcal'"
                solo
                disabled
                :value="dataInfo.macro.restKcal"
                suffix="kcal"
              />
            </v-col>
          </v-row>
          <!-- Pie chart future, atm not available -->
          <!-- <v-slider
            thumb-label
            @change="fillData()"
            v-model="macrodata[0]"
            label="Protein"
            max="100"
          />
          <v-slider
            thumb-label
            @change="fillData()"
            v-model="macrodata[1]"
            label="Carbs"
            :max="100 - macrodata[0]"
            min="0"
          />
          <v-slider
            thumb-label
            @change="fillData()"
            v-model="macrodata[2]"
            label="Fat"
            min="0"
            :max="100 - macrodata[0]"
          /> -->
        </v-col>
        <v-col cols="12" md="6">
          Workout
          <!-- <pie-chart :chart-data="datacollection1"></pie-chart> -->
          <v-row>
            <v-col cols="3" md="6">
              <v-text-field
                solo
                cols="1"
                type="number"
                :suffix="textTDEE"
                v-model="dataInfo.macro.workoutPercent"
                @change="calculateMacro(dataInfo.macro)"
              />
            </v-col>
            <v-col cols="3" md="6">
              <v-text-field
                persistent-hint
                :hint="
                  dataInfo.macro.workoutKcal - dataInfo.result.tdee + ' kcal'
                "
                solo
                disabled
                :value="dataInfo.macro.workoutKcal"
                suffix="kcal"
              />
            </v-col>
          </v-row>
          <!-- Pie chart future, atm not available -->
          <!-- <v-slider label="Protein" />
          <v-slider label="Carbs" />
          <v-slider label="Fat" /> -->
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-container class="d-flex justify-center">
      <v-btn class="mr-4" color="primary" @click="updatePage(2)"
        >Back step</v-btn
      >

      <v-btn class="ml-4" color="primary" @click="updatePage(4)"
        >Next step</v-btn
      >
    </v-container>
  </div>
</template>

<script>
// import PieChart from "../components/PieChart.js";
export default {
  name: 'MacroCalc',
  components: {
    // PieChart
  },
  data() {
    return {
      // Pie chart future, atm not available
      // macrodata: [60, 20, 20],
      // datacollection: null,data() {

      // datacollection1: null,
      textTDEE: '% Under/Over TDEE',
    };
  },
  mounted() {
    // Pie chart future, atm not available
    // this.fillData();
  },
  computed: {
    dataInfo() {
      return this.$store.state.data;
    },
  },
  methods: {
    updatePage(value) {
      this.$store.commit('updatePage', value);
    },
    calculateMacro(value) {
      this.$store.dispatch('calculateMacro', value);
    },
    // Pie chart future, atm not available
    // fillData() {
    //   this.datacollection = {
    //     labels: ['Proteins', 'Carbs', 'Fat'],
    //     datasets: [
    //       {
    //         label: ['Proteins', 'Carbs', 'Fat'],
    //         backgroundColor: ['#F2AC5C', '#6C9695', '#BEC190'],
    //         data: this.macrodata,
    //       },
    //     ],
    //   };
    //   this.datacollection1 = {
    //     labels: ['Proteins', 'Carbs', 'Fat'],
    //     datasets: [
    //       {
    //         backgroundColor: ['#F2AC5C', '#6C9695', '#BEC190'],
    //         data: [59, 20, 20],
    //       },
    //     ],
    //   };
    // },
  },
};
</script>
