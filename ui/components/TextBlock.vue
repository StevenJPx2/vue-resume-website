<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, focused }">
      <div
        class="menubar is-hidden"
        :class="{ 'is-focused': focused && editable }"
      >
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
          :class="{ 'is-active': isActive.link() }"
          @click="showLinkPrompt = !showLinkPrompt"
        >
          <icon name="link" />
        </button>

        <template v-if="showLinkPrompt">
          <input
            type="text"
            placeholder="Link"
            v-model="linkUrl"
            ref="linkInput"
            @keypress.enter="setLinkUrl(commands.link, linkUrl)"
          />
          <button class="ml-1" @click="setLinkUrl(commands.link, '')">
            <icon name="times-circle" />
          </button>
        </template>

        <template v-else>
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
        </template>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  BulletList,
  CodeBlock,
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
  Placeholder,
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
        new Placeholder({
          emptyEditorClass: 'is-editor-empty',
          emptyNodeClass: 'is-empty',
          emptyNodeText: this.placeholderText,
          showOnlyCurrent: true,
        }),
      ],
      content:
        this.content == '' && this.editable == false
          ? this.placeholderText
          : this.content,
      editable: this.editable,
    })
  },

  methods: {
    setLinkUrl(command: any, url: string) {
      command({ href: url })
      this.linkUrl = ''
      this.showLinkPrompt = false
    },
  },

  props: {
    placeholderText: {
      default: 'Write something…',
      type: String,
    },
    content: {
      default: '',
      type: String,
    },
    editable: {
      default: true,
      type: Boolean,
    },
  },

  data() {
    return {
      editor: null,
      showLinkPrompt: false,
      linkUrl: '',
    }
  },

  beforeDestroy() {
    let editor = this.editor as any
    editor.destroy()
  },
})
</script>

<style lang="scss">
$color-black: #000000;
$color-white: #ffffff;
$color-grey: #dddddd;

.editor p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  @apply opacity-50;
  @apply float-left;
  @apply pointer-events-none;
  @apply h-0;
  @apply bg-black;
  @apply italic;
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
  @apply w-full;
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

  input {
    @apply pl-2;
    @apply rounded-sm;
    @apply border;
    border-color: var(--sec-dark-color);
  }

  span#{&}__button {
    font-size: 13.3333px;
  }
}

@screen md {
  .editor {
    @apply relative;
  }

  .menubar {
    @apply absolute;
    @apply z-40;
    bottom: 100%;
    @apply py-2;
    @apply px-3;
    @apply mb-2;
    @apply border-none;
    background-color: var(--background-color);
    @apply shadow-lg;
    @apply rounded-sm;

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
