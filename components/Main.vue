<template>
  <div class="h-screen wrapper isolate">
    <img
      src="~/assets/head-photo.webp"
      alt="My photo"
      class="
        col-start-1 col-end-16
        scale-125
        translate-x-[30vw]
        translate-y-[-15vw]
        md:scale-100
        md:col-start-11 md:col-end-22 md:h-[94vh]
        row-start-1 row-end-3
        self-end
        -z-20
      "
    />
    <div
      class="
        h-screen
        w-screen
        row-start-1 row-end-3
        col-start-1 col-end-16
        md:hidden
        bg-zinc-900/70
        -z-10
      "
    ></div>
    <h2
      class="
        col-start-2 col-end-16
        row-start-1
        self-end
        uppercase
        md:col-start-3 md:col-end-10
      "
    >
      Steven John
    </h2>
    <section
      class="
        col-start-2 col-end-14
        md:col-start-3 md:col-end-12
        space-y-[1.2vw]
        mt-[2vw]
        row-start-2
      "
    >
      <p>
        I’m a multi-hyphenate engineer, mainly focusing on interactive design.
        Animation and micro-interaction is an addiction for me right now.
      </p>
      <p>I love graphic design, reading and singing.</p>
      <p>My current IDE is Neovim. Yes, it is my IDE.</p>
    </section>
  </div>
</template>
