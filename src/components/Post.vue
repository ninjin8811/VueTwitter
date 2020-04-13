<template>
  <div class="postView">
    <div class="postSet">
      <div class="toUserBox">
        <p class="rightArrow">→</p>
        <div>
          <div class="currentToUser" v-if="!isShowToUserMenu">
            <img class="toUserAvatar" v-bind:src="currentToUser.avatarPath" alt="相手のユーザー" v-on:click="toUserAvatarTapped()">
            <p>{{currentToUser.name}}</p>
          </div>
          <ol class="selectToUser" v-if="isShowToUserMenu">
            <li v-for="toUser in toUserList" :key="toUser.id">
              <div class="menuToUserCell" v-on:click="changeToUser(toUser.id)">
                <img v-bind:src="toUser.avatarPath" alt="メニューのアバター">
                <p>{{toUser.name}}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <textarea class="messageBox" name="comment" rows="8"></textarea>
    </div>
    <div class="postButtonBox">
      <button href="#">送信</button>
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
        this.currentToUserIndex = selectedID - 1
      }
    },
    computed: {
      currentToUser() {
        return this.toUserList.find(el => el.id === this.currentToUserIndex + 1) || {}
      }
    }
  }
</script>

<style scoped>
  .postView {
    background-color: rgb(243, 243, 243);
    border-bottom: solid 1px black;
  }

  /* Postビュー上部のアバターとメッセージのボックス */
  .postSet {
    display: flex;
    padding: 10px;
  }
  /* 宛先ユーザー */
  .toUserBox {
    position: relative;
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
  .currentToUser p {
    margin-top: 5px;
  }
  .toUserAvatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }
  .toUserAvatar:hover {
    cursor: pointer;
  }
    /* ユーザーリストメニュー */
  .selectToUser {
    position: absolute;
    top: 5px;
    border-radius: 15px;
    background-color: white;
    border: solid 1px black;
    overflow: hidden;
    z-index: 5;
  }
  .menuToUserCell {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-right: 20px;
  }
  .menuToUserCell:last-child {
    border-bottom: none;
  }
  .menuToUserCell img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-left: 10px;
  }
  .menuToUserCell p {
    margin-left: 5px;
  }
  .menuToUserCell:hover {
    cursor: pointer;
    background-color: #a0a0a0;
    transition: background-color 0.5s;
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
  .postButtonBox button {
    position: absolute;
    text-decoration: none;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    color: white;
    right: 20px;
    height: 30px;
    width: 80px;
    border-radius: 15px;
    background-color: rgb(19, 191, 214);
  }
  .postButtonBox button:hover {
    background-color: rgb(50, 211, 233);
  }
  .postButtonBox button:active {
    background-color: rgb(15, 147, 165);
    color: rgb(170, 184, 197);
  }
</style>