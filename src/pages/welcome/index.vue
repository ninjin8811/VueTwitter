<template>
  <div class="main">
    <img src="../../assets/logo.png" class="l-logoImage">
    <router-link to="/register" class="l-register register button">新規登録</router-link>
    <router-link to="/login" class="l-login login button">ログイン</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'welcome-view'
}
</script>

<style lang="scss" scoped>
@import "../../scss/prepends.scss";

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  text-align: center;
}
.l-logoImage {
  width: 300px;
  height: 300px;
  margin-top: 100px;
}
//ボタンの共通設定
.button {
  border-radius: 25px;
  text-decoration: none;
  color: white;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 16px;
  line-height: 50px;
}
//新規登録ボタン
.l-register {
  width: 300px;
  height: 50px;
  margin-top: 70px;
}
.register {
  background-color: $green;
  &:hover {
    background-color: $green-hover;
  }
  &:active {
    background-color: $green-active;
    color: $text-active;
  }
}
//ログインボタン
.l-login {
  position: relative;
  width: 300px;
  height: 50px;
  margin-top: 20px;
}
.login {
  background-color: $gray;
  color: white;
  text-decoration: none;
  &:hover {
    background-color: $gray-hover;
  }
  &:active {
    background-color: $gray-active;
    color: $text-active;
  }
}
</style>