<template>
  <div id="app" class="container">
    <vue-headful title="Meetings - Edit" />
    <input
      id="meeting-name"
      v-model.lazy="meetingName"
      placeholder="Untitled Meeting"
    />
    <div class="edit-grid">
      <div class="edit menu">
        <p>Templates</p>
        <draggable
          :group="{ name: 'templates', pull: 'clone', put: false }"
          :sort="false"
          :clone="cloneTemplate"
          v-model="registeredTemplates"
        >
          <div
            v-for="(key, index) in registeredTemplates"
            :key="index"
            class="tooltip"
          >
            <img :src="imgSrc(key.name)" :alt="key.name" />
            <b>{{ key.description }}</b>
          </div>
        </draggable>
        <div class="meeting-settings">
          <p>Meeting Settings</p>
        </div>
      </div>

      <div class="edit-area">
        <draggable
          group="templates"
          class="screen"
          :disabled="attendee"
          handle=".handle"
          v-model="droppedTemplates"
        >
          <div
            v-for="(key, index) in droppedTemplates"
            :key="index"
            :class="attendee ? 'alternate-group' : 'group'"
          >
            <div v-if="!attendee" class="options">
              <i class="fas fa-align-justify handle"></i>
              <a class="delete" @click="destroyTemplateTrash(index)">
                <i class="fas fa-trash-alt"></i>
              </a>
            </div>
            <component
              :is="key.name"
              v-model="key.value"
              :attendee="attendee"
            />
          </div>
        </draggable>
      </div>

      <div class="menu slide-area">
        <div class="only-slides">
          <div class="slide-thumb" v-for="(key, index) in slides" :key="index">
            <a
              :class="currentIndex == index ? 'active' : ''"
              @click="updateIndex(index)"
            >
              {{ index + 1 }}</a
            >
            <i class="fas fa-times-circle" @click="deleteSlide(index)"></i>
          </div>
        </div>
        <a @click="createNewSlide()"><i class="fas fa-plus"></i></a>
        <a
          @click="attendee = !attendee"
          :class="['attendee-preview', attendee ? 'active' : '']"
          ><i class="fas fa-eye"></i
        ></a>
      </div>

      <div class="footer">
        <button @click="updateSlides(false)">Save</button
        ><button @click="updateSlides(true)">Publish</button>
      </div>
    </div>

    <MeetingCardModal
      :noClickDestroy="true"
      v-if="!checkedIn"
      heading="Login Required"
    >
      <IconInput
        :is-danger="danger"
        :prompt="prompt"
        v-model="password"
        placeholder="Host Password"
        @keyup.enter.native="validatePassword()"
      />
      <button @click="validatePassword()">Edit Slides</button>
    </MeetingCardModal>
    <MeetingCardModal
      :noClickDestroy="true"
      v-if="publishModal"
      heading="Slides Published"
    >
      <p>
        To access and control the slides as the host, you can use this link:
      </p>
      <a
        :href="`https://stevenjohn.co/meetings/join/host/${hash}`"
        target="_blank"
        >https://stevenjohn.co/meetings/join/host/{{ hash }}</a
      >
      <p><b>Meeting ID:</b> {{ meetingDetails.meeting_id }}</p>
      <p><b>Host Password:</b> {{ meetingDetails.host_password }}</p>
      <p><b>Attendee Password:</b> {{ meetingDetails.attendee_password }}</p>
      <br />
      <div class="button-group">
        <button @click="copyLink">Copy attendee link</button>
        <button @click="copyInvitation">Copy invitation</button>
      </div>
    </MeetingCardModal>
  </div>
</template>

<script>
import NProgress from "nprogress";

import MeetingCardModal from "@/components/MeetingCardModal.vue";
import IconInput from "@/components/IconInput.vue";
import ContentBox from "@/components/ContentBox.vue";
import QRBox from "@/components/QRBox.vue";
import PollBox from "@/components/PollBox.vue";
import MatchBox from "@/components/MatchBox.vue";
import FillBox from "@/components/FillBox.vue";
import draggable from "vuedraggable";
import cloneDeep from "lodash/cloneDeep";
import axios from "axios";

export default {
  name: "EditSlides",

  data() {
    return {
      slides: [[]],
      meetingDetails: null,
      meetingName: "",
      password: "",
      danger: false,
      publishModal: false,
      prompt: {},
      attendee: false,
      currentIndex: 0,
      hasChanged: false,
      registeredTemplates: [
        { name: "ContentBox", description: "Text Box", value: "" },
        {
          name: "QRBox",
          description: "Question and Response Box",
          value: { question: "" }
        },
        {
          name: "PollBox",
          description: "Polling",
          value: { question: "", responses: [""] }
        },
        {
          name: "MatchBox",
          description: "Match the following",
          value: { matches: [["", ""]] }
        },
        {
          name: "FillBox",
          description: "Fill in the blanks",
          value: { body: [""], blanks: [] }
        }
      ],
      dropped: []
    };
  },

  created() {
    axios
      .get("http://" + location.hostname + ":5000/meeting/" + this.hash)
      .catch(() => {
        this.$router.push("/404");
      });
    if (this.checkedIn === true) {
      axios
        .get("http://" + location.hostname + ":5000/meeting/" + this.hash)
        .then(res => {
          this.meetingDetails = res.data;
          this.meetingName = res.data.meeting_name;
          this.slides = res.data.slides;
        });
    }
  },

  props: {
    hash: String,
    checkedIn: { type: Boolean, default: false }
  },

  computed: {
    droppedTemplates: {
      get() {
        return this.slides[this.currentIndex];
      },

      set(val) {
        this.$set(this.slides, this.currentIndex, val);
      }
    }
  },

  methods: {
    copyLink() {
      this.$copyText(`https://stevenjohn.co/meetings/join/${this.hash}`);
    },

    copyInvitation() {
      this.$copyText(
        `Join this meeting:

Link: https://stevenjohn.co/meetings/join/${this.hash}
Password: ${this.meetingDetails.attendee_password}

If you're logging in using the website:
Meeting ID: ${this.meetingDetails.meeting_id}
Password: ${this.meetingDetails.attendee_password}`
      );
    },

    validatePassword() {
      NProgress.start();
      axios
        .post("http://" + location.hostname + ":5000/validate_password", {
          hash: this.hash,
          is_host: true,
          password: this.password
        })
        .then(() => {
          this.checkedIn = true;
          axios
            .get("http://" + location.hostname + ":5000/meeting/" + this.hash)
            .then(res => {
              this.meetingDetails = res.data;
              this.meetingName = res.data.meeting_name;
              this.slides = res.data.slides;
            });
          NProgress.done();
        })
        .catch(() => {
          NProgress.done();
          this.danger = true;
          this.prompt = { dange: ["danger", "Password is incorrect"] };
        });
    },

    updateIndex(index) {
      this.currentIndex = index;
    },

    cloneTemplate(item) {
      return cloneDeep(item);
    },

    destroyTemplateTrash(index) {
      this.$delete(this.droppedTemplates, index);
    },

    imgSrc(templateName) {
      return require(`@/assets/${templateName} Tooltip.svg`);
    },

    createNewSlide() {
      this.slides.push([]);
      if (this.currentIndex == this.slides.length - 2) {
        this.currentIndex = this.slides.length - 1;
      }
      this.attendee = false;
    },

    deleteSlide(index) {
      if (this.currentIndex == 0) {
        this.currentIndex = 0;
      } else if (this.currentIndex >= index) {
        this.currentIndex--;
      }
      this.$delete(this.slides, index);
    },

    updateSlides(needsRouting) {
      axios.post("http://" + location.hostname + ":5000/meeting/" + this.hash, {
        slides: this.slides,
        meeting_name: this.meetingName
      });
      if (needsRouting === true) {
        this.publishModal = true;
        // this.$router.push({ path: "/meetings" });
      }
    }
  },

  components: {
    ContentBox,
    QRBox,
    PollBox,
    MatchBox,
    FillBox,
    draggable,
    MeetingCardModal,
    IconInput
  }
};
</script>

<style lang="scss" scoped>
$offsetColor: #ddd;
$borderColor: darken(#ddd, 30%);

#app {
  margin: 0px;
  width: 100%;
  h1 {
    padding-left: 20px;
    text-align: left;
  }
}

#meeting-name {
  font-size: 2.5rem;
  font-weight: 600;
  color: inherit;
  opacity: 1;
  transition: 0.2s all ease;
  border-width: 0px;
  height: auto;
  padding: 15px 10px;
  text-align: center;

  &:hover {
    opacity: 0.8;
    box-shadow: inset 0px 0px 4px darken(#ddd, 20%);
  }

  &:focus:hover {
    opacity: 1;
  }

  &:focus::placeholder {
    opacity: 0.8;
  }

  &::placeholder {
    opacity: 1;
  }
}

.tooltip {
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  display: flex;
  margin-left: 10px;
  margin-bottom: 10px;

  img {
    width: 50px;
    height: 50px;
  }

  b {
    margin: auto 0 auto 10px;
    width: 60%;
    text-align: left;
  }

  &.sortable-chosen {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }
}

.h-100 {
  height: 100%;
}

.options {
  * {
    margin: 10px 0;
  }

  .handle {
    padding-top: 5px;
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;

    &.sortable-chosen {
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
    }
  }

  a {
    color: darken(red, 10%);
    border-radius: 2px;
    cursor: pointer;
    transition: 0.2s all ease;

    &:hover {
      color: darken(red, 20%);
    }

    &:active {
      color: darken(red, 30%);
    }
  }
}

.group {
  display: grid;
  grid-template-columns: 20px auto;
  column-gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
}

.attendee-group {
  padding: 10px;
  margin-bottom: 20px;
}

.button-group {
  button {
    margin-right: 10px;
  }
}

.floating-prompt {
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 10px 15px;
  background: black;
  border-radius: 30px;
  max-width: 100px;
  color: white;
  font-size: 15px;
}

.menu {
  background-color: $offsetColor;
  //border-right: 1px solid $borderColor;
  height: 80vh;

  a {
    text-decoration: none;
    color: black;
    background-color: white;
    padding: 10px;
    margin: 15px;
    border-radius: 5px;
    display: block;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: darken(white, 20%);
    }

    &.active {
      color: white;
      background-color: darken(white, 30%);
    }
  }

  p {
    background-color: white;
    margin-top: 0;
    border-top-left-radius: 5px;
    padding: 10px 0;
  }
}

.meeting-settings {
  margin-top: 20px;

  p {
    border-top-left-radius: 0px;
  }
}

.slide-area {
  border-top-right-radius: 5px;
  height: calc(80vh + 2px);
  position: relative;

  &.menu {
    .slide-thumb {
      position: relative;

      i.fa-times-circle {
        display: none;
        position: absolute;
        padding: 5px;
        right: 6px;
        top: -9px;
        color: black;
        cursor: pointer;

        &:hover {
          display: block;
        }
      }

      a {
        &:hover + i.fa-times-circle {
          display: block;
        }
      }
    }
  }

  .only-slides {
    max-height: 85%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .attendee-preview {
    position: absolute;
    bottom: 0;
    width: 40px;
  }
}

.screen {
  padding: 20px;
  overflow-x: hidden;
  overflow-y: auto;
}

.edit-area {
  display: grid;
  height: 80vh;
  border: 1px solid $offsetColor;
}

.edit {
  border: 1px solid $offsetColor;
  border-top-left-radius: 5px;
  border-right-width: 0px;

  &.menu {
    border-top-left-radius: 5px;
  }
}

.footer {
  border: 1px solid $offsetColor;
  border-top-width: 0px !important;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 8vh;
  grid-area: 2/1/3/4;
  text-align: right;

  button {
    font-size: 17px;
    margin-top: 23px;
    margin-right: 10px;
  }

  &:last-child {
    padding-right: 30px;
  }
}

.edit-grid {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 200px auto 90px;
}
</style>
