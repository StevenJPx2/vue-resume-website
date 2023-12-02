<script setup lang="ts">
import { BlogPost } from "~/utils/types";
</script>

<template>
  <main class="prose container mx-auto mt-[30vw]">
    <og-image-screenshot />

    <content-doc v-slot="{ doc }">
      <h1>{{ doc.title }}</h1>
      <content-renderer :value="doc" />
    </content-doc>
  </main>
</template>

<style scoped lang="scss">
.img-overlay {
  background: linear-gradient(360deg, #1d1800 3.63%, rgba(0, 0, 0, 0) 100%);
}
</style>
