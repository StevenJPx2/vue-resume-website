<script setup lang="ts">
import { HomeSingleton } from "~/utils/types";

const { getSingletonItem } = useDirectusItems();
const { data: homeData } = useAsyncData(
  async () => await getSingletonItem<HomeSingleton>({ collection: "home" })
);
</script>

<template>
  <div class="w-full h-screen">
    <home-header
      :img="getDirectusImage(homeData!.header_image, {format: 'webp', width: 1080})"
      :tagline="homeData?.tagline"
      class="md:mb-[20vw] mb-[33vw]"
    />
    <infinite-marquee text="Who I am" direction="left" :target="105.5" />
  </div>
</template>
