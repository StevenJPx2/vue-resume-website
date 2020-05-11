<template>
  <div
    id="card-modal-background"
    :style="setStyle()"
    @click="isClicked = false"
  >
    <div id="card-modal">
      <h2>{{ heading }}</h2>
      <div class="hr"></div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "MeetingCardModal",
  props: {
    heading: { type: String },
    isClicked: { type: Boolean, default: false }
  },
  methods: {
    setStyle() {
      return this.isClicked ? "display: block;" : "display: none;";
    }
  }
};
</script>

<style lang="scss">
#card-modal-background {
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: transparentize(black, 0.3);
  left: 0;
  top: 0;
}

#card-modal {
  position: relative;
  top: 50vh;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 90%;
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  text-align: left;

  h1 {
    text-align: left;
  }
}

@media only screen and (min-width: 1200px) {
  #card-modal {
    width: 60%;
  }
}

@media only screen and (min-width: 1400px) {
  #card-modal {
    width: 30%;
  }
}
</style>
