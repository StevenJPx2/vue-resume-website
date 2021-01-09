<template>
  <div>
    <h3
      @blur="changeQuestion"
      @keypress.enter="changeQuestion"
      v-text="content.question"
      :contenteditable="editable"
    ></h3>
    <text-block
      class="mt-2"
      placeholder-text="This is where the answer goes"
      :editable="!editable"
    ></text-block>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  model: {
    prop: 'content',
    event: 'input',
  },

  data() {
    return {}
  },

  props: {
    debug: Boolean,
    editable: Boolean,
    content: Object as () => { question: string; answer: string },
  },

  methods: {
    changeQuestion(event: Event) {
      // Removes focus from the h3 element
      const el = event.target as HTMLHeadingElement
      el.blur()
      window.getSelection()!.removeAllRanges()
      this.content.question = el.innerText.trim()
      this.$emit('input', this.content)
    },
  },
})
</script>
