<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="pa-2" outlined tile>
            <v-card-title>Your information</v-card-title>
            <v-text-field
              type="number"
              v-model.number="basicInfo.height"
              label="Height"
              @change="calculateData(basicInfo)"
              suffix="cm"
            ></v-text-field>
            <v-text-field
              type="number"
              v-model.number="basicInfo.weight"
              label="Weight"
              @change="calculateData(basicInfo)"
              suffix="kg"
            ></v-text-field>
            <v-text-field
              type="number"
              v-model.number="basicInfo.age"
              label="Age"
              @change="calculateData(basicInfo)"
            ></v-text-field>
            <v-select
              :items="text.activity"
              label="Activity"
              item-text="name"
              v-model.number="basicInfo.activity"
              @change="calculateData(basicInfo)"
              value="value"
            ></v-select>
            <v-select
              class="text-left"
              :items="text.gender"
              label="Gender"
              item-text="name"
              value="value"
              @change="calculateData(basicInfo)"
              v-model="basicInfo.gender"
            ></v-select>
            <v-text-field
              type="number"
              v-model.number="basicInfo.bodyfat"
              label="Bodyfat(optional)"
              @change="calculateData(basicInfo)"
              suffix="%"
            ></v-text-field>
          </v-card>
        </v-col>
        <v-col cols="6" md="8">
          <v-card class="pa-2" outlined tile>
            <p class="text-left">
              Basal Metabolic Rate (BMR) {{ calcsInfo.bmr }} kcal
            </p>
            <v-radio-group
              @change="calculateData(basicInfo)"
              v-model="basicInfo.formula"
            >
              <v-radio
                value="mifflin"
                label="Mifflin-St Jeor Formula"
              ></v-radio>
              <v-radio value="harris" label="Harris-Benedict Formula"></v-radio>
              <v-radio
                value="katch"
                label="Katch-McArdle Formula"
                :disabled="!basicInfo.bodyfat"
              ></v-radio>
            </v-radio-group>
          </v-card>
          <v-card class="pa-2" outlined tile>
            <p class="text-left">
              Total Daily Energy Expenditure (TDEE)
              {{ calcsInfo.tdee }} kcal
            </p>
          </v-card>
          <v-card class="pa-2" outlined tile>
            <p class="text-left">Body Mass Index (BMI) {{ calcsInfo.bmi }}</p>
            <p class="text-left">{{ calcsInfo.bmiText }}</p>
          </v-card>
          <v-card class="pa-2" outlined tile>
            <p class="text-left">Lean Body Mass (LBM) {{ calcsInfo.lbm }} kg</p>
            <p class="text-left">Fat Body Mass {{ calcsInfo.lbmFat }} kg</p>
            <p class="text-left">
              Perfect weight: {{ calcsInfo.perfWeight }} kg
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-container class="d-flex justify-center">
      <v-btn
        color="primary"
        :disabled="!basicInfo"
        @click="
          updatePage(3), setBasicInfo(basicInfo), calculateMacro(basicInfo)
        "
        >Next step</v-btn
      >
    </v-container>
  </div>
</template>

<script>
import text from "../data/text.json";
import { MutationsTypes } from "@/store/modules/mutations-types";
import { ActionsTypes } from "@/store/modules/actions-types";

export default {
  name: "BasicInfo",
  data() {
    return {
      text
    };
  },
  computed: {
    basicInfo() {
      return this.$store.state.basic;
    },
    calcsInfo() {
      return this.$store.state.calcs;
    }
  },
  methods: {
    updatePage(value) {
      this.$store.commit(MutationsTypes.UPDATE_PAGE, value);
    },
    calculateMacro(value) {
      this.$store.dispatch(ActionsTypes.CACLULATE_MACRO, value);
    },
    setBasicInfo(value) {
      this.$store.dispatch(ActionsTypes.SET_BASICINFO, value);
    },
    calculateData(value) {
      console.log("component: ", value);
      if (value.gender) {
        value.gendDiff = this.text.formula[value.formula][value.gender];
      }
      this.$store.dispatch(ActionsTypes.CACLULATE_BMR, value);
      if (value.bodyfat) {
        this.$store.dispatch(ActionsTypes.CACLULATE_LBM, value);
        this.$store.dispatch(ActionsTypes.CACLULATE_BMR, value);
      }
    }
  }
};
</script>
