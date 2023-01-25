<script setup lang="ts">
import { commonPadding } from "~/utils/helpers";

const store = useMainStore();
</script>

<template>
  <footer
    class="mt-[10vw] md:mt-[5vw] bg-primary grid place-items-center py-[5vw]"
    :class="[commonPadding]"
  >
    <div class="flex items-center gap-[1.1vw] text-base-color">
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
      class="
        flex flex-wrap
        justify-self-center
        gap-[2.1vw]
        md:gap-[1.6vw]
        px-[12vw]
        md:px-0
      "
    >
      <nuxt-link
        v-if="store.footer.showLinks"
        v-for="{ icon, id, link } in store.links"
        :key="id"
        :to="link"
        :external="true"
        class="
          opacity-90
          hover:opacity-100
          text-[9vw] text-base-color
          md:text-[4vw]
          transition-transform
          duration-300
          ease-out-quart
          hover:scale-125
        "
      >
        <icon :name="icon" />
      </nuxt-link>
    </div>
  </footer>
</template>

<style scoped lang="scss">
svg {
  @apply w-[5vw];
  @apply h-[5vw];

  @screen md {
    @apply w-[1.6vw];
    @apply h-[1.6vw];
  }
}
</style>
