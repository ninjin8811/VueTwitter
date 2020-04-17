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
      <p>{{post.message}}</p>
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
        post: {},
        countList: []
      }
    },
    props: {
      propPost: {
        type: Object,
        required: true
      }
    },
    // 受け取った値をコンポーネントのローカルに保存
    mounted: function() {
      this.post = this.propPost
      this.countList = this.propPost.iineCountList
    },
    watch: {
      propPost: {
        handler: function(newValue) {
          this.countList = newValue.iineCountList
        },
        deep: true
      }
    },
    computed: {
      currentUID() {
        return this.$store.state.currentUID
      },
      userList() {
        return this.$store.state.userList
      },
      currentUser() {
        return this.$store.getters.currentUser
      },
      fromUser() {
        return this.userList.find(user => user.id === this.post.fromUserID) || {}
      },
      toUser() {
        return this.userList.find(user => user.id === this.post.toUserID) || {}
      },
      currentUserCount() {
        return this.countList.find(user => user.id === this.currentUID) || {}
      },
      highlightedClass() {
        return this.currentUserCount.count > 0 ? 'buttonHighlighted' : false
      },
      disabledClass() {
        if (this.currentUserCount.count >= 10 || this.currentUID == this.post.fromUserID) {
          return 'buttonDisabled'
        } else {
          return false
        }
      },
      iineDisabled() {
        return this.currentUserCount.count >= 10 || this.currentUID == this.post.fromUserID ? true : false
      },
      totalIINE() {
        return this.countList.reduce((total, iine) => total + iine.count, 0)
      }
    },
    methods: {
      iineClicked() {
        if (this.currentUser.iine > 0) {
          this.$store.commit('manipulateIINE', this.post.postID)
        }
      }
    },
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
    font-size: 14px;
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