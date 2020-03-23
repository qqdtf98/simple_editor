const tempCSS = {
  state: {
    templateCSS: ''
  },
  getters: {
    templateCSS: function(state) {
      return state.templateCSS
    }
  },
  mutations: {
    setTemplateCSS(state, code) {
      state.templateCSS = code
    }
  }
}

export default tempCSS
