<template>
  <Skeleton>
    <template v-slot:Disclaimer>
      <Disclaimer />
    </template>
    <template v-slot:BasicInfo>
      <BasicInfo />
    </template>
    <template v-slot:MacroCalc>
      <MacroCalc />
    </template>
    <template v-slot:Goals>
      <Goals />
    </template>
  </Skeleton>
</template>

<script lang="ts">
import Skeleton from "@/views/Skeleton.vue";
import Disclaimer from "@/components/Disclaimer.vue";
import MacroCalc from "@/components/MacroCalc.vue";
import Goals from "@/components/Goals.vue";
import BasicInfo from "@/components/BasicInfo.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Skeleton,
    Disclaimer,
    BasicInfo,
    MacroCalc,
    Goals
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
