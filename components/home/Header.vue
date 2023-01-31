<script setup lang="ts">
import FPS from "~/assets/four-prong-star.svg";
import SPS from "~/assets/seven-prong-star.svg";
import SmallCircle from "~/assets/small-circle.svg";
import { Store } from "~~/utils/types";

const name = ref<HTMLElement>();
const props = defineProps({
  img: { type: String, required: true },
  tagline: { type: String },
});

const commonClasses = "row-start-1 w-full stroke-1";
const store = useMainStore();
const router = useRouter();

const runAnimation = (val: Store) => {
  if (val.loadingStates.initialAnimationLoaded)
    useWordSlideInAnimation(name, {
      activation: "immediate",
      splitBy: "words, chars",
      select: "chars",
      runOnCompleteAtIndex: 9,
      onStart() {
        useGsap((tl) => tl.set(name.value!, { autoAlpha: 1 }));
      },
      onComplete() {
        useGsap(
          (tl) => {
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
                1
              );
          },
          { shouldBeMounted: false }
        );

        console.log("hello");
      },
      zoom: true,
      shouldBeMounted: true,
    });
};

useGsap((tl) => {
  tl.set(name.value!, { autoAlpha: 0 })
    .set(".pop-in", { scale: 0 })
    .set("#header-image", {
      autoAlpha: 0,
      y: "-10%",
    })
    .set(".yellow-blob", { autoAlpha: 0 });
});

runAnimation(store.value);

watch(store, runAnimation, { deep: true });
</script>

<template>
  <div class="h-screen w-full relative">
    <directus-img id="yellowEllipse" :sizes="[1536]" :img-attrs="{
      class:
        'yellow-blob absolute scale-[1.5] top-[-13%] md:scale-100 md:left-[-28%] md:top-[-27%]',
    }" />
    <directus-img id="yellowEllipse" :sizes="[1536]" :img-attrs="{
      class:
        'yellow-blob absolute scale-[1.5] bottom-[-13%] md:scale-100 md:right-[-28%] md:bottom-[-27%]',
    }" />
    <div class="wrapper h-screen place-content-center">
      <div class="justify-self-center col-span-full row-start-1" v-parallax="{ scrollSpeed: 1 }">
        <h1 ref="name">Steven John</h1>
      </div>

      <div v-parallax="{ scrollSpeed: -1 }" class="
          grayscale
          row-start-1
          col-start-3 col-end-14
          mt-[25vw]
          md:col-start-9 md:col-span-7 md:mt-[15vw]
        ">
        <directus-img :id="props.img" :img-attrs="{ id: 'header-image', class: 'w-full' }" />
      </div>
      <s-p-s :class="[commonClasses]" class="
          pop-in
          col-start-3 col-span-3
          mt-[55vw]
          md:col-start-7 md:col-span-2 md:mt-[34vw]
        " />

      <f-p-s :class="[commonClasses]" class="
          pop-in
          col-start-13 col-span-2
          mt-[105vw]
          md:col-start-17 md:w-[5vw] md:mt-[48vw]
        " />

      <small-circle :class="[commonClasses]" class="
          pop-in
          col-start-2 col-span-1
          w-[5vw]
          mt-[125vw]
          md:col-start-8 md:w-[2vw] md:justify-self-end md:mt-[57vw]
        " />
      <p id="tagline" v-if="props.tagline" class="
          pop-in
          btn
          justify-self-center
          -rotate-6
          row-start-1
          col-start-1 col-span-full
          md:col-start-10 md:col-span-7
          mt-[130vw]
          md:mt-[54vw]
        ">
        {{ tagline }}
      </p>
    </div>
  </div>
</template>
