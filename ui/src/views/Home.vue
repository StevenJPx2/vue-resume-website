<template>
  <div id="home">
    <vue-headful title="Steven John - Home" />
    <div class="container flex">
      <Icon
        _class="fab fa-medium"
        desc="Medium"
        link="https://medium.com/@stevenjohn"
      />
      <Icon
        _class="fab fa-jsfiddle"
        desc="JSFiddle"
        link="https://jsfiddle.net/user/StevenJPx2/fiddles/"
      />
      <Icon
        _class="fab fa-github"
        desc="Github"
        link="https://www.github.com/StevenJPx2"
      />
      <Icon
        _class="fas fa-file"
        desc="Resume"
        link="https://drive.google.com/file/d/15aUasdl3vPyJUK3LdoHs7ektqL7kRrj1/view?usp=sharing"
      />
    </div>
    <div class="container project-grid">
      <div class="heading">
        <h1>Projects</h1>
        <div class="hr"></div>
      </div>
      <div v-if="projects.length == 0">
        <clip-loader :loading="projects.length == 0" color="#ddd"></clip-loader>
        <center>Loading projects...</center>
      </div>
      <div class="card-grid" v-else>
        <Card
          :heading="projects[0].name"
          :date="projects[0].created_at"
          :url="projects[0].html_url"
          :body="projects[0].description"
          :head="true"
          class="head-card"
        />
        <Card
          :key="project"
          v-for="project in projects.slice(1)"
          :heading="project.name"
          :date="project.created_at"
          :url="project.html_url"
          :body="project.description"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";
import Card from "@/components/Card.vue";
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";

export default {
  name: "Home",
  components: {
    ClipLoader,
    Icon,
    Card
  },
  data: () => {
    return {
      projects: []
    };
  },
  methods: {
    getProjects() {
      const path = "http://" + location.hostname + ":5000/projects";

      // before a request is made start the nprogress
      axios.interceptors.request.use(config => {
        NProgress.start();
        return config;
      });

      // before a response is returned stop nprogress
      axios.interceptors.response.use(response => {
        NProgress.done();
        return response;
      });
      axios
        .get(path)
        .then(res => {
          this.projects = res.data;
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

<style lang="scss">
@media only screen and (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (min-width: 1200px) {
  .heading {
    grid-column: 1/ 1;
  }

  .card-grid {
    grid-column: 2/ 5;
  }

  .head-card {
    grid-column: 1 / 3;
    grid-auto-rows: 100%;
  }
}

h1 {
  text-align: center;
}

.heading > .hr {
  width: auto !important;
}

.project-grid {
  display: grid;
  grid-gap: 20px;
}

.card-grid {
  display: grid;
  grid-gap: 15px;
}
</style>
