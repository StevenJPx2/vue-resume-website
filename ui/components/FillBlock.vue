<template>
  <div class="editor--fill-block">
    <editor-content :editor="editor" />
    <editor-menu-bar :editor="editor" v-slot="{ commands }" v-show="editable">
      <button @click="commands.blank" class="mt-3 btn btn-sd">
        <icon class="mr-1" name="plus" /> Insert Blank
      </button>
    </editor-menu-bar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { Placeholder } from 'tiptap-extensions'
import Blank from './Blank.js'

export default Vue.extend({
  model: {
    prop: 'content',
    event: 'input',
  },

  components: {
    EditorContent,
    EditorMenuBar,
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        new Placeholder({
          emptyEditorClass: 'is-editor-empty',
          emptyNodeClass: 'is-empty',
          emptyNodeText: this.placeholderText,
          showOnlyCurrent: true,
        }),
        new Blank(),
      ],

      editable: this.editable,

      onUpdate: ({ getJSON }: { getJSON: Function }) => {
        this.$emit('input', getJSON())
      },
    })

    if (this.editable == true) {
      ;(this.editor as any).setContent(this.content)
    } else {
      ;(this.editor as any).setContent({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: this.placeholderText }],
          },
        ],
      })
    }
  },

  props: {
    debug: Boolean,
    placeholderText: {
      default: "Enter text and click on 'Insert Blank' to insert blanks",
      type: String,
    },
    content: Object,
    editable: Boolean,
  },

  data() {
    return {
      editor: null,
    }
  },

  methods: {
    log(e: any) {
      console.log(e)
    },
  },

  beforeDestroy() {
    let editor = this.editor as any
    editor.destroy()
  },
})
</script>

<style lang="scss">
.editor--fill-block {
  p,
  .blank {
    @apply inline-block;
    @apply mr-2;
    @apply my-1;
    @apply text-lg;
  }

  .blank {
    @apply mb-2;
    &--input {
    }
  }

  p.is-editor-empty:only-child::before {
    content: attr(data-empty-text);
    @apply opacity-50;
    @apply float-left;
    @apply pointer-events-none;
    @apply h-0;
    @apply bg-black;
    @apply italic;
  }
}
</style>
