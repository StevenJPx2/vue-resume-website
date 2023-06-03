import { Ref } from "vue";
import { Store } from "~/utils/types";
import { links } from "~~/repos";

export const useMainStore = () =>
  useState<Store>(
    "mainStore",
    (): Store => ({
      loadingStates: { initialAnimationLoaded: false, isLoading: true },
      navbar: {},
      footer: { showLinks: true, showBackground: true },
      links,
    })
  );

export const $isLoading = (store: Ref<Store>) =>
  computed({
    get: () => store.value.loadingStates.isLoading,
    set: (val) => (store.value.loadingStates.isLoading = val),
  });

export const $loadingAnimationFinished = (store: Ref<Store>) =>
  computed({
    get: () => store.value.loadingStates.initialAnimationLoaded,
    set: (val) => (store.value.loadingStates.initialAnimationLoaded = val),
  });
