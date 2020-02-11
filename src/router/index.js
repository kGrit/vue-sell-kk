import Vue from 'vue'
import VueRouter from 'vue-router'
import Comment from 'com/Comment.vue'
import Goods from 'com/goods/Goods.vue'
import Merchant from 'com/Merchant.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/goods'

  },
  {
    path: '/comment',
    name: 'comment',
    component: Comment
  },
  {
    path: '/goods',
    name: 'goods',
    component: Goods
  },
  {
    path: '/merchant',
    name: 'merchant',
    component: Merchant
  }
]

const router = new VueRouter({
  routes
  // linkActiveClass: 'active',
  // linkExactActiveClass: 'active'
})

export default router
