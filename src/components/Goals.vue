<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row>asd</v-row>
    </v-container>
    <v-divider></v-divider>
    <v-container class="d-flex justify-center">
      <v-btn color="primary" @click="updatePage(3)">Back step</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Goals",
  computed: {
    summaryInfo() {
      return this.$store.state.summary;
    }
  },
  methods: {
    updatePage(value) {
      this.$store.commit("updatePage", value);
    }
  }
};
</script>
<style lang=""></style>
