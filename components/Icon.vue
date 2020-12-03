<template>
  <fa :icon="[type, name]"></fa>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    name: String,
    type: {
      type: String,
      default: 'fas',
    },
  },
})
</script>
