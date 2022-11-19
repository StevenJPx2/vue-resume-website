import { Ref } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplittingTypes } from "~/utils/types";
import { TypesValue } from "split-type";

type Options = {
  splitBy: SplittingTypes;
  select: TypesValue;
  delay: number;
  duration: number;
  ease: string;
};
const defaultOptions: Options = {
  splitBy: "chars, words",
  select: "lines",
  delay: 0.1,
  duration: 1.2,
  ease: "expo.out",
};

export default function(
  el: Ref<HTMLElement> | HTMLElement,
  options: Options = defaultOptions
) {
  const { ease, duration, splitBy, select, delay } = Object.assign(
    defaultOptions,
    options
  );
  const animation =
    (elem: HTMLElement | string) => (childEl: HTMLElement, index: number) =>
      gsap.fromTo(
        childEl,
        { y: "150%" },
        {
          transformOrigin: "top left",
          delay: delay * index,
          y: 0,
          scrollTrigger: {
            trigger: elem,
            start: "center bottom",
          },
          duration,
          ease,
        }
      );

  tryOnMounted(() => {
    gsap.registerPlugin(ScrollTrigger);
  });

  useSplitText(el, animation(unref(el)), splitBy, select, {
    wrapType: "span",
    wrapClass: "overflow-hidden block",
  });
}
