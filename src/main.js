// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import VueRouter from 'Vue-router'
import App from './App'
import Home from './components/photoprojectlist.vue'
import Photoproject from './components/photoproject.vue'
// import fs from 'fs'

Vue.config.productionTip = false;
Vue.use(VueFire);
Vue.use(VueRouter);

const routes = [
    { path: '/new', component: Photoproject},
    { path: '/edit/:projectId', component: Photoproject},
    { path: '/', component: Home},
];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router: router,
  components: { App }
})
