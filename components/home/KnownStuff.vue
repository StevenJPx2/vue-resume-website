<script setup lang="ts">
import { promiseTimeout } from "@vueuse/shared";
import { knownStuff } from "~~/repos";

const pageTransition = ref<
  "before-leave" | "after-leave" | "before-enter" | "after-enter"
>("before-leave");
type Origin = "left" | "right";
const origin = ref<Origin>("left");

const pageTransitionProperties: {
  [P in "leave" | "enter"]: {
    duration: number;
    origin: { [P in Origin]: Origin };
  };
} = {
  leave: { duration: 800, origin: { left: "left", right: "right" } },
  enter: { duration: 400, origin: { left: "right", right: "left" } },
};

const currentPageState = computed(
  () =>
    pageTransitionProperties[
      pageTransition.value.match(/\w+-(\w+)/)![1] as "leave" | "enter"
    ]
);

const index = ref(0);
const setIndex = (n = 0) => {
  const offset = index.value + n;
  const length = knownStuff.length;
  const val = ((offset % length) + length) % length;
  return val;
};
const flipPage = async (i: number) => {
  if (pageTransition.value != "before-leave") return;
  origin.value = i > 0 ? "right" : "left";
  pageTransition.value = "after-leave";
  await promiseTimeout(pageTransitionProperties.leave.duration);
  pageTransition.value = "before-enter";
  index.value = setIndex(i);
  await promiseTimeout(pageTransitionProperties.enter.duration);
  pageTransition.value = "after-enter";
  await promiseTimeout(pageTransitionProperties.enter.duration);
  pageTransition.value = "before-leave";
};
</script>

<template>
  <div
    class="
      rounded-[2vw]
      border-accent border
      bg-primary
      text-base text-base-color
      py-[3vw]
      px-[2vw]
      shadow-primary shadow-2xl
      grid grid-rows-[auto,max-content,auto]
      relative
      overflow-hidden
      transform
    "
  >
    <h3 class="text-center mb-[3vw] md:mb-[2vw]">
      {{ knownStuff[index].category }}
    </h3>
    <div class="flex flex-wrap gap-3 md:gap-2 px-[3vw] md:px-[1vw]">
      <nuxt-link
        v-for="tech in knownStuff[index].technologies"
        :class="{
          'hover:bg-opacity-95 hover:scale-95': !!tech.link,
        }"
        :style="{ backgroundColor: tech.color }"
        class="
          gap-2
          font-hack
          bg-base-color
          items-center
          text-accent
          rounded-full
          flex flex-1
          justify-center
          h-[7vw]
          px-[4vw]
          text-[4vw]
          md:flex-initial
          md:justify-start
          md:h-[2vw]
          md:px-[1vw]
          md:text-[1.1vw]
          transition-transform
          ease-out-quad
        "
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
          class="
            w-full
            h-full
            origin-bottom
            scale-y-[2%]
            rounded
            group-hover:scale-y-100
            transition-transform
            duration-300
            ease-in-out-expo
            bg-base-color
            z-[-1]
            absolute
            top-0
            left-0
          "
        />
      </button>
    </div>
    <div
      class="absolute z-5 inset-0 bg-primary delay-75 ease-in-out-expo"
      :class="{
        'scale-x-0': ['before-leave', 'after-enter'].includes(pageTransition),
        'scale-x-100': ['after-leave', 'before-enter'].includes(pageTransition),
      }"
      :style="{
        transitionDuration: `${currentPageState.duration}ms`,
        transformOrigin: currentPageState.origin[origin],
      }"
    />
    <div
      class="absolute z-5 inset-0 bg-black ease-in-out-expo"
      :class="{
        'scale-x-0': ['before-leave', 'after-enter'].includes(pageTransition),
        'scale-x-100': ['after-leave', 'before-enter'].includes(pageTransition),
      }"
      :style="{
        transitionDuration: `${currentPageState.duration}ms`,
        transformOrigin: currentPageState.origin[origin],
      }"
    />
    <dev-only>
      <code class="text-white z-50">
        {{ pageTransition }}
        {{ currentPageState.origin[origin] }}
      </code>
    </dev-only>
  </div>
</template>
