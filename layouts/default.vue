<script setup lang="ts">
const store = useMainStore();

tryOnMounted(() => {
  const lock = useScrollLock(document.querySelector("html"), true);
  watch(
    store,
    (val) => {
      if (val.hasInitialAnimationLoaded == true) lock.value = false;
    },
    { deep: true }
  );
});
</script>

<template>
  <div class="overflow-hidden" ref="body">
    <loading :loading="store.loading" /><slot />
  </div>
</template>
