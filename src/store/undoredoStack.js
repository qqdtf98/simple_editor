const undoredoStack = {
  state: {
    workStack: [],
    reworkStack: []
  },
  getters: {
    workStack: function(state) {
      return state.workStack
    },
    reworkStack: function(state) {
      return state.reworkStack
    }
  },
  mutations: {
    setWorkStack(state, work) {
      state.workStack = work
    },
    setReWorkStack(state, rework) {
      state.reworkStack = rework
    }
  },
  actions: {
    workStackPush(store, work) {
      store.state.workStack.push(work)
    },
    reworkStackPush(store, rework) {
      store.state.reworkStack.push(rework)
    }
    // workStackPop(store) {
    //   let work = store.state.workStack.pop()
    //   console.log(work)
    // },
    // reworkStackPop(store) {
    //   let rework = store.state.reworkStack.pop()
    // }
  }
}

export default undoredoStack
