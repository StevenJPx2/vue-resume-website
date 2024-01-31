import { MaybeComputedElementRef } from "@vueuse/core";
import type Masonry from "masonry-layout";
import type { Options } from "masonry-layout";
import imagesLoaded from "imagesloaded";

export default function (el: MaybeComputedElementRef, options: Options) {
  const masonryRef = ref<Masonry>();
  let imgLoad: ReturnType<typeof imagesLoaded>;

  const reloadLayout = () => {
    masonryRef.value?.layout?.();
  };

  watch(
    () => unrefElement(el),
    async (el) => {
      if (!el) return;
      masonryRef.value = new (await import("masonry-layout")).default(
        el,
        options,
      );
      imgLoad = imagesLoaded(el.querySelectorAll("img"));
      imgLoad.on("progress", reloadLayout);
    },
    { flush: "post", immediate: true },
  );

  tryOnScopeDispose(() => {
    masonryRef.value?.destroy?.();
    imgLoad?.off?.("progress", reloadLayout);
  });

  return masonryRef;
}
