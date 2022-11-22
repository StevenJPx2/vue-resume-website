<script setup lang="ts">
import ScrollTrigger from "gsap/ScrollTrigger";
import FPS from "~/assets/four-prong-star.svg";
import SPS from "~/assets/seven-prong-star.svg";
import SmallCircle from "~/assets/small-circle.svg";

const name = ref<HTMLElement>();
const headerImage = ref<HTMLElement>();
const props = defineProps({
  img: { type: String, required: true },
  tagline: { type: String },
});

const commonClasses = "row-start-1 w-full stroke-1";

useGsap((tl) => {
  tl.set(".pop-in", { scale: 0 }).set(headerImage.value!, {
    autoAlpha: 0,
    y: "-10%",
  });
});
tryOnMounted(() => {
  useWordSlideInAnimation(name, {
    activation: "immediate",
    splitBy: "words, chars",
    select: "chars",
    runOnCompleteAtIndex: 9,
    onComplete() {
      useGsap(
        (tl) => {
          tl.to(headerImage.value!, {
            duration: 1,
            ease: "power4.out",
            autoAlpha: 1,
            y: 0,
          }).to(".pop-in", {
            duration: 0.5,
            scale: 1,

            ease: "elastic",
            stagger: 0.1,
          });
        },
        { shouldBeMounted: false }
      );

      console.log("hello");
    },
    zoom: true,
    shouldBeMounted: false,
  });
});
</script>

<template>
  <div class="h-screen w-full relative">
    <nuxt-picture
      src="/yellow-ellipse.png"
      :img-attrs="{
        class:
          'yellow-blob absolute scale-[1.5] top-[-13%] md:scale-100 md:left-[-28%] md:top-[-27%]',
      }"
    />
    <nuxt-picture
      src="/yellow-ellipse.png"
      :img-attrs="{
        class:
          'yellow-blob absolute scale-[1.5] bottom-[-13%] md:scale-100 md:right-[-28%] md:bottom-[-27%]',
      }"
    />
    <div class="wrapper h-screen">
      <div
        class="justify-self-center col-span-full row-start-1"
        v-parallax="{ scrollSpeed: 1 }"
      >
        <h1 ref="name">Steven John</h1>
      </div>
      <div
        v-parallax="{ scrollSpeed: -1 }"
        :class="[
          'grayscale mx-auto row-start-1',
          'col-start-3 col-end-14 mt-[25vw]',
          'md:col-start-9 md:col-span-7 md:mt-[15vw]',
        ]"
      >
        <img ref="headerImage" :src="props.img" />
      </div>
      <s-p-s
        :class="[
          commonClasses,
          'pop-in col-start-3 col-span-3 mt-[55vw]',
          'md:col-start-7 md:col-span-2 md:mt-[34vw]',
        ]"
      />

      <f-p-s
        :class="[
          commonClasses,
          'pop-in col-start-13 col-span-2 mt-[105vw]',
          'md:col-start-17 md:w-[5vw] md:mt-[48vw]',
        ]"
      />

      <small-circle
        :class="[
          commonClasses,
          'pop-in col-start-2 col-span-1 w-[5vw] mt-[125vw]',
          'md:col-start-8 md:w-[2vw] md:justify-self-end md:mt-[57vw]',
        ]"
      />
      <p
        id="tagline"
        v-if="props.tagline"
        :class="[
          'pop-in rounded-full bg-white/[0.01] uppercase backdrop-blur-sm row-start-1 w-fit h-fit -rotate-6 border text-center justify-self-center',
          'col-start-1 col-span-full text-[4vw] mt-[130vw] py-[2vw] px-[8vw]',
          'md:col-start-10 md:col-span-7 md:py-[0.6vw] md:px-[2.2vw] md:text-[1.2vw] md:mt-[54vw]',
        ]"
      >
        {{ tagline }}
      </p>
    </div>
  </div>
</template>
