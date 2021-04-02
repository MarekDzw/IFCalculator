<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="2">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="goalInfo"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="goalInfo"
                label="Pick a start date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="goalInfo" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="
                  setNewDate(goalInfo);
                  menu = false;
                "
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            :step="0.5"
            type="number"
            v-model="goalInfo"
            label="Set goal in kg"
            @change="calculateGoal(goalInfo)"
            suffix="kg"
          ></v-text-field>
        </v-col>
      </v-row>
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
import { ActionsTypes } from "@/store/modules/actions-types";
import { MutationsTypes } from "@/store/modules/mutations-types";
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
      return this.$store.state;
    },
    goalInfo() {
      return this.$store.state.data;
    }
  },
  methods: {
    updatePage(value) {
      this.$store.commit(MutationsTypes.UPDATE_PAGE, value);
    },
    setNewDate(value) {
      this.$store.dispatch(ActionsTypes.SET_NEWDATE, value);
    },
    calculateGoal(value) {
      this.$store.dispatch(ActionsTypes.CACLULATE_GOAL, value);
    }
  }
};
</script>
<style lang=""></style>
