import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _04de4961 = () => interopDefault(import('../pages/meetings/index.vue' /* webpackChunkName: "pages/meetings/index" */))
const _5541b1c3 = () => interopDefault(import('../pages/projects/index.vue' /* webpackChunkName: "pages/projects/index" */))
const _686bae00 = () => interopDefault(import('../pages/meetings/_id/edit.vue' /* webpackChunkName: "pages/meetings/_id/edit" */))
const _73b77808 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/meetings",
    component: _04de4961,
    name: "meetings"
  }, {
    path: "/projects",
    component: _5541b1c3,
    name: "projects"
  }, {
    path: "/meetings/:id/edit",
    component: _686bae00,
    name: "meetings-id-edit"
  }, {
    path: "/",
    component: _73b77808,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
