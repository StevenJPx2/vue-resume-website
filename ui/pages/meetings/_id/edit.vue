<template>
  <div class="container">
    <h1
      contenteditable
      @blur="updateMeetingName"
      @keypress.enter.stop.prevent="updateMeetingName"
      v-text="meetingName"
      class="heading"
    ></h1>
    <h4 class="font-bold">{{ meetingId }}</h4>

    <section class="flex flex-wrap items-center mt-3">
      <button
        v-for="(block, key) in {
          text: 'TextBlock',
          qr: 'QRBlock',
          poll: 'PollBlock',
          match: 'MatchBlock',
          fill: 'FillBlock',
        }"
        :key="key"
        class="mr-3 btn"
        @click="
          insertedBlocks.push(blockList[key])
          blockData.push(defaultData[key]())
        "
      >
        {{ block }}
      </button>
      <button
        :class="{ 'bg-editable-eye': !editable }"
        class="ml-auto btn"
        @click="editable = !editable"
      >
        <icon name="eye" />
      </button>
    </section>

    <section class="mt-4">
      <client-only
        v-for="(block, index) in insertedBlocks"
        :key="index"
        placeholder="Loading"
      >
        <handle :editable="editable">
          <component
            :is="block"
            v-model="blockData[index]"
            :debug="debug"
            :editable="editable"
          ></component>
        </handle>
      </client-only>
    </section>
    <code v-show="debug" class="mt-3">
      {{ JSON.stringify(this.blockData, null, 2) }}
    </code>
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

  mounted() {
    this.meetingId = this.$route.params.id
    setTimeout(() => (document.activeElement as HTMLElement).blur(), 50)
  },

  data() {
    return {
      meetingId: '',
      debug: true,
      editable: true,
      blockData: [],
      insertedBlocks: [],
      defaultData: {
        text: () => '',
        qr: () => ({
          question: 'Enter question...',
          answer: ``,
        }),
        poll: () => ({
          correctIndex: -2,
          selected: -1,
          data: [{ value: '' }],
        }),
        match: () => ({
          '0': [''],
          '1': [''],
          isMatched: [-1],
        }),
        fill: () => ({
          type: 'doc',
          content: [{ type: 'paragraph', content: [] }],
        }),
      },
      meetingName: 'Untitled Meeting',
      blockList: {
        text: TextBlock,
        qr: QRBlock,
        poll: PollBlock,
        match: MatchBlock,
        fill: FillBlock,
      },
    }
  },

  methods: {
    updateMeetingName(e: Event) {
      const el = e.target as HTMLHeadingElement
      this.meetingName = el.innerText.trim()
      el.blur()
      window.getSelection()!.removeAllRanges()
    },

    log(message: string) {
      console.log(message)
    },
  },
})
</script>

<style lang="scss" scoped>
.bg-editable-eye {
  background-color: lighten($color: #000000, $amount: 70);
  @apply text-black;
}

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
