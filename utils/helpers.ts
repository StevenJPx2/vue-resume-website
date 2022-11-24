import { breakpointsTailwind } from "@vueuse/core";

export const getTailwindClasses = (args: {
  [k in keyof typeof breakpointsTailwind | "default"]?: {
    [v: string]: string;
  };
}) => {
  args;
};

export const commonPadding = "px-[4vw] md:px-[14vw]";
export const seoGeneratorHelper = (
  names: string[],
  content?: string,
  keyName: "property" | "name" = "property"
) =>
  names.map((name) => ({
    [keyName]: name,
    content,
  }));
export const seoGenerator = (content: {
  title: string;
  description: string;
  image: string;
}) => [
    ...seoGeneratorHelper(["title"], content.title, "name"),
    ...seoGeneratorHelper(["description"], content.description, "name"),
    ...seoGeneratorHelper(["og:title", "twitter:title"], content.title),
    ...seoGeneratorHelper(
      ["og:description", "twitter:description"],
      content.description
    ),
    ...seoGeneratorHelper(["og:image", "twitter:image"], content.image),
    { property: "twitter:card", content: "summary_large_image" },
  ];
