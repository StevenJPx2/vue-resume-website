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
  rotate: boolean;
  zoom: boolean;
  onComplete: () => void;
};
const defaultOptions: Options = {
  splitBy: "chars, words, lines",
  select: "words",
  delay: 0.1,
  duration: 1.2,
  ease: "expo.out",
  rotate: false,
  zoom: false,
  onComplete: () => {},
};

export default function (
  el: Ref<HTMLElement> | HTMLElement,
  options: Options = defaultOptions
) {
  const { ease, duration, splitBy, select, delay, rotate, zoom, onComplete } =
    Object.assign(defaultOptions, options);

  const animation = (elem: HTMLElement | string) => {
    const tl = gsap
      .timeline({
        duration,
        scrollTrigger: {
          trigger: elem,
          start: "center bottom",
        },
        onComplete,
      })
      .set(elem, { scale: zoom ? 1.2 : 1 }, 0);

    return (childEl: HTMLElement, index: number) => {
      tl.fromTo(
        childEl,
        { y: "150%", rotate: rotate ? 15 : 0 },
        {
          transformOrigin: "top left",
          rotate: 0,
          y: 0,
          ease,
        },
        delay * index
      );

      if (zoom) {
        tl.to(elem, { scale: 1, ease: "circ.out" }, "+=0.4");
      }

      return tl;
    };
  };

  tryOnMounted(() => {
    gsap.registerPlugin(ScrollTrigger);
  });

  useSplitText(el, animation(unref(el)), splitBy, select, {
    wrapType: "span",
    wrapClass: "overflow-hidden inline-block",
  });
}
