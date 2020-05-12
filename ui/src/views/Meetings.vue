<template>
  <div id="meeting" class="container">
    <h1>Meetings</h1>
    <div class="hr"></div>
    <div id="meeting-option-grid" class="container">
      <MeetingPageCard _class="fas fa-plus" @click.native="modal = 'create'"
        >Create a new meeting</MeetingPageCard
      >
      <MeetingPageCard
        _class="fas fa-sign-in-alt"
        @click.native="modal = 'join'"
        >Join a meeting</MeetingPageCard
      >
    </div>
    <MeetingCardModal
      :showContent="true"
      v-if="modal == 'create'"
      heading="Create a new meeting"
      @destroy="modal = ''"
    >
      <FormattedNumberInput
        :generate="true"
        placeholder="10-digit Meeting ID"
        @update-mi="updateMI"
      />
      <IconInput
        name="host-password"
        id="host-password"
        v-model="hostPassword"
        :is-warn="compPasswords()"
        placeholder="Host Password"
        :prompt="{}"
      />
      <IconInput
        name="attendee-password"
        id="attendee-password"
        v-model="attendeePassword"
        :is-warn="compPasswords()"
        placeholder="Attendee Password"
        :prompt="prompt"
      />
      <button class="black mx-auto" @click="createSlides()">
        Create Slides
      </button>
    </MeetingCardModal>
    <MeetingCardModal
      v-if="modal == 'join'"
      heading="Join a meeting"
      @destroy="modal = ''"
    >
      <FormattedNumberInput placeholder="10-digit Meeting ID" />
      <IconInput name="password" id="password" placeholder="Password" />
      <div class="mx-auto">
        <button class="black" style="margin-right: 15px;" href="#">
          Join as Host
        </button>
        <button class="black" href="#">Join as Attendee</button>
      </div>
    </MeetingCardModal>
  </div>
</template>

<script>
import MeetingPageCard from "@/components/MeetingPageCard.vue";
import MeetingCardModal from "@/components/MeetingCardModal.vue";
import FormattedNumberInput from "@/components/FormattedNumberInput.vue";
import IconInput from "@/components/IconInput.vue";
import axios from "axios";

export default {
  name: "Meetings",
  data: function() {
    return {
      modal: "",
      meetingID: null,
      hostPassword: null,
      attendeePassword: null,
      prompt: {}
    };
  },
  methods: {
    compPasswords() {
      if (
        this.hostPassword == this.attendeePassword &&
        this.hostPassword != "" &&
        this.hostPassword != null
      ) {
        this.prompt["compPasswords"] = [
          "warn",
          "If the passwords are the same, attendees will be able to access your slides as host."
        ];
        return true;
      } else {
        delete this.prompt["compPasswords"];
        return false;
      }
    },
    createSlides() {
      const path = "http://" + location.hostname + ":5000/create_new";
      console.log(this.meetingID);
      axios
        .post(path, {
          meeting_id: this.meetingID,
          host_password: this.hostPassword,
          attendee_password: this.attendeePassword
        })
        .then(res => {
          this.$router.push({
            path: "edit_slides",
            params: { hash: res.data }
          });
        })
        .catch(error => {
          error.response.data.forEach(errorMsg => {
            if (errorMsg[0] in this.prompt && errorMsg[1] === false) {
              delete this.prompt[errorMsg[0]];
            } else if (errorMsg[1] === true) {
              this.$set(this.prompt, errorMsg[0], ["danger", errorMsg[0]]);
            }
          });
        });
    },
    updateMI(e) {
      this.meetingID = e;
    }
  },
  computed: {},
  filters: {},
  components: {
    MeetingPageCard,
    MeetingCardModal,
    FormattedNumberInput,
    IconInput
  }
};
</script>

<style lang="scss">
$rad: 5px;
$mainColor: grey;
$offsetColor: #ddd;

@media only screen and (max-width: 700px) {
  #meeting-option-grid {
    grid-template-columns: 100%;
  }
}

@media only screen and (min-width: 701px) {
  #meeting-option-grid {
    grid-template-columns: 50% 50%;
  }
}

#meeting h1 {
  text-align: left;
}

#meeting-option-grid {
  display: grid;
}

button {
  &.right {
    margin-left: auto;
  }
}
</style>
