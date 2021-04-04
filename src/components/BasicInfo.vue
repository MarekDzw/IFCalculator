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
              @input="calculateData(basicInfo)"
              suffix="cm"
            ></v-text-field>
            <v-text-field
              type="number"
              v-model.number="basicInfo.weight"
              label="Weight"
              @change="calculateData(basicInfo)"
              @input="calculateData(basicInfo)"
              suffix="kg"
            ></v-text-field>
            <v-text-field
              type="number"
              v-model.number="basicInfo.age"
              label="Age"
              @change="calculateData(basicInfo)"
              @input="calculateData(basicInfo)"
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
              @input="calculateData(basicInfo)"
              suffix="%"
            ></v-text-field>
          </v-card>
        </v-col>
        <v-col cols="6" md="8">
          <v-card class="pa-2 text-left" outlined tile>
            <p v-if="isNaN(calcsInfo.bmr)">Basal Metabolic Rate (BMR)</p>
            <p v-else>Basal Metabolic Rate (BMR) {{ calcsInfo.bmr }} kcal</p>
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
          <v-card class="pa-2 text-left" outlined tile>
            <p v-if="isNaN(calcsInfo.tdee)">
              Total Daily Energy Expenditure (TDEE)
            </p>
            <p v-else>
              Total Daily Energy Expenditure (TDEE) {{ calcsInfo.tdee }} kcal
            </p>
          </v-card>
          <v-card class="pa-2 text-left" outlined tile>
            <p c v-if="isNaN(calcsInfo.bmi)">
              Body Mass Index (BMI)
            </p>
            <p v-else>Body Mass Index (BMI) {{ calcsInfo.bmi }}</p>
            <p v-if="isNaN(calcsInfo.bmiText)"></p>
            <p v-else>{{ calcsInfo.bmiText }}</p>
          </v-card>
          <v-card class="pa-2 text-left" outlined tile>
            <p v-if="isNaN(calcsInfo.lbm)">
              Lean Body Mass (LBM)
            </p>
            <p v-else>Lean Body Mass (LBM) {{ calcsInfo.lbm }} kg</p>
            <p v-if="isNaN(calcsInfo.lbmFat)">
              Fat Body Mass
            </p>
            <p v-else>Fat Body Mass {{ calcsInfo.lbmFat }} kg</p>
            <p v-if="isNaN(calcsInfo.perfWeight)">Perfect weight</p>
            <p v-else>Perfect weight: {{ calcsInfo.perfWeight }} kg</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-container class="d-flex justify-center">
      <v-btn
        color="primary"
        :disabled="isNaN(calcsInfo.bmr)"
        @click="
          updatePage(3),
            setBasicInfo(basicInfo),
            calculateMacro(macroInfo, calcsInfo.tdee)
        "
        >Next step</v-btn
      >
    </v-container>
  </div>
</template>

<script lang="ts">
import text from "../data/text.json";
import { MutationsTypes } from "@/store/modules/mutations-types";
import { ActionsTypes } from "@/store/modules/actions-types";
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class BasicInfo extends Vue {
  text: object = text;

  get basicInfo() {
    return this.$store.state.basic;
  }

  get calcsInfo() {
    return this.$store.state.calcs;
  }

  get macroInfo() {
    return this.$store.state.macro;
  }

  updatePage(value: number) {
    this.$store.commit(MutationsTypes.UPDATE_PAGE, value);
  }

  calculateMacro(value: any, tdee: number) {
    value.tdee = tdee;
    this.$store.dispatch(ActionsTypes.CACLULATE_MACRO, "asd");
  }

  setBasicInfo(value: any) {
    this.$store.dispatch(ActionsTypes.SET_BASICINFO, value);
  }

  calculateData(value: any) {
    if (value.gender) {
      value.gendDiff = this.text.formula[value.formula][value.gender];
    }
    this.$store.dispatch(ActionsTypes.CACLULATE_BMR, value);
  }
}
</script>
