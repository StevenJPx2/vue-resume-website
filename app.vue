<script lang="ts" setup>
import imagesLoaded from "imagesloaded";
const mainStore = useMainStore();
tryOnMounted(() => {
  imagesLoaded(document.querySelectorAll("img"), { background: true }, () => {
    mainStore.value.loading = false;
  });
});
</script>

<template>
  <nuxt-layout><nuxt-page /></nuxt-layout>
</template>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;
@import url("https://cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css");

:root {
  --color-base: #0e0e0e;
  --color-primary: #ffe871;
  --color-accent: #fff;
}

@layer base {
  html {
    font-family: "Neue Montreal";
    @apply bg-base;
    @apply text-accent;
  }

  body {
    @apply overflow-x-hidden;
  }

  h1,
  .h1 {
    font-family: "Highrise Condensed";
    @apply text-primary;
    @apply text-[42vw];

    @screen md {
      @apply text-[22vmax];
    }
  }

  h2,
  .h2 {
    font-family: "Highrise Condensed";
    @apply text-[10vw];

    @screen md {
      @apply text-[4.5vw];
    }
  }

  h3,
  .h3 {
    font-family: "Highrise Condensed";
    @apply text-[7vw];

    @screen md {
      @apply text-[5.6vw];
    }
  }

  p,
  .p {
    @apply text-[5vw];

    @screen md {
      @apply text-[1.6vw];
    }
  }

  img {
    /*@apply pointer-events-none;*/
  }
}
@layer utilities {
  .clip {
    @apply overflow-hidden;
  }

  .mobile-scroll {
    @apply overflow-x-hidden;
    @apply overflow-y-scroll;
    @apply touch-pan-y;
    @apply max-h-[50vh];
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

.slide {
  &-back,
  &-forward,
  &-bottom,
  &-top {
    &-enter-active {
      .animate {
        @apply transition;
        @apply ease-out-expo;
        @apply duration-1000;
        @apply pointer-events-none;
      }

      .lang-logo {
        @apply transition;
        @apply ease-out-back;
        @apply duration-500;
      }
    }

    &-leave-active {
      .animate {
        @apply transition;
        @apply ease-in-out-sine;
        @apply duration-300;
      }
    }

    &-enter-from {
      .lang-logo {
        @apply origin-bottom;
        @apply scale-0;
      }
    }

    &-leave-to {
      .lang-logo {
        @apply origin-bottom;
        @apply scale-100;
      }
    }
  }

  &-bottom-enter-from,
  &-top-leave-to {
    .animate {
      @apply translate-y-[100vw];
      @apply opacity-0;
    }
  }

  &-bottom-leave-to,
  &-top-enter-from {
    .animate {
      @apply translate-y-[-100vw];
      @apply opacity-0;
    }
  }

  &-back-enter-from,
  &-forward-leave-to {
    .animate {
      @apply translate-x-[100vw];
      @apply opacity-0;
    }
  }

  &-back-leave-to,
  &-forward-enter-from {
    .animate {
      @apply translate-x-[-100vw];
      @apply opacity-0;
    }
  }

  &-fade {
    &-enter {
      &-active {
        @apply transition;
        @apply ease-out-sine;
        @apply duration-500;
        @apply pointer-events-none;
      }

      &-from {
        @apply translate-y-[5vw];
        @apply opacity-0;
      }
    }

    &-leave {
      &-active {
        @apply transition;
        @apply ease-in-out-sine;
        @apply duration-300;
        @apply pointer-events-none;
      }

      &-to {
        @apply translate-y-[-5vw];
        @apply opacity-0;
      }
    }
  }
}
</style>
