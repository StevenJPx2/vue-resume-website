<template>
  <div class="card">
    <img src="https://source.unsplash.com/500x500" alt="#" />
    <div class="card-body">
      <h2>Stuff</h2>
      <p>This is the thing.</p>
      <a href="#" class="button">Click here for more</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card"
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
  height: 200px;
  object-fit: cover;
}

h2 {
  margin-bottom: 3px;
}

a {
  text-decoration: none;
  display: table;
}

a:visited {
  color: black;
}

.button {
  font-size: 14px;
  font-family: 'Hack', 'Source Code Pro', monospace;
  padding: 13px;
  border: 1px black solid;
  border-radius: 5px;
  text-transform: uppercase;
  color: black;
  transition: all ease-out 0.2s;
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
