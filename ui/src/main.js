import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import CKEditor from "@ckeditor/ckeditor5-vue";
import vueHeadful from "vue-headful";
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);
Vue.component("vue-headful", vueHeadful);

Vue.use(CKEditor);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
