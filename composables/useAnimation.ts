import { GSAPOptions } from "./useGsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export type AnimationOptions = {
  duration?: number;
  delay?: number;
  onStart?: () => void;
  onComplete?: () => void;
  onCompleteWithTL?: (tl: GSAPTimeline) => void;
  shouldBeMounted?: boolean;
  hasScroll?: boolean;
} & (
    | { activation: "immediate" }
    | { activation: "scroll"; scrollTrigger: gsap.DOMTarget | ScrollTrigger.Vars }
    | { activation: "trigger"; paused: boolean }
  );

export const defaultAnimationOptions: AnimationOptions = {
  duration: 1,
  delay: 0,
  activation: "immediate",
  hasScroll: false,
};

export default function(
  gsapFn: (tl: GSAPTimeline) => void,
  options = defaultAnimationOptions
) {
  const {
    duration,
    delay,
    onStart,
    onComplete,
    onCompleteWithTL,
    shouldBeMounted,
    ...otherOptions
  } = Object.assign(defaultAnimationOptions, options);

  const gsapOptions: GSAPOptions = {
    duration,
    delay,
    onStart,
    onComplete,
    onCompleteWithTL,
    shouldBeMounted,
  };
  let plugins: object[] = [];

  if (otherOptions.activation === "scroll" || otherOptions.hasScroll === true) {
    plugins.push(ScrollTrigger);
  }

  switch (otherOptions.activation) {
    case "trigger": {
      gsapOptions.paused = otherOptions.paused;
      break;
    }
  }
  useGsap(gsapFn, gsapOptions, plugins);
}
