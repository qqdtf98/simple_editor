const styleData = {
  state: {
    styleData: '',
    target: null,
    changedData: null
  },
  getters: {
    styleData: function(state) {
      return state.styleData
    },
    target: function(state) {
      return state.target
    },
    changedData: function(state) {
      return state.changedData
    }
  },
  mutations: {
    setStyleData(state, style) {
      state.styleData = style
    },
    setTarget(state, target) {
      state.target = target
    },
    setChangedData(state, data) {
      state.changedData = data
    }
  }
}

export default styleData
