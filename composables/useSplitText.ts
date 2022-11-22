import { Ref } from "vue";
import SplitType, { TypesValue } from "split-type";
import { SplittingTypes } from "~/utils/types";

type Options = {
  splitBy: SplittingTypes;
  wrapping?: { wrapType: keyof HTMLElementTagNameMap; wrapClass: string };
  onComplete?: (instanceVal: SplitType) => void;
  shouldBeMounted: boolean;
};

const defaultOptions: Options = {
  splitBy: "lines, words",
  onComplete() { },
  shouldBeMounted: true,
};

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
  select: TypesValue,
  options = defaultOptions
) {
  const instance = ref<SplitType>();
  const { splitBy, wrapping, onComplete, shouldBeMounted } = {
    ...defaultOptions,
    ...options,
  };

  const animate = () => {
    const instanceVal = instance.value!;
    const length = instanceVal[select]!.length;

    if (
      (["chars", "words"] as TypesValue[]).every((sp) => splitBy.includes(sp))
    )
      instanceVal.words?.forEach((el) => (el.style.display = "inline-flex"));

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
          onComplete!(instanceVal);
        });
      else elAnimation(childEl, index);
    });
  };

  const fn = () => {
    const unRefedTarget = unrefElement(target)!;
    instance.value = new SplitType(unRefedTarget, { types: splitBy });
    animate();
  };

  if (shouldBeMounted) tryOnMounted(fn);
  else fn();

  const { width } = useWindowSize();

  watch(width, () => {
    instance.value?.split({});
    animate();
  });
}
