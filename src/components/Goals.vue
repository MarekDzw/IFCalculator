<template>
  <div>
    <v-container>
      <v-col cols="6" md="5">
        <v-row>
          <v-col cols="12" md="6">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="dataInfo.date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dataInfo[0].date"
                  label="Pick a start date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="dataInfo[0].date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="
                    setNewDate(dataInfo[0].date);
                    menu = false;
                  "
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
      <v-data-table
        :headers="text.headers"
        :items="dataInfo"
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
import text from "../data/text.json";
export default {
  name: "Goals",
  data() {
    return {
      text,
      menu: false
    };
  },
  computed: {
    dataInfo() {
      return this.$store.state.data.tableItems;
    }
  },
  methods: {
    updatePage(value) {
      this.$store.commit("updatePage", value);
    },
    setNewDate(value) {
      this.$store.dispatch("setNewDate", value);
    }
  }
};
</script>
<style lang=""></style>
