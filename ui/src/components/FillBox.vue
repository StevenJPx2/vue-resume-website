<template>
  <div id="#root">
    <div v-if="attendee" class="preview">
      <p v-html="getBodyAttendee()"></p>
      <div class="blank-buttons">
        <a
          v-for="(blank, index) in blanks.blanks"
          @click="setBodyAttendee(blank)"
          :key="index"
          class="button"
        >
          {{ blank }}
        </a>
      </div>
    </div>
    <div v-else class="edit">
      <textarea
        v-model.lazy="generateBody"
        name="fill-name"
        id="fill-name"
      ></textarea>
      <a @click="addBlank()" class="button"
        ><i class="fas fa-plus"></i> Insert Blank</a
      >
      <div class="blank-group" v-if="blanks.blanks.length > 0">
        <div class="blank" v-for="(blank, index) in blanks.blanks" :key="index">
          <a @click="deleteBlank(index)"><i class="fas fa-times"></i></a>
          <input
            type="text"
            :value="blank"
            @change="updateBlank(index, $event)"
            :placeholder="`Blank ${index + 1}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shuffle from "lodash/shuffle";

export default {
  name: "FillBox",

  model: { prop: "blanks", event: "change" },

  props: { blanks: Object, attendee: { type: Boolean, default: false } },

  data() {
    return {
      blankDelimiter: "____blank____",
      blank: "_______________",
      responses: [],
      body: null,
      filledBlanks: [],
      shuffled: []
    };
  },

  mounted() {
    this.shuffled = shuffle(this.blanks.blanks);
  },

  computed: {
    generateBody: {
      get() {
        return this.blanks.body.length > 1
          ? this.blanks.body.join(this.blankDelimiter)
          : this.blanks.body[0];
      },
      set(value) {
        this.blanks.body = value.split(this.blankDelimiter);
      }
    }
  },

  methods: {
    getBodyAttendee() {
      this.body = this.blanks.body.join(this.blankDelimiter);
      this.filledBlanks.forEach((item, index) => {
        if (item == this.blanks.blanks[index]) {
          this.body = this.body.replace(
            this.blankDelimiter,
            `<mark class="pen-green">${item}</mark>`
          );
          this.responses[index] = true;
        } else {
          this.body = this.body.replace(
            this.blankDelimiter,
            `<mark class="pen-red">${this.blanks.blanks[index]}</mark>`
          );
          this.responses[index] = false;
        }
      });

      return this.body.replace(
        new RegExp(this.blankDelimiter, "g"),
        this.blank
      );
    },
    setBodyAttendee(blank) {
      this.filledBlanks.push(blank);
    },
    deleteBlank(index) {
      this.$delete(this.blanks.blanks, index);
      this.$set(
        this.blanks.body,
        index,
        this.blanks.body[index] + " " + this.blanks.body[index + 1]
      );
      this.$delete(this.blanks.body, index + 1);
    },

    updateBlank(index, event) {
      this.$set(this.blanks.blanks, index, event.target.value);
      this.$emit("change", this.blanks);
    },

    addBlank() {
      this.blanks.blanks.push("");
      this.blanks.body.push(" ");
      this.$emit("change", this.blanks);
    }
  }
};
</script>

<style lang="scss" scoped>
#root {
  margin-top: 10px;
}

a {
  text-decoration: none;
  color: #2c3e50;
  cursor: pointer;

  &.button {
    margin: 0 auto;
    margin-top: 10px;
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

.blank-group {
  margin-top: 20px;

  .blank {
    display: flex;
    width: m#{i}n(400px, 100%);
    margin: 0 auto;

    a {
      padding: 10px;
      color: darken(grey, 20%);
      margin: auto 0;
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

    input {
      width: min(300%, 100%);
    }
  }
}

.blank-buttons {
  a {
    display: inline-block;
    margin: 0 10px;
  }
}
</style>
