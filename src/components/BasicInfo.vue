<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="pa-2" outlined tile>
            <v-card-title>Your information</v-card-title>
            <v-text-field
              type="number"
              v-model="dataInfo.height"
              label="Height"
              @change="calculateData(dataInfo)"
              suffix="cm"
            ></v-text-field>
            <v-text-field
              type="number"
              v-model="dataInfo.weight"
              label="Weight"
              @change="calculateData(dataInfo)"
              suffix="kg"
            ></v-text-field>
            <v-text-field
              type="number"
              v-model="dataInfo.age"
              label="Age"
              @change="calculateData(dataInfo)"
            ></v-text-field>
            <v-select
              :items="text.activity"
              label="Activity"
              item-text="name"
              v-model="dataInfo.activity"
              @change="calculateData(dataInfo)"
              value="value"
            ></v-select>
            <v-select
              :items="text.gender"
              label="Gender"
              item-text="name"
              value="value"
              @change="calculateData(dataInfo)"
              v-model="dataInfo.gender"
            ></v-select>
            <v-text-field
              type="number"
              v-model="dataInfo.bodyfat"
              label="Bodyfat(optional)"
              @change="calculateData(dataInfo)"
              suffix="%"
            ></v-text-field>
          </v-card>
        </v-col>
        <v-col cols="6" md="8">
          <v-card class="pa-2" outlined tile>
            <p>Basal Metabolic Rate (BMR) {{ dataInfo.result.bmr }} kcal</p>
            <v-radio-group
              @change="calculateData(dataInfo)"
              v-model="dataInfo.formula"
            >
              <v-radio
                value="mifflin"
                label="Mifflin-St Jeor Formula"
              ></v-radio>
              <v-radio value="harris" label="Harris-Benedict Formula"></v-radio>
              <v-radio
                value="katch"
                label="Katch-McArdle Formula"
                :disabled="!dataInfo.bodyfat"
              ></v-radio>
            </v-radio-group>
          </v-card>
          <v-card class="pa-2" outlined tile>
            <p>
              Total Daily Energy Expenditure (TDEE)
              {{ dataInfo.result.tdee }} kcal
            </p>
          </v-card>
          <v-card class="pa-2" outlined tile>
            <p>Body Mass Index (BMI) {{ dataInfo.result.bmi }}</p>
            <p>{{ dataInfo.result.bmiText }}</p>
          </v-card>
          <v-card class="pa-2" outlined tile>
            <p>Lean Body Mass (LBM) {{ dataInfo.result.lbm }} kg</p>
            <p>Fat Body Mass {{ dataInfo.result.lbmFat }} kg</p>
            <p>Perfect weight: {{ dataInfo.result.perfWeight }} kg</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-container class="d-flex justify-center">
      <v-btn
        color="primary"
        :disabled="!dataInfo.result.bmr"
        @click="updatePage(3), calculateMacro(dataInfo.macro)"
        >Next step</v-btn
      >
    </v-container>
  </div>
</template>

<script>
import text from '../data/text.json';
export default {
  name: 'BasicInfo',
  data() {
    return {
      text,
    };
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
    calculateData(value) {
      if (Object.values(value).includes(null)) {
        return;
      } else {
        value.gendDiff = this.text.formula[value.formula][value.gender];
        this.$store.dispatch('calculateBMR', value);
        this.$store.dispatch('calculateTDEE', value);
        this.$store.dispatch('calculateBMI', value);
        this.$store.dispatch('calculatePerfWeight', value);
        if (value.bodyfat) {
          this.$store.dispatch('calculateLBM', value);
          this.$store.dispatch('calculateBMR', value);
          this.$store.dispatch('calculateTDEE', value);
          this.$store.dispatch('calculatePerfWeight', value);
        }
      }
    },
  },
};
</script>
