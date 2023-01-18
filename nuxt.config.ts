// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  routeRules: { "/**": { swr: true } },
  app: {
    head: {
      title: "Steven John",
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        {
          rel: "mask-icon",
          href: "/safari-pinned-tab.svg",
          color: "#ffcd00",
        },
        { rel: "shortcut icon", href: "/favicon.ico" },
      ],
      meta: [
        { name: "msapplication-TileColor", content: "#131313" },
        { name: "msapplication-Config", content: "/browserconfig.xml" },
        { name: "theme-color", content: "#FFE871" },
      ],
    },
  },
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/fontaine",
    "nuxt-directus",
    "nuxt-icon",
    "nuxt-svgo",
  ],
  css: [
    "@/assets/fonts/highrise/stylesheet.css",
    "@/assets/fonts/neue-montreal/stylesheet.css",
  ],
  directus: { url: "https://dgaj6fp4.directus.app/" },
});
