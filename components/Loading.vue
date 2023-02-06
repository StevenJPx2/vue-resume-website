<script setup lang="ts">
import gsap from "gsap";
const store = useMainStore();

const isLoading = $isLoading(store);
const initialAnimationLoaded = $loadingAnimationFinished(store);

const foldLoadingScreen = () => {
  tryOnMounted(() => {
    gsap.to("#loading-container", {
      y: "-100%",
      transformOrigin: "top left",
      duration: 1.2,
      ease: "expo.inOut",
      onComplete() {
        initialAnimationLoaded.value = true;
      },
    });
  });
};

const runAnimation = (tl: gsap.core.Timeline) => {
  console.log("ran loading animation");

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
};

useGsap(runAnimation, { repeat: -1 });

watch(
  [isLoading],
  ([val]) => {
    console.log(val);
    if (val) {
      useGsap((tl) => {
        tl.to("#loading-container", {
          y: 0,
          duration: 0.8,
          ease: "expo.out",
        });
      });
      useGsap(runAnimation, { repeat: -1 });
    } else {
      foldLoadingScreen();
    }
  },
  { deep: true }
);
</script>

<template>
  <div
    id="loading-container"
    class="
      w-full
      h-screen
      bg-base-color
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
