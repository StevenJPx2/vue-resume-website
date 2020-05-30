<template>
  <div id="root" :class="hostLive ? 'host-root' : ''">
    <div v-if="slideResponse.length > 0" class="preview">
      <div class="matches">
        <a
          v-for="(match, index) in input.matches"
          :key="index"
          :class="['match-pill', updateClass(0, index)]"
          >{{ match[0] }}</a
        >
      </div>

      <div class="matches">
        <a
          v-for="(match, index) in input.matches"
          :key="index"
          :class="['match-pill', updateClass(1, index)]"
          >{{ match[1] }}</a
        >
      </div>
    </div>
    <div v-else class="preview">
      <div class="matches">
        <a
          v-for="(match, index) in input.matches"
          :key="index"
          :class="['match-pill', updateClass(0, index)]"
          @click="updateMatch(0, index)"
          >{{ match[0] }}</a
        >
      </div>
      <div v-if="!hostLive" class="matches">
        <a
          v-for="(shuffleItem, index) in shuffled"
          :key="index"
          :class="['match-pill', updateClass(1, index)]"
          @click="updateMatch(1, index)"
          >{{ shuffleItem[1] }}</a
        >
      </div>

      <div v-else class="matches">
        <a
          v-for="(match, index) in input.matches"
          :key="index"
          :class="['match-pill', updateClass(1, index)]"
          @click="updateMatch(1, index)"
          >{{ match[1] }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import shuffle from "lodash/shuffle";

export default {
  name: "MatchBox",

  props: {
    input: Object,
    hostLive: { type: Boolean, default: false },
    slideResponse: { type: Array, default: () => [] }
  },

  data() {
    return {
      shuffled: [[0, ""]],
      clicked: [-1, -1],
      responses: []
    };
  },

  created() {
    this.responses = Array(this.input.matches.length).fill(null);
    this.$emit("change", this.responses);
  },

  mounted() {
    this.createShuffled();
  },

  methods: {
    updateClass(column, row) {
      if (this.hostLive === true) {
        return "disabled";
      }
      if (this.slideResponse.length > 0) {
        if (this.slideResponse[row] === true) {
          return "correct";
        } else {
          return "false";
        }
      }
      if (column == 0) {
        if (this.responses[row] === true) {
          return "correct";
        } else if (this.responses[row] === false) {
          return "false";
        }
      } else {
        if (this.responses[this.shuffled[row][0]] === true) {
          return "correct";
        } else if (this.responses[this.shuffled[row][0]] === false) {
          return "false";
        }
      }

      if (this.clicked[column] == row) {
        return "clicked";
      } else {
        return "";
      }
    },

    updateMatch(column, row) {
      this.$set(this.clicked, column, row);
      if (this.clicked.indexOf(-1) == -1) {
        if (this.clicked[0] == this.shuffled[this.clicked[1]][0]) {
          this.$set(this.responses, this.clicked[0], true);
          this.clicked = [-1, -1];
        } else {
          this.$set(this.responses, this.clicked[0], false);
          this.clicked = [-1, -1];
        }
        this.$emit("change", this.responses);
      }
    },

    createShuffled() {
      this.shuffled = shuffle(
        this.input.matches.map((matchGroup, index) => {
          return [index, matchGroup[1]];
        })
      );
    }
  }
};
</script>

<style lang="scss" scoped>
#root {
  text-align: left;
  margin: 0 auto 20px auto;
  width: max-content;
}

.host-root {
  margin: 0 !important;
}

a {
  text-decoration: none;
  color: #2c3e50;
  cursor: pointer;

  &.button {
    text-align: center;
    display: block;
    width: max-content;
    background-color: white;
    font-size: initial;

    &:hover {
      text-decoration: none;
      color: #2c3e50;
      background-color: #eee;
    }
  }
}

.edit {
  .match-group {
    display: flex;
    width: 80%;

    input {
      margin-right: 10px;
    }

    a {
      position: relative;
      top: 9px;
      padding: 9px;
      color: darken(grey, 20%);
      margin-right: 8px;
      font-size: 22px;
      transition: 0.2s all ease;

      &:hover {
        color: darken(grey, 30%);
      }

      &:active {
        color: darken(grey, 40%);
      }
    }
  }
}

.disabled {
  cursor: default;
}

.preview {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-column-gap: 40px;
  .matches {
    .match-pill {
      display: block;
      padding: 10px 20px;
      margin-bottom: 30px;
      background-color: #ddd;
      border-radius: 30px;
      text-align: center;
      transition: 0.2s all ease;

      &.clicked {
        background-color: #222;
        color: white;
      }

      &.correct {
        background-color: #4bb543;
        color: white;
      }

      &.false {
        background-color: darken(#f5c6cb, 30%);
        color: white;
      }
    }
  }
}
</style>
