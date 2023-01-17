<script setup lang="ts">
import gsap from "gsap";
const store = useMainStore();
const props = defineProps({
  loading: Boolean,
});

const loadingAnimationComplete = ref(false);

tryOnMounted(() => {
  useGsap(
    (tl) => {
      useSplitText(
        document.querySelector("#loading")! as HTMLElement,
        (childEl, index) => {
          return tl
            .fromTo(
              childEl,
              { y: "150%" },
              { transformOrigin: "top left", y: 0, ease: "expo.out" },
              0.1 * index
            )
            .to(
              childEl,
              {
                y: "-150%",
                duration: 0.5,
                ease: "expo.in",
                onComplete() {
                  if (index === 6) {
                    loadingAnimationComplete.value = true;
                  }
                },
              },
              1 + 0.1 * index
            );
        },
        "chars",
        {
          splitBy: "chars, words",
          wrapping: {
            wrapType: "span",
            wrapClass: "overflow-hidden inline-block",
          },
          shouldBeMounted: false,
        }
      );

      watch(loadingAnimationComplete, (val) => {
        if (val && !props.loading) {
          tl.seek(0);
          gsap.to("#loading-container", {
            y: "-100%",
            transformOrigin: "top left",
            duration: 1.2,
            ease: "expo.inOut",
            onComplete() {
              store.value.hasInitialAnimationLoaded = true;
            },
          });
        }
      });
    },
    { repeat: -1, shouldBeMounted: false }
  );

  watch(loadingAnimationComplete, (val) => {
    if (val && !props.loading) {
      gsap.to("#loading-container", {
        y: "-100%",
        transformOrigin: "top left",
        duration: 1.2,
        ease: "expo.inOut",
        onComplete() {
          store.value.hasInitialAnimationLoaded = true;
        },
      });
    }
  });
});
</script>

<template>
  <div
    id="loading-container"
    class="
      w-full
      h-screen
      bg-base
      absolute
      top-0
      z-50
      grid
      place-content-center
    "
  >
    <h1 id="loading">Loading</h1>
  </div>
</template>
