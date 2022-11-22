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
    <h3 class="text-center mb-[2vw] leading-none">
      {{ props.data[index].category }}
    </h3>
    <div class="flex flex-wrap gap-3">
      <nuxt-link
        v-for="tech in props.data[index].technologies"
        class="flex gap-2 font-mono bg-base items-center text-accent rounded-full h-[2vw] px-[1vw] text-[1.1vw]"
        :class="{ 'hover:bg-opacity-95': !!tech.link }"
        :key="tech.id"
        :to="tech.link ? `https://${tech.link}` : undefined"
      >
        <lazy-icon v-if="tech.icon_name" :name="tech.icon_name" size="1.1vw" />
        {{ tech.name }}
      </nuxt-link>
    </div>
    <div class="flex mt-[1.4vw] justify-evenly h-full">
      <button
        v-for="index in [-1, 1]"
        :key="index"
        class="font-high-con text-[5.1vw] h-full leading-tight mix-blend-exclusion text-primary"
        @click="flipPage(index)"
      >
        {{ props.data[setIndex(index)].category }}
      </button>
    </div>
  </div>
</template>
