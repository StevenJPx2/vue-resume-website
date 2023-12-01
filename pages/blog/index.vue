<script setup lang="ts">
import { BlogPost, BlogPostPreview } from "~/utils/types";

definePageMeta({
  title: "Steven John | Blog",
  description:
    "Get ready for a tech-tastic journey as I share my thoughts and musings on the industry. My blog is your backstage pass to the mind of a full-stack developer and the quirky world of technology.",
  image: "https://stevenjohn.co/meta.jpg",
});

const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation(),
);

const latestPost = (
  await getItems<BlogPost[]>({
    collection: "posts",
    params: {
      fields: ["*", "user_created.*"],
      sort: "-date_created",
      limit: 1,
    },
  })
)[0];

const blogPosts = await getSingletonItem<BlogPostPreview[]>({
  collection: "posts",
  params: {
    fields: [
      "user_created.*",
      "date_created",
      "title",
      "slug",
      "header",
      "header_type",
    ],
    sort: "-date_created",
  },
});
</script>

<template>
  <main class="mt-[12vw]">
    <h1 id="blog-heading">Blog</h1>
    <header
      class="border-y border-white grid md:grid-cols-2 items-center bg-[var(--color-base)0f] backdrop-blur-2xl mb-[5vw] gap-[5vw]"
    >
      <directus-img
        v-if="!!latestPost.header && latestPost.header_type === 'image'"
        :id="latestPost.header"
        :img-attrs="{
          class:
            'md:col-start-1 object-fill border-white border-b md:border-b-0 md:border-r w-full',
          alt: latestPost.slug,
        }"
      />
      <article
        class="py-[5vw] px-[7vw] grid pr-[4vw] md:pr-[14vw]"
        :class="{
          'md:col-start-2 md:row-start-1 row-start-2 md:p-0':
            !!latestPost.header,
          'col-start-1 col-end-3 justify-start self-center': !latestPost.header,
        }"
      >
        <p class="font-hack mb-[2.1vw] md:mb-[0.8vw]">Latest post</p>
        <h2 class="leading-none mb-[2.8vw] md:mb-[1.1vw]">
          {{ latestPost.title }}
        </h2>
        <small class="text-[3.1vw] md:text-[1.1vw] mb-[2.8vw] md:mb-[1.1vw]">
          <span>
            {{ useDateFormat(latestPost.date_created, "DD MMM, YYYY").value }}
          </span>
          <span> • </span>
          <span>
            {{
              latestPost.user_created.first_name +
              " " +
              latestPost.user_created.last_name
            }}
          </span>
        </small>
        <div
          class="prose line-clamp-3"
          v-html="latestPost.excerpt ?? latestPost.body"
        />
        <nuxt-link
          class="w-full md:w-fit md:justify-self-end btn btn-hoverable items-center gap-2"
          :to="`blog/${latestPost.slug}`"
          >read more
          <icon name="heroicons:arrow-up-right-solid" />
        </nuxt-link>
      </article>
    </header>

    <infinite-marquee text="posts" direction="left" :target="105.5" />

    <section
      class="flex flex-wrap gap-[10vw] md:gap-[4vw]"
      :class="[commonPadding]"
    >
      <nuxt-link
        class="blog-post-card"
        v-for="post in blogPosts"
        :to="`blog/${post.slug}`"
        :key="post.slug"
      >
        <directus-img
          v-if="!!post.header && post.header_type === 'image'"
          :id="post.header"
          :img-attrs="{
            class: 'row-start-1 blog-post-card--img',
            alt: post.slug,
          }"
        />
        <div
          class="blog-post-card--desc"
          :class="{
            'row-start-2': !!post.header,
            'row-start-1 row-end-3 self-center py-[15vw] md:py-[10vw]':
              !post.header,
          }"
        >
          <h2>{{ post.title }}</h2>
          <small>
            <span>
              {{ useDateFormat(post.date_created, "DD MMM, YYYY").value }}
            </span>
            <span> • </span>
            <span>
              {{
                post.user_created.first_name + " " + post.user_created.last_name
              }}
            </span>
          </small>
        </div>
      </nuxt-link>
    </section>
  </main>
</template>

<style scoped lang="scss">
small {
  @apply uppercase;
  @apply flex;
  @apply gap-4;
}

#blog-heading {
  @apply text-center;
  @apply text-[70vw];
  background: linear-gradient(
    179.96deg,
    #ffe871 0.04%,
    rgba(255, 232, 113, 0) 60.15%
  );
  @apply bg-clip-text;
  @apply text-transparent;
  @apply leading-none;
  @apply -mb-[33vw];

  @screen md {
    @apply text-[30vw];
    @apply -mb-[13vw];
  }
}

.blog-post-card {
  @apply grid;
  @apply grid-rows-2;
  @apply h-auto;
  @apply flex-auto;
  @apply max-h-[100vh];
  @apply border;
  @apply rounded-2xl;
  @apply border-white;

  background: linear-gradient(
    180deg,
    rgba(255, 232, 113, 0.04) 0%,
    rgba(255, 232, 113, 0.13) 48.95%,
    rgba(255, 232, 113, 0.04) 100%
  );

  :deep(.blog-post-card--img) {
    @apply rounded-t-2xl;
    @apply w-full;
    @apply object-cover;
    @apply border-b;
    @apply border-b-white;
    @apply h-full;
  }

  &--desc {
    @apply self-center;
    @apply px-[6vw];
    @apply max-w-fit;

    h2 {
      @apply text-[10vw];
      @apply max-w-[20ch];
      @apply leading-[1.2];

      @screen md {
        @apply text-[2.6vw];
      }

      small {
        @apply text-[0.9vw];
      }
    }

    @screen md {
      @apply px-[2vw];
    }
  }

  @screen md {
    @apply max-h-[30vw];
  }
}
</style>
