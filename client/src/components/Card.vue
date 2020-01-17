<template>
  <div class="card">
    <div class="card-body">
      <small v-if="head === true" class="most-recent">
        Most recently updated repository
      </small>
      <h2 :style="head === true ? 'margin-top: 3px;' : ''">{{ heading }}</h2>
      <small>{{ date }}</small>
      <p>{{ body }}</p>
      <a :href="url" class="button" target="_blank">
        <i class="fab fa-github"></i> Github Link
      </a>
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
    },
    head: { default: false, type: Boolean },
    heading: String,
    date: String,
    url: String,
    body: String
  }
};
</script>

<style scoped>
.card {
  border: 1px #ddd solid;
  border-radius: 5px;
}

h2 {
  margin-bottom: 3px;
}

.most-recent {
  margin-top: 20px;
  text-transform: uppercase;
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
  margin: 25px;
  margin-top: 0px;
}
</style>
