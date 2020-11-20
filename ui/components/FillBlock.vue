<template>
  <div>
    <div
      id="editor"
      :data-placeholder="editorPlaceholderText"
      @input="
        const target = $event.target
        if (target.innerHTML === '<br>') target.innerHTML = ''
      "
      contenteditable
    ></div>
    <button @click="" class="mt-3 btn btn-sd">
      <icon class="mr-1" name="plus" /> Insert Blank
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      editorPlaceholderText:
        "Enter text and click on 'Insert Blank' to insert blanks",
      blankData: {},
    }
  },

  methods: {
    log(e: any) {
      console.log(e)
    },
  },
})
</script>

<style lang="scss" scoped>
#editor {
  @apply text-lg;

  &:empty:before {
    content: attr(data-placeholder);
    @apply italic;
    @apply text-lg;
    color: rgba($color: black, $alpha: 0.5);
  }
}
</style>
