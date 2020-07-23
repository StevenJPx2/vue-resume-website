<template> </template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  created() {
    this.$store.state.title = 'Steven John - Meetings'
    this.$store.state.activePage = 1
  },
  data() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
