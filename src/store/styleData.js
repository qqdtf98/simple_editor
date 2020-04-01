const styleData = {
  state: {
    styleData: ''
  },
  getters: {
    styleData: function(state) {
      return state.styleData
    }
  },
  mutations: {
    setStyleData(state, style) {
      state.styleData = style
    }
  }
}

export default styleData
