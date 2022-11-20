<script setup lang="ts"></script>

<template>
  <div class="w-full h-screen">
    <h1
      v-slide-in.zoom="{ select: 'chars' }"
      v-parallax
      class="place-self-center"
    >
      Steven John
    </h1>
    <infinite-marquee text="Who I am" direction="left" :target="105.5" />
  </div>
</template>
