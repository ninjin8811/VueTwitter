<template>
  <div>
    <header-component class="header" v-bind:value="userData" v-on:changed-user="changeCurrentID"></header-component>
    <post-component v-bind:value="userData" v-on:posted="addPost"></post-component>
    <post-list v-for="post in postList" v-bind:prop-post="post" v-bind:prop-user-data="userData" :key="post.postID" v-on:decrement-iine="iineTapped"></post-list>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Post from '../../components/Post.vue'
import PostList from '../../components/PostList.vue'

export default {
  name: 'main-view',
  components: {
    'header-component': Header,
    'post-component': Post,
    'post-list': PostList
  },
  data() {
    return {
      userData: {
        currentID: 1,
        userList: [
            { id: 1, name: 'Firmino', avatarPath: require('../../assets/firmino.jpg'), iine: 100 },
            { id: 2, name: 'Mane', avatarPath: require('../../assets/mane.jpg'), iine: 70 },
            { id: 3, name: 'Allison', avatarPath: require('../../assets/allison.jpg'), iine: 50 }
        ]
      },
      postList: [
            {
            fromUserID: 3,
            toUserID: 1,
            postID: 2,
            message: '2つ目',
            iineCountList: [
              { id: 1, count: 3 },
              { id: 2, count: 5 },
              { id: 3, count: 0 },
            ]
            },
            {
            fromUserID: 2,
            toUserID: 3,
            postID: 1,
            message: '最初の投稿',
            iineCountList: [
              { id: 1, count: 3 },
              { id: 2, count: 0 },
              { id: 3, count: 10 },
            ]
            },
        ]
    }
  },
  methods: {
      iineTapped: function() {
          this.currentUser.iine -= 1
      },
      addPost: function(post) {
        this.$set(post, "postID", this.postList.length + 1)
        this.postList.unshift(post)
      },
      changeCurrentID: function(id) {
        this.$set(this.userData, "currentID", id)
      }
  },
  computed: {
      currentUser: function() {
          return this.userData.userList.find(el => el.id === this.userData.currentID) || {}
      }
  }
}
</script>