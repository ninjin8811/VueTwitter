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
            <li v-for="toUser in userList" :key="toUser.id">
              <div class="menuToUserCell" v-on:click="changeToUser(toUser.id)">
                <img v-bind:src="toUser.avatarPath" alt="メニューのアバター">
                <p>{{toUser.name}}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <textarea class="messageBox" name="comment" rows="8" placeholder="入力する" v-model="message"></textarea>
    </div>
    <div class="postButtonBox">
      <button v-on:click="sendTapped()">送信</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "post",
    data() {
      return {
        currentID: 1,
        userList: [],
        postList: [],
        toUserID: 2,
        message: "",
        isShowToUserMenu: false,
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
      this.postList = this.value.postList
    },
    methods: {
      //アバターがタップされたときにユーザーリストを表示
      toUserAvatarTapped: function() {
        this.isShowToUserMenu = !this.isShowToUserMenu
      },
      //ユーザーを選んだ時の処理
      changeToUser: function(selectedID) {
        this.isShowToUserMenu = !this.isShowToUserMenu
        this.toUserID = selectedID
      },
      //送信ボタンが押された時、投稿データを親コンポーネントに反映する
      sendTapped: function() {
        this.currentID = this.value.currentID
        const post = {
          fromUserID: this.currentID,
          toUserID: this.toUserID,
          message: this.message,
          iineCountList: [
            { id: 1, count: 0 },
            { id: 2, count: 0 },
            { id: 3, count: 0 },
          ]
        }
        this.postList.unshift(post)
        this.$emit('input', {
          postList: this.postList
        })
      }
    },
    computed: {
      //現在のユーザーを返す
      currentToUser() {
        return this.userList.find(el => el.id === this.toUserID) || {}
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