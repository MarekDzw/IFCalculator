<template>
  <Skeleton>
    <template v-slot:disclaimer>
      <Disclaimer />
    </template>
    <template v-slot:basicinfo>
      <BasicInfo />
    </template>
  </Skeleton>
</template>

<script>
import Skeleton from "./views/Skeleton";
import Disclaimer from "./components/Disclaimer.vue";
import BasicInfo from "./components/BasicInfo.vue";
export default {
  name: "App",
  components: {
    Skeleton,
    Disclaimer,
    BasicInfo
  }
};
</script>
