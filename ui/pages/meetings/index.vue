<template>
  <div class="container">
    <h1 class="display-1">
      Meetings
      <span
        class="px-3 py-2 text-sm font-bold tracking-wide text-white uppercase align-top bg-black rounded-md"
        >Alpha</span
      >
    </h1>
    <p class="mt-10">
      Interact with attendees directly by creating interactible slides. Using
      question and response blocks, polls and more, you'll be able to give each
      of your attendees induvidual attention that wasn't previously possible.
    </p>
    <p class="mt-3 mb-16">
      We use cookies to give you the best possible experience while also being
      able to stay anonymous.
    </p>

    <div class="info-bar grid-rows-2 md:grid-rows-1">
      <h2 class="col-start-1 col-end-3 md:col-end-1">
        Previously viewed meetings
      </h2>
      <nuxt-link
        to="/meetings/1234/edit"
        class="btn row-start-2 md:row-start-1 md:col-start-2"
      >
        Create meeting
      </nuxt-link>
      <input
        class="row-start-2 md:row-start-1 md:col-start-3"
        type="text"
        placeholder="Join a meeting"
      />
    </div>
    <div class="h-px mb-8 bg-black" />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="i in 10" :key="i" class="card ease-all-transition-300">
        <h3>Meeting name</h3>
        <p>Scheduled for 10:00PM</p>
        <p class="-mt-1">5 slides</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  created() {
    this.$store.commit('setTitle', 'Steven John - Meetings')
    this.$store.commit('setActive', 1)
  },
  data() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
p {
  @apply text-lg;
}

.info-bar {
  @apply grid;
  @apply mb-4;
  @apply gap-3;
}

.card {
  background-color: var(--sec-light-color);
  @apply shadow-md;
  @apply p-8;
  @apply w-auto;

  &:hover {
    @apply shadow-lg;
    @apply translate-x-2;
    @apply translate-y-2;
  }

  h3 {
    @apply font-bold;
    @apply text-3xl;
    @apply leading-7;
    @apply mb-2;
  }
}
</style>
