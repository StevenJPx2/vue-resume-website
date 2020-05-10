<template>
  <div id="app">
    <h1>Steven John</h1>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/meetings">Meetings</router-link>
    </div>
    <router-view />
    <footer>
      <div class="hr"></div>
      Created using <i class="fab fa-vuejs"></i> and
      <i class="fas fa-flask"></i> with <i class="fas fa-heart"></i>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
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
    $rad: 5px;
    $mainColor: grey;
    $offsetColor: #ddd;
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
      // color: white;
      background-color: $offsetColor;
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

.hr {
  margin: 10px auto;
  width: auto;
  height: 1px;
  background-color: #aaa;
}

@media only screen and (min-width: 1200px) {
  .hr {
    width: 1200px !important;
  }
}
</style>
