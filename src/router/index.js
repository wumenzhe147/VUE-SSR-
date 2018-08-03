import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {path:'/index',component: () => import('../views/index/index.vue')},
      {path:'/',redirect:'/index'}
    ]
  })
}
