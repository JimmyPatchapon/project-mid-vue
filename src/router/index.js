import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '@/views/EventList.vue'
import Reward from '@/views/Reward.vue'
import Login from "@/views/auth/Login"
import Logout from "@/views/auth/Logout"
import Register from '@/views/auth/Register'
import Leaderboard from "@/views/Leaderboard"
import Shop from '@/views/Shop'
import ShopItem from '@/views/ShopItem'
import Member from '@/views/Member'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Shop
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: Leaderboard
  },
  {
    path: '/shop/:id',
    name: 'ShopItem',
    component: ShopItem
  },
  {
    path: '/member',
    name: 'Member',
    component: Member
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
