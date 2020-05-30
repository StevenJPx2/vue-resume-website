<template>
  <div id="root">
    <div v-if="attendee" class="preview">
      <p class="question">{{ poll.question }}</p>
      <div
        v-for="(response, index) in poll.responses"
        :key="index"
        class="attendee-response"
      >
        <input
          type="radio"
          :checked="index == poll.selected"
          @click="poll.selected = index"
        />
        <p>{{ response }}</p>
      </div>
    </div>
    <div v-else class="edit">
      <input
        type="text"
        name="poll-question"
        id="poll-question"
        :value="poll.question"
        @change="writeIn($event, true, null)"
        placeholder="Poll Question"
      />
      <div
        class="response"
        v-for="(response, index) in poll.responses"
        :key="index"
      >
        <a @click="deleteResponse(index)"><i class="fas fa-times"></i></a>
        <input
          type="text"
          name="poll-response"
          class="poll-response"
          :value="response"
          @change="writeIn($event, false, index)"
          placeholder="Response"
        />
      </div>
      <a @click="addResponse()" class="button"
        ><i class="fas fa-plus"></i> Insert Poll Response</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "PollBox",

  model: { prop: "poll", event: "change" },

  props: {
    poll: Object,
    attendee: { type: Boolean, default: false }
  },

  data() {
    return {};
  },

  methods: {
    writeIn(event, isQuestion, index) {
      if (isQuestion === true) {
        this.poll.question = event.target.value;
      } else {
        this.$set(this.poll.responses, index, event.target.value);
      }
      this.$emit("change", this.poll);
    },

    addResponse() {
      this.poll.responses.push("");
    },

    deleteResponse(index) {
      this.$delete(this.poll.responses, index);
    }
  }
};
</script>

<style lang="scss" scoped>
#root {
  text-align: left;
  margin-left: 30px;
}

.edit {
  .response {
    display: flex;
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
      margin: 10px;
      font-size: initial;

      &:hover {
        text-decoration: none;
        color: #2c3e50;
        background-color: #eee;
      }
    }
  }

  #poll-question {
    margin-left: 10px;
  }

  input {
    width: 80%;
    max-width: 300px;
  }
}

.attendee-response {
  display: flex;
}
</style>
