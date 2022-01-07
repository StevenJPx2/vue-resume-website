<template>
  <div class="wrapper isolate mt-[-50vw] sm:mt-0">
    <img
      src="~/assets/head-photo.webp"
      alt="My photo"
      loading="eager"
      class="
        col-start-1 col-end-16
        scale-125
        translate-x-[30vw] translate-y-[55vw]
        sm:translate-x-0
        sm:translate-y-0
        sm:scale-100
        sm:col-start-11
        sm:col-end-22
        sm:h-[94vh]
        row-start-1 row-end-3
        self-end
        -z-20
        object-contain object-bottom
        animate
        delay-75
      "
    />
    <div
      class="absolute top-0 w-screen h-screen sm:hidden bg-zinc-900/80 -z-10"
    ></div>
    <h2
      class="col-start-2 row-start-1 self-start uppercase sm:col-start-3 sm:col-end-10 sm:self-end col-end-16 animate"
    >
      Steven John
    </h2>
    <section
      class="
        mobile-scroll
        col-start-2 col-end-14
        sm:col-start-3 sm:col-end-12
        space-y-[1.2vw]
        self-start
        sm:self-start sm:mt-[2.3vw]
        row-start-2
        animate
      "
    >
      <p>
        I’m a full-stack web developer, with laser focus on everything such as,
        next-gen image formats, SEO optimization, interactive design to
        Kubernetes and Docker to create the most engaging experiences with the
        least running cost.
      </p>
      <p>Animation and micro-interaction is an addiction for me right now.</p>
      <p>I love graphic design, reading and singing.</p>
      <p>My current IDE is Neovim. Yes, it is my IDE.</p>
    </section>
  </div>
</template>
