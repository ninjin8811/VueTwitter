<template>
  <div class="main">
    <h1><slot name="titleSlot">タイトル</slot></h1>
    <div class="formSet">
      <p>メールアドレス</p>
      <input type="email" name="email" placeholder="メールアドレスを入力" v-model="email">
    </div>
    <div class="formSet">
      <p><slot name="pwSlot">パスワード</slot></p>
      <input type="password" name="password" placeholder="パスワードを入力" v-model="password">
    </div>
    <p v-if="error" class="error">{{errorMessage}}</p>
    <a v-on:click="buttonClicked()" to="/main" class="nextButton" :class="{login: isLogin, register: isRegister, disabled: isFormEnpty}" :disabled="isFormEnpty"><slot name="buttonSlot">ボタン</slot></a>
  </div>
</template>

<script>
export default {
  name: "input-form",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "メールアドレスまたはパスワードが無効",
      isLogin: false,
      isRegister: false,
      error: false,
    }
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    errorProp: Boolean
  },
  mounted() {
    this.isLogin = this.value.isLogin
    this.isRegister = this.value.isRegister
    this.error = this.errorProp
  },
  watch: {
    errorProp(newValue) {
      this.error = newValue
    }
  },
  computed: {
    isFormEnpty() {
      return !this.email || !this.password
    }
  },
  methods: {
    buttonClicked() {
      const inputData = {
        email: this.email,
        password: this.password
      }
      this.$emit('button-clicked', inputData)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/prepends.scss";
.main {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100vh;
  margin: 0 auto;
}
h1 {
  font-size: 30px;
  font-weight: bold;
  margin-top: 120px;
  padding-bottom: 70px;
}
.formSet {
  margin-top: 50px;
  p {
    font-size: 18px;
    font-weight: bold;
  }
  input {
    font-size: 16px;
    outline: 0;
    margin-top: 10px;
    width: 100%;
    height: 30px;
    border: 0;
    border-bottom: solid 2px $text;
  }
}
.error {
  margin-top: 10px;
  color: indianred;
  font-size: 12px;
}
.nextButton {
  width: 100%;
  height: 50px;
  margin-top: 50px;
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  line-height: 50px;
  letter-spacing: 2px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: orange;
}
.register {
  background-color: $green;
  &:hover {
    cursor: pointer;
    background-color: $green-hover;
  }
  &:active {
    background-color: $green-active;
    color: $text-active;
  }
}
.login {
  background-color: $gray;
  &:hover {
    cursor: pointer;
    background-color: $gray-hover;
  }
  &:active {
    background-color: $gray-active;
    color: $text-active;
  }
}
.disabled {
  pointer-events: none;
  background-color: $disabled-color;
}
</style>