// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/app'
import "firebase/auth"

//FontAwesomeの登録
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBsHDozoBN4BK4SxXR8od4WRHZ9EoFO-RQ",
  authDomain: "vuetwitter.firebaseapp.com",
  databaseURL: "https://vuetwitter.firebaseio.com",
  projectId: "vuetwitter",
  storageBucket: "vuetwitter.appspot.com",
  messagingSenderId: "997939815129",
  appId: "1:997939815129:web:bf6eb8d8564cced1c194c8",
  measurementId: "G-VFHKNV72YG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

