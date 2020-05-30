<template>
  <input
    type="text"
    v-model="formattedPhoneValue"
    @keyup="focusOut"
    @blur="focusOut"
  />
</template>

<script>
import axios from "axios";
export default {
  name: "FormattedNumberInput",
  data() {
    return {
      phoneValue: 0,
      formattedPhoneValue: "0",
      preventNextIteration: false
    };
  },
  created() {
    this.formattedPhoneValue = this.$attrs.generate ? this.generatedMI() : "";
  },
  updated() {
    this.$emit("update-mi", this.formattedPhoneValue);
  },
  methods: {
    focusOut(event) {
      if (["Arrow", "Backspace", "Shift"].includes(event.key)) {
        this.preventNextIteration = true;
        return;
      }
      if (this.preventNextIteration) {
        this.preventNextIteration = false;
        return;
      }
      this.phoneValue = this.formattedPhoneValue
        .replace(/-/g, "")
        .match(/(\d{1,10})/g)[0];

      // Format display value based on calculated currencyValue
      this.formattedPhoneValue = this.phoneValue.replace(
        /(\d{1,3})(\d{1,3})(\d{1,4})/g,
        "$1-$2-$3"
      );
      this.$emit("update-mi", this.formattedPhoneValue);
    },
    generatedMI() {
      axios
        .get("http://" + location.hostname + ":5000/create_new")
        .then(res => {
          this.formattedPhoneValue = String(res.data).replace(
            /(\d{1,3})(\d{1,3})(\d{1,4})/g,
            "$1-$2-$3"
          );
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
