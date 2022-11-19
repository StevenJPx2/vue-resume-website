import { Store } from "~/utils/types";

export const useMainStore = () =>
  useState<Store>("mainStore", () => ({
    hasInitialAnimationLoaded: false,
    currentPage: "home",
    loading: true,
  }));
