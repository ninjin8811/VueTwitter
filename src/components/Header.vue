<template>
  <div class="header">
    <div class="myAccount">
      <div class="currentAccount" v-if="!isShowMyAccountMenu">
        <img class="myAvatar" v-bind:src="currentAccount.avatarPath" alt="マイアバター" v-on:click="avatarTapped()">
        <p class="myName">{{currentAccount.name}}<p/>
      </div>
      <ol class="selectAccount" v-if="isShowMyAccountMenu">
        <li v-for="user in userList" v-bind="user" :key="user.id">
          <div class="menuUserCell" v-on:click="changeAccount(user.id)">
            <img v-bind:src="user.avatarPath" alt="メニューのアバター">
            <p>{{user.name}}</p>
          </div>
        </li>
      </ol>
    </div>
    <p class="remainIINE">残りいいね：<span>{{currentAccount.iine}}</span></p>
  </div>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
      currentID: 1,
      userList: [],
      isShowMyAccountMenu: false
    }
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  // 受け取った値をコンポーネントのローカルに保存
  mounted: function() {
    this.currentID = this.value.currentID
    this.userList = this.value.userList
  },
  methods: {
    //アバターがタップされた時にユーザーリストを表示する
    avatarTapped: function() {
      this.isShowMyAccountMenu = !this.isShowMyAccountMenu
    },
    //ユーザーを選んだときの処理
    changeAccount: function(selectedID) {
      this.currentID = selectedID
      this.isShowMyAccountMenu = !this.isShowMyAccountMenu
      this.$emit('changed-user', selectedID)
    }
  },
  computed: {
    //現在のユーザーを返す
    currentAccount: function() {
      return this.userList.find(el => el.id === this.currentID) || {}
    }
  }
}
</script>

<style scoped>
  .header {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: white;
    border-bottom: solid 1px gray;
  }

  /* 左側の画像と名前ブロック */
  .myAccount {
    margin-left: 10px;
  }
  /* 選ばれた状態の画像と名前 */
  .currentAccount {
    display: flex;
    align-items: center;
  }
  .myAvatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
  .myAvatar:hover {
    cursor: pointer;
  }
  .myName {
    margin-left: 5px;
    font-size: 16px;
  }

  /* ユーザーリストメニュー */
  .selectAccount {
    position: absolute;
    top: 5px;
    border-radius: 15px;
    background-color: white;
    border: solid 1px black;
    overflow: hidden;
    z-index: 5;
  }
  .menuUserCell {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-right: 20px;
  }
  .menuUserCell:last-child {
    border-bottom: none;
  }
  .menuUserCell img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-left: 10px;
  }
  .menuUserCell p {
    margin-left: 5px;
  }
  .menuUserCell:hover {
    cursor: pointer;
    background-color: #a0a0a0;
    transition: background-color 0.5s;
  }

  /* 残りいいね数 */
  .remainIINE {
    position: absolute;
    right: 10px;
  }
  .remainIINE span {
    font-weight: bold;
    font-size: 16px;
  }
</style>
