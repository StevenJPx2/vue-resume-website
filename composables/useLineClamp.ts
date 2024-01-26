import { MaybeComputedElementRef } from "@vueuse/core";

export default function (
  el: MaybeComputedElementRef<HTMLElement | null | undefined>,
) {
  const initialText = ref<string>();
  const hasOverflow = ref(false);

  const { height, width } = useWindowSize();

  watch(
    () => [unrefElement(el), height.value, width.value] as const,
    ([el]) => {
      if (!el) return;
      if (!initialText.value) initialText.value = el.innerHTML;
      else el.innerHTML = initialText.value;

      if (el.clientHeight <= (el.parentElement?.clientHeight ?? 0)) {
        if (hasOverflow.value) hasOverflow.value = false;
      }

      while (el.clientHeight > (el.parentElement?.clientHeight ?? 0)) {
        el.innerHTML = el.innerHTML.replace(/\W*\s(\S)*$/, "...");
        if (!hasOverflow.value) hasOverflow.value = true;
      }
    },
  );

  return { hasOverflow };
}
