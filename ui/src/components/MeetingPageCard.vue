<template>
  <a>
    <div class="meeting-card">
      <i :class="_class"></i>
      <slot />
    </div>
  </a>
</template>

<script>
export default {
  name: "MeetingPageCard",
  props: {
    _class: String
  }
};
</script>

<style lang="scss">
$rad: 5px;
$mainColor: grey;
$offsetColor: #bbb;
$transition: cubic-bezier(0.075, 0.82, 0.165, 1) 0.8s;

#meeting-option-grid {
  display: grid;
  grid-template-columns: 50% 50%;
}

a {
  text-decoration: none;
  color: #2c3e50;
  cursor: pointer;

  &:hover {
    .meeting-card {
      background-color: darken(white, 20%);
    }
  }

  &:active {
    .meeting-card {
      background-color: darken(white, 60%);
      color: white;
    }
  }
}

.meeting-card {
  display: flex;
  flex-direction: column;
  padding: 50px;
  margin: 10px;
  border: 1px solid $offsetColor;
  border-radius: $rad;
  font-size: 20px;
  transition: background-color $transition;

  i {
    font-size: 25px;
    margin-bottom: 10px;
  }
}
</style>
