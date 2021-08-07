import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '@/views/EventList.vue'
import Reward from '@/views/Reward.vue'
import Login from '@/views/auth/Login.vue'
import Logout from '@/views/auth/Logout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Log in',
    component: Login
  },
  {
    path: '/logout',
    name: 'Log out',
    component: Logout
  },
  {
    path: '/eventList',
    name: 'EventList',
    component: EventList
  },
  {
    path: '/reward',
    name: 'Reward',
    component: Reward
  }
]

const router = new VueRouter({
  routes
})

export default router
