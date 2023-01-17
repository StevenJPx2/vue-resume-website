import { Ref } from "vue";

const isLarger = (el: HTMLElement) => el.clientHeight > (el.parentElement?.clientHeight ?? 0)

const replaceText = (el: HTMLElement, text: string) => {
  el.innerHTML = text;
  let replaced = false;
  while (isLarger(el)) {
    el.innerHTML = el.innerHTML.replace(/\W*\s(\S)*$/, '...');
    replaced = true;
  }
  return replaced;
}

export default function(el: Ref<HTMLElement | null | undefined>) {
  const unrefedEl = el.value!;
  const initalText = unrefedEl.innerHTML;
  const hasOverflow = ref(false);

  useTimeoutFn(() => {
    hasOverflow.value = replaceText(unrefedEl, initalText);
  }, 0.1);

  return { hasOverflow };
}
