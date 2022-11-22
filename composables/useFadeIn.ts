import { MaybeRefHTMLElement } from "~/utils/types";
import { AnimationOptions } from "./useAnimation";

type Options = {} & AnimationOptions;

const defaultOptions: Options = {
  ...defaultAnimationOptions,
  duration: 0.8,
};

export default function(el: MaybeRefHTMLElement, options = defaultOptions) {
  useAnimation((tl) => {
    const unRefedElement = unrefElement(el)!;
    tl.fromTo(unRefedElement, {}, {});
  }, options);
}
