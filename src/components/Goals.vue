<template>
  <div>
    <v-container>
      <v-data-table
        :headers="text.headers"
        :items="dataInfo.tableItems"
        :items-per-page="10"
        class="elevation-1"
      ></v-data-table>
    </v-container>
    <v-divider></v-divider>
    <v-container class="d-flex justify-center">
      <v-btn color="primary" @click="updatePage(3)">Back step</v-btn>
    </v-container>
  </div>
</template>

<script>
import text from '../data/text.json';
export default {
  name: 'Goals',
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
  },
};
</script>
<style lang=""></style>
