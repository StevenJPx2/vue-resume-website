<template>
  <div id="app">
    <h1>Steven John</h1>
    <div class="container flex">
      <Icon _class="fab fa-medium" desc="Medium" />
      <Icon _class="fab fa-codepen" desc="Codepen" />
      <Icon _class="fab fa-github" desc="Github" />
      <Icon _class="fas fa-file" desc="Resume" />
    </div>
    <div class="container project-grid">
      <div class="heading">
        <h1>Projects</h1>
        <hr />
      </div>
      <div class="card-grid">
        <Card :key="i" v-for="i in 10" :class="i == 1 ? 'head-card' : ''" />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "./components/Icon.vue";
import Card from "./components/Card.vue";

export default {
  name: "App",
  components: {
    Icon,
    Card
  }
};
</script>

<style>
h1 {
  text-align: center;
}

hr {
  color: #fff;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px auto;
}

.container {
  text-align: center;
  margin: 60px auto 0px auto;
  width: 1200px;
}

.flex {
  display: flex;
}

.grid {
  display: grid;
}

.project-grid {
  display: grid;
  grid-gap: 20px;
}

.heading {
  grid-column: 1/ 1;
}

.card-grid {
  grid-column: 2/ 5;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: 350px auto;
  grid-gap: 15px;
}

.head-card {
  grid-column: 1 / 3;
  grid-auto-rows: 100%;
}
</style>
