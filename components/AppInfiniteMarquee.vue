<script setup lang="ts">
const props = defineProps({
  text: { type: String, required: true },
});
const slugifiedText = props.text
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, "")
  .replace(/[\s_-]+/g, "-")
  .replace(/^-+|-+$/g, "");
</script>

<template>
  <infinite-marquee
    class="border-t border-b border-accent py-[1vw] mb-[21vw] md:mb-[15vw]"
    gap="12vw"
  >
    <h2
      :key="`${slugifiedText}-${i}`"
      class="md:text-[3.1vw] mr-[12vw]"
      v-for="i in 10"
    >
      {{ text.toUpperCase() }}
    </h2>
  </infinite-marquee>
</template>
