const fileData = {
  state: {
    selectedFile: null,
    htmlTitles: [],
    cssTitles: [],
    jsTitles: [],
    titles: [],
    folderSeq: [],
    stylePair: []
  },
  getters: {
    selectedFile: function(state) {
      return state.selectedFile
    },
    htmlTitles: function(state) {
      return state.htmlTitles
    },
    cssTitles: function(state) {
      return state.cssTitles
    },
    jsTitles: function(state) {
      return state.jsTitles
    },
    titles: function(state) {
      return state.titles
    },
    folderSeq: function(state) {
      return state.folderSeq
    },
    stylePair: function(state) {
      return state.stylePair
    }
  },
  mutations: {
    setSelectedFile(state, file) {
      state.selectedFile = file
    },
    setHtmlTitles(state, html) {
      state.htmlTitles = html
    },
    setCssTitles(state, css) {
      state.cssTitles = css
    },
    setJsTitles(state, js) {
      state.jsTitles = js
    },
    setTitles(state, js) {
      state.titles = js
    },
    setFolderSeq(state, seq) {
      state.folderSeq = seq
    },
    setStylePair(state, pair) {
      state.stylePair = pair
    }
  }
}

export default fileData
