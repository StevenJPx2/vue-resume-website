<script setup lang="ts">
import YellowBlob from "~/assets/yellow-ellipse.svg";

const props = defineProps({
  tagline: { type: String, required: true },
});

const tagline = ref<HTMLElement>();
const { to } = useGsap();

tryOnMounted(() => {
  to(".yellow-blob--footer", {
    duration: 2,
    ease: "linear",
    autoAlpha: 1,
    immediateRender: true,
    scrollTrigger: {
      trigger: tagline.value,
    },
    onComplete() {
      console.log("hello");
    },
  });
});

const store = useMainStore();
</script>
<template>
  <section class="h-screen relative">
    <yellow-blob
      class="pointer-events-none yellow-blob opacity-0 yellow-blob--footer svgo absolute scale-[1.5] top-[-13%] md:scale-100 md:left-[-28%] md:top-[-27%] z-[-1]"
    />
    <yellow-blob
      class="pointer-events-none yellow-blob opacity-0 yellow-blob--footer svgo absolute scale-[1.5] bottom-[-13%] md:scale-100 md:right-[-28%] md:bottom-[-27%] z-[-1]"
    />
    <div
      class="mt-[15vw] h-full grid grid-rows-[max-content,max-content] place-content-center gap-y-[5vw] md:gap-y-[3vw]"
      :class="[commonPadding]"
    >
      <h2
        ref="tagline"
        class="h1 w-full text-[25vw] md:text-[20vw] text-center leading-[0.8] place-self-center"
      >
        {{ props.tagline }}
      </h2>
      <div
        class="flex flex-wrap justify-self-center gap-[7vw] md:gap-[4vw] px-[12vw] md:px-0"
      >
        <nuxt-link
          v-for="{ icon, id, link } in store.links"
          :key="id"
          :to="link"
          target="_blank"
          :external="true"
          class="opacity-90 hover:opacity-100 text-[9vw] md:text-[4vw] transition-transform duration-300 ease-out-quart hover:scale-125"
        >
          <small class="sr-only">{{ id }}</small>
          <icon :name="icon" />
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
