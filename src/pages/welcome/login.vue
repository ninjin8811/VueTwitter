<template>
  <div>
    <input-form :value="buttonType" :errorProp="error" v-on:button-clicked="checkInfo">
      <template slot="titleSlot">ログイン</template>
      <template slot="pwSlot">パスワード</template>
      <template slot="buttonSlot">ログイン</template>
    </input-form>
  </div>
</template>

<script>
import InputForm from '../../components/InputForm.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'login-view',
  components: {
    'input-form': InputForm
  },
  data() {
    return {
      buttonType: {
        isLogin: true,
        isRegister: false
      },
      error: false
    }
  },
  methods: {
    checkInfo(input) {
      // if (input.email === sessionStorage.email && input.password === sessionStorage.password) {
      //   this.$router.push('/main')
      // } else {
      //   this.error = true
      // }
      firebase.auth().signInWithEmailAndPassword(input.email, input.password).then(user => {
        this.$router.push('/main')
      }).catch(err => {
        this.error = true
      })
    }
  }
}
</script>