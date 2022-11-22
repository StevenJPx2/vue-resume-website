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
export interface HomeSingleton {
  header_image: string;
  tagline: string;
  about_me: string;
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
