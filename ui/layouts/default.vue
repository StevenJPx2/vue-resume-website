<template>
  <div class="container">
    <nav class="flex flex-row">
      <nuxt-link to="/" class="mr-auto"
        ><h1 class="ease-all-transition-200">Steven John</h1></nuxt-link
      >
      <button @click="openMenu()">Menu</button>
      <div class="ease-all-transition-500" id="side-items" ref="sidebar">
        <button class="text-6xl text-right" @click="closeMenu()">
          <i class="fas fa-times"></i>
        </button>
        <nuxt-link :class="activePage == 1 ? 'active' : ''" to="/meetings"
          >Meetings</nuxt-link
        >
        <nuxt-link :class="activePage == 2 ? 'active' : ''" to="/projects"
          >Projects</nuxt-link
        >
      </div>
    </nav>

    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      activePage: this.$store.state.activePage,
    }
  },

  head() {
    return {
      title: this.$store.state.title,
    }
  },
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

  & > a:hover h1 {
    color: rgba($color: #000000, $alpha: 0.75);
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
  @apply pr-8;
  @apply overflow-hidden;
  @apply text-right;
  @apply shadow-xl;

  background-color: var(--background-color);

  a {
    @apply font-semibold;
    @apply h-auto;
    @apply py-3;
    @apply text-5xl;
  }

  & a:focus,
  & a:hover,
  & .active {
    @apply underline;
  }
}

.disappear {
  left: 100% !important;
}

#side-items a,
nav button {
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
    @apply pr-0;
  }

  nav button {
    @apply hidden;
  }

  #side-items a,
  nav button {
    @apply font-medium;
    @apply pl-10;
    @apply text-lg;
  }
}
</style>
