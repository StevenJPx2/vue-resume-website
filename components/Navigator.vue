<script setup lang="ts">
const props = defineProps({
  pageNo: { type: Number, required: true },
  noOfPages: { type: Number, required: true },
});
const emit = defineEmits(["update:pageNo"]);
</script>

<template>
  <div
    class="grid absolute top-0 left-0 z-50 w-screen h-screen pointer-events-none clip"
  >
    <div
      class="
        row-start-1
        col-start-1
        w-screen
        flex
        self-end
        translate-y-[-25vw]
        md:translate-y-0 md:self-center
        px-[5vw]
      "
    >
      <transition name="slide-fade">
        <button
          class="pointer-events-auto"
          v-if="props.pageNo > 0"
          @click="emit('update:pageNo', props.pageNo - 1)"
        >
          <img
            src="~/assets/arrow.webp"
            alt="Left"
            class="rotate-180 w-[24vw] md:w-[10vw]"
          />
        </button>
      </transition>

      <transition name="slide-fade">
        <button
          class="ml-auto pointer-events-auto"
          v-if="props.pageNo < props.noOfPages - 1"
          @click="emit('update:pageNo', props.pageNo + 1)"
        >
          <img
            src="~/assets/arrow.webp"
            alt="Right"
            class="w-[24vw] md:w-[10vw]"
          />
        </button>
      </transition>
    </div>
    <div
      class="
        row-start-1
        col-start-1
        wrapper
        translate-y-[8vw]
        self-end
        isolate
        pointer-events-none
        group
      "
    >
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
        <button
          class="navigation-line group-hover:scale-y-[4] hover:!scale-y-[7]"
          :class="{ active: props.pageNo == i - 1 }"
          v-for="i in props.noOfPages"
          @click="emit('update:pageNo', i - 1)"
          :key="i"
        ></button>
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
  @apply transition-transform;
  @apply origin-center;
  @apply ease-css-out;

  &.active {
    @apply bg-slate-50;
  }
}
</style>
