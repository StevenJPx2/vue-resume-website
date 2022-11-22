import { breakpointsTailwind } from "@vueuse/core";

export const getTailwindClasses = (args: {
  [k in keyof typeof breakpointsTailwind | "default"]?: {
    [v: string]: string;
  };
}) => {
  args;
};

export const commonPadding = "md:px-[14vw]";
