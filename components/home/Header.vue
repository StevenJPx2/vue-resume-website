<script setup lang="ts">
import FPS from "~/assets/four-prong-star.svg";
import SPS from "~/assets/seven-prong-star.svg";
import SmallCircle from "~/assets/small-circle.svg";

const props = defineProps({
  img: { type: String, required: true },
  tagline: { type: String },
});

const commonClasses = "row-start-1 w-full stroke-1";
</script>

<template>
  <div class="h-screen w-full relative">
    <nuxt-picture
      src="/yellow-ellipse.png"
      :img-attrs="{
        class:
          'absolute scale-[1.5] top-[-13%] md:scale-100 md:left-[-28%] md:top-[-27%]',
      }"
    />
    <nuxt-picture
      src="/yellow-ellipse.png"
      :img-attrs="{
        class:
          'absolute scale-[1.5] bottom-[-13%] md:scale-100 md:right-[-28%] md:bottom-[-27%]',
      }"
    />
    <div class="wrapper h-screen">
      <h1
        v-slide-in.zoom="{ splitBy: 'words, chars', select: 'chars' }"
        v-parallax
        class="justify-self-center col-span-full row-start-1"
      >
        Steven John
      </h1>
      <nuxt-img
        :src="props.img"
        :class="[
          'grayscale mx-auto row-start-1',
          'col-start-3 col-end-14 mt-[25vw]',
          'md:col-start-9 md:col-span-7 md:mt-[15vw]',
        ]"
      />
      <s-p-s
        :class="[
          commonClasses,
          'col-start-3 col-span-3 mt-[55vw]',
          'md:col-start-7 md:col-span-2 md:mt-[34vw]',
        ]"
      />

      <f-p-s
        :class="[
          commonClasses,
          'col-start-13 col-span-2 mt-[105vw]',
          'md:col-start-17 md:w-[5vw] md:mt-[48vw]',
        ]"
      />

      <small-circle
        :class="[
          commonClasses,
          'col-start-2 col-span-1 w-[5vw] mt-[125vw]',
          'md:col-start-8 md:w-[2vw] md:justify-self-end md:mt-[57vw]',
        ]"
      />
      <p
        id="tagline"
        v-if="props.tagline"
        :class="[
          'rounded-full bg-white/[0.01] uppercase backdrop-blur-sm row-start-1 w-fit h-fit -rotate-6 border text-center justify-self-center',
          'col-start-1 col-span-full text-[4vw] mt-[130vw] py-[2vw] px-[8vw]',
          'md:col-start-10 md:col-span-7 md:py-[0.6vw] md:px-[2.2vw] md:text-[1.2vw] md:mt-[54vw]',
        ]"
      >
        {{ tagline }}
      </p>
    </div>
  </div>
</template>
