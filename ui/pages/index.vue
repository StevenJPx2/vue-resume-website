<template>
  <div>
    <div class="container">
      <h1 class="mt-16 display-1">Digital Resume</h1>
      <h1 class="mt-10">TL;DR</h1>
      <p class="mt-5">Full Stack Developer</p>
      <p class="mt-3">
        Front-end: Vue.js, Nuxt.js, Tailwind CSS <br />
        Back-end: Flask, Actix, Docker, Kubernetes
      </p>
      <p class="mt-3">
        I made this website using Nuxt.js and Actix-web.
      </p>
      <p class="mt-3">
        I’ve done deep-learning projects with Tensorflow and Keras, with GANs
        and more, but I’m still a novice.
      </p>

      <h1 class="mt-10">Programming Languages I’m good at</h1>
      <p class="mt-5">Python, HTML, CSS, JS, Rust, and more.</p>

      <h1 class="mt-10">Other things</h1>
      <p class="mt-5">I’m a singer, play guitar, and make music.</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {},
})
</script>

<style lang="scss">
p {
  @apply mt-1;
  @apply text-3xl;
  @apply font-medium;
  @apply leading-9;
}
</style>
