<script setup lang="ts">
import FPS from "~/assets/four-prong-star.svg";
import SPS from "~/assets/seven-prong-star.svg";
import SmallCircle from "~/assets/small-circle.svg";
import YellowBlob from "~/assets/yellow-ellipse.svg";
import { Store } from "~~/utils/types";

const name = ref<HTMLElement>();
const props = defineProps<{ img: string; tagline?: string }>();

const { timeline } = useGsap();

const { tl } = timeline();
watch(tl, (t) => {
  if (!t) return;
  t.set(name.value!, { autoAlpha: 0 })
    .set(".pop-in", { scale: 0 })
    .set("#header-image", {
      autoAlpha: 0,
      y: "-10%",
    })
    .set(".yellow-blob", { autoAlpha: 0 });
});

const commonClasses = "stroke-1 svgo [&>*]:!fill-none";
const store = useMainStore();

const runAnimation = (val: Store) => {
  if (val.loadingStates.initialAnimationLoaded)
    useWordSlideInAnimation(name, {
      activation: "immediate",
      splitBy: "words, chars",
      select: "chars",
      runOnCompleteAtIndex: 9,
      onComplete() {
        const { tlFn } = timeline();
        tlFn((tl) => {
          tl.to("#header-image", {
            duration: 1,
            ease: "expo.out",
            autoAlpha: 1,
            y: 0,
          })
            .to(".yellow-blob", { duration: 2, autoAlpha: 1 }, "+=0")
            .to(
              ".pop-in",
              {
                duration: 0.8,
                scale: 1,
                ease: "elastic",
                stagger: 0.1,
              },
              1,
            );
        });
        console.log("hello");
      },
      zoom: true,
    });
};

watch(() => store.value, runAnimation, { deep: true });
</script>

<template>
  <div class="h-screen w-full relative">
    <yellow-blob
      class="yellow-blob svgo absolute scale-[1.5] top-[-13%] md:scale-100 md:left-[-28%] md:top-[-27%]"
    />
    <yellow-blob
      class="yellow-blob svgo absolute scale-[1.5] bottom-[-13%] md:scale-100 md:right-[-28%] md:bottom-[-27%]"
    />
    <div class="wrapper h-screen place-content-center">
      <div
        class="justify-self-center col-span-full row-start-1"
        data-scroll
        data-scroll-speed="-0.1"
      >
        <h1 ref="name">Steven John</h1>
      </div>

      <div
        data-scroll
        data-scroll-speed="0.01"
        class="grayscale row-start-1 col-start-3 col-end-14 mt-[25vw] md:col-start-9 md:col-span-7 md:mt-[15vw]"
      >
        <nuxt-img
          preload
          placeholder
          sizes="100vw md:50vw lg:33vw"
          quality="85"
          :src="props.img"
          id="header-image"
          class="w-full"
        />
      </div>
      <div
        data-scroll
        data-scroll-speed="0.05"
        class="row-start-1 col-start-3 col-span-3 mt-[55vw] md:col-start-7 md:col-span-2 md:mt-[34vw]"
      >
        <s-p-s :class="[commonClasses]" class="pop-in" />
      </div>

      <div
        data-scroll
        data-scroll-speed="0.08"
        class="row-start-1 col-start-13 col-span-2 mt-[105vw] md:col-start-17 md:mt-[48vw]"
      >
        <f-p-s :class="[commonClasses]" class="pop-in md:!w-[5vw]" />
      </div>

      <div
        data-scroll
        data-scroll-speed="0.1"
        class="row-start-1 col-start-2 col-span-1 mt-[125vw] md:col-start-8 md:justify-self-end md:mt-[57vw]"
      >
        <small-circle
          :class="[commonClasses]"
          class="pop-in !w-[5vw] md:!w-[2vw]"
        />
      </div>
      <div
        data-scroll
        data-scroll-speed="0.1"
        class="justify-self-center row-start-1 col-start-1 col-span-full md:col-start-10 md:col-span-7 mt-[130vw] md:mt-[54vw]"
      >
        <p id="tagline" class="pop-in -rotate-6 btn" v-if="props.tagline">
          {{ tagline }}
        </p>
      </div>
    </div>
  </div>
</template>
