<template>
  <div id="root">
    <div v-if="attendee" class="preview">
      <div class="matches">
        <a
          v-for="(match, index) in matches.matches"
          :key="index"
          :class="['match-pill', updateClass(0, index)]"
          @click="updateMatch(0, index)"
          >{{ match[0] }}</a
        >
      </div>
      <div class="matches">
        <a
          v-for="(shuffleItem, index) in shuffled"
          :key="index"
          :class="['match-pill', updateClass(1, index)]"
          @click="updateMatch(1, index)"
          >{{ shuffleItem[1] }}</a
        >
      </div>
    </div>
    <div v-else class="edit">
      <div
        class="match-group"
        v-for="(matchGroup, index) in matches.matches"
        :key="index"
      >
        <a @click="deleteMatchGroup(index)"><i class="fas fa-times"></i></a>
        <input
          type="text"
          :value="matchGroup[0]"
          @change="updateMatchArray($event, index, 0)"
          placeholder="Match 1"
        />
        <input
          type="text"
          :value="matchGroup[1]"
          @change="updateMatchArray($event, index, 1)"
          placeholder="Match 2"
          @keydown.enter="addMatchGroup()"
        />
      </div>
      <a @click="addMatchGroup()" class="button"
        ><i class="fas fa-plus"></i> New Match Group</a
      >
    </div>
  </div>
</template>

<script>
import shuffle from "lodash/shuffle";

export default {
  name: "MatchBox",

  model: { prop: "matches", event: "change" },

  props: { matches: Object, attendee: { type: Boolean, default: false } },

  data() {
    return {
      shuffled: [[0, ""]],
      clicked: [-1, -1],
      responses: []
    };
  },

  mounted() {
    this.createShuffled();
  },

  methods: {
    updateClass(column, row) {
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
      }
    },

    createShuffled() {
      this.shuffled = shuffle(
        this.matches.matches.map((matchGroup, index) => {
          return [index, matchGroup[1]];
        })
      );
    },

    updateMatchArray(event, outerIndex, innerIndex) {
      this.$set(
        this.matches.matches[outerIndex],
        innerIndex,
        event.target.value
      );
      this.createShuffled();
      this.$emit("change", this.matches);
    },

    addMatchGroup() {
      this.matches.matches.push(["", ""]);
      this.responses.push(null);
      this.createShuffled();
    },

    deleteMatchGroup(index) {
      this.$delete(this.matches.matches, index);
      this.$delete(this.responses, index);
      this.createShuffled();
    }
  }
};
</script>

<style lang="scss" scoped>
#root {
  text-align: left;
  margin-left: 30px;
}

a {
  cursor: pointer;
  text-decoration: none;
  color: #2c3e50;

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
