// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-directus",
    "nuxt-icon",
    "@nuxt/image-edge",
  ],
  directus: { url: "https://dgaj6fp4.directus.app" },
});
