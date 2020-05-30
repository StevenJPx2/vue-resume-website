<template>
  <transition appear name="fade" @after-enter="showModal = true">
    <div id="card-modal-wrapper" @click="destroyModal(true)">
      <transition name="slide-fade" @after-leave="$emit('destroy')">
        <div id="card-modal" v-if="showModal" @click.stop>
          <h2>{{ heading }}</h2>
          <div class="hr"></div>
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MeetingCardModal",
  data() {
    return {
      showModal: false
    };
  },
  props: {
    heading: { type: String },
    noClickDestroy: { type: Boolean, default: false }
  },
  methods: {
    destroyModal(outOfBoundsClick) {
      if (outOfBoundsClick === true && this.noClickDestroy === false) {
        this.showModal = false;
      }
    }
  }
};
</script>

<style lang="scss">
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter {
  transform: translateY(50px);
}
.slide-fade-leave-to {
  transform: translateY(-50px);
}

.fade-enter,
.fade-leave-to {
  background-color: rgba(0, 0, 0, 0) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-out;
}

#card-modal-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  left: 0;
  top: 0;
}

#card-modal {
  z-index: 9999;
  position: relative;
  top: 10vh;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 80%;
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
  background-color: white;

  h2 {
    text-align: center;
  }

  .hr {
    margin-bottom: 30px;
    background-color: #ddd;
  }

  input {
    width: 90%;
    max-width: 270px;
    display: block;
    margin: 15px auto;
  }
}
</style>
