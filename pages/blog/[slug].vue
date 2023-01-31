<script setup lang="ts">
import { BlogPost } from "~/utils/types";
import { useRoute } from "vue-router";

const route = useRoute();
const { getItems } = useDirectusItems();

console.log(route.params.slug, route);

const post = (
  await getItems<BlogPost[]>({
    collection: "posts",
    params: {
      fields: ["*", "user_created.*"],
      filter: { slug: route.params.slug },
      limit: 1,
    },
  })
)[0];
</script>

<template>
  <main>
    <header
      class="w-full relative"
      :class="{ 'h-screen': !!post.header, 'h-[45vh]': !post.header }"
    >
      <div class="relative isolate h-full">
        <directus-img
          v-if="!!post.header && post.header_type === 'image'"
          :id="post.header"
          :img-attrs="{ class: 'w-full h-full object-cover z-0' }"
        />
        <div class="img-overlay z-10 absolute inset-0" />
      </div>
      <div class="absolute bottom-[9vw]" :class="[commonPadding]">
        <h1
          class="
            font-neue font-medium
            text-[12vw]
            md:text-[5vw]
            text-white
            z-10
            leading-tight
            max-w-[15ch]
          "
        >
          {{ post.title }}
        </h1>
        <small
          class="uppercase text-[3.6vw] md:text-[1.4vw] gap-4 flex mt-[1.1vw]"
        >
          <span>
            {{ useDateFormat(post.date_created, "DD MMM, YYYY").value }}
          </span>
          <span> • </span>
          <span>
            {{
              Math.max(post.body.split(" ").length / 183, 1).toFixed() +
              " min read"
            }}
          </span>
        </small>
      </div>
    </header>

    <article
      class="prose w-full md:w-[45vw] mx-auto mt-[5vw] px-[4vw] md:px-0"
      v-html="post.body"
    />
  </main>
</template>

<style scoped lang="scss">
.img-overlay {
  background: linear-gradient(360deg, #1d1800 3.63%, rgba(0, 0, 0, 0) 100%);
}
</style>
