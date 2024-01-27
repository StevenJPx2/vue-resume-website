<script setup lang="ts">
import { designs } from "#nuxt-prepare";
const images = designs.map((file, i) => ({
  src: `/assets/designs/${file}`,
  alt: `Image ${i}`,
}));
const activeImage = ref<number>();
</script>
<template>
  <main :class="[commonPadding]">
    <h1>Designs</h1>
    <div
      class="grid grid-cols-[repeat(auto-fill,minmax(max(30%,320px),1fr))] grid-rows-[masonry] justify-items-center gap-[5vw] md:gap-[2vw]"
    >
      <button
        v-for="({ src, alt }, i) in images"
        :key="src"
        @click="activeImage = i"
        type="button"
      >
        <nuxt-picture
          :imgAttrs="{
            ['class']:
              'rounded-md w-full hover:scale-110 transition duration-300 ease-in-out-cubic',
            loading: 'lazy',
          }"
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
                  loading: 'lazy',
                }"
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
