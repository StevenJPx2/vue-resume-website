import { breakpointsTailwind } from "@vueuse/core";

export const getTailwindClasses = (args: {
  [k in keyof typeof breakpointsTailwind | "default"]?: {
    [v: string]: string;
  };
}) => {
  args;
};

export const commonPadding = "px-[4vw] md:px-[14vw]";
export const commonMargin = "mx-[4vw] md:mx-[14vw]";
