<template>
  <div class="container"></div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  created() {
    this.$store.commit('setTitle', 'Steven John - Projects')
    this.$store.commit('setActive', 2)
  },
})
</script>

<style lang="scss" scoped></style>
