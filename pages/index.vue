<script setup lang="ts">
import {
  Experience,
  HomeSingleton,
  KnownStuff,
  Links,
  Philosophy,
} from "~/utils/types";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

import { breakpointsTailwind } from "@vueuse/core";

const { getSingletonItem } = useDirectusItems();
const isMobile = useBreakpoints(breakpointsTailwind).smallerOrEqual("md");

const homeData = await getSingletonItem<HomeSingleton>({ collection: "home" });

const knownStuffData = await getSingletonItem<KnownStuff[]>({
  collection: "known_stuff",
  params: {
    fields: [
      "category",
      "technologies.id",
      "technologies.name",
      "technologies.icon_name",
      "technologies.color",
      "technologies.link",
    ],
  },
});

const philosophyData = await getSingletonItem<Philosophy[]>({ collection: "philosophy" });

const linksData = await getSingletonItem<Links[]>({ collection: "links" });

const experienceData = await getSingletonItem<Experience[]>({
  collection: "experience",
  params: {
    fields: [
      "id",
      "sort",
      "workplace_name",
      "workplace_title",
      "from",
      "to",
      "description.*",
    ],
    sort: "-sort",
  },
});

const title = "Steven John | Full Stack Developer, App Developer";
const description =
  "A multi-stack developer with the penchant for developing the best, curated experiences with the least running cost.";

useHead({
  title,
  meta: seoGenerator({
    title,
    description,
    image: "https://stevenjohn.co/meta.jpg",
  }),
});
</script>

<template>
  <div>
    <home-header :img="homeData!.header_image" :tagline="homeData?.tagline" class="md:mb-[20vw] mb-[23vw]" />

    <infinite-marquee text="Who I am" direction="left" :target="105.5" class="-rotate-3" />
    <section
      class="grid md:grid-cols-2 gap-[15vw] md:gap-[5vw] mb-[20vw] md:my-[12vw] items-center grid-rows-[max-content]"
      :class="[commonPadding]">
      <p class="whitespace-pre-wrap">
        {{ homeData?.about_me }}
      </p>
      <home-known-stuff :data="knownStuffData!" />
    </section>

    <infinite-marquee text="Experience" direction="left" :target="105.5" class="-rotate-3" />
    <splide :options="{
      height: '80vh',
      perPage: isMobile ? 1 : 2,
      padding: isMobile ? '4vw' : '14vw',
      gap: isMobile ? '8vw' : '2vw',
    }" :has-track="false" class="mb-[20vw] md:my-[12vw]">
      <splide-track>
        <splide-slide v-for="data in experienceData" :key="data.id">
          <home-experience-card :data="data" />
        </splide-slide>
      </splide-track>

      <div class="splide__arrows">
        <button class="splide__arrow splide__arrow--prev">
          <icon name="heroicons:chevron-right" />
        </button>
        <button class="splide__arrow splide__arrow--next">
          <icon name="heroicons:chevron-right" />
        </button>
      </div>
    </splide>

    <infinite-marquee text="My Philosophy" direction="right" :target="105.5" class="rotate-3" />
    <section class="md:columns-2 gap-[5vw] mb-[3vw]" :class="[commonPadding]">
      <div v-if="philosophyData" v-for="{ title, body } in philosophyData" :key="title"
        class="break-inside-avoid mb-[15vw] md:mb-[5vw]">
        <h3 class="text-[28vw] md:text-[11vw] leading-[0.8] mb-[3vw] md:mb-[2vw]">
          {{ title }}
        </h3>
        <p class="whitespace-pre-wrap">{{ body }}</p>
      </div>
    </section>

    <home-footer :tagline="homeData!.footer_tagline" :links="linksData!" />
  </div>
</template>

<style lang="scss" scoped>
.splide {
  &__arrows {
    @apply absolute;
    @apply inset-0;
    @apply pointer-events-none;
  }

  &__arrow {
    @apply pointer-events-auto;
    @apply rounded-none;
    @apply bg-transparent;
    @apply h-full;
    @apply w-[10vw];

    svg {
      height: 24vw !important;
      width: 24vw !important;

      :deep(path) {
        stroke-width: 0.7 !important;
        stroke-linecap: square !important;
        stroke-linejoin: square !important;
      }

      @screen md {
        height: 6vw !important;
        width: 6vw !important;
      }
    }

    @screen md {
      @apply w-[3vw];
    }
  }
}
</style>
