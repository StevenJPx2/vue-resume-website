<template>
  <div id="root" :class="hostLive ? 'host-root' : ''">
    <div class="preview">
      <p class="question">{{ input.question }}</p>
      <div
        v-for="(pollResponse, index) in input.responses"
        :key="index"
        class="attendee-response"
      >
        <input
          v-if="slideResponse.length > 0"
          type="radio"
          disabled
          :checked="slideResponse[index] == true"
          @click="updateValue(index)"
        />
        <input
          v-else
          type="radio"
          :disabled="isChecked || hostLive"
          :checked="response[index] == true"
          @click="updateValue(index)"
        />
        <p>{{ pollResponse }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PollBox",

  props: {
    input: Object,
    hostLive: { type: Boolean, default: false },
    slideResponse: { type: Array, default: () => [] }
  },

  data() {
    return {
      response: [],
      isChecked: false
    };
  },

  created() {
    if (!this.hostLive) {
      this.response = Array(this.input.responses.length).fill(null);
      this.$emit("change", this.response);
    }
  },

  methods: {
    updateValue(index) {
      this.response[index] = true;
      this.isChecked = true;
      this.$emit("change", this.response);
    }
  }
};
</script>

<style lang="scss" scoped>
#root {
  text-align: left;
}

.host-root {
  margin: 0 !important;
}

.edit {
  .response {
    a {
      position: relative;
      top: 2px;
      padding: 10px;
      color: darken(grey, 20%);
      margin-right: 8px;
      font-size: 22px;
      transition: 0.2s all ease;

      &:hover {
        color: darken(grey, 30%);
      }

      &:active {
        color: darken(grey, 40%);
      }
    }
  }

  a {
    cursor: pointer;

    &.button {
      text-align: center;
      display: block;
      width: max-content;
      background-color: white;
      margin: 10px;
      font-size: initial;

      &:hover {
        background-color: #eee;
      }
    }
  }

  #poll-question {
    margin-left: 10px;
  }

  input {
    width: 80%;
    max-width: 300px;
  }
}

.attendee-response {
  display: flex;
}
</style>
