<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, focused }">
      <div class="menubar is-hidden" :class="{ 'is-focused': focused }">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <icon name="bold" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <icon name="italic" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <icon name="strikethrough" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <icon name="underline" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <icon name="code" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          <icon name="heading" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <icon name="list-ul" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <icon name="list-ol" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <icon name="quote-right" />
        </button>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  ListItem,
  OrderedList,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

export default Vue.extend({
  components: {
    EditorContent,
    EditorMenuBar,
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
      ],
      content: '<p>Replace this text...</p>',
    })
  },

  data() {
    return {
      editor: null,
    }
  },

  beforeDestroy() {
    this.editor.destroy()
  },
})
</script>

<style lang="scss" scoped>
$color-black: #000000;
$color-white: #ffffff;
$color-grey: #dddddd;

.editor {
  @apply mt-4;
}

.menubar {
  @apply fixed;
  @apply flex;
  @apply bottom-0;
  @apply left-0;
  @apply pl-4;
  @apply py-3;
  @apply border-t;
  border-color: #b99671;
  height: 3.5rem;
  width: 100%;
  @apply overflow-x-scroll;
  @apply overflow-y-hidden;

  &.is-hidden {
    visibility: hidden;
    opacity: 0;
  }

  &.is-focused {
    visibility: visible;
    opacity: 1;
  }

  &__button {
    @apply inline-flex;
    @apply bg-transparent;
    @apply border-none;
    @apply text-black;
    @apply py-1;
    @apply px-2;
    @apply rounded;
    @apply cursor-pointer;

    @apply text-2xl;
    @apply mr-4;

    &:hover {
      background-color: rgba($color-black, 0.05);
    }

    &.is-active {
      background-color: rgba($color-black, 0.1);
    }
  }

  span#{&}__button {
    font-size: 13.3333px;
  }
}

@screen md {
  .menubar {
    @apply static;
    @apply pl-0;
    @apply py-0;
    @apply mb-2;
    @apply border-none;

    @apply h-auto;
    transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

    &.is-focused {
      transition: visibility 0.2s, opacity 0.2s;
    }

    &__button {
      @apply text-base;
      @apply mr-1;
    }
  }
}
</style>
