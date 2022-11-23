<script setup lang="ts">
const store = useMainStore();
</script>

<template>
  <div><loading :loading="store.loading" /><slot /></div>
</template>
