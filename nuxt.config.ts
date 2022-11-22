// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/fontaine",
    "nuxt-directus",
    "nuxt-icon",
    "@nuxt/image-edge",
    "nuxt-svgo",
  ],
  css: [
    "@/assets/fonts/highrise/stylesheet.css",
    "@/assets/fonts/neue-montreal/stylesheet.css",
  ],
  directus: { url: "https://dgaj6fp4.directus.app/" },
  image: { dir: "assets" },
});
