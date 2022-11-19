import { Ref } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { breakpointsTailwind } from "@vueuse/core";

type Options = {
  scrollSpeed: number;
  scrollSpeedMobile?: number;
  scrollStart: string;
};

const defaultOptions: Options = { scrollSpeed: 1, scrollStart: "top 50%" };

export default function(
  el: Ref<HTMLElement> | HTMLElement | null = null,
  options: Options = defaultOptions
) {
  const isMobile = useBreakpoints(breakpointsTailwind).smaller("md");
  const scrollEl = unref(el);
  const { scrollSpeed, scrollSpeedMobile, scrollStart } = Object.assign(
    defaultOptions,
    options
  );

  tryOnMounted(() => {
    gsap.registerPlugin(ScrollTrigger);
    const speed =
      isMobile.value && scrollSpeedMobile !== null
        ? scrollSpeedMobile!
        : scrollSpeed;
    const rate = 100;

    gsap.set(scrollEl, { y: 0 });
    gsap.to(scrollEl, {
      y: rate * speed,
      scrollTrigger: {
        start: scrollStart,
        trigger: scrollEl,
        scrub: 0.5,
      },
      ease: "none",
    });
  });
}
