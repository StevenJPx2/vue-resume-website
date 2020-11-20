<template>
  <div>
    <button @click="pollData.push('')" class="btn btn-sd button-new">
      <icon class="mr-1" name="plus" /> New Poll Item
    </button>
    <section class="poll">
      <div
        v-for="(pollItem, index) in pollData"
        :key="index"
        class="poll__item"
      >
        <input
          :value="pollItem"
          @change="$set(pollData, index, $event.target.value)"
          placeholder="Poll Item"
          type="text"
          class="input"
        />
        <button @click="$delete(pollData, index)">
          <icon class="poll__button" name="times" />
        </button>
      </div>
    </section>

    <code v-show="debug" class="mt-3"> {{ pollData }} </code>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    debug: {
      type: String,
      default: true,
    },
  },

  data() {
    return {
      pollData: [''],
    }
  },

  methods: {},
})
</script>

<style lang="scss" scoped>
.poll {
  @apply relative;

  &__item {
    @apply relative;
    max-width: 24rem;

    input {
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
</style>
