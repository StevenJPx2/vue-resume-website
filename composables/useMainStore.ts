import { Store } from "~/utils/types";

export const useMainStore = () =>
  useState<Store>("mainStore", () => ({
    loadingStates: { initialAnimationLoaded: false, isLoading: true },
    navbar: {},
    footer: { showLinks: true },
    links: [],
    currentPage: "home",
  }));
