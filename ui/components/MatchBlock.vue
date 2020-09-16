<template>
  <div>
    <button @click="matchData.push(['', ''])" class="btn btn-sd button-new">
      <icon class="button-new__icon" name="plus" /> New Match Group
    </button>
    <section class="poll">
      <div
        v-for="(matchGroup, index) in matchData"
        :key="index"
        class="poll__item"
      >
        <input
          :value="matchGroup[0]"
          @change="$set(matchData[index], 0, $event.target.value)"
          placeholder="Match Item 1"
          type="text"
          class="input"
        />
        <input
          :value="matchGroup[1]"
          @change="$set(matchData[index], 1, $event.target.value)"
          placeholder="Match Item 2"
          type="text"
          class="input"
        />
        <button @click="$delete(matchData, index)">
          <icon class="poll__button" name="times" />
        </button>
      </div>
    </section>

    <code v-show="debug" class="mt-3"> {{ matchData }} </code>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    debug: { type: Boolean, default: true },
  },

  data() {
    return {
      matchData: [['', '']],
    }
  },

  methods: {},
})
</script>

<style lang="scss" scoped>
.button-new {
  @apply rounded-md;
  @apply py-3;
  @apply text-base;

  &__icon {
    @apply text-base;
    @apply mr-1;
  }
}

.poll {
  &__item {
    @apply flex;

    input {
      @apply w-full;
      @apply mt-2;

      &:last-of-type {
        @apply ml-2;
      }
    }

    button {
      @apply mr-1;
      @apply ml-4;
      .poll__button {
        @apply relative;
        top: 0.4rem;
        @apply text-3xl;
        color: black;
      }
    }
  }
}
</style>
