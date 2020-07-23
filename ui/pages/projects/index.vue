<template> </template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  created() {
    this.$store.state.title = 'Steven John - Projects'
    this.$store.state.activePage = 2
  },
})
</script>

<style lang="scss" scoped></style>
