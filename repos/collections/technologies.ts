import { Technology } from "~/utils/types";
import { generateName } from "../helpers";

type BrandedTechnology<T extends Technology["id"]> = Omit<Technology, "id"> & {
  id: T;
};

const defineTechnologies = <T extends Technology["id"]>(
  techs: (Omit<BrandedTechnology<T>, "name"> & { name?: string })[],
) =>
  Object.fromEntries(
    techs.map((tech) => [
      tech.id,
      {
        ...generateName(tech.id),
        ...tech,
        link: !!tech.link
          ? tech.link.startsWith("https://")
            ? `https://${tech.link}`
            : tech.link
          : undefined,
        icon_name: !!tech.icon_name
          ? !!tech.icon_name.match(/\w+:\w/)
            ? tech.icon_name
            : `simple-icons:${tech.icon_name}`
          : undefined,
      },
    ]),
  ) as {
    [P in T]: BrandedTechnology<T>;
  };

const technologies = defineTechnologies([
  // Languages

  {
    id: "typescript",
    icon_name: "typescript",
    link: "www.typescriptlang.org/",
    color: "#3178C6",
  },
  {
    id: "python",
    icon_name: "python",
    link: "www.python.org/",
    color: "#3776AB",
  },
  {
    id: "rust",
    icon_name: "rust",
    link: "www.rust-lang.org/",
    color: "#000000",
  },
  {
    id: "c",
    icon_name: "c",
    color: "#A8B9CC",
  },
  {
    id: "dart",
    icon_name: "dart",
    link: "dart.dev",
    color: "#0175C2",
  },
  {
    id: "swift",
    icon_name: "swift",
    link: "swift.org",
    color: "#F05138",
  },
  {
    id: "lua",
    icon_name: "lua",
    link: "lua.org",
    color: "#2C2D72",
  },
  {
    id: "bash",
    icon_name: "gnubash",
    link: "www.gnu.org/software/bash/",
    color: "#4EAA25",
  },
  {
    id: "php",
    icon_name: "php",
    link: "php.net",
    color: "#777BB4",
  },
  {
    id: "sql",
    icon_name: "postgresql",
    link: "postgresql.org",
    color: "#4169E1",
  },
  {
    id: "java",
    icon_name: "cib:java",
  },

  // Frameworks

  {
    id: "nuxt",
    icon_name: "nuxtdotjs",
    link: "nuxt.com",
    color: "#00DC82",
  },
  {
    id: "next",
    icon_name: "nextdotjs",
    link: "nextjs.org",
  },
  { id: "svelte", icon_name: "svelte", link: "svelte.dev", color: "#FF3E00" },
  {
    id: "sveltekit",
    icon_name: "svelte",
    link: "kit.svelte.dev",
    color: "#FF3E00",
  },
  { id: "astro", icon_name: "astro", link: "astro.build", color: "#BC52EE" },
  {
    id: "vue",
    icon_name: "vuedotjs",
    link: "vuejs.org",
    color: "#4FC08D",
  },
  {
    id: "react",
    icon_name: "react",
    link: "react.dev",
    color: "#61DAFB",
  },
  {
    id: "flutter",
    icon_name: "flutter",
    link: "flutter.dev",
    color: "#02569B",
  },
  {
    id: "react-native",
    icon_name: "react",
    link: "reactnative.dev",
    color: "#61DAFB",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    icon_name: "fastapi",
    link: "fastapi.tiangolo.com/",
    color: "#009688",
  },
  {
    id: "flask",
    icon_name: "flask",
    link: "flask.palletsprojects.com/",
  },
  {
    id: "actix",
    link: "actix.rs",
  },
  {
    id: "poem-rs",
    name: "Poem.rs",
    link: "github.com/poem-web/poem",
  },
  {
    id: "apache-beam",
    link: "beam.apache.org/",
    icon_name: "apache",
  },
  {
    id: "tensorflow",
    link: "tensorflow.org/",
    icon_name: "tensorflow",
    color: "#FF6F00",
  },
  {
    id: "keras",
    link: "keras.io/",
    icon_name: "keras",
    color: "#D00000",
  },
  {
    id: "tailwind",
    icon_name: "tailwindcss",
    link: "tailwindcss.com",
    color: "#06B6D4",
  },

  // Databases
  {
    id: "postgresql",
    name: "PostgresQL",
    icon_name: "postgresql",
    link: "postgresql.org",
    color: "#4169E1",
  },
  {
    id: "mysql",
    name: "MySQL",
    icon_name: "mysql",
    link: "mysql.com",
    color: "#4479A1",
  },
  {
    id: "mongo-db",
    name: "MongoDB",
    icon_name: "mongodb",
    link: "mongodb.com",
    color: "#47A248",
  },
  {
    id: "algolia",
    icon_name: "algolia",
    link: "algolia.com",
    color: "#003DFF",
  },

  // Platforms
  {
    id: "aws",
    name: "AWS",
    icon_name: "amazonaws",
    link: "aws.amazon.com",
    color: "#232F3E",
  },
  {
    id: "gcp",
    name: "Google Cloud",
    icon_name: "googlecloud",
    link: "cloud.google.com",
    color: "#4285F4",
  },
  {
    id: "heroku",
    icon_name: "heroku",
    link: "heroku.com",
    color: "#430098",
  },
  {
    id: "digitalocean",
    name: "DigitalOcean",
    icon_name: "digitalocean",
    link: "digitalocean.com",
    color: "#0080FF",
  },
  {
    id: "netlify",
    icon_name: "netlify",
    link: "netlify.com",
    color: "#00C7B7",
  },
  {
    id: "vercel",
    icon_name: "vercel",
    link: "vercel.com",
  },
  {
    id: "railway",
    icon_name: "railway",
    link: "railway.app",
    color: "#0B0D0E",
  },
  {
    id: "firebase",
    icon_name: "firebase",
    link: "firebase.google.com",
    color: "#FFCA28",
  },
  {
    id: "supabase",
    icon_name: "supabase",
    link: "supabase.com",
    color: "#3FCF8E",
  },

  // SaaS
  { id: "retool", icon_name: "retool", link: "retool.com", color: "#F63366" },
  { id: "pipedream", link: "pipedream.com", color: "#00D784" },
  {
    id: "razorpay",
    icon_name: "razorpay",
    link: "razorpay.com",
    color: "#0C2451",
  },
  { id: "zoho", icon_name: "zoho", link: "zoho.com", color: "#E42527" },
  {
    id: "directus",
    icon_name: "directus",
    link: "directus.cloud",
    color: "#263238",
  },
  { id: "sanity", icon_name: "sanity", link: "sanity.io", color: "#F03E2F" },
  { id: "strapi", icon_name: "strapi", link: "strapi.io", color: "#4945FF" },
]);

export default technologies;

export type TechnologyKeys = keyof typeof technologies;
