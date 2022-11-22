import { DirectusThumbnailOptions } from "nuxt-directus/dist/runtime/types";

export const getDirectusImage = (
  id: string,
  options?: DirectusThumbnailOptions
) => {
  const { getThumbnail } = useDirectusFiles();
  return getThumbnail(id, options);
};
