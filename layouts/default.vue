<script setup lang="ts">
const store = useMainStore();

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

function leaveFunction() {
  console.log("leave");
  store.value.loadingStates = {
    isLoading: true,
    initialAnimationLoaded: false,
  };
}

function enterFunction() {
  console.log("enter");
  store.value.loadingStates.isLoading = false;
}
</script>

<template>
  <div class="overflow-hidden" ref="body">
    <navbar />
    <loading />
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in" @enter="enterFunction" @before-leave="leaveFunction">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </router-view>
    <Footer />
  </div>
</template>
