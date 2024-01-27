<script setup lang="ts">
import { designs } from "#nuxt-prepare";
const images = designs.map((file, i) => ({
  src: `/assets/designs/${file}`,
  alt: `Image ${i}`,
}));
</script>

<template>
  <div class="grid md:grid-cols-2 gap-[12vw]" :class="[commonPadding]">
    <div class="my-auto grid">
      <p>This is some of the design work that I have done.</p>
      <nuxt-link to="/designs" class="ml-auto btn btn-hoverable btn-sm gap-3">
        More
        <icon name="heroicons:arrow-long-right-20-solid" />
      </nuxt-link>
    </div>
    <Swiper
      class="w-full max-w-[80vw] justify-self-center"
      :modules="[SwiperEffectCards, SwiperAutoplay]"
      :slides-per-view="1"
      :loop="true"
      effect="cards"
      :cards-effect="{ slideShadows: false }"
      :autoplay="{
        delay: 1000,
        disableOnInteraction: false,
      }"
    >
      <SwiperSlide
        class="h-full max-w-full object-contain"
        v-for="{ src, alt } in images"
        :key="src"
      >
        <nuxt-picture
          :imgAttrs="{
            ['class']: 'rounded-md',
            loading: 'lazy',
          }"
          :src
          :alt
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
