<template>
  <div id="root" :class="hostLive ? 'host-root' : ''">
    <div class="preview">
      <p v-html="getBodyAttendee()"></p>
      <div v-if="!hostLive && slideResponse.length == 0" class="blank-buttons">
        <a
          v-for="(blank, index) in shuffled"
          @click="setBodyAttendee(blank)"
          :key="index"
          class="button"
        >
          {{ blank }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import shuffle from "lodash/shuffle";

export default {
  name: "FillBox",

  props: {
    input: Object,
    hostLive: { type: Boolean, default: false },
    slideResponse: { type: Array, default: () => [] }
  },

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

  created() {
    this.responses = Array(this.input.blanks.length).fill(null);
  },

  mounted() {
    this.shuffled = shuffle(this.input.blanks);
  },

  methods: {
    getBodyAttendee() {
      let body = this.input.body.join(this.blankDelimiter);
      if (this.hostLive === true) {
        this.input.blanks.forEach(item => {
          body = body.replace(
            this.blankDelimiter,
            `<mark class="pen-green">${item}</mark>`
          );
        });
        return body;
      }

      if (this.slideResponse.length > 0) {
        this.slideResponse.forEach((item, index) => {
          if (item === true) {
            body = body.replace(
              this.blankDelimiter,
              `<mark class="pen-green">${this.input.blanks[index]}</mark>`
            );
          } else {
            body = body.replace(
              this.blankDelimiter,
              `<mark class="pen-red">${this.input.blanks[index]}</mark>`
            );
          }
        });

        return body.replace(new RegExp(this.blankDelimiter, "g"), this.blank);
      }

      this.filledBlanks.forEach((item, index) => {
        if (item == this.input.blanks[index]) {
          body = body.replace(
            this.blankDelimiter,
            `<mark class="pen-green">${item}</mark>`
          );
          this.responses[index] = true;
        } else {
          body = body.replace(
            this.blankDelimiter,
            `<mark class="pen-red">${this.input.blanks[index]}</mark>`
          );
          this.responses[index] = false;
        }
      });

      this.$emit("change", this.responses);

      return body.replace(new RegExp(this.blankDelimiter, "g"), this.blank);
    },
    setBodyAttendee(blank) {
      this.filledBlanks.push(blank);
    }
  }
};
</script>

<style lang="scss" scoped>
#root {
  margin-top: 60px;
  margin-bottom: 20px;
}

.host-root {
  text-align: left;
  margin: 0 !important;
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

.blank {
  a {
    position: relative;
    top: 2px;
    padding: 10px;
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

  input {
    margin-right: 31px;
  }
}

.blank-buttons {
  a {
    display: inline-block;
    margin: 0 10px;
  }
}
</style>
