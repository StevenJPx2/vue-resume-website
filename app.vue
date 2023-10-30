<script lang="ts" setup>
import imagesLoaded from "imagesloaded";

const store = useMainStore();

const isLoading = $isLoading(store);

tryOnMounted(() => {
  imagesLoaded(document.querySelectorAll("img"), { background: true }, () => {
    isLoading.value = false;
  });
});

//* include .splide__pagination
</script>

<template>
  <nuxt-layout>
    <seo-kit />
    <nuxt-page />
  </nuxt-layout>
</template>

<style lang="scss">
@use "sass:color";
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url("https://cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css");

$color-base: #0e0e0e;

:root {
  --color-base: #0e0e0e;
  --color-primary: #ffe871;
  --color-accent: #fff;
}

@layer base {
  html {
    font-family: "Neue Montreal";
    @apply bg-base-color;
    @apply text-accent;
  }

  h1,
  .h1 {
    font-family: "Highrise Condensed";
    @apply text-primary;
    @apply text-[42vw];

    @screen md {
      @apply text-[22vw];
    }
  }

  h2,
  .h2 {
    font-family: "Neue Montreal";
    @apply text-[10vw];

    @screen md {
      @apply leading-none;
      @apply text-[4.5vw];
    }
  }

  h3,
  .h3 {
    font-family: "Highrise Condensed";
    @apply text-[15vw];
    @apply leading-none;

    @screen md {
      @apply text-[5.6vw];
    }
  }

  h4,
  .h4 {
    font-family: "Highrise Condensed";
    @apply text-[11vw];
    @apply leading-tight;

    @screen md {
      @apply text-[4.1vw];
    }
  }

  p,
  .p {
    @apply text-[5vw];

    @screen md {
      @apply text-[1.6vw];
    }
  }

  a.link,
  .prose a {
    @apply relative;

    &::before {
      content: "";
      @apply absolute;
      @apply inset-x-0;
      @apply bottom-0;
      @apply block;
      @apply origin-bottom-left;
      @apply h-px;
      background: var(--color-accent);
      @apply scale-x-100;
      @apply mt-1;
      @apply transition-transform;
      @apply ease-in-out;
      @apply duration-200;
    }

    &:hover {
      &::before {
        @apply scale-x-0;
        @apply origin-bottom-right;
      }
    }
  }

  .btn {
    @apply rounded-full bg-white/[0.01] uppercase backdrop-blur-sm w-fit h-fit border border-accent text-center justify-center flex text-[4vw] py-[2vw] px-[8vw];

    @screen md {
      @apply py-[0.6vw] px-[2.2vw] text-[1.2vw];
    }

    &-hoverable {
      @apply cursor-pointer;
      @apply transition-colors;

      &:hover {
        @apply bg-accent;
        @apply text-base-color;
      }
    }
  }

  img {
    /*@apply pointer-events-none;*/
  }

  .prose {
    p,
    li {
      @apply mb-[1vw];
    }

    p {
      @apply font-normal;
    }

    ul {
      @apply list-disc;
      @apply list-inside;
    }

    li {
      @apply text-[5vw];

      @screen md {
        @apply text-[1.6vw];
      }

      &::marker {
        @apply text-accent;
      }

      ul,
      ol {
        @apply mt-[1vw];
        @apply ml-[1vw];
      }
    }

    strong {
      @apply font-medium;
    }
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

.splide__pagination {
  top: 105% !important;
}

.btn {
}

.card {
  @apply relative;
  @apply grid;

  background: linear-gradient(
    180deg,
    var(--color-base) 0%,
    color.scale($color-base, $lightness: 5%) 50%,
    var(--color-base) 100%
  );
  @apply h-full;
  $border: 1px;
  @apply bg-clip-padding;
  border: solid $border transparent;
  @apply rounded-2xl;
  @apply pt-[20%];
  @apply px-[8vw];
  grid-template-rows: 2fr 4fr 1fr;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -$border;
    border-radius: inherit;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0.2) 100%
    );
  }

  @screen md {
    @apply px-[2vw];
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
    }

    &-leave-active {
      .animate {
        @apply transition;
        @apply ease-in-out-sine;
        @apply duration-300;
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
    &-enter,
    &-leave {
      &-active {
        .animate,
        .fade {
          @apply transition;
          @apply pointer-events-none;
        }

        .fade {
          @apply ease-linear;
          @apply duration-200;
        }
      }
    }

    &-enter {
      &-active {
        .animate {
          @apply ease-out-quart;
          @apply duration-300;
        }
      }

      &-from {
        .animate {
          @apply translate-y-[5vw];
          @apply opacity-0;
        }

        .fade {
          @apply opacity-0;
        }
      }
    }

    &-leave {
      &-active {
        .animate {
          @apply ease-in-out-sine;
          @apply duration-200;
        }
      }

      &-to {
        .animate {
          @apply translate-y-[-5vw];
          @apply opacity-0;
        }

        .fade {
          @apply opacity-0;
        }
      }
    }
  }
}
</style>
