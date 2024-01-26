<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  text: { type: String, required: true },
  direction: { type: String as PropType<"left" | "right">, default: "left" },
});
const slugifiedText = props.text
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, "")
  .replace(/[\s_-]+/g, "-")
  .replace(/^-+|-+$/g, "");
</script>

<template>
  <h2 class="sr-only" :id="slugifiedText">{{ text }}</h2>
  <infinite-marquee
    class="border-t border-b border-accent py-[1vw] mb-[21vw] md:mb-[15vw]"
    gap="12vw"
    :direction="props.direction"
    v-bind="$attrs"
  >
    <div class="flex gap-[12vw]">
      <p
        :key="`${slugifiedText}-${i}`"
        class="h2 md:text-[3.1vw] mr-[12vw]"
        v-for="i in 10"
      >
        {{ text.toUpperCase() }}
      </p>
    </div>
  </infinite-marquee>
</template>
