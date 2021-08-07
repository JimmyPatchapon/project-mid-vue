import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/auth/Login"
import Logout from "@/views/auth/Logout"
import Leaderboard from "@/views/Leaderboard"
import Shop from '@/views/Shop'
import ShopItem from '@/views/ShopItem'
import Home from "@/views/Home"

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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
