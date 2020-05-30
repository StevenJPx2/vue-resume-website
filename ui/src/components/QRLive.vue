<template>
  <div id="root" :class="hostLive ? 'host-root' : ''">
    <div :class="hostLive ? 'host-root' : ''" v-html="getInput()"></div>
    <div v-if="!hostLive">
      <textarea
        :value="slideResponse != null ? slideResponse : response"
        :disabled="slideResponse != null ? true : isDisabled"
        @input="response = $event.target.value"
        placeholder="Enter your response"
      ></textarea>
      <button @click="changeValue()">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "QRLive",

  props: {
    hostLive: { type: Boolean, default: false },
    input: Object,
    isResponse: { type: Boolean, default: false },
    slideResponse: { type: String, default: null }
  },

  data() {
    return {
      isDisabled: false,
      response: ""
    };
  },

  methods: {
    changeValue() {
      this.isDisabled = true;
      this.$emit("change", this.response);
    },

    getInput() {
      this.input.question = this.input.question.replace("oembed", "iframe");
      this.input.question = this.input.question.replace("url", "src");
      this.input.question = this.input.question.replace("watch?v=", "embed/");
      this.input.question = this.input.question.replace("oembed", "iframe");

      return this.input.question;
    }
  }
};
</script>

<style lang="scss" scoped>
#root {
  text-align: left;
  margin-bottom: 30px;
}

.host-root {
  margin: 0 !important;
}

.disabled {
  margin: 0 auto;
  padding-left: 10px;
  margin-top: 10px;
  width: 80%;
  height: 100px;
  background-color: #eee;
  border: 1px solid grey;
  color: grey;
  border-radius: 5px;
}

.attendee {
  button {
    margin-top: 10px;
  }
}
</style>
