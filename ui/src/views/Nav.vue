<template>
  <div id="app" class="container">
    <h1>Steven John</h1>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/meetings">Meetings</router-link>
    </div>
    <router-view name="win" />
    <footer>
      <div class="hr"></div>
      Created using <i class="fab fa-vuejs"></i> and
      <i class="fas fa-flask"></i> with <i class="fas fa-heart"></i>
    </footer>
  </div>
</template>
