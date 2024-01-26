import { fdir } from "fdir";
import { defineNuxtPrepareHandler } from "nuxt-prepare/config";

export default defineNuxtPrepareHandler(async () => {
  const designs = await new fdir()
    .crawl("./public/assets/designs")
    .withPromise();
  return {
    state: {
      designs,
    },
  };
});
