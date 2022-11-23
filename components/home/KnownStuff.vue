<script setup lang="ts">
import { PropType } from "vue";
import { KnownStuff } from "~/utils/types";

const props = defineProps({
  data: { type: Array as PropType<KnownStuff[]>, required: true },
});

const index = ref(0);
const setIndex = (n = 0) => {
  const offset = index.value + n;
  const length = props.data.length;
  const val = ((offset % length) + length) % length;
  return val;
};
const flipPage = (i: number) => {
  index.value = setIndex(i);
};
</script>

<template>
  <div
    class="rounded-[2vw] border-white border bg-primary text-base py-[3vw] px-[2vw] shadow-primary shadow-2xl grid grid-rows-[auto,max-content,auto]"
  >
    <h3 class="text-center mb-[3vw] md:mb-[2vw]">
      {{ props.data[index].category }}
    </h3>
    <div class="flex flex-wrap gap-3 md:gap-2 px-[3vw] md:px-[1vw]">
      <nuxt-link
        v-for="tech in props.data[index].technologies"
        :class="{
          'gap-2 font-hack bg-base items-center text-accent rounded-full': true,
          'flex flex-1 justify-center h-[7vw] px-[4vw] text-[4vw]': true,
          'md:flex-initial md:justify-start md:h-[2vw] md:px-[1vw] md:text-[1.1vw]': true,
          'hover:bg-opacity-95': !!tech.link,
        }"
        :key="tech.id"
        :to="tech.link ? `https://${tech.link}` : undefined"
      >
        <icon v-if="tech.icon_name" :name="tech.icon_name" />
        {{ tech.name }}
      </nuxt-link>
    </div>
    <div class="flex gap-2 mt-[1.4vw] justify-evenly h-full">
      <button
        v-for="index in [-1, 1]"
        :key="index"
        class="flex-1 h-full relative isolate bg-primary group"
        @click="flipPage(index)"
      >
        <h4 class="mix-blend-exclusion text-primary">
          {{ props.data[setIndex(index)].category }}
        </h4>
        <div
          class="w-full h-full origin-bottom scale-y-0 rounded group-hover:scale-y-100 transition-transform duration-300 ease-in-out-expo bg-base z-[-1] absolute top-0 left-0"
        ></div>
      </button>
    </div>
  </div>
</template>
