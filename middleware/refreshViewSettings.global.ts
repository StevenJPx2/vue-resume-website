export default defineNuxtRouteMiddleware(() => {
  const store = useMainStore();
  store.value.footer = { showBackground: true, showLinks: true };
});
