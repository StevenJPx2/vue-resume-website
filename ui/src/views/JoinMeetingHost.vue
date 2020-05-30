<template>
  <div id="app" class="container">
    <vue-headful title="Meetings - Host Control" />
    <h1 v-if="meetingName == ''">Meeting-ID: {{ meetingId }}</h1>
    <h1 v-else>{{ meetingName }}</h1>
    <div class="host">
      <div class="response-container">
        <div
          class="component-wrapper"
          v-for="(key, index) in meetingMeta.slides[slideNo]"
          :key="index"
        >
          <component :is="key.name" :input="key.value" :hostLive="true" />
          <BoxAnalytics
            :component-name="key.name"
            :user-data="userSlideDataByTemplate[index]"
          />
        </div>
      </div>
      <div class="online-users">
        <b
          >Online Users ({{
            Object.keys(meetingMeta.live.attendees).length
          }})</b
        >
        <div class="hr"></div>
        <div v-for="(key, index) in meetingMeta.live.attendees" :key="index">
          <p v-if="key.name.length < 20">
            {{ key.name }}
          </p>
          <p v-else>
            {{ `${key.name.slice(0, 20)}...` }}
          </p>
        </div>
      </div>
    </div>
    <div class="slide-buttons">
      <button @click="slideChange(--slideNo)">Prev</button>
      <div class="menu">
        <div
          v-for="(key, index) in meetingMeta.slides"
          :key="index"
          class="only-slides"
        >
          <a
            :class="slideNo == index ? 'active' : ''"
            @click="slideChange(index)"
          >
            {{ index + 1 }}</a
          >
        </div>
      </div>
      <button @click="slideChange(++slideNo)">Next</button>
    </div>
    <MeetingCardModal
      :noClickDestroy="true"
      v-if="!checkedIn"
      heading="Login Required"
    >
      <IconInput
        v-model="password"
        :prompt="prompt"
        :is-danger="danger"
        placeholder="Host Password"
        @keyup.enter.native="validatePassword()"
      />
      <button @click="validatePassword()">Join</button>
    </MeetingCardModal>
  </div>
</template>

<script>
import MeetingCardModal from "@/components/MeetingCardModal.vue";
import ContentBox from "@/components/ContentLive.vue";
import QRBox from "@/components/QRLive.vue";
import PollBox from "@/components/PollLive.vue";
import MatchBox from "@/components/MatchLive.vue";
import FillBox from "@/components/FillLive.vue";
import BoxAnalytics from "@/components/BoxAnalytics.vue";

import IconInput from "@/components/IconInput.vue";
import NProgress from "nprogress";
import axios from "axios";
import io from "socket.io-client";

var socket = io("http://" + location.hostname + ":5000");

export default {
  name: "JoinMeetingHost",

  data() {
    return {
      userId: null,
      meetingId: null,
      meetingName: null,
      password: null,
      danger: false,
      userSlideDataByTemplate: [],
      slideNo: -1,
      prompt: {},
      meetingMeta: {},
      timeElapsedAfterUpdate: new Date().getMilliseconds()
    };
  },

  props: {
    hash: String,
    checkedIn: { type: Boolean, default: false }
  },

  created() {
    axios
      .get("http://" + location.hostname + ":5000/meeting/" + this.hash)
      .catch(() => {
        this.$router.push("/404");
      });
    socket.emit("join", { meeting_hash: this.hash, display_name: false });
    axios
      .get("http://" + location.hostname + ":5000/join/slide?hash=" + this.hash)
      .then(res => {
        this.slideNo = res.data;
        this.getMeetingMeta(this.slideNo);
      });
    socket.on("updateMeetingMeta", () => {
      const timeRightNow = new Date().getMilliseconds();
      this.timeElapsedAfterUpdate = new Date().getMilliseconds();
      this.getMeetingMeta(this.slideNo);
      console.log(
        `time updateMeetingMeta ${this.timeElapsedAfterUpdate - timeRightNow}`
      );
    });
  },

  methods: {
    slideChange(index) {
      console.log(index);
      socket.emit("setSlideNo", {
        hash: this.hash,
        slide: index
      });
      this.slideNo = index;
      this.$forceUpdate();
      this.getMeetingMeta(this.slideNo);
    },

    getMeetingMeta(slideNo) {
      axios
        .get("http://" + location.hostname + ":5000/meeting/" + this.hash)
        .then(res => {
          const meta = res.data;
          this.meetingId = String(meta.meeting_id).replace(
            /(\d{1,3})(\d{1,3})(\d{1,4})/g,
            "$1-$2-$3"
          );
          this.meetingName = res.data.meeting_name;
          this.meetingMeta = meta;
          this.userSlideDataByTemplate = meta.slides[slideNo].map(
            (key, index) =>
              Object.keys(meta.live.attendees).map(k => {
                try {
                  return {
                    name: meta.live.attendees[k].name,
                    slide:
                      meta.live.attendees[k].slide_responses[slideNo][index]
                  };
                } catch {
                  return {
                    name: meta.live.attendees[k].name,
                    slide: null
                  };
                }
              })
          );
        })
        .catch(() => {
          this.$router.push("/404");
        });
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
          this.danger = false;
          this.prompt = {};
          NProgress.done();
        })
        .catch(() => {
          NProgress.done();
          this.danger = true;
          this.prompt = { dange: ["danger", "Password is incorrect"] };
        });
    }
  },

  components: {
    MeetingCardModal,
    IconInput,
    ContentBox,
    QRBox,
    PollBox,
    MatchBox,
    FillBox,
    BoxAnalytics
  }
};
</script>

<style lang="scss" scoped>
$offsetColor: #ddd;
$borderColor: darken(#ddd, 30%);

.host {
  display: grid;
  grid-template-columns: 80% 20%;
}

.component-wrapper {
  border: 1px solid $offsetColor;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 50% 50%;
  margin: 20px 0;
  padding: 20px 0 20px 30px;
}

.online-users {
  border: 1px solid $offsetColor;
  border-radius: 5px;
  margin: 20px 0 20px 20px;
  text-align: left;
  padding: 15px 0 20px 0;

  p,
  b {
    margin-left: 30px;
  }

  .hr {
    background-color: $offsetColor;
  }
}

.slide-buttons {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: max-content auto max-content;

  .menu {
    background-color: $offsetColor;
    border-radius: 5px;
    display: flex;

    .only-slides {
      overflow-y: hidden;
      overflow-x: auto;
    }

    a {
      text-decoration: none;
      color: black;
      background-color: white;
      padding: 10px 20px;
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
      margin-top: 1px;
      padding: 10px 0;
    }
  }
}
</style>
