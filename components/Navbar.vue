<script setup lang="ts">
const links: { label: string; link: string }[] = [
  { label: "Home", link: "/" },
  // { label: "Blog", link: "/blog" },
];
</script>

<template>
  <nav
    class="
      z-[99]
      fixed
      flex
      items-center
      justify-between
      w-full
      mix-blend-exclusion
    "
    :class="[commonPadding]"
  >
    <nuxt-link
      to="/"
      class="text-primary font-high-con text-[10vw] md:text-[5vw]"
    >
      steven john
    </nuxt-link>
    <div class="flex gap-[5vw] md:gap-[3vw]">
      <nuxt-link
        class="p nav"
        active-class="link"
        v-for="{ label, link } in links"
        :key="link"
        :to="link"
      >
        {{ label }}
      </nuxt-link>
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
