<template>
  <div id="app" class="container">
    <vue-headful title="Meetings - Attendee" />
    <h1 v-if="meetingName == ''">Meeting-ID: {{ meetingId }}</h1>
    <h1 v-else>{{ meetingName }}</h1>
    <div class="attendee">
      <clip-loader :loading="slides.length == 0" color="#ddd"></clip-loader>
      <div v-for="(key, index) in slides" :key="index">
        <component
          :is="key.name"
          v-if="slidesState[slideNo] && slideResponse[index]"
          :input="key.value"
          :slide-response="slideResponse[index]"
        />
        <component
          :is="key.name"
          v-else
          :input="key.value"
          @change="updateValue(index, $event)"
        />
      </div>
      <div class="hr"></div>
      <b v-if="slideNo == -1">Loading slides...</b>
      <b v-else> Slide {{ slideNo + 1 }} </b>
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
        placeholder="Attendee Password"
        @keyup.enter.native="validatePassword()"
      />
      <button @click="validatePassword()">Join</button>
    </MeetingCardModal>
    <MeetingCardModal
      :noClickDestroy="true"
      v-if="checkedIn && !nameCreated"
      heading="Enter a Display Name"
    >
      <IconInput
        v-model="displayName"
        :prompt="prompt"
        :is-danger="danger"
        placeholder="Display Name"
        @keyup.enter.native="enterDisplayName()"
      />
      <button @click="enterDisplayName()">Enter Meeting</button>
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

import IconInput from "@/components/IconInput.vue";
import NProgress from "nprogress";
import axios from "axios";
import io from "socket.io-client";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";

var socket = io("http://" + location.hostname + ":5000");

export default {
  name: "JoinMeeting",

  data() {
    return {
      userId: null,
      meetingId: null,
      meetingName: null,
      password: null,
      nameCreated: false,
      danger: false,
      displayName: null,
      slides: [],
      slidesState: {},
      slideNo: -1,
      prompt: {},
      slideResponse: []
    };
  },

  props: {
    hash: String,
    checkedIn: { type: Boolean, default: false }
  },

  created() {
    axios
      .get("http://" + location.hostname + ":5000/meeting/" + this.hash)
      .then(res => {
        this.meetingId = String(res.data.meeting_id).replace(
          /(\d{1,3})(\d{1,3})(\d{1,4})/g,
          "$1-$2-$3"
        );
        this.meetingName = res.data.meeting_name;
      })
      .catch(() => {
        this.$router.push("/404");
      });

    socket.on("slideChange", slideNo => {
      this.slidesState[this.slideNo] = true;
      this.slideNo = slideNo;
      console.log(
        `SlideState: ${this.slidesState[this.slideNo]}, SlideNo: ${
          this.slideNo
        }`
      );
      if (this.slidesState[this.slideNo] === true) {
        console.log("success");
        this.getSlideResponse();
        this.getSlide(slideNo, this.slidesState[this.slideNo]);
      } else {
        this.getSlide(slideNo, this.slidesState[this.slideNo]);
      }
    });

    socket.on("firstEmit", val => {
      this.userId = val[0];
      this.slideNo = val[1];
      this.nameCreated = true;
      this.getSlide(this.slideNo, false);
    });
  },

  beforeDestroy() {},

  methods: {
    getSlideResponse() {
      axios
        .post("http://" + location.hostname + ":5000/join/slide_response", {
          hash: this.hash,
          user_index: this.userId,
          slide_no: this.slideNo
        })
        .then(res => {
          this.slideResponse = res.data;
          console.log("slideResponse");
          console.log(res.data);
        });
    },

    updateValue(index, event) {
      console.log(event);
      if (this.slidesState[this.slideNo] != true) {
        this.slideResponse[index] = event;
        socket.emit("setSlideResponse", {
          hash: this.hash,
          user_index: this.userId,
          slide_no: this.slideNo,
          slide: this.slideResponse
        });
      }
    },

    getSlideNo() {
      axios
        .get(
          "http://" + location.hostname + `:5000/join/slide?hash=${this.hash}`
        )
        .then(res => {
          console.log(res.data);
          this.slideNo = res.data;
        });
    },

    enterDisplayName() {
      socket.emit("join", {
        display_name: this.displayName,
        meeting_hash: this.hash
      });
    },

    getSlide(slideNo, getSR) {
      axios
        .post("http://" + location.hostname + ":5000/join/slide", {
          hash: this.hash,
          slide_no: slideNo
        })
        .then(res => {
          this.slides = res.data;
          if (getSR != true) {
            this.slideResponse = Array(this.slides.length);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    validatePassword() {
      NProgress.start();
      axios
        .post("http://" + location.hostname + ":5000/validate_password", {
          hash: this.hash,
          is_host: false,
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
    ClipLoader
  }
};
</script>

<style lang="scss" scoped>
.hr {
  background-color: #ddd;
}
</style>
