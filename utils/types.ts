import { MaybeRef } from "@vueuse/core";
import { TypesListString, TypesValue } from "split-type";

export type SplittingTypes = TypesValue[] | TypesListString;
export type Pages = "home" | "blog" | "project";
export type MaybeRefHTMLElement = MaybeRef<HTMLElement | null | undefined>;
export type Store = {
  hasInitialAnimationLoaded: boolean;
  currentPage: Pages;
  loading: boolean;
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
  technologies: Technologies[];
}
export interface Technologies {
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

export interface BlogPost {
  id: string;
  status: "draft" | "published" | "archived";
  sort: number;
  user_created: PublicUser;
  date_created: Date;
  user_updated: PublicUser;
  date_updated: Date;
  title: string;
  slug?: string;
  header?: string;
  header_type?: "video" | "image";
  body: string;
}

export interface Experience {
  id: string;
  sort: number;
  workplace_name: string;
  workplace_title: string;
  from: string;
  to?: string;
  description: BlogPost;
}
