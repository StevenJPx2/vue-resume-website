import { breakpointsTailwind, MaybeRef } from "@vueuse/core";
import { AnimationOptions } from "./useAnimation";

type Options = {
  scrollSpeed: number;
  scrollSpeedMobile?: number;
  scrollStart: string;
} & AnimationOptions;

const defaultOptions: Options = {
  scrollSpeed: 1,
  scrollStart: "top 50%",
  ...defaultAnimationOptions,
  hasScroll: true,
};

export default function (el: MaybeRef<HTMLElement>, options = defaultOptions) {
  const isMobile = useBreakpoints(breakpointsTailwind).smaller("md");
  const scrollEl = unrefElement(el)!;

  const { scrollSpeed, scrollSpeedMobile, scrollStart, ...animationOptions } =
    Object.assign(defaultOptions, options);
  const speed =
    isMobile.value && scrollSpeedMobile !== null
      ? scrollSpeedMobile!
      : scrollSpeed;
  const rate = 100;

  useAnimation((tl) => {
    tl.set(scrollEl, { y: 0 }).to(scrollEl, {
      y: rate * speed,
      scrollTrigger: {
        start: scrollStart,
        trigger: scrollEl,
        scrub: 0.5,
      },
      ease: "none",
    });
  }, animationOptions);
}
