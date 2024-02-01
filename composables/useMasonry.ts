import { promiseTimeout } from "@vueuse/core";
import type { Options, default as Macy } from "macy";

export default function (
  el: MaybeRefOrGetter<string>,
  options: Omit<Options, "container">,
) {
  const masonryRef = ref<Macy>();

  watch(
    () => toValue(el),
    async (el) => {
      if (!el) return;
      tryOnMounted(async () => {
        masonryRef.value = new (await import("macy")).default({
          ...options,
          container: el,
        });
        await promiseTimeout(100);
        masonryRef.value.recalculate(true, true);
      });
    },
    { flush: "post", immediate: true },
  );

  tryOnScopeDispose(() => {
    masonryRef.value?.remove?.();
  });

  return masonryRef;
}
