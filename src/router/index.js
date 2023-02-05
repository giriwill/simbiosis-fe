import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IJazahView from '../views/IJazahView.vue'
import RekapIjazahView from '../views/RekapIjazahView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ijazah',
      name: 'ijazah',
      component: IJazahView
    },    
    {
      path: '/rekapijazah',
      name: 'RekapIjazahView',
      component: RekapIjazahView
    }
  ]
})

export default router
