<template>
  <div id="app">
    <h1>Steven John</h1>
    <div class="container flex">
      <Icon _class="fab fa-medium" desc="Medium" />
      <Icon _class="fab fa-codepen" desc="Codepen" />
      <Icon
        _class="fab fa-github"
        desc="Github"
        link="https://www.github.com/StevenJPx2"
      />
      <Icon _class="fas fa-file" desc="Resume" />
    </div>
    <div class="container project-grid">
      <div class="heading">
        <h1>Projects</h1>
        <hr />
      </div>
      <div class="card-grid">
        <Card
          :heading="projects[0].title"
          :date="projects[0].date"
          :url="projects[0].github_url"
          :body="projects[0].body"
          class="head-card"
        />
        <Card
          :key="project"
          v-for="project in projects.slice(1)"
          :heading="project.title"
          :date="project.date"
          :url="project.github_url"
          :body="project.body"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "./components/Icon.vue";
import Card from "./components/Card.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Icon,
    Card
  },
  data() {
    return {
      projects: []
    };
  },
  methods: {
    getProjects() {
      const path = "http://localhost:5000/projects";
      axios
        .get(path)
        .then(res => {
          this.projects = res.data;
          // eslint-disable-next-line no-console
          console.log(this.projects);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    }
  },
  created() {
    this.getProjects();
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
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
}

.head-card {
  grid-column: 1 / 3;
  grid-auto-rows: 100%;
}
</style>
