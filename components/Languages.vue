<script setup lang="ts">
const openDisclosure = ref(0);
const knowledge = [
  {
    button: "Languages",
    info: " Diam ornare cras pellentesque tempor auctor elementum iaculis quis non. Neque, cras a elementum dolor et ac nulla proin. Iaculis facilisis rhoncus tincidunt dolor feugiat a tristique. ",
  },
  {
    button: "Frameworks",
    info: " Diam ornare cras pellentesque tempor auctor elementum iaculis quis non. Neque, cras a elementum dolor et ac nulla proin. Iaculis facilisis rhoncus tincidunt dolor feugiat a tristique. ",
  },
  {
    button: "Databases",
    info: " Diam ornare cras pellentesque tempor auctor elementum iaculis quis non. Neque, cras a elementum dolor et ac nulla proin. Iaculis facilisis rhoncus tincidunt dolor feugiat a tristique. ",
  },
  {
    button: "Cloud Platforms",
    info: " Diam ornare cras pellentesque tempor auctor elementum iaculis quis non. Neque, cras a elementum dolor et ac nulla proin. Iaculis facilisis rhoncus tincidunt dolor feugiat a tristique. ",
  },
];
// for tailwind row-start-3 row-start-4 row-start-5
</script>

<template>
  <div class="wrapper isolate mt-[-50vw] sm:mt-0">
    <div
      class="
        wrapper
        col-start-1 col-end-16
        translate-x-[25vw]
        sm:translate-x-0 sm:col-start-14 sm:col-end-22
        place-self-center
        !w-full
        row-start-1 row-end-3
        -z-20
        animate
        delay-75
      "
    >
      <img
        src="~/assets/rust-logo.svg"
        alt="Rust Logo"
        loading="eager"
        class="
          col-start-2 col-end-11
          row-start-1
          sm:col-start-3 sm:col-end-13
          lang-logo
          delay-[600ms]
        "
      />
      <img
        src="~/assets/nuxt-logo.svg"
        alt="Nuxt Logo"
        loading="eager"
        class="
          col-start-10
          row-start-1
          sm:col-start-12
          col-end-15
          lang-logo
          sm:col-end-18
          delay-[625ms]
        "
      />
      <img
        src="~/assets/python-logo.svg"
        alt="Python Logo"
        loading="eager"
        class="
          row-start-1
          col-start-9 col-end-15
          sm:col-start-11 sm:col-end-19
          mt-[34vw]
          sm:mt-[8vw]
          lang-logo
          delay-[575ms]
        "
      />
      <img
        src="~/assets/vue-logo.svg"
        alt="Vue Logo"
        loading="eager"
        class="
          row-start-1
          col-start-2 col-end-5
          sm:col-start-3 sm:col-end-7
          mt-[51vw]
          sm:mt-[13vw]
          lang-logo
          delay-[550ms]
        "
      />
      <img
        src="~/assets/ts-logo.svg"
        alt="Typescript Logo"
        loading="eager"
        class="
          row-start-1
          col-start-5 col-end-9
          sm:col-start-7 sm:col-end-12
          mt-[57vw]
          sm:mt-[14.4vw]
          lang-logo
          delay-[525ms]
        "
      />
      <img
        src="~/assets/mongodb-logo.svg"
        alt="MongoDB Logo"
        loading="eager"
        f
        class="
          row-start-1
          col-start-9 col-end-12
          sm:col-start-11 sm:col-end-15
          mt-[71vw]
          sm:mt-[19vw]
          lang-logo
          delay-500
        "
      />
    </div>
    <div
      class="absolute top-0 w-screen h-screen sm:hidden bg-zinc-900/80 -z-10"
    ></div>

    <h2
      class="
        row-start-1
        col-start-2 col-end-16
        sm:col-start-5 sm:col-end-13
        animate
        sm:mb-[2vw]
      "
    >
      What I know
    </h2>
    <div
      class="
        mobile-scroll
        col-start-2
        sm:col-start-5 sm:col-end-13
        col-end-14
        animate
        row-start-2
      "
    >
      <div
        v-for="({ button, info }, index) in knowledge"
        :key="button"
      >
        <h3
          @click="
            if (openDisclosure != index) openDisclosure = index;
            else openDisclosure = -1;
          "
          class="
            pb-[1.2vw]
            mb-[1.2vw]
            border-slate-50/70 border-b-[0.2vw]
            cursor-pointer
          "
        >
          {{ button }}
        </h3>
        <p :class="{ hidden: openDisclosure != index }">
          {{ info }}
        </p>
      </div>
    </div>
  </div>
</template>
