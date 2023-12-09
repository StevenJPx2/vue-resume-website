<script setup lang="ts">
import { promiseTimeout } from "@vueuse/shared";
import { knownStuff } from "~~/repos";

type Origin = "left" | "right";
const origin = ref<Origin>("left");
const runTransition = ref(false);

const index = ref(0);
const setIndex = (n = 0) => {
  const offset = index.value + n;
  const length = knownStuff.length;
  const val = ((offset % length) + length) % length;
  return val;
};

const flipPage = async (i: number) => {
  if (runTransition.value) return;
  origin.value = i === -1 ? "left" : "right";
  runTransition.value = true;
  await promiseTimeout(500);
  index.value = setIndex(i);
  await promiseTimeout(500);
  runTransition.value = true;
};
</script>

<template>
  <div
    class="rounded-[2vw] border-accent border bg-primary text-base text-base-color py-[3vw] px-[2vw] shadow-primary shadow-2xl grid grid-rows-[auto,max-content,auto] relative overflow-hidden transform isolate"
  >
    <h3 class="text-center mb-[3vw] md:mb-[2vw]">
      {{ knownStuff[index].category }}
    </h3>
    <div class="flex flex-wrap gap-3 md:gap-2 px-[3vw] md:px-[1vw]">
      <nuxt-link
        v-for="tech in knownStuff[index].technologies"
        :class="{
          'hover:bg-opacity-95 hover:scale-105': !!tech.link,
        }"
        @mouseover="
          (e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              tech.color || 'var(--color-base)';
          }
        "
        @mouseleave="
          (e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              'var(--color-base)';
          }
        "
        class="gap-2 font-hack bg-base-color items-center text-accent rounded-full flex flex-1 justify-center h-[7vw] px-[4vw] text-[4vw] md:flex-initial md:justify-start md:h-[2vw] md:px-[1vw] md:text-[1.1vw] transition ease-out-quad"
        :target="!!tech.link ? '_blank' : '_self'"
        :to="
          !!tech.link
            ? tech.link.startsWith('https://')
              ? tech.link
              : 'https://' + tech.link
            : '#'
        "
        :key="tech.id"
        :external="true"
      >
        <icon
          v-if="tech.icon_name"
          :name="tech.icon_name"
          class="[&>path]:fill-current"
        />
        <small class="w-max">
          {{ tech.name }}
        </small>
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
          {{ knownStuff[setIndex(index)].category }}
        </h4>
        <div
          class="w-full h-full origin-bottom scale-y-[2%] rounded group-hover:scale-y-100 transition-transform duration-300 ease-in-out-expo bg-base-color z-[-1] absolute top-0 left-0"
        />
      </button>
    </div>
    <transition-offset
      class="!absolute inset-0 [&>*]:pointer-events-auto pointer-events-none z-1"
      :run="runTransition"
      :direction="origin"
      :main-container-attributes="{ class: 'bg-primary' }"
      :offset-container-attributes="{ class: 'bg-black' }"
      @after-enter="runTransition = false"
      @after-leave="runTransition = false"
    />
  </div>
</template>
