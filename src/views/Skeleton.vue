<template>
  <v-app id="app">
    <v-card class="mx-auto" width="960">
      <v-card-title>Intermitten Fasting Calculator</v-card-title>
      <v-stepper v-model="page">
        <v-stepper-header>
          <v-stepper-step :complete="page > 1" step="1"
            >Disclaimer</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step step="2">Basic Info</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">Macro Calculator</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4">Goal</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items height="400px">
          <v-stepper-content step="1">
            <slot name="Disclaimer"></slot>
          </v-stepper-content>

          <v-stepper-content step="2">
            <slot name="BasicInfo"></slot>
          </v-stepper-content>

          <v-stepper-content step="3">
            <slot name="MacroCalc"></slot>
          </v-stepper-content>

          <v-stepper-content step="4">
            <slot name="Goals"></slot>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import BasicInfo from "@/components/BasicInfo.vue";
import Disclaimer from "@/components/Disclaimer.vue";
import Goals from "@/components/Goals.vue";
import MacroCalc from "@/components/MacroCalc.vue";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {
    Disclaimer,
    BasicInfo,
    MacroCalc,
    Goals
  }
})
export default class Skeleton extends Vue {
  get page() {
    return this.$store.state.utils.page;
  }
}
</script>
