<template>
  <div id="app" class="container">
    <h1>Steven John</h1>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/meetings">Meetings</router-link>
    </div>
    <transition name="slide">
      <router-view />
    </transition>
    <footer>
      <div class="hr"></div>
      Created using <i class="fab fa-vuejs"></i> and
      <i class="fas fa-flask"></i> with <i class="fas fa-heart"></i>
    </footer>
  </div>
</template>

<script>
export default { name: "App" };
</script>

<style lang="scss">
$rad: 5px;
$mainColor: grey;
$offsetColor: #ddd;

@media only screen and (max-width: 768px) {
  .container {
    width: auto;
  }
}

@media only screen and (min-width: 1200px) {
  .container {
    width: 1200px;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    padding: 5px 15px 5px 15px;
    margin: -1px;
    border: 1px solid $mainColor;
    color: $mainColor;
    text-decoration: none;

    &:first-child {
      border-radius: $rad 0 0 $rad;
    }

    &:last-child {
      border-radius: 0 $rad $rad 0;
    }

    &:hover {
      background-color: darken(white, 10%);
    }

    &.router-link-exact-active {
      color: white;
      background-color: $mainColor;

      &:hover {
        background-color: $mainColor;
      }
    }
  }
}

.container {
  text-align: center;
  margin: 60px auto 0px auto;
}

.flex {
  display: flex;
}

.grid {
  display: grid;
}

.hr {
  margin: 10px auto;
  width: auto;
  height: 1px;
  background-color: #aaa;
}

footer {
  color: #777;
  text-align: center;
  margin: 30px auto 10px auto;
}
</style>
