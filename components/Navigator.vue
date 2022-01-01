<script setup lang="ts"></script>

<template>
  <div class="absolute inset-0 z-50 pointer-events-none">
    <div
      class="fixed row-start-1 w-full flex bottom-[25vw] md:inset-y-0 px-[5vw]"
    >
      <button class="pointer-events-auto">
        <img
          src="~/assets/arrow.webp"
          alt="Right"
          class="rotate-180 w-[24vw] md:w-[10vw]"
        />
      </button>
      <button class="ml-auto pointer-events-auto">
        <img
          src="~/assets/arrow.webp"
          alt="Right"
          class="w-[24vw] md:w-[10vw]"
        />
      </button>
    </div>
    <div class="wrapper fixed bottom-[-8vw] isolate pointer-events-none">
      <div
        class="
          hidden
          md:block
          h-[21vw]
          bg-zinc-900
          blur-3xl
          row-start-1
          md:col-start-11 md:col-end-21
          -z-10
          rounded-[50%]
        "
      ></div>

      <div
        class="
          flex flex-nowrap
          row-start-1
          col-start-3 col-end-14
          space-x-[4.3vw]
          md:col-start-13 md:col-end-19 md:space-x-[1.2vw] md:mt-[9vw]
          mt-[-19vw]
          z-10
          pointer-events-auto
        "
      >
        <button class="navigation-line active"></button>
        <button class="navigation-line"></button>
        <button class="navigation-line"></button>
        <button class="navigation-line"></button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation-line {
  @apply bg-slate-50/70;
  @apply w-full;
  @apply h-[0.35vw];
  @apply md:h-[0.1vw];

  &.active {
    @apply bg-slate-50;
  }
}
</style>
