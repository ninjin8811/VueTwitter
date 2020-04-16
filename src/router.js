import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from './pages/welcome/index.vue'
import Login from './pages/welcome/login.vue'
import Register from './pages/welcome/register.vue'
import Main from './pages/main/index.vue'

Vue.use(VueRouter)

var auth = {
  loggedIn: function() {
    return !sessionStorage.token
  }
}

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Welcome,
      //ログイン済みの時のリダイレクトの設定書く
      beforeEnter: function(to, from, next) {
        if (!auth.loggedIn() || to.query.redirect === 'true') {
          next('/main')
        } else {
          next()
        }
      }
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
      component: Main
    },
  ]
})