<template>
  <div class="container">
    <h1 class="mb-10">Untitled meeting</h1>
    <h4 class="font-bold">{{ meeting_id }}</h4>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'none',
  data() {
    return {
      meeting_id: this.$route.params.id,
    }
  },
})
</script>

<style lang="scss" scoped></style>
