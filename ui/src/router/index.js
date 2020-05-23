import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "../views/Nav.vue"),
    children: [
      {
        path: "",
        components: {
          win: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
        }
      },
      {
        path: "meetings",
        components: {
          win: () =>
            import(/* webpackChunkName: "meetings" */ "../views/Meetings.vue")
        }
      }
    ]
  },
  {
    path: "/meetings/edit_slides/:hash",
    name: "edit_slides",
    component: () =>
      import(/* webpackChunkName: "editSlides" */ "../views/EditSlides.vue"),
    props: true
  },
  {
    path: "/meetings/join/:hash",
    name: "join",
    component: () =>
      import(/* webpackChunkName: "join" */ "../views/JoinMeeting.vue"),
    props: true
  },
  {
    path: "/meetings/join/host/:hash",
    name: "join_host",
    component: () =>
      import(/* webpackChunkName: "joinHost" */ "../views/JoinMeetingHost.vue"),
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
