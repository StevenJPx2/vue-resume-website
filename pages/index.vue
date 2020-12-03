<template>
  <div class="container">
    <div class="flex flex-col sm:flex-row">
      <h1 class="mr-auto display-1">Digital Resume</h1>
      <div class="flex flex-row pt-6 sm:pt-0 icons">
        <a href="https://medium.com/@stevenjohn"
          ><icon name="medium" type="fab"></icon
        ></a>
        <a href="https://github.com/StevenJPx2"
          ><icon name="github" type="fab"></icon
        ></a>
        <a href="https://jsfiddle.net/user/StevenJPx2/fiddles/"
          ><icon name="jsfiddle" type="fab"></icon
        ></a>
      </div>
    </div>

    <div class="digital-resume">
      <h1 class="mt-10">TL;DR</h1>
      <p class="mt-5">Full Stack Developer</p>
      <p class="mt-3">
        Front-end: Vue.js, Nuxt.js, Tailwind CSS, Flutter <br />
        Back-end: Flask, Actix, Docker, Kubernetes, MongoDB, GraphQL, PostgresQL
      </p>
      <p class="mt-3">I made this website using Nuxt.js and Actix-web.</p>
      <p class="mt-3">
        I’ve done deep-learning projects with Tensorflow and Keras, with GANs
        and more, but I’m still a novice.
      </p>

      <h1 class="mt-10">Programming Languages I’m good at</h1>
      <p class="mt-5">Python, JS, Rust, and more.</p>

      <h1 class="mt-10">Other things</h1>
      <p class="mt-5">
        I’m a singer, play guitar, and make music. I use Vim to code too.
      </p>
    </div>

    <div v-show="repoData.length != 0">
      <h1 class="mt-10">Github Projects</h1>
      <div class="flex flex-wrap mt-5">
        <div
          class="flex-auto mb-3 mr-3 card"
          v-for="(repo, index) in repoData"
          :key="index"
        >
          <h3>{{ repo.name }}</h3>
          <small
            >Updated on {{ repo.updated_at.toDateString() }} • Created on
            {{ repo.created_at.toDateString() }}</small
          >
          <p class="mt-1 text-lg" v-show="repo.description != null">
            {{ repo.description }}
          </p>
          <a
            :href="repo.html_url"
            target="_blank"
            class="flex items-center w-40 mt-3 align-middle btn btn-sd"
            ><icon name="github" type="fab" class="mr-2"></icon> Github Link</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit()

export default Vue.extend({
  created() {
    this.$store.commit('setTitle', 'Steven John')
    this.$store.commit('setActive', 0)

    octokit
      .request('GET /users/{username}/repos', {
        username: 'StevenJPx2',
      })
      .then((value) => {
        let sanistisedRepos: {
          name: string
          created_at: Date
          updated_at: Date
          html_url: string
          description: string | null
        }[] = value.data.map((repo) => {
          return {
            name: repo.name,
            created_at: new Date(repo.created_at!),
            updated_at: new Date(repo.updated_at!),
            html_url: repo.html_url,
            description: repo.description,
          }
        })

        this.repoData = sanistisedRepos.sort(
          (a, b) => -a.updated_at.valueOf() + b.updated_at.valueOf()
        )
      })
      .catch((err) => {
        console.error(err)
      })
  },
  data() {
    return {
      repoData: new Array<{}>(),
    }
  },
  methods: {},
})
</script>

<style lang="scss" scoped>
.digital-resume {
  p {
    @apply text-xl;
    @apply leading-6;
    @apply font-medium;
  }
}

.icons a {
  @apply mr-12;
  @apply text-4xl;
  @apply transition-all;
  @apply duration-200;
  @apply ease-in-out;

  &:hover {
    @apply opacity-75;
  }

  &:last-child {
    @apply mr-6;
  }
}
</style>
