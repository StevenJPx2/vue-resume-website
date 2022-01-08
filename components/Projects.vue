<template>
  <div class="absolute top-[5vw] left-0 sm:static wrapper isolate">
    <h2
      class="
        row-start-1
        col-start-2 col-end-16
        sm:col-span-full
        justify-self-center
        sm:mt-[5vw] sm:mb-[2vw]
        animate
      "
    >
      Projects I've done
    </h2>
    <a
      href="https://areopagus.saftapologetics.com"
      target="_blank"
      class="
        z-10
        col-start-2 col-end-12
        row-start-2
        delay-75
        sm:col-start-12
        animate
        sm:col-end-19
        transition-transform
        ease-out-back
        hover:translate-y-[-1vw]
        h-max
      "
    >
      <img src="~/assets/areopagus.webp" alt="Areopagus" loading="eager" />
    </a>

    <a
      href="https://onlineads.ca"
      target="_blank"
      class="
        row-start-2
        col-start-5 col-end-15
        sm:col-start-6 sm:col-end-13
        mt-[35vw]
        sm:mt-[3vw]
        animate
        delay-100
        transition-transform
        ease-out-back
        hover:translate-y-[-1vw]
        h-max
      "
    >
      <img src="~/assets/onlineads.webp" alt="OnlineAds.ca" loading="eager" />
    </a>

    <a
      href="https://saftapologetics.com"
      target="_blank"
      class="
        row-start-2
        col-start-3 col-end-12
        sm:col-start-9 sm:col-end-16
        mt-[65vw]
        sm:mt-[18.6vw]
        z-20
        animate
        delay-150
        transition-transform
        ease-out-back
        hover:translate-y-[-1vw]
        h-max
      "
    >
      <img
        src="~/assets/saftapologetics.webp"
        alt="SAFT Apologetics"
        loading="eager"
      />
    </a>
  </div>
</template>
