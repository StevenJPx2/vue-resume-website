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
  <InfiniteMarquee
    class="border-t border-b border-accent py-[1vw] mb-[21vw] md:mb-[15vw]"
    gap="12vw"
  >
    <div class="flex gap-x-[12vw]">
      <h2 :id="slugifiedText" class="md:text-[3.1vw]" v-for="_ in 10">
        {{ text.toUpperCase() }}
      </h2>
    </div>
  </InfiniteMarquee>
</template>
