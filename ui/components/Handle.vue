<template>
  <div :class="{ body: editable }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    editable: Boolean,
  },
})
</script>

<style lang="scss" scoped>
.body {
  @apply border;
  border-color: var(--compl-color);
  @apply my-3;
  @apply p-3;
}
</style>
