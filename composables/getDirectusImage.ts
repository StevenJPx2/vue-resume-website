import { DirectusThumbnailOptions } from "nuxt-directus/dist/runtime/types";

export default function(id: string, options?: DirectusThumbnailOptions) {
  const { getThumbnail } = useDirectusFiles();
  return getThumbnail(id, options);
}
