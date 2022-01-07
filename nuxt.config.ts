import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  buildModules: [
    '@vueuse/nuxt'
  ],
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
});
