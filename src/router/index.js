import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase/config'

const requiereAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next('/')
  } else {
    next()
  }
}

const sinAutenticacion = (to, from, next) => {
  let user = auth.currentUser
  if (user) {
    next('/perfil')
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    beforeEnter: sinAutenticacion
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import(/* webpackChunkName: "about" */ '../views/Perfil.vue'),
    beforeEnter: requiereAuth
  },
  {
    path: '/crud',
    name: 'Crud',
    component: () => import(/* webpackChunkName: "about" */ '../views/Crud.vue'),
    beforeEnter: requiereAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
