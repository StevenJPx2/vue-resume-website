import { gsap } from "gsap";

export type GSAPOptions = gsap.TimelineVars & {
  shouldBeMounted?: boolean;
};

export default function(
  gsapFn: (tl: GSAPTimeline) => void,
  options: GSAPOptions = {
    shouldBeMounted: true,
  },
  plugins?: object[]
) {
  const { shouldBeMounted, ...gsapOptions } = options;
  const fn = () => {
    if (plugins !== undefined && plugins.length > 0)
      gsap.registerPlugin(...plugins);
    const tl = gsap.timeline({
      ...gsapOptions,
      onComplete() {
        if (gsapOptions.onComplete) gsapOptions.onComplete();
      },
    });
    gsapFn(tl);
  };

  if (shouldBeMounted) {
    tryOnMounted(fn);
  } else {
    fn();
  }
}
