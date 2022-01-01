<template>
  <div
    class="grid place-items-center w-screen h-screen bg-zinc-900 text-slate-50 clip"
  >
    <Navigator />
    <Contact />
  </div>
</template>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;
@import url("https://cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css");

@layer base {
  h1,
  .h1 {
    @apply font-['Hack','monospace'];
    @apply font-bold;
    @apply text-[12vw];

    @screen md {
      @apply text-[5vw];
    }
  }

  h2,
  .h2 {
    @apply font-['Hack','monospace'];
    @apply font-bold;
    @apply text-[10vw];

    @screen md {
      @apply text-[4.5vw];
    }
  }

  h3,
  .h3 {
    @apply font-['Hack','monospace'];
    @apply font-bold;
    @apply text-[7vw];

    @screen md {
      @apply text-[2.8vw];
    }
  }

  p,
  .p {
    @apply font-['Hack','monospace'];
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
</style>
