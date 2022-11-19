import { Ref } from "vue";
import SplitType, { TypesValue } from "split-type";
import { SplittingTypes } from "~/utils/types";

export default function(
  target:
    | Ref<HTMLElement>
    | Ref<HTMLElement | undefined>
    | Ref<HTMLElement | null>
    | HTMLElement,
  elAnimation: (
    childEl: HTMLElement,
    index: number
  ) => gsap.core.Timeline | gsap.core.Tween,
  splitBy: SplittingTypes = "lines, words",
  select: TypesValue,
  wrapping?: { wrapType: keyof HTMLElementTagNameMap; wrapClass: string },
  onComplete: (instanceVal: SplitType) => void = () => { }
) {
  const instance = ref<SplitType>();

  const animate = () => {
    const instanceVal = instance.value!;
    const length = instanceVal[select]!.length;
    instanceVal.words?.forEach((el) => (el.style.display = "flex"));
    instanceVal[select]?.forEach((childEl, index) => {
      if (wrapping) {
        const { wrapType, wrapClass } = wrapping;
        const wrapEl = document.createElement(wrapType);
        childEl.classList.add("h-fit", "origin-top-left");
        wrapEl.classList.add(...wrapClass.split(" "));
        childEl.parentNode?.appendChild(wrapEl);
        wrapEl.appendChild(childEl);
      }
      if (index === length - 1)
        elAnimation(childEl, index).eventCallback("onComplete", () => {
          onComplete(instanceVal);
        });
      else elAnimation(childEl, index);
    });
  };

  tryOnMounted(() => {
    const unRefedTarget = unrefElement(target)!;

    instance.value = new SplitType(unRefedTarget, { types: splitBy });
    animate();

    const { width } = useWindowSize();
    watch(width, () => {
      instance.value?.split({});
      animate();
    });
  });
}
