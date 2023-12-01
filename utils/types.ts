import type { ParsedContent } from "@nuxt/content/dist/runtime/types";
import type { MaybeRef } from "@vueuse/core";

export type Pages = "home" | "blog" | "project";
export type MaybeRefHTMLElement = MaybeRef<HTMLElement | null | undefined>;
export type Store = {
  loadingStates: { initialAnimationLoaded: boolean; isLoading: boolean };
  navbar: {};
  footer: { showLinks: boolean; showBackground: boolean };
  links: Links[];
};

export interface PublicUser {
  first_name: string;
  last_name: string;
  avatar: string;
  title: string;
}

export interface Links {
  id: string;
  name: string;
  icon: string;
  link: string;
}

export interface HomeSingleton {
  header_image: string;
  tagline: string;
  about_me: string;
  footer_tagline: string;
}
export interface KnownStuff {
  category: string;
  technologies: Technology[];
}
export interface Technology {
  id: string;
  name: string;
  icon_name?: string;
  color?: string;
  link?: string;
}

export interface Philosophy {
  title: string;
  body: string;
}

export interface BlogPost extends ParsedContent {
  status: "draft" | "published" | "archived";
  author: PublicUser;
  date_created: string;
  title: string;
  header?: string;
  header_type?: "video" | "image";
}

export type BlogPostPreview = Pick<
  BlogPost,
  "user_created" | "date_created" | "title" | "slug" | "header" | "header_type"
>;

export interface Experience {
  id: string;
  sort: number;
  workplace_name: string;
  workplace_title: string;
  from: string;
  to?: string;
  description: Pick<BlogPost, "body" | "slug">;
}
