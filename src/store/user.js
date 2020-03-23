const user = {
  state: {
    userId: 'lsm',
    userSeq: 2
  },
  getters: {
    userId: function(state) {
      return state.userId
    },
    userSeq: function(state) {
      return state.userSeq
    }
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id
    },
    setUserSeq(state, seq) {
      state.userSeq = seq
    }
  }
}

export default user
