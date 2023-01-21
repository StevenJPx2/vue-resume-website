import { PropType } from "vue";

const staticAssets = { yellowEllipse: "50df2fbb-aa3c-44ed-b1f9-4791a0769464" };

const props = {
  id: {
    type: String as PropType<keyof typeof staticAssets | string>,
    required: true,
  },
  sizes: {
    type: Array as PropType<number[]>,
    default: [320, 640, 768, 1024, 1280, 1536],
  },
  imgAttrs: Object as PropType<{ [k: string]: any }>,
};

type Formats = "png" | "webp";

export default defineComponent({
  name: "DirectusImg",
  props,
  setup(props) {
    const id =
      staticAssets[props.id! as keyof typeof staticAssets] ?? props.id!;
    const maxSize = Math.max(...props.sizes);
    const urls = Object.fromEntries<{ width: number; link: string }[]>(
      (["png", "webp"] as Formats[]).map((format) => [
        format,

        props.sizes.map((width) => ({
          width,
          link: getDirectusImage(id, { width, format }),
        })),
      ])
    ) as { [f in Formats]: { width: number; link: string }[] };

    const formattedSizes = (format: Formats) =>
      urls[format]
        .map(({ width }) => `(max-width: ${width}px) ${width}px`)
        .join(", ");

    const formattedSrcset = (format: Formats) =>
      urls[format].map(({ width, link }) => `${link} ${width}w`).join(", ");

    return () =>
      h("picture", {}, [
        h("source", {
          type: "image/webp",
          sizes: formattedSizes("webp"),
          srcset: formattedSrcset("webp"),
        }),
        h("img", {
          ...props.imgAttrs,
          src: urls.png.find(({ width }) => width === maxSize)?.link,
          sizes: formattedSizes("png"),
          srcset: formattedSrcset("png"),
        }),
      ]);
  },
});
