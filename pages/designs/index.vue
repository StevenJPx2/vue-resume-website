<script setup lang="ts">
import { designs } from "#nuxt-prepare";
const images = designs.map((file, i) => ({
  src: `/assets/designs/${file}`,
  alt: `Image ${i}`,
}));
const activeImage = ref<number>();

useMasonry("#masonry", {
  trueOrder: true,
  margin: 20,
  breakAt: {
    1200: 5,
    940: 3,
    520: 2,
    400: 1,
  },
});
</script>

<template>
  <main :class="[commonPadding]">
    <h1>Designs</h1>
    <div id="masonry" class="w-full h-full mx-auto justify-items-center">
      <button
        v-for="({ src, alt }, i) in images"
        :key="src"
        @click="activeImage = i"
        type="button"
        class="item"
      >
        <nuxt-picture
          :imgAttrs="{
            ['class']:
              'rounded-md max-w-[320px] w-full mx-auto object-center object-contain hover:scale-110 transition duration-300 ease-in-out-cubic mb-2',
          }"
          loading="lazy"
          sizes="sm:50vw md:40vw lg:30vw xl:20vw"
          :src
          :alt
        />
      </button>
    </div>

    <Teleport to="body">
      <div
        v-if="activeImage !== undefined"
        class="fixed inset-0 size-full z-[1000]"
      >
        <div
          @click="activeImage = undefined"
          class="absolute inset-0 bg-black/10 backdrop-blur-3xl fade"
        />
        <div class="grid h-full animate">
          <Swiper
            :modules="[SwiperNavigation, SwiperEffectCoverflow]"
            :navigation="{
              nextEl: '.splide__arrow--next',
              prevEl: '.splide__arrow--prev',
            }"
            :initial-slide="activeImage"
            effect="coverflow"
            :coverflow-effect="{ slideShadows: false }"
            class="w-full max-w-[80vw] place-self-center pointer-events-none"
          >
            <SwiperSlide
              class="w-full h-[80vh] grid place-items-center"
              v-for="{ src, alt } in images"
              :key="src"
            >
              <nuxt-picture
                :imgAttrs="{
                  ['class']: 'rounded-md h-[80vh] w-full object-contain',
                }"
                loading="lazy"
                sizes="sm:50vw md:40vw lg:30vw xl:20vw"
                :src
                :alt
              />
            </SwiperSlide>
          </Swiper>
          <div class="splide__arrows">
            <button type="button" class="splide__arrow splide__arrow--prev">
              <icon name="heroicons:chevron-right" />
            </button>
            <button type="button" class="splide__arrow splide__arrow--next">
              <icon name="heroicons:chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>
