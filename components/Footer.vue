<script setup lang="ts">
import { commonPadding } from "~/utils/helpers";

const store = useMainStore();
const footer = computed(() => store.value.footer);
</script>

<template>
  <footer
    class="mt-[10vw] md:mt-[5vw] grid place-items-center py-[10vw] md:py-[5vw] gap-[5vw] md:gap-[1.6vw]"
    :class="{
      [commonPadding]: true,
      'bg-primary text-base-color': footer.showBackground,
      'border-t border-white text-white': !footer.showBackground,
    }"
  >
    <div class="flex items-center gap-[1.1vw] text-[5vw] md:text-[1.6vw]">
      <p>made with</p>
      <icon name="heroicons-solid:heart" />
      <p>using</p>
      <nuxt-link to="https://nuxt.com">
        <icon name="logos:nuxt-icon" class="[&>path]:fill-current" />
      </nuxt-link>
      <p>and</p>
      <icon name="simple-icons:directus" />
    </div>

    <div
      class="flex flex-wrap justify-self-center gap-[9vw] md:gap-[1.6vw] px-[12vw] md:px-0"
    >
      <nuxt-link
        v-if="footer.showLinks"
        v-for="{ icon, id, link } in store.links"
        :key="id"
        :to="link"
        :external="true"
        class="opacity-90 hover:opacity-100 text-[9vw] text-base-color md:text-[1.6vw] transition-transform duration-300 ease-out-quart hover:scale-125"
      >
        <icon :name="icon" />
      </nuxt-link>
    </div>
  </footer>
</template>
