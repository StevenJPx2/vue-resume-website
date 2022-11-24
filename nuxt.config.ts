// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Steven John",
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "~/public/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "~/public/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "~/public/favicon-16x16.png",
        },
        { rel: "manifest", href: "~/public/site.webmanifest" },
        {
          rel: "mask-icon",
          href: "~/public/safari-pinned-tab.svg",
          color: "#ffcd00",
        },
        { rel: "shortcut icon", href: "~/public/favicon.ico" },
      ],
      meta: [
        { name: "msapplication-TileColor", content: "#131313" },
        { name: "msapplication-Config", content: "~/public/browserconfig.xml" },
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
