<script setup lang="ts">
const store = useMainStore();

const isLoading = $isLoading(store);
const initialAnimationLoaded = $loadingAnimationFinished(store);

const loadingContainer = ref<HTMLElement | null>(null);
const loadingText = ref<HTMLHeadingElement | null>(null);

const { chars } = useSplitText(loadingText, { splitBy: "chars" });
const { to, timeline } = useGsap();

const { tl } = timeline({
  repeat: -1,
});

watch(
  [chars, tl] as const,
  ([val, tl]) => {
    if (!val || !tl) return;
    tl.fromTo(
      val,
      { y: 0 },
      { y: "-150%", stagger: 0.05, duration: 0.8, ease: "expo.inOut" },
    ).fromTo(
      val,
      { y: "150%" },
      {
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "expo.inOut",
        delay: 0.3,
      },
    );
  },
  { immediate: true, flush: "post" },
);

watch([isLoading], ([val]) => {
  if (val) {
    to(loadingContainer, {
      y: 0,
      duration: 0.8,
      ease: "expo.out",
    });
  } else {
    to(loadingContainer, {
      y: "-100%",
      transformOrigin: "top left",
      duration: 1.2,
      ease: "expo.inOut",
      onComplete() {
        initialAnimationLoaded.value = true;
      },
    });
  }
});
</script>

<template>
  <div
    ref="loadingContainer"
    class="w-full h-screen bg-base-color absolute top-0 z-50 grid place-content-center"
  >
    <h1 class="overflow-hidden" ref="loadingText">Loading</h1>
  </div>
</template>
