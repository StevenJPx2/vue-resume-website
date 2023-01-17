export default defineNuxtPlugin((nuxtApp) => {
  const directive = nuxtApp.vueApp.directive;
  directive("slide-in", {
    mounted(el, { value, modifiers }) {
      useWordSlideInAnimation(el, { ...value, ...modifiers });
    },
  });

  directive("parallax", {
    mounted(el, { value }) {
      useParallaxScroll(el, value);
    },
  });

  directive("line-clamp", {
    mounted(el) {
      useLineClamp(el);
    }
  })
});
