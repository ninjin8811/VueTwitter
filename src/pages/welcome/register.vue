<template>
  <div>
    <input-form :value="buttonType" v-on:button-clicked="signUp">
      <template slot="titleSlot">新規登録</template>
      <template slot="pwSlot">パスワードを設定</template>
      <template slot="buttonSlot">登録する</template>
    </input-form>
  </div>
</template>

<script>
import InputForm from '../../components/InputForm.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'register-view',
  components: {
    'input-form': InputForm
  },
  data() {
    return {
      buttonType: {
        isLogin: false,
        isRegister: true
      },
    }
  },
  methods: {
    signUp(input) {
      firebase.auth().createUserWithEmailAndPassword(input.email, input.password).then(user => {
        this.$router.push('/main')
      }).catch(error => {
        alert(error.message)
      })
    },
  }
}
</script>