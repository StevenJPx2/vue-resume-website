<script setup lang="ts">
const links: { label: string; link: string; visible: boolean }[] = [
  { label: "Home", link: "/", visible: true },
  { label: "Designs", link: "/designs", visible: true },
  { label: "Blog", link: "/blog", visible: false },
  { label: "Projects", link: "/projects", visible: false },
];
</script>

<template>
  <nav
    class="z-[99] fixed flex items-center justify-between w-full mix-blend-exclusion"
    :class="[commonPadding]"
  >
    <nuxt-link
      to="/"
      class="text-primary font-high-con text-[10vw] md:text-[5vw] delay-75 hover:scale-125 transition duration-700 ease-in-out-quart origin-top-left"
    >
      steven john
    </nuxt-link>
    <div class="flex gap-[5vw] md:gap-[3vw]">
      <template v-for="{ label, link, visible } in links" :key="link">
        <nuxt-link v-if="visible" class="p nav" active-class="link" :to="link">
          {{ label }}
        </nuxt-link>
      </template>
    </div>
  </nav>
</template>

<style scoped lang="scss">
a.nav:not(.link) {
  @apply relative;

  &::before {
    content: "";
    @apply absolute;
    @apply inset-x-0;
    @apply bottom-0;
    @apply block;
    @apply origin-bottom-right;
    @apply h-px;
    background: var(--color-accent);
    @apply scale-x-0;
    @apply mt-1;
    @apply transition-transform;
    @apply ease-in-out;
    @apply duration-200;
  }

  &:hover {
    &::before {
      @apply scale-x-100;
      @apply origin-bottom-left;
    }
  }
}
</style>
