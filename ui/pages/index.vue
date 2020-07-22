<template>
  <div class="container">
    <div class="flex flex-col mt-16 sm:flex-row">
      <h1 class="mr-auto display-1">Digital Resume</h1>
      <div class="flex flex-row pt-6 sm:pt-0 icons">
        <a><i class="fab fa-medium"></i></a>
        <a><i class="fab fa-jsfiddle"></i></a>
        <a><i class="fab fa-github"></i></a>
      </div>
    </div>
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
      I’ve done deep-learning projects with Tensorflow and Keras, with GANs and
      more, but I’m still a novice.
    </p>

    <h1 class="mt-10">Programming Languages I’m good at</h1>
    <p class="mt-5">Python, HTML, CSS, JS, Rust, and more.</p>

    <h1 class="mt-10">Other things</h1>
    <p class="mt-5">I’m a singer, play guitar, and make music.</p>
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

.icons a {
  @apply mr-12;
  @apply text-4xl;
  @apply transition-all;
  @apply duration-200;
  @apply ease-in-out;

  &:hover {
    @apply opacity-75;
  }

  &:last-child {
    @apply mr-6;
  }
}
</style>
