<template>
  <div class="card">
    <a href="#" class="demo-link">
      <img :src="src" alt="#" />
      <div class="img-overlay"></div>
      <i class="fas fa-play"></i>
    </a>
    <div class="card-body">
      <h2>Stuff</h2>
      <p>This is the thing.</p>
      <a href="#" class="button">Click here for more</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    src: {
      default: "https://source.unsplash.com/500x500",
      type: String
    }
  }
};
</script>

<style scoped>
.card {
  border: 1px #eeeeee solid;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-column-gap: 15px;
}

img {
  border-radius: 5px 0px 0px 5px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

i.fa-play {
  font-size: 1.5rem;
  color: white;
  position: absolute;
  display: none;
  z-index: 100;
  top: 43%;
  left: 46%;
}

.img-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
}

.demo-link {
  position: relative;
  transition: all ease-out 0.2s;
}

.demo-link:hover i.fa-play,
.demo-link:hover .img-overlay {
  display: block;
}

h2 {
  margin-bottom: 3px;
}

a {
  text-decoration: none;
}

a:visited {
  color: black;
}

.button {
  font-size: 14px;
  font-family: "Hack", "Source Code Pro", monospace;
  padding: 13px;
  border: 1px black solid;
  border-radius: 5px;
  text-transform: uppercase;
  color: black;
  transition: all ease-out 0.2s;
  display: table;
}

.button:hover {
  background-color: black;
  color: white;
}

.card-body {
  display: flex;
  flex-direction: column;
  text-align: left;
}
</style>
