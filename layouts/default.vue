<script setup lang="ts">
import { Links } from "~/utils/types";

const store = useMainStore();

const { getSingletonItem } = useDirectusItems();
store.value.links = await getSingletonItem<Links[]>({ collection: "links" });
store.value.footer.showLinks = true;

tryOnMounted(() => {
  const lock = useScrollLock(document.querySelector("html"), true);
  watch(
    store,
    (val) => {
      if (val.loadingStates.initialAnimationLoaded == true) lock.value = false;
    },
    { deep: true }
  );
});
</script>

<template>
  <div class="overflow-hidden" ref="body">
    <navbar />
    <loading :loading="store.loadingStates.isLoading" />
    <slot />
    <default-footer />
  </div>
</template>
