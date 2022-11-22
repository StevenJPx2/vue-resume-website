<script setup lang="ts">
import { HomeSingleton, KnownStuff, Philosophy } from "~/utils/types";

const { getSingletonItem } = useDirectusItems();
const { data: homeData } = useAsyncData(
  async () => await getSingletonItem<HomeSingleton>({ collection: "home" })
);
const { data: knownStuffData } = useAsyncData(
  async () =>
    await getSingletonItem<KnownStuff[]>({
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
    })
);

const { data: philosophyData } = useAsyncData(
  async () => await getSingletonItem<Philosophy[]>({ collection: "philosophy" })
);
</script>

<template>
  <div class="w-full h-screen">
    <home-header
      :img="getDirectusImage(homeData!.header_image, {format: 'webp', width: 1080})"
      :tagline="homeData?.tagline"
      class="md:mb-[20vw] mb-[23vw]"
    />
    <infinite-marquee
      text="Who I am"
      direction="left"
      :target="105.5"
      class="-rotate-3"
    />
    <div
      class="grid md:grid-cols-2 md:gap-x-[5vw] md:my-[12vw] items-center grid-rows-[max-content]"
      :class="[commonPadding]"
    >
      <p class="whitespace-pre-wrap">
        {{ homeData?.about_me }}
      </p>
      <home-known-stuff :data="knownStuffData!" />
    </div>
    <infinite-marquee
      text="My Philosophy"
      direction="right"
      :target="105.5"
      class="rotate-3"
    />
    <div class="columns-2 gap-[5vw] my-[15vw]" :class="[commonPadding]">
      <div
        v-if="philosophyData"
        v-for="{ title, body } in philosophyData"
        :key="title"
        class="break-inside-avoid mb-[5vw]"
      >
        <h3 class="md:text-[11vw] leading-[0.8] md:mb-[2vw]">{{ title }}</h3>
        <p>{{ body }}</p>
      </div>
    </div>
  </div>
</template>
