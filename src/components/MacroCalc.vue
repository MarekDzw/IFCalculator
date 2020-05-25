<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row>
        <v-col cols="12" md="3">
          <v-card class="pa-2" outlined tile>
            <v-card-title>Schedule</v-card-title>
            <v-text-field type="number" value="7" label="Days per cycle" />
            <v-text-field type="number" value="2" label="Workouts per cycle" />
          </v-card>
        </v-col>
        <v-col cols="6" md="9">
          <v-card-title>Summary</v-card-title>
          <v-card-text>Cycle TEE: tdee * dayPerCycle kcal</v-card-text>
          <v-card-text>TDEE: TDEE kcal</v-card-text>
          <v-card-text
            >Cycle Calories: (tdee * x%) + (tdee * x%) * x kcal</v-card-text
          >
          <v-card-text
            >Cycle Over/Under: cycleTEE - cycleCalories kcal</v-card-text
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          Workout
          <pie-chart :chart-data="datacollection"></pie-chart>
          <v-slider thumb-label label="Protein" />
          <v-slider thumb-label label="Carbs" />
          <v-slider thumb-label label="Fat" />
        </v-col>
        <v-col cols="12" md="6">
          Rest
          <pie-chart :chart-data="datacollection1"></pie-chart>
          <v-slider label="Protein" />
          <v-slider label="Carbs" />
          <v-slider label="Fat" />
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-container class="d-flex justify-center">
      <v-btn color="primary" @click="updatePage(4), fillData()"
        >Next step</v-btn
      >
    </v-container>
  </div>
</template>

<script>
import PieChart from '../components/PieChart.js';
export default {
  name: 'MacroCalc',
  components: {
    PieChart,
  },
  data() {
    return {
      datacollection: null,
      datacollection1: null,
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ['Proteins', 'Carbs', 'Fat'],
        datasets: [
          {
            label: ['Proteins', 'Carbs', 'Fat'],
            backgroundColor: ['#F2AC5C', '#6C9695', '#BEC190'],
            data: [59, 20, 20],
          },
        ],
      };
      this.datacollection1 = {
        labels: ['Proteins', 'Carbs', 'Fat'],
        datasets: [
          {
            backgroundColor: ['#F2AC5C', '#6C9695', '#BEC190'],
            data: [59, 20, 20],
          },
        ],
      };
    },
  },
};
</script>
<style lang=""></style>
