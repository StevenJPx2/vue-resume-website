import { MaybeComputedElementRef } from "@vueuse/core";
import type Masonry from "masonry-layout";
import type { Options } from "masonry-layout";

export default function (el: MaybeComputedElementRef, options: Options) {
  const masonryRef = ref<Masonry>();

  watch(
    () => unrefElement(el),
    async (el) => {
      if (!el) return;
      masonryRef.value = new (await import("masonry-layout")).default(
        el,
        options,
      );
    },
    { flush: "post", immediate: true },
  );

  tryOnScopeDispose(() => {
    masonryRef.value?.destroy?.();
  });

  return masonryRef;
}
