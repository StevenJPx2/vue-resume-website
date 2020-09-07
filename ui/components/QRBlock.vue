<template>
  <div>
    <h3 @blur="changeQuestion" v-text="initHeading" contenteditable></h3>
    <text-block
      class="mt-2"
      placeholder-text="This is where the answer goes"
      :editable="false"
    ></text-block>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      initHeading: 'Enter question...',
    }
  },

  methods: {
    changeQuestion(event: any) {
      this.initHeading = event.target.innerText
    },
  },
})
</script>

<style lang="scss" scoped></style>
