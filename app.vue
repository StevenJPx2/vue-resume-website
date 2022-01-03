<script lang="ts" setup>
import Main from "~/components/Main.vue";
import Languages from "~/components/Languages.vue";
import Projects from "~/components/Projects.vue";
import Contact from "~/components/Contact.vue";
const pageNo = ref(0);
const pages = [Main, Languages, Projects, Contact];
</script>

<template>
  <div
    class="grid place-items-center w-screen h-screen bg-zinc-900 text-slate-50 clip"
  >
    <Navigator v-model:page-no="pageNo" :no-of-pages="pages.length" />
    <component :is="pages[pageNo]" />
  </div>
</template>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;
@import url("https://cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css");

@layer base {
  html {
    @apply font-['Hack','monospace'];
  }

  h1,
  .h1 {
    @apply font-bold;
    @apply text-[12vw];

    @screen md {
      @apply text-[5vw];
    }
  }

  h2,
  .h2 {
    @apply font-bold;
    @apply text-[10vw];

    @screen md {
      @apply text-[4.5vw];
    }
  }

  h3,
  .h3 {
    @apply font-bold;
    @apply text-[7vw];

    @screen md {
      @apply text-[2.8vw];
    }
  }

  p,
  .p {
    @apply text-[5vw];

    @screen md {
      @apply text-[1.3vw];
    }
  }
}
@layer utilities {
  .clip {
    @apply overflow-hidden;
  }

  .wrapper {
    @apply w-screen;
    @apply grid;
    @apply grid-rows-[auto];
    @apply gap-y-[3.9vw];
    @apply grid-cols-16;
    @screen md {
      @apply gap-y-0;
      @apply grid-cols-24;
    }
  }
}

.slide-fade {
  &-enter {
    &-active {
      @apply transition;
      @apply ease-in-out-quad;
      @apply duration-500;
    }

    &-from {
      @apply translate-y-[5vw];
      @apply opacity-0;
    }
  }

  &-leave {
    &-active {
      @apply transition;
      @apply ease-out-quad;
      @apply duration-300;
    }

    &-to {
      @apply translate-y-[-5vw];
      @apply opacity-0;
    }
  }
}
</style>
