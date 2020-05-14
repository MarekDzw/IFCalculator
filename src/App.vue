<template>
  <Skeleton>
    <template v-slot:disclaimer>
      <Disclaimer />
    </template>
    <template v-slot:basicinfo>
      <BasicInfo />
    </template>
    <template v-slot:macrocalc>
      <MacroCalc />
    </template>
  </Skeleton>
</template>

<script>
import Skeleton from "./views/Skeleton";
import Disclaimer from "./components/Disclaimer.vue";
import BasicInfo from "./components/BasicInfo.vue";
import MacroCalc from "./components/MacroCalc.vue";
export default {
  name: "App",
  components: {
    Skeleton,
    Disclaimer,
    BasicInfo,
    MacroCalc
  }
};
</script>
