import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../stores'
import AuthConstants from '@/constants/auth.constants'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'AppLayout'
    }
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('../views/Auth/Register.vue'),
    meta: {
      layout: 'AppLayout'
    }
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('../views/Auth/Login.vue'),
    meta: {
      layout: 'AppLayout'
    }
  },
  {
    path: '/auth/logout',
    name: 'Logout',
    component: () => import('../views/Auth/Logout.vue'),
    meta: {
      layout: 'AppLayout'
    }
  },
  {
    path: '/games',
    name: 'Games',
    component: () => import('../views/Game/GameFinder.vue'),
    meta: {
      layout: 'AppLayout'
    }
  },
  {
    path: '/games/create',
    name: 'GameCreate',
    component: () => import('../views/Game/GameCreate.vue'),
    meta: {
      layout: 'AppLayout',
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Store.getters['auth/getLoginApiStatus'] === AuthConstants.LoginApiStatusSuccess) {
      next()
    } else {
      next('/auth/login')
    }
  } else {
    next()
  }
})

export default router
