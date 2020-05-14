<template>
  <div>
    <v-container class="grey lighten-5">
      <v-card-title>IF Calculator Terms and Conditions of Use</v-card-title>
      <v-card-text>
        PLEASE READ THESE TERMS AND CONDITIONS OF USE CAREFULLY BEFORE USING
        THIS PROGRAM. By using the Program, you signify your assent to these
        Terms and Conditions. If you do not agree to all of these Terms and
        Conditions of use, do not use the Program! Creator/Programmer of the IF
        Calculator (‘Program’) may revise and update these Terms and Conditions
        at any time. Your continued usage of this program will mean you accept
        those changes.
      </v-card-text>
      <v-card-title>THE PROGRAM DOES NOT PROVIDE MEDICAL ADVICE.</v-card-title>
      <v-card-text>
        The full contents of the Program, such as text, comments, graphics,
        images, and other material contained in the Program are for
        informational purposes only. This Program has not been evaluated by the
        Food and Drug Administration. and is not intended to diagnose, treat,
        cure or prevent any disease. Always consult you physician before
        starting any exercise program or changing dietary habits. The Program is
        not intended to be a substitute for professional medical advice,
        diagnosis, or treatment. It is not a substitute for a medical exam, nor
        does it replace the need for services provided by medical professional.
        Always seek the advice of your doctor before making any changes to your
        exercise habits, dietary regiment or taking any supplements. If you
        think you may have a medical emergency, call your doctor or 911
        immediately.
      </v-card-text>
      <v-card-title>
        RELEASE OF LIABILITY OF PROGRAM AND PROGRAM
        CREATORS/OWNERS
      </v-card-title>
      <v-card-text>
        The use of the Program is at your own risk. In no event shall the
        Program, its owners, creators and/or programmers, or any third parties
        mentioned in the Program be liable for any damages in the future
        including, but not limited to, heart attacks, muscle strains, pulls or
        tears, broken bones, shin splints, heat prostration, knee/ lower back/
        foot injuries, and other illness/disease, or injury/damage (mental,
        physical, financial), however caused, occurring during or after altering
        any personal nutritional/fitness/lifestyle habits or actions. The
        Program and Owners/Programmers/Creators do not assume any responsibility
        for any aspect of healthcare administered with the aid of content
        available in the Program. User understands that any and all
        advice/programs concerning exercise not done under supervision of a
        qualified trainer and nutrition is for educational purposes only. User
        understands nutritional advice is not intended as a substitute for
        professional medical advice, diagnosis or treatment. User has been
        advised to seek medical advice from a physician before altering their
        nutritional daily diet or beginning an exercise program.
      </v-card-text>
      <v-card-title>COMPLETE AGREEMENT.</v-card-title>
      <v-card-text>
        These Terms and Conditions constitute the agreement between you and this
        Program with respect to the use of the Program. User, for themself,
        their heirs and assigns, hereby release the Program and its Owner(s)/
        Programmers(s)/ Creators(s) from any claims, demands and causes of
        action arising from use of this “Program”. Use of anything in this
        “Program” is at your own Risk!
      </v-card-text>
    </v-container>
    <v-divider></v-divider>
    <v-container class="d-flex flex-sm-column align-center">
      <v-checkbox
        v-model="checkbox"
        label="I agree to the terms and conditions described in this disclaimer"
      ></v-checkbox>
      <v-btn :disabled="!checkbox" color="primary" @click="updatePage(2)">Next step</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Disclaimer",
  methods: {
    updatePage(value) {
      this.$store.commit("updatePage", value);
    }
  },
  computed: {
    checkbox: {
      get() {
        return this.$store.state.disclaimerCheck;
      },
      set(value) {
        this.$store.commit("updateDisclaimerCheckbox", value);
      }
    }
  }
};
</script>
