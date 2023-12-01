import { AnimationOptions } from "./useAnimation";
import { MaybeRef } from "@vueuse/core";

type UseSplitTextOptions = Parameters<typeof useSplitText>[1];

type Options = {
  splitBy?: UseSplitTextOptions["splitBy"];
  select?: "chars" | "words" | "lines";
  stagger?: number;
  duration?: number;
  ease?: string;
  rotate?: boolean;
  zoom?: boolean;
  runOnCompleteAtIndex?: number;
} & AnimationOptions;

const defaultOptions = {
  splitBy: "chars, words, lines" as SplittingTypes,
  select: "words" as "chars" | "words" | "lines",
  stagger: 0.1,
  duration: 1.2,
  ease: "expo.out",
  rotate: false,
  zoom: false,
  ...defaultAnimationOptions,
};

export default function (
  el: MaybeRef<HTMLElement | null | undefined>,
  options: Options = defaultOptions,
) {
  const unRefedElement = unrefElement(el);

  const {
    ease,
    duration,
    splitBy,
    select,
    stagger,
    rotate,
    zoom,
    shouldBeMounted,
    runOnCompleteAtIndex,
    onComplete,
    ...animationOptions
  } = Object.assign(
    defaultOptions,
    {
      activation: "scroll",
      scrollTrigger: { trigger: unRefedElement, start: "center bottom" },
    },
    options,
  );

  const splText = useSplitText(el, {
    splitBy,
    wrapping: {
      select,
      wrapType: "span",
      wrapClass: "overflow-hidden inline-block",
    },
  });

  const selectElArray = splText[select];

  const { set, fromTo, to } = useGsap();

  set(el, { scale: zoom ? 1.2 : 1, autoAlpha: 1 });

  fromTo(selectElArray, {
    from: { y: "150%", rotate: rotate ? 15 : 0 },
    to: {
      transformOrigin: "top left",
      rotate: 0,
      y: 0,
      stagger,
      ease,
      onComplete,
    },
  });

  if (zoom) {
    to(el, {
      scale: 1,
      ease: "circ.out",
      delay: 0.4,
    });
  }
}
