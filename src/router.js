import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from './pages/welcome/index.vue'
import Login from './pages/welcome/login.vue'
import Register from './pages/welcome/register.vue'
import Main from './pages/main/index.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueRouter)

var auth = {
  loggedIn: function() {
    return !sessionStorage.token
  }
}

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Welcome,
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/main',
      component: Main,
      meta: {
        requiresAuth: true
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  //データベースと連携するようにしたらauth().onAuthStateChanged()でログイン状態を確認する
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let currentUser = firebase.auth().currentUser
  if(requiresAuth) {
    if(!currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router