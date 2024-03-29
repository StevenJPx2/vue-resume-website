import { type KnownStuff } from "~~/utils/types";
import technologies, { type TechnologyKeys } from "./technologies";

type BrandedKnownStuff = Omit<KnownStuff, "technologies"> & {
  technologies: TechnologyKeys[];
};

const defineKnownStuff = (arr: BrandedKnownStuff[]): KnownStuff[] =>
  arr.map((obj) => ({
    ...obj,
    technologies: Array.from(new Set(obj.technologies)).map(
      (techName) => technologies[techName],
    ),
  }));

export default defineKnownStuff([
  {
    category: "Languages",
    technologies: [
      "typescript",
      "python",
      "dart",
      "rust",
      "bash",
      "lua",
      "php",
      "c",
      "java",
    ],
  },
  {
    category: "Frameworks",
    technologies: [
      "vue",
      "nuxt",
      "react",
      "next",
      "tailwind",
      "svelte",
      "sveltekit",
      "astro",
      "flutter",
      "react-native",
      "fastapi",
      "flask",
      "actix",
      "poem-rs",
      "apache-beam",
      "tensorflow",
      "keras",
    ],
  },
  {
    category: "Databases",
    technologies: ["postgresql", "mysql", "mongo-db", "algolia"],
  },
  {
    category: "Platforms",
    technologies: [
      "aws",
      "gcp",
      "netlify",
      "vercel",
      "digitalocean",
      "heroku",
      "railway",
      "firebase",
      "supabase",
    ],
  },
  {
    category: "SaaS",
    technologies: [
      "retool",
      "pipedream",
      "razorpay",
      "zoho",
      "directus",
      "sanity",
      "strapi",
    ],
  },
]);
