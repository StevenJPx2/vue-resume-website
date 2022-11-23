import { SplittingTypes } from "~/utils/types";
import { TypesValue } from "split-type";
import { AnimationOptions } from "./useAnimation";
import { MaybeRef } from "@vueuse/core";

type Options = {
  splitBy?: SplittingTypes;
  select?: TypesValue;
  stagger?: number;
  duration?: number;
  ease?: string;
  rotate?: boolean;
  zoom?: boolean;
  runOnCompleteAtIndex?: number;
} & AnimationOptions;

const defaultOptions: Options = {
  splitBy: "chars, words, lines",
  select: "words",
  stagger: 0.1,
  duration: 1.2,
  ease: "expo.out",
  rotate: false,
  zoom: false,
  ...defaultAnimationOptions,
};

export default function(
  el: MaybeRef<HTMLElement | null | undefined>,
  options = defaultOptions
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
    ...animationOptions
  } = Object.assign(
    {
      ...defaultOptions,
      activation: "scroll",
      scrollTrigger: { trigger: unRefedElement, start: "center bottom" },
    },
    options
  );

  useAnimation((tl) => {
    tl.set(unRefedElement!, { scale: zoom ? 1.2 : 1 }, 0);

    const onComplete = () => {
      if (animationOptions.onComplete) animationOptions.onComplete();
    };

    const selectAnimation = (childEl: HTMLElement, index: number) => {
      tl.fromTo(
        childEl,
        { y: "150%", rotate: rotate ? 15 : 0 },
        {
          transformOrigin: "top left",
          rotate: 0,
          y: 0,
          ease,
          onComplete() {
            if (
              runOnCompleteAtIndex !== undefined &&
              runOnCompleteAtIndex === index
            ) {
              onComplete();
            }
          },
        },
        stagger! * index
      );

      if (zoom) {
        tl.to(
          unRefedElement!,
          {
            scale: 1,
            ease: "circ.out",
          },
          "+=0.4"
        );
      }

      return tl;
    };

    useSplitText(unRefedElement!, selectAnimation, select!, {
      splitBy: splitBy!,
      wrapping: {
        wrapType: "span",
        wrapClass: "overflow-hidden inline-block",
      },
      shouldBeMounted: shouldBeMounted!,
      onComplete,
    });
  }, animationOptions);
}
