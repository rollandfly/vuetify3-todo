import { createRouter, createWebHashHistory } from 'vue-router'
import Todo from '../views/Todo.vue'
//import goTo from 'vuetify/e'

const routes = [
  {
    path: '/',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/about',
    name: 'about',

    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next)=>{
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`
  next()
})

router.afterEach((to, from)=>{
  //goTo(0)
})

export default router
