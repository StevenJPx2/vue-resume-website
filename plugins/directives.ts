export default defineNuxtPlugin((nuxtApp) => {
  const directive = nuxtApp.vueApp.directive;
  directive("slide-in", {
    mounted(el, { value }) {
      useWordSlideInAnimation(el, value);
    },
  });

  directive("parallax", {
    mounted(el, { value }) {
      useParallaxScroll(el, value);
    },
  });
});
