<script setup lang="ts">
const store = useMainStore();
</script>

<template>
  <div class="overflow-x-hidden">
    <loading :loading="store.loading" /><slot />
  </div>
</template>
