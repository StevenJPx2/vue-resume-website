<script lang="ts" setup>
import imagesLoaded from "imagesloaded";
import Main from "~/components/Main.vue";
import Languages from "~/components/Languages.vue";
import Projects from "~/components/Projects.vue";
import Contact from "~/components/Contact.vue";

const currentPage = ref<HTMLElement>();
const pageNo = ref(0);
const pressedNumber = ref(0);
const pages = [Main, Languages, Projects, Contact];
const noOfPages = pages.length;
const loading = ref(true);
const backOrForward = ref<"back" | "forward">("forward");
const { left, right, space, Ctrl_P, Cmd_P, current } = useMagicKeys();
const pageLink =
  "https://drive.google.com/file/d/1TFPiWAhvc8DtcoF6zMpUx1SPG8oi5qof/view?usp=sharing";

usePointerSwipe(currentPage, {
  onSwipeEnd: (_, direction) => {
    pageNo.value =
      direction === "RIGHT"
        ? pageNo.value > 0
          ? pageNo.value - 1
          : 0
        : direction === "LEFT"
        ? pageNo.value < noOfPages - 1
          ? pageNo.value + 1
          : pageNo.value
        : pageNo.value;
  },
});

watch(pageNo, (oldPageNo, newPageNo) => {
  backOrForward.value = oldPageNo < newPageNo ? "forward" : "back";
});

whenever(left, () => {
  pageNo.value = pageNo.value > 0 ? pageNo.value - 1 : 0;
});

whenever(
  () => right.value || space.value,
  () => {
    pageNo.value =
      pageNo.value < noOfPages - 1 ? pageNo.value + 1 : pageNo.value;
  }
);
whenever(
  () => Ctrl_P.value || Cmd_P.value,
  () => {
    window.location.assign(pageLink);
  }
);
watch(current, () => {
  Array.from(Array(noOfPages).keys()).some((val) =>
    Array.from(current.values()).find((currentPress) => {
      if (currentPress == `Digit${val + 1}`) {
        pressedNumber.value = val;
      }
    })
  );
});

watch(pressedNumber, () => {
  pageNo.value = pressedNumber.value;
});

tryOnMounted(() => {
  imagesLoaded(document.querySelectorAll("img"), { background: true }, () => {
    loading.value = false;
  });
});
</script>

<template>
  <Html>
    <Head>
      <Title>Steven John</Title>
      <Meta name="title" content="Steven John" />
      <Meta property="og:title" content="Steven John" />
      <Meta
        name="description"
        content="I am a full-stack web developer, with laser focus on everything, such as next-gen image formats, SEO optimization, interactive design to Kubernetes and Docker to create the most engaging experiences with the least running cost."
      />
      <Meta
        name="keywords"
        content="Web Design, Graphic Design, Animation, micro-interaction, SEO, Kubernetes, Docker, Python, Rust, TypeScript, JavaScript, Swift, C, Dart, MongoDB, PostgresQL, GraphQL spec, Java, Tensorflow, Keras, Flask, Pygame, Flutter, Actix, Websockets, Vuejs, Nuxtjs, Tailwind CSS, React, Expressjs"
      />
      <Meta name="robots" content="index, follow" />
      <Meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <Meta name="language" content="English" />
      <Meta property="og:site_name" content="Steven John" />
      <Meta property="og:url" content="https://stevenjohn.co" />
      <Meta
        property="og:description"
        content="I am a full-stack web developer, with laser focus on everything, such as next-gen image formats, SEO optimization, interactive design to Kubernetes and Docker to create the most engaging experiences with the least running cost."
      />
      <Meta property="og:type" content="website" />
    </Head>
  </Html>

  <div
    class="grid place-items-center w-screen h-screen bg-zinc-900 text-slate-50 clip touch-none"
    ref="currentPage"
  >
    <transition
      name="slide-bottom"
      mode="out-in"
      :duration="{ enter: 1000, leave: 300 }"
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
        <Navigator v-model:page-no="pageNo" :no-of-pages="noOfPages" />
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
    </transition>
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

  img {
    /*@apply pointer-events-none;*/
  }
}
@layer utilities {
  .clip {
    @apply overflow-hidden;
  }

  .mobile-scroll {
    @apply overflow-x-hidden;
    @apply overflow-y-scroll;
    @apply touch-pan-y;
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

.slide {
  &-back,
  &-forward,
  &-bottom,
  &-top {
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

  &-bottom-enter-from,
  &-top-leave-to {
    .animate {
      @apply translate-y-[100vw];
      @apply opacity-0;
    }
  }

  &-bottom-leave-to,
  &-top-enter-from {
    .animate {
      @apply translate-y-[-100vw];
      @apply opacity-0;
    }
  }

  &-back-enter-from,
  &-forward-leave-to {
    .animate {
      @apply translate-x-[100vw];
      @apply opacity-0;
    }
  }

  &-back-leave-to,
  &-forward-enter-from {
    .animate {
      @apply translate-x-[-100vw];
      @apply opacity-0;
    }
  }

  &-fade {
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
}
</style>
