<script setup lang="ts">
import { homeData, philosophies, experience } from "@/repos";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

import { breakpointsTailwind } from "@vueuse/core";

const store = useMainStore();

store.value.footer = { showBackground: false, showLinks: false };

const isMobile = useBreakpoints(breakpointsTailwind).smallerOrEqual("md");

const title = "Steven John | Full Stack Developer, App Developer";
const description =
  "A multi-stack developer with the penchant for developing the best, curated experiences with the least running cost.";

useSeoHead({
  title,
  description,
  image: "https://stevenjohn.co/meta.jpg",
});
</script>

<template>
  <div>
    <home-header
      :img="homeData.header_image"
      :tagline="homeData.tagline"
      class="md:mb-[20vw] mb-[23vw]"
    />

    <app-infinite-marquee text="Who I am" direction="left" class="-rotate-3" />
    <section
      class="grid md:grid-cols-2 gap-[15vw] md:gap-[5vw] mb-[20vw] md:my-[12vw] items-center grid-rows-[max-content]"
      :class="[commonPadding]"
    >
      <p
        v-split-animate="{
          baked: true,
          options: {
            duration: 1.5,
            scrollAnimationOptions: { start: '-=30% 100%' },
            animationOptions: { translate: true, rotate: true },
            splitOptions: {
              wrapping: {
                wrapType: 'span',
                wrapClass: 'inline-block overflow-hidden',
                select: 'lines',
              },
            },
          },
        }"
        class="whitespace-pre-wrap"
      >
        {{ homeData.about_me }}
      </p>
      <home-known-stuff />
    </section>

    <template v-if="experience.length > 0">
      <app-infinite-marquee
        text="Experience"
        direction="right"
        class="-rotate-3"
      />
      <splide
        :options="{
          height: '80vh',
          perPage: isMobile ? 1 : 2,
          padding: isMobile ? '4vw' : '14vw',
          gap: isMobile ? '8vw' : '2vw',
        }"
        :has-track="false"
        class="mb-[20vw] md:my-[12vw]"
      >
        <splide-track>
          <splide-slide v-for="data in experience" :key="data.id">
            <home-experience-card :data="data" />
          </splide-slide>
        </splide-track>

        <div class="splide__arrows">
          <button type="button" class="splide__arrow splide__arrow--prev">
            <icon name="heroicons:chevron-right" />
          </button>
          <button type="button" class="splide__arrow splide__arrow--next">
            <icon name="heroicons:chevron-right" />
          </button>
        </div>
      </splide>
    </template>

    <template v-if="philosophies.length > 0">
      <app-infinite-marquee
        text="My Philosophy"
        direction="right"
        class="rotate-3"
      />
      <section class="md:columns-2 gap-[5vw] mb-[3vw]" :class="[commonPadding]">
        <div
          v-if="philosophies"
          v-for="{ title, body } in philosophies"
          :key="title"
          class="break-inside-avoid mb-[15vw] md:mb-[5vw]"
        >
          <h3
            class="text-[28vw] md:text-[11vw] leading-[0.8] mb-[3vw] md:mb-[2vw]"
          >
            {{ title }}
          </h3>
          <p class="whitespace-pre-wrap">{{ body }}</p>
        </div>
      </section>
    </template>

    <app-infinite-marquee text="Design" direction="right" class="rotate-3" />
    <HomePortfolio />

    <home-footer :tagline="homeData!.footer_tagline" />
  </div>
</template>
