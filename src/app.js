import Vue from 'vue';
import App from './App.vue';
import { createStore } from './store';
import { createRouter } from './router';
import { sync } from 'vuex-router-sync';
import titleMixin from './util/title';
import * as filters from './util/filters';
import vueTap from 'v-tap';
import components from './components/index.js';
import 'swiper/dist/css/swiper.css';
import VueQriously from 'vue-qriously';


import { InfiniteScroll,TabContainer, TabContainerItem,Lazyload} from 'mint-ui';
if (process.browser) {
  require('videojs-contrib-hls')
  require('video.js/dist/video-js.css');
  const VueVideoPlayer = require('vue-video-player/dist/ssr')
  Vue.use(VueVideoPlayer)
}


if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  Vue.use(VueAwesomeSwiper)
}
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.use(Lazyload);
Vue.use(VueQriously);
Vue.use(InfiniteScroll);
require('./assets/css/base.css');
require('vue2-animate/dist/vue2-animate.min.css')
Object.keys(components).forEach((key)=>{
    var name = key.replace(/(\w)/, (v) => v.toUpperCase())
    Vue.component(`v${name}`, components[key])
  })
Vue.use(vueTap);
// mixin for handling title
Vue.mixin(titleMixin)
 
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp () {
  // create store and router instances
  const store = createStore()
  const router = createRouter()
  
  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)
   
  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
