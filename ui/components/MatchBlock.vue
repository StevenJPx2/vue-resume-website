<template>
  <div>
    <button
      @click="addMatchItem"
      class="btn btn-sd button-new"
      v-show="editable"
    >
      <icon class="mr-1" name="plus" /> New Match Group
    </button>

    <section class="poll" v-if="editable">
      <div
        v-for="(matchItem, index) in content[0]"
        :key="index"
        class="poll__item"
      >
        <input
          :value="matchItem"
          @input="setMatchItem($event, 0, index)"
          @keydown.enter.stop.prevent="nextMatchItem"
          placeholder="Match Item 1"
          type="text"
          class="input"
          match
          v-focus
        />
        <input
          :value="content[1][index]"
          @input="setMatchItem($event, 1, index)"
          @keydown.enter.stop.prevent="addMatchItem"
          @keydown.tab.stop.prevent="addMatchItem"
          placeholder="Match Item 2"
          type="text"
          class="input"
        />
        <button @click="deleteMatchItem(index)">
          <icon class="poll__button" name="times" />
        </button>
      </div>
    </section>

    <section class="poll-attendant" v-else>
      <div
        v-for="(matchItem, index) in shuffle(content[0])"
        :key="index"
        class="poll-attendant--item"
      >
        <button
          class="input"
          @click="setMatchAnswer(0, index)"
          :class="`${selected[0] == index ? 'is-selected' : ''} ${areMatched(
            index
          )}`"
          :disabled="areMatched(index) != ''"
        >
          {{ matchItem }}
        </button>
        <button
          class="input"
          @click="setMatchAnswer(1, index)"
          :class="{
            'is-success': content.isMatched[index] == 1,
            'is-failure': content.isMatched[index] == 0,
          }"
          :disabled="content.isMatched[index] != -1"
        >
          {{ content[1][index] }}
        </button>
      </div>
    </section>
    <code class="mt-3">{{ selected }}</code>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  model: {
    prop: 'content',
    event: 'input',
  },

  props: {
    debug: Boolean,
    content: Object as () => {
      '0': string[]
      '1': string[]
      isMatched: number[]
    },
    editable: Boolean,
  },

  watch: {
    editable(newValue) {
      if (newValue === false) {
        this.content.isMatched = new Array(this.content[0].length).fill(-1)
      }
    },
  },

  data() {
    return { selected: [-1, -1], shuffledArray: [] as string[] }
  },

  methods: {
    addMatchItem(e: Event) {
      this.content[0].push('')
      this.content[1].push('')
      this.content.isMatched.push(-1)
      this.$emit('input', this.content)
    },

    shuffle(oldArray: string[]) {
      const shuffledArrayLength = this.shuffledArray.length
      const array = [...oldArray]

      if (
        shuffledArrayLength != 0 &&
        shuffledArrayLength == this.content[0].length
      ) {
        return this.shuffledArray
      }

      var currentIndex = array.length,
        temporaryValue,
        randomIndex

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }

      this.shuffledArray = [...array]
      return this.shuffledArray
    },

    setMatchItem(e: Event, index: any, matchIndex: number) {
      ;(this.content as any)[index][
        matchIndex
      ] = (e.target as HTMLInputElement).value
      this.$emit('input', this.content)
    },

    deleteMatchItem(matchIndex: number) {
      this.$delete(this.content[0], matchIndex)
      this.$delete(this.content[1], matchIndex)
      this.$delete(this.content.isMatched, matchIndex)
      this.$emit('input', this.content)
    },

    nextMatchItem(e: any) {
      const next = e.currentTarget!.nextElementSibling
      if (next) {
        next.focus()
      }
    },

    setMatchAnswer(matchIndex: number, index: number) {
      this.$set(this.selected, matchIndex, index)
      if (matchIndex == 1) {
        const selectedItem = this.shuffledArray[this.selected[0]]
        if (selectedItem == this.content[0][index]) {
          this.content.isMatched[index] = 1
          this.$emit('input', this.content)
        } else {
          this.content.isMatched[index] = 0
          this.$emit('input', this.content)
        }
        this.selected = [-1, -1]
      }
    },

    areMatched(index: number): string {
      const origIndex = this.content[0].findIndex(
        (el) => el == this.shuffledArray[index]
      )

      if (this.content.isMatched[origIndex] !== -1) {
        if (this.content.isMatched[origIndex] === 1) {
          return 'is-success'
        } else {
          return 'is-failure'
        }
      }
      return ''
    },
  },
})
</script>

<style lang="scss" scoped>
.poll {
  max-width: 50rem;

  &__item {
    @apply mt-2;
    @apply grid;
    @apply gap-2;

    input {
      @apply w-full;
      @apply col-start-1;
      @apply col-end-8;
    }

    button {
      @apply ml-1;
      @apply align-middle;
      @apply col-start-8;
      @apply row-start-1;
      @apply row-end-3;

      .poll__button {
        @apply text-3xl;
        color: black;
      }
    }
  }
}

.poll-attendant {
  &__item {
    @apply mt-2;
    @apply grid;
    @apply gap-2;

    button {
      @apply w-full;
      @apply col-start-1;
      @apply col-end-8;
    }
  }
}

@screen md {
  .poll__item {
    grid-template-columns: repeat(2, auto) max-content;

    input {
      @apply col-auto;
    }
    button {
      @apply col-auto;
      @apply row-auto;
    }
  }

  .poll-attendant {
    &--item {
      @apply mx-auto;
      width: max-content;
      @apply grid;
      @apply gap-2;
      @apply mb-2;
      grid-template-columns: repeat(2, 300px);
    }
  }
}
</style>
