import Vue from 'vue'

Vue.directive('focus', {
  inserted: function (el, binding, vnode) {
    Vue.nextTick(function () {
      el.focus()
    })
  },
})
