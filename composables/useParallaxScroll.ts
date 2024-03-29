import { breakpointsTailwind, MaybeRef } from "@vueuse/core";
import { AnimationOptions } from "./useAnimation";

type Options = {
  scrollSpeed: number;
  mobileFactor?: number;
  scrollSpeedMobile?: number;
  scrollStart?: string;
} & AnimationOptions;

const defaultOptions: Options = {
  scrollSpeed: 1,
  mobileFactor: 3,
  scrollStart: "top 50%",
  ...defaultAnimationOptions,
  hasScroll: true,
};

export default function(el: MaybeRef<HTMLElement>, options = defaultOptions) {
  const isMobile = useBreakpoints(breakpointsTailwind).smallerOrEqual("md");
  const scrollEl = unrefElement(el)!;

  const {
    scrollSpeed,
    mobileFactor,
    scrollSpeedMobile,
    scrollStart,
    ...animationOptions
  } = Object.assign(defaultOptions, options);
  const speed =
    isMobile.value && scrollSpeedMobile !== null
      ? scrollSpeedMobile!
      : isMobile.value
        ? scrollSpeed * mobileFactor!
        : scrollSpeed;
  const rate = 100;

  useAnimation((tl) => {
    tl.set(scrollEl, { y: 0 }).to(scrollEl, {
      y: rate * speed,
      scrollTrigger: {
        start: scrollStart!,
        trigger: scrollEl,
        scrub: 0.5,
      },
      ease: "none",
    });
  }, animationOptions);
}
