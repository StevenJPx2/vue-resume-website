import { TypesListString, TypesValue } from "split-type";

export type SplittingTypes = TypesValue[] | TypesListString;
export type Pages = "home" | "blog" | "project";
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
