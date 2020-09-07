<template>
  <div class="container">
    <h1 contenteditable class="heading">
      Untitled meeting
    </h1>
    <h4 class="font-bold">{{ meeting_id }}</h4>

    <no-ssr v-for="(block, key) in blockList" :key="key" placeholder="Loading">
      <handle>
        <component :is="block"></component>
      </handle>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TextBlock from '@/components/TextBlock.vue'
import QRBlock from '@/components/QRBlock.vue'
import PollBlock from '@/components/PollBlock.vue'
import MatchBlock from '@/components/MatchBlock.vue'
import FillBlock from '@/components/FillBlock.vue'
export default Vue.extend({
  layout: 'none',
  data() {
    return {
      meeting_id: this.$route.params.id,
      blockList: [TextBlock, QRBlock, PollBlock, MatchBlock, FillBlock],
    }
  },
})
</script>

<style lang="scss" scoped>
.heading {
  @apply mb-10;
  @apply transition-opacity;
  @apply ease-in-out;
  @apply duration-300;

  &:hover {
    @apply opacity-75;
  }
}
</style>
