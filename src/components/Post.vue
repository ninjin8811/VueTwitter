<template>
  <div class="postView">
    <div class="postSet">
      <div class="toUserBox">
        <p class="rightArrow">→</p>
        <!-- 送る相手のユーザー画像をタップするとなぜか拡大される -->
        <div class="currentToUser" v-if="!isShowToUserMenu">
          <img v-bind:src="avatarPath" alt="相手のユーザー" v-on:click="toUserAvatarTapped()">
          <p>{{toUserList[currentToUserIndex].name}}</p>
        </div>
        <ol class="selectToUser" v-if="isShowToUserMenu">
          <li v-for="toUser in toUserList" v-bind="user" :key="toUser.id">
            <div class="menuToUserCell" v-on:click="changeAccount(toUser.id)">
              <img v-bind:src="toUser.avatarPath" alt="メニューのアバター">
              <p>{{toUser.name}}</p>
            </div>
          </li>
        </ol>
      </div>
      <textarea class="messageBox" name="comment" rows="8"></textarea>
    </div>
    <div class="postButtonBox">
      <a href="#">送信</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "post",
    data() {
      return {
        currentToUserIndex: 0,
        toUserList: [
          { id: 1, name: 'Firmino', avatarPath: require('../assets/firmino.jpg') },
          { id: 2, name: 'Mane', avatarPath: require('../assets/mane.jpg') },
          { id: 3, name: 'Allison', avatarPath: require('../assets/allison.jpg')}
        ],
        isShowToUserMenu: false
      }
    },
    methods: {
      toUserAvatarTapped: function() {
        this.isShowToUserMenu = !this.isShowToUserMenu
      },
      changeToUser: function(selectedID) {
        this.isShowToUserMenu = !this.isShowToUserMenu
        this.currentIndex = selectedID - 1
      }
    },
    computed: {
      avatarPath: function() {
        return this.toUserList[this.currentToUserIndex].avatarPath
      }
    }
  }
</script>

<style scoped>
  .postView {
    background-color: rgb(243, 243, 243);
  }
  /* Postビュー上部のアバターとメッセージのボックス */
  .postSet {
    display: flex;
    padding: 10px;
  }
  /* 宛先ユーザー */
  .toUserBox {
    display: flex;
    width: 30%;
    height: 100px;
  }
  .rightArrow {
    font-size: 24px;
    font-weight: bold;
    line-height: 80px;
  }
  .currentToUser {
    text-align: center;
  }
  .currentToUser img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }
  .currentToUser img:hover {
    cursor: pointer;
  }
  .currentToUser p {
    margin-top: 5px;
  }
  /* メッセージ */
  .messageBox {
    width: 70%;
    height: 120px;
    padding: 10px;
    font-size: 14px;
    border: solid 1px rgb(66, 66, 66);
    border-radius: 15px;
    background-color: white;
  }
  /* Postビュー下部ボタンのボックス */
  .postButtonBox {
    position: relative;
    height: 40px;
    }
  .postButtonBox a {
    position: absolute;
    text-decoration: none;
    text-align: center;
    line-height: 30px;
    color: white;
    right: 20px;
    height: 30px;
    width: 80px;
    border-radius: 15px;
    background-color: rgb(19, 191, 214);
  }
</style>