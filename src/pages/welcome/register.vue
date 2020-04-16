<template>
  <div>
    <input-form :value="buttonType" v-on:button-clicked="storeInfo">
      <template slot="titleSlot">新規登録</template>
      <template slot="pwSlot">パスワードを設定</template>
      <template slot="buttonSlot">登録する</template>
    </input-form>
  </div>
</template>

<script>
import InputForm from '../../components/InputForm.vue'

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
    storeInfo(input) {
      // sessionStorage.token = Math.random().toString(36).substring(7)
      sessionStorage.email = input.email
      sessionStorage.password = input.password
      this.$router.push('/main')
    },
  }
}
</script>