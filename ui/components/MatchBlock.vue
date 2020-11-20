<template>
  <div>
    <button @click="matchData.push(['', ''])" class="btn btn-sd button-new">
      <icon class="mr-1" name="plus" /> New Match Group
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
.poll {
  max-width: 50rem;

  &__item {
    @apply mt-2;
    @apply grid;
    @apply gap-2;

    input {
      @apply w-full;
      @apply col-start-1;
      @apply col-end-8;
    }

    button {
      @apply ml-1;
      @apply align-middle;
      @apply col-start-8;
      @apply row-start-1;
      @apply row-end-3;

      .poll__button {
        @apply text-3xl;
        color: black;
      }
    }
  }
}

@screen md {
  .poll__item {
    grid-template-columns: repeat(2, auto) max-content;

    input {
      @apply col-auto;
    }

    button {
      @apply col-auto;
      @apply row-auto;
    }
  }
}
</style>
