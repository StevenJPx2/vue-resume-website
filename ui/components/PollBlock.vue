<template>
  <div>
    <section class="flex flex-wrap" v-show="editable">
      <button @click="addMatchItem" class="btn btn-sd button-new">
        <icon class="mr-1" name="plus" /> New Poll Item
      </button>

      <div class="flex items-center ml-3">
        <input
          type="checkbox"
          name="correct"
          id="correct"
          class="mr-1"
          v-model="isCorrectEnabled"
        />
        <label for="correct" class="text-lg"
          >Is there a correct answer for this poll?</label
        >
      </div>
    </section>

    <section class="poll" v-if="editable">
      <div
        v-for="(pollItem, index) in content.data"
        :key="index"
        class="flex items-center"
      >
        <input
          type="checkbox"
          :name="`option-${index}`"
          class="w-10 h-10 mt-2 mr-2"
          v-show="isCorrectEnabled"
          @input="setCorrectAnswer($event, index)"
          :checked="content.correctIndex == index"
        />
        <div class="poll__item">
          <input
            :value="pollItem.value"
            @input="$set(content.data[index], 'value', $event.target.value)"
            @keypress.enter="addMatchItem"
            placeholder="Poll Item"
            type="text"
            class="input"
            :class="{ 'is-success': content.correctIndex == index }"
            v-focus
          />
          <button @click="$delete(content.data, index)">
            <icon class="poll__button" name="times" />
          </button>
        </div>
        <p
          v-show="content.correctIndex == index"
          class="px-3 py-2 mt-2 ml-2 font-mono text-sm text-white bg-green-600 rounded-lg"
        >
          Correct Answer
        </p>
      </div>
    </section>

    <section class="poll-attendent" v-else>
      <div
        v-for="(pollItem, index) in content.data"
        :key="index"
        class="poll-attendent--item"
        :class="{
          'is-success':
            isCorrectEnabled === true &&
            selected == index &&
            content.correctIndex == index,

          'is-failure':
            isCorrectEnabled === true &&
            selected == index &&
            content.correctIndex != index,

          'is-selected': isCorrectEnabled === false && selected == index,
        }"
        @click="selectOnDiv(index)"
      >
        <input
          type="checkbox"
          :name="`option-${index}`"
          class="w-10 h-10 mr-2"
          @input="setSelected(index)"
          :checked="selected == index"
          :disabled="selected !== -1"
        />
        <label :for="`option-${index}`">{{ pollItem.value }}</label>
      </div>
    </section>

    <code class="mt-3"> {{ selected }} </code>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  model: {
    prop: 'content',
    event: 'input',
  },

  props: {
    debug: Boolean,
    editable: Boolean,
    content: Object as () => {
      correctIndex: number
      selected: number
      data: {
        value: string
      }[]
    },
  },

  data() {
    return {
      isCorrectEnabled: false,
      selected: -1,
    }
  },

  watch: {
    content(newValue) {
      this.$emit('input', newValue)
    },

    isCorrectEnabled(newValue) {
      newValue
        ? this.$set(this.content, 'correctIndex', -1)
        : this.$set(this.content, 'correctIndex', -2)
    },
  },

  methods: {
    addMatchItem(_e: Event) {
      this.content.data.push({ value: '' })
    },

    setCorrectAnswer(e: Event, index: number) {
      ;(e.target as HTMLInputElement).checked
        ? this.$set(this.content, 'correctIndex', index)
        : this.$set(this.content, 'correctIndex', -1)
    },

    selectOnDiv(index: number) {
      if (this.selected === -1) {
        this.setSelected(index, true)
      }
    },

    setSelected(index: number, clickedOnDiv: boolean) {
      if (clickedOnDiv === true)
        this.selected == index ? (this.selected = -1) : (this.selected = index)
      else
        this.selected != index ? (this.selected = -1) : (this.selected = index)
      this.content.selected = index
      this.$emit('input', this.content)
    },
  },
})
</script>

<style lang="scss" scoped>
#correct {
  @apply w-8;
  @apply h-8;
}

.poll {
  @apply relative;

  &__item {
    @apply relative;
    width: Min(100%, 24rem);

    input[type='text'] {
      @apply w-full;
      @apply mt-2;
    }

    .poll__button {
      @apply absolute;
      top: 1.25rem;
      right: 1rem;
      @apply ml-2;
      @apply text-3xl;
      color: rgba($color: #000000, $alpha: 0.5);
    }
  }
}

.poll-attendent {
  &--item {
    @apply flex;
    @apply items-center;
    @apply rounded-md;
    @apply w-full;
    @apply cursor-pointer;

    &.is-success {
      @apply bg-green-300;
      @apply bg-opacity-75;
    }

    &.is-failure {
      @apply bg-red-300;
      @apply bg-opacity-75;
    }

    &.is-selected {
      @apply bg-blue-300;
      @apply bg-opacity-75;
    }
  }
}
</style>
