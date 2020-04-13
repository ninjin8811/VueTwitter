<template>
  <div class="postList">
    <div class="fromToUsers">
      <div class="avatarBox">
        <img v-bind:src="fromUser.avatarPath" alt="送ったユーザー">
        <p>{{fromUser.name}}</p>
      </div>
      <p class="rightArrow">→</p>
      <div class="avatarBox">
        <img v-bind:src="toUser.avatarPath" alt="送られたユーザー">
        <p>{{toUser.name}}</p>
      </div>
    </div>
    <div class="messageBox">
      <p>あああああああああああああああああああああああああああああああああああああああああああ</p>
    </div>
    <div class="buttonBox">
      <button v-bind:class="['iineButton', highlightedClass, disabledClass]" v-on:click="iineClicked()" v-bind:disabled="iineDisabled">{{totalIINE}} <font-awesome-icon :icon="['far', 'heart']" /></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'postList',
    data() {
      return {
        fromUserIndex: 0,
        toUserIndex: 1,
        currentUserIndex: 0,
        userList: [
          { id: 1, name: 'Firmino', avatarPath: require('../assets/firmino.jpg') },
          { id: 2, name: 'Mane', avatarPath: require('../assets/mane.jpg') },
          { id: 3, name: 'Allison', avatarPath: require('../assets/allison.jpg')}
        ],
        iineCountList: [
          { id: 1, count: 0 },
          { id: 2, count: 0 },
          { id: 3, count: 0 }
        ],
      }
    },
    computed: {
      fromUser: function() {
        return this.userList.find(el => el.id === this.fromUserIndex + 1) || {}
      },
      toUser: function() {
        return this.userList.find(el => el.id === this.toUserIndex + 1) || {}
      },
      highlightedClass() {
        return this.iineCountList[this.currentUserIndex].count > 0 ? 'buttonHighlighted' : false
      },
      disabledClass() {
        return this.iineCountList[this.currentUserIndex].count >= 10 ? 'buttonDisabled' : false
      },
      iineDisabled() {
        return this.iineCountList[this.currentUserIndex].count >= 10 ? true : false
      },
      totalIINE() {
        return this.iineCountList.reduce((total, iineList) => total + iineList.count, 0)
      }
    },
    methods: {
      iineClicked: function() {
        this.iineCountList[this.currentUserIndex].count += 1
      }
    }
  }
</script>

<style scoped>
  .postList {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: solid 0.5px gray;
  }
  /* 誰が誰に送ったかのブロック */
  .fromToUsers {
    display: flex;
    align-items: center;
    height: 77px;
    width: 156px;
    margin-left: -5px;
  }
  .avatarBox {
    text-align: center;
    width: 70px;
  }
  .avatarBox img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
  }
  .avatarBox p {
    font-size: 12px;
  }
  .rightArrow {
    font-size: 16px;
  }
  /* メッセージ */
  .messageBox {
    width: 100%;
    margin-top: 10px;
    padding-left: 60px;
    font-size: 16px;
  }
  /* ボタン */
  .buttonBox {
    position: relative;
    margin-top: 10px;;
    height: 20px;
    width: 100%;
  }
  .iineButton {
    position: absolute;
    right: 40px;
    width: 50px;
    font-size: 20px;
    color: #2c3e50;
  }
  .buttonHighlighted {
    color: tomato;
  }
  .buttonDisabled {
    color: firebrick;
  }
  .buttonDisabled:hover {
    cursor: default;
  }
</style>