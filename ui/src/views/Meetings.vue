<template>
  <div id="meeting" class="container">
    <h1>Meetings</h1>
    <div class="hr"></div>
    <div id="meeting-option-grid" class="container">
      <MeetingPageCard _class="fas fa-plus" @click="firstModal = true"
        >Create a new meeting</MeetingPageCard
      >
      <MeetingPageCard _class="fas fa-sign-in-alt" @click="secondModal = true"
        >Join a meeting</MeetingPageCard
      >
    </div>
    <MeetingCardModal heading="Create a new meeting"></MeetingCardModal>
    <MeetingCardModal heading="Join a meeting"></MeetingCardModal>
  </div>
</template>

<script>
import MeetingPageCard from "@/components/MeetingPageCard.vue";
import MeetingCardModal from "@/components/MeetingCardModal.vue";

export default {
  name: "Meetings",
  data: () => {
    return {
      firstModal: false,
      secondModal: false
    };
  },
  components: { MeetingPageCard, MeetingCardModal }
};
</script>

<style lang="scss">
$rad: 5px;
$mainColor: grey;
$offsetColor: #ddd;

#meeting h1 {
  text-align: left;
}

#meeting-option-grid {
  display: grid;
  grid-template-columns: 50% 50%;
}
</style>
