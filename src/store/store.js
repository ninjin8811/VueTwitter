import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUID: 1,
    userList: [
      { id: 1, name: 'Firmino', avatarPath: require('../assets/firmino.jpg'), iine: 100 },
      { id: 2, name: 'Mane', avatarPath: require('../assets/mane.jpg'), iine: 70 },
      { id: 3, name: 'Allison', avatarPath: require('../assets/allison.jpg'), iine: 50 }
    ],
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
  },
  getters: {
    currentUser(state) {
      return state.userList.find(user => user.id === state.currentUID) || {}
    },
  },
  mutations: {
    changeUID(state, id) {
      state.currentUID = id
    },
    addPost(state, post) {
      post.iineCountList = [
        { id: 1, count: 0 },
        { id: 2, count: 0 },
        { id: 3, count: 0 },
      ]
      post.postID = state.postList.length + 1
      state.postList.unshift(post)
    },
    manipulateIINE (state, postID) {
      //現在のユーザーのいいねを減らす
      state.userList.find(user => user.id === state.currentUID).iine -= 1
      //特定のポストの中の、現在のユーザーのカウントリストの値を増やす
      state.postList.find(post => post.postID === postID).iineCountList.find(user => user.id === state.currentUID).count += 1
    }
  }
})