<script setup lang="ts">
import { PropType } from "vue";
import { vOnClickOutside } from "@vueuse/components";

const props = defineProps({
  isRevealed: { type: Boolean, required: true },
  onClickOutside: { type: Function as PropType<() => void> },
});
</script>

<template>
  <teleport to="body">
    <transition name="slide-fade" mode="out-in">
      <div
        v-if="props.isRevealed"
        data-lenis-prevent
        class="fixed inset-0 grid place-content-center z-[999] isolate transition duration-300"
      >
        <div
          id="modal-bg"
          class="bg-black/40 absolute inset-0 z-0 transition duration-200 backdrop-blur-xl fade"
        />
        <div
          v-on-click-outside="onClickOutside"
          class="relative rounded-2xl border-opacity-25 border-accent border bg-base-color prose max-w-screen-xl px-[8vw] pt-[12vw] md:px-[5vw] md:pt-[7vw] max-h-[80vh] animate z-10"
          :class="[commonMargin]"
        >
          <button class="absolute top-0 right-0 m-4" @click="onClickOutside()">
            <icon name="heroicons:x-mark" class="size-7 md:size-[2vw]" />
          </button>
          <div
            class="overflow-x-hidden overflow-y-scroll overscroll-contain h-full pb-4"
          >
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
