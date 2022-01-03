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
  <div class="place-content-center wrapper isolate touch-none">
    <div
      class="
        wrapper
        col-start-1 col-end-16
        translate-x-[25vw]
        md:translate-x-0
        md:col-start-14 md:col-end-22
        place-self-center
        !w-full
        row-start-1 row-end-6
        z-[-2]
      "
    >
      <img
        src="~/assets/rust-logo.svg"
        alt="Rust Logo"
        class="col-start-2 col-end-11 row-start-1 md:col-start-3 md:col-end-13"
      />
      <img
        src="~/assets/nuxt-logo.svg"
        alt="Nuxt Logo"
        class="col-start-10 row-start-1 md:col-start-12 col-end-15 md:col-end-18"
      />
      <img
        src="~/assets/python-logo.svg"
        alt="Python Logo"
        class="
          row-start-1
          col-start-9 col-end-15
          md:col-start-11 md:col-end-19
          mt-[34vw]
          md:mt-[9vw]
        "
      />
      <img
        src="~/assets/vue-logo.svg"
        alt="Vue Logo"
        class="
          row-start-1
          col-start-2 col-end-5
          md:col-start-3 md:col-end-8
          mt-[51vw]
          md:mt-[12vw]
        "
      />
      <img
        src="~/assets/ts-logo.svg"
        alt="Typescript Logo"
        class="
          row-start-1
          col-start-5 col-end-9
          md:col-start-7 md:col-end-13
          mt-[57vw]
          md:mt-[13.4vw]
        "
      />
      <img
        src="~/assets/mongodb-logo.svg"
        alt="MongoDB Logo"
        class="
          row-start-1
          col-start-9 col-end-12
          md:col-start-11 md:col-end-15
          mt-[71vw]
          md:mt-[17vw]
        "
      />
    </div>
    <div
      class="absolute top-0 w-screen h-screen bg-zinc-900/80 md:hidden z-[-1]"
    ></div>

    <h2
      class="
        row-start-1
        col-start-2 col-end-16
        md:col-start-5 md:col-end-13
        mb-[3vw]
      "
    >
      What I know
    </h2>
    <div
      v-for="({ button, info }, index) in knowledge"
      :key="button"
      class="col-start-2 md:col-start-5 md:col-end-13 col-end-14"
      :class="`row-start-${index+2}`"
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
</template>
