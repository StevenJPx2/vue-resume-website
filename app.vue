<script lang="ts" setup>
import * as imagesLoaded from "imagesloaded";
import Main from "~/components/Main.vue";
import Languages from "~/components/Languages.vue";
import Projects from "~/components/Projects.vue";
import Contact from "~/components/Contact.vue";
const pageNo = ref(0);
const pages = [Main, Languages, Projects, Contact];
const loading = ref(true);
const backOrForward = ref<"back" | "forward">("forward");

watch(pageNo, (oldPageNo, newPageNo) => {
  backOrForward.value = oldPageNo < newPageNo ? "forward" : "back";
});

tryOnMounted(() => {
  imagesLoaded(document.querySelectorAll("img"), { background: true }, () => {
    loading.value = false;
  });
});
</script>

<template>
  <div
    class="grid place-items-center w-screen h-screen bg-zinc-900 text-slate-50 clip touch-none"
  >
    <div v-if="loading">
      <Loading />
      <div class="hidden">
        <Main />
        <Languages />
        <Projects />
        <Contact />
      </div>
    </div>
    <div v-else>
      <Navigator v-model:page-no="pageNo" :no-of-pages="pages.length" />
      <transition
        :name="`slide-${backOrForward}`"
        mode="out-in"
        :duration="{ enter: 1000, leave: 300 }"
      >
        <keep-alive>
          <component :is="pages[pageNo]" />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;
@import url("https://cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css");

@layer base {
  html {
    @apply font-['Hack','monospace'];
  }

  h1,
  .h1 {
    @apply font-bold;
    @apply text-[12vw];

    @screen md {
      @apply text-[5vw];
    }
  }

  h2,
  .h2 {
    @apply font-bold;
    @apply text-[10vw];

    @screen md {
      @apply text-[4.5vw];
    }
  }

  h3,
  .h3 {
    @apply font-bold;
    @apply text-[7vw];

    @screen md {
      @apply text-[2.8vw];
    }
  }

  p,
  .p {
    @apply text-[5vw];

    @screen md {
      @apply text-[1.3vw];
    }
  }
}
@layer utilities {
  .clip {
    @apply overflow-hidden;
  }

  .mobile-scroll {
    @apply overflow-x-hidden;
    @apply overflow-y-scroll;
    @apply max-h-[50vh];
  }

  .wrapper {
    @apply w-screen;
    @apply grid;
    @apply grid-rows-[auto];
    @apply gap-y-[3.9vw];
    @apply grid-cols-16;
    @screen md {
      @apply gap-y-0;
      @apply grid-cols-24;
    }
  }
}

.slide-back,
.slide-forward {
  &-enter-active {
    .animate {
      @apply transition;
      @apply ease-out-expo;
      @apply duration-1000;
      @apply pointer-events-none;
    }

    .lang-logo {
      @apply transition;
      @apply ease-out-back;
      @apply duration-500;
    }
  }

  &-leave-active {
    .animate {
      @apply transition;
      @apply ease-in-out-sine;
      @apply duration-300;
    }
  }

  &-enter-from {
    .lang-logo {
      @apply origin-bottom;
      @apply scale-0;
    }
  }

  &-leave-to {
    .lang-logo {
      @apply origin-bottom;
      @apply scale-100;
    }
  }
}

.slide-back-enter-from,
.slide-forward-leave-to {
  .animate {
    @apply translate-x-[100vw];
    @apply opacity-0;
  }
}

.slide-back-leave-to,
.slide-forward-enter-from {
  .animate {
    @apply translate-x-[-100vw];
    @apply opacity-0;
  }
}

.slide-fade {
  &-enter {
    &-active {
      @apply transition;
      @apply ease-out-sine;
      @apply duration-500;
      @apply pointer-events-none;
    }

    &-from {
      @apply translate-y-[5vw];
      @apply opacity-0;
    }
  }

  &-leave {
    &-active {
      @apply transition;
      @apply ease-in-out-sine;
      @apply duration-300;
      @apply pointer-events-none;
    }

    &-to {
      @apply translate-y-[-5vw];
      @apply opacity-0;
    }
  }
}
</style>
