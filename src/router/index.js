import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home/Home'
import User from '@/views/User/User'
import Cart from '@/views/Cart/Cart'
import OrderConfirm from '@/views/OrderConfirm/OrderConfirm'
import Sorts from '@/views/Sorts/Sorts'
import Login from '@/views/Login/Login'
import Signup from '@/views/Signup/Signup'
import Order from '@/views/Order/Order'
import Search from '@/views/Search/Search'
import Address from '@/views/Address/Address'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Home
    },
    {
      path:'/home',
      name:'Home',
      component:Home
    },
    {
      path:'/user',
      name:'User',
      component:User
    },
    {
      path:'/cart',
      name:'Cart',
      component:Cart
    },
    {
      path:'/sorts',
      name:'Sorts',
      component:Sorts
    },
    {
      path:'/order',
      name:'Order',
      component:Order
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/signup',
      name:'Signup',
      component:Signup
    },
    {
      path:'/orderconfirm',
      name:'OrderConfirm',
      component:OrderConfirm
    },
    {
      path:'/search',
      name:'Search',
      component:Search,
    },
    {
      path:'/address',
      name:'Address',
      component:Address
    }
  ],
  scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x:0, y:0}
  }
}
})
