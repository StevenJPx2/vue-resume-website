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
    <div
      class="bg-black fixed inset-0 grid place-content-center z-[999] transition bg-opacity-0 pointer-events-none isolate"
      :class="{ 'bg-opacity-40 pointer-events-auto': props.isRevealed }"
    >
      <transition name="slide-fade" mode="out-in">
        <div
          v-if="props.isRevealed"
          v-on-click-outside="onClickOutside"
          class="rounded-[2vw] border-opacity-25 border-accent border bg-base prose max-w-screen-md px-[8vw] py-[12vw] md:px-[5vw] md:py-[7vw] max-h-[80vh] overflow-x-hidden overflow-y-scroll overscroll-contain animate z-10"
          :class="[commonMargin]"
        >
          <slot />
        </div>
      </transition>
    </div>
  </teleport>
</template>
