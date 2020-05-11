<template>
  <a :href="link">
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
    _class: String,
    link: { default: "#", type: String }
  }
};
</script>

<style lang="scss">
$rad: 5px;
$mainColor: grey;
$offsetColor: #bbb;

#meeting-option-grid {
  display: grid;
  grid-template-columns: 50% 50%;
}

a {
  text-decoration: none;
  color: #2c3e50;

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

  i {
    font-size: 25px;
    margin-bottom: 10px;
  }
}
</style>
