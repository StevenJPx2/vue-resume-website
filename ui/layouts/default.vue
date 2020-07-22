<template>
  <div>
    <nav class="flex flex-row">
      <h1 class="mr-auto">Steven John</h1>
      <button @click="openMenu()">Menu</button>
      <div id="side-items" ref="sidebar">
        <button class="text-6xl text-right" @click="closeMenu()">
          <i class="fas fa-times"></i>
        </button>
        <a>Home</a>
        <a>Meetings</a>
        <a>Projects</a>
      </div>
    </nav>

    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    openMenu() {
      let sidebar = this.$refs.sidebar as HTMLElement
      document.body.classList.add('no-scroll')
      sidebar.classList.add('left-0')
      sidebar.classList.remove('disappear')
    },

    closeMenu() {
      let sidebar = this.$refs.sidebar as HTMLElement
      document.body.classList.remove('no-scroll')
      sidebar.classList.add('disappear')
      sidebar.classList.remove('left-0')
    },
  },
})
</script>

<style lang="scss">
nav {
  button {
    @apply font-medium;
    @apply text-2xl;
  }

  button:active + .side-items {
    @apply grid;
  }
}

#side-items {
  @apply absolute;
  @apply top-0;
  @apply flex;
  @apply flex-col;
  @apply w-full;
  @apply h-full;
  @apply pt-5;
  @apply overflow-hidden;
  @apply text-right;
  @apply shadow-xl;
  @apply duration-500;
  @apply ease-in-out;
  @apply transition-all;

  background-color: var(--background-color);

  a {
    @apply font-semibold;
    @apply h-auto;
    @apply py-3;
    @apply text-5xl;
  }

  & a:focus,
  & a:hover {
    @apply underline;
  }
}

.disappear {
  left: 100% !important;
}

#side-items a,
nav button {
  @apply cursor-pointer;
  @apply px-6;
}

@screen md {
  #side-items {
    @apply block;
    @apply bg-transparent;
    @apply w-auto;
    @apply h-auto;
    @apply static;
    @apply shadow-none;
    @apply pt-0;
  }

  nav button {
    @apply hidden;
  }

  #side-items a,
  nav button {
    @apply font-medium;
    @apply pl-12;
    @apply text-lg;
  }
}
</style>
