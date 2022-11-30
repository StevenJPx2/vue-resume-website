<script setup lang="ts">
import { PropType } from "vue";
import { Links } from "~/utils/types";

const props = defineProps({
  tagline: { type: String, required: true },
  links: { type: Array as PropType<Links[]>, required: true },
});
</script>
<template>
  <div class="h-screen relative">
    <directus-img
      id="yellowEllipse"
      :sizes="[1536]"
      :img-attrs="{
        class:
          'pointer-events-none yellow-blob absolute scale-[1.5] top-[-13%] md:scale-100 md:left-[-28%] md:top-[-27%] z-[-1]',
      }"
    />
    <directus-img
      id="yellowEllipse"
      :sizes="[1536]"
      :img-attrs="{
        class:
          'pointer-events-none yellow-blob absolute scale-[1.5] bottom-[-13%] md:scale-100 md:right-[-28%] md:bottom-[-27%] z-[-1]',
      }"
    />
    <div
      class="mt-[15vw] h-full grid grid-rows-[max-content,max-content] place-content-center gap-y-[5vw] md:gap-y-[3vw]"
      :class="[commonPadding]"
    >
      <h2
        class="h1 text-[25vw] md:text-[20vw] text-center leading-[0.8] place-self-center"
      >
        {{ props.tagline }}
      </h2>
      <div
        class="flex flex-wrap justify-self-center gap-[7vw] md:gap-[4vw] px-[12vw] md:px-0"
      >
        <nuxt-link
          v-for="{ icon, id, link } in props.links"
          :key="id"
          :to="link"
          class="opacity-90 hover:opacity-100 text-[9vw] md:text-[4vw] transition-transform duration-300 ease-out-quart hover:scale-125"
        >
          <icon :name="icon" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
