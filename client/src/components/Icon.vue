<template>
  <a href="#" class="icon">
    <i :class="_class" :style="style_"></i>
    <p>{{ desc }}</p>
  </a>
</template>

<script>
export default {
  name: "Icon",
  props: {
    _class: String,
    desc: String,
    size: { default: 32, type: Number }
  },
  data: function() {
    return {
      style_: "font-size: " + this.size + "px;"
    };
  }
};
</script>

<style scoped>
.icon {
  text-align: center;
  margin: 0px auto;
  color: gray;
  transition: color cubic-bezier(0.075, 0.82, 0.165, 1) 1.5s;
  text-decoration: none;
}

.icon:hover {
  color: black;
}

p {
  margin-top: 4px;
}
</style>
