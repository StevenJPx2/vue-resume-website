export default defineNuxtRouteMiddleware(() => {
  const store = useMainStore();
  const isLoading = $isLoading(store);
  isLoading.value = true;

  store.value.footer = { showBackground: true, showLinks: true };
});
