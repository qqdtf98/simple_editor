class UndoRedoModule {
  undoWork(work) {
    if (work.work === 'style') {
      console.log(work)
      work.elem.style[work.style] = work.value
    } else if (work.work === 'remove') {
      let parent = work.position
      $(work.elem).insertAfter(parent.children[work.nth - 1])
    } else if (work.work === 'add') {
      let parent = work.position
      parent.removeChild(work.elem)
    } else if (work.work === 'copy') {
      work.position.removeChild(work.copyElem)
    } else if (work.work === 'move') {
      work.afterMovePosition.removeChild(work.elem)
      work.position.appendChild(work.elem)
    } else if (work.work === 'width') {
      work.elem.style.width = work.beforeSize
    } else if (work.work === 'height') {
      work.elem.style.height = work.beforeSize
    } else if (work.work === 'edit') {
      work.elem.textContent = work.beforeEdit
    } else if (work.work === 'widthChange') {
      let i
      let entries = work.elems.entries()
      let setIter = work.elems[Symbol.iterator]()
      for (i = 0; i < work.elems.size; i++) {
        let item = setIter.next().value
        item.style.width = work.beforeWidth[i] + 'px'
      }
    } else if (work.work === 'heightChange') {
      let i
      let entries = work.elems.entries()
      let setIter = work.elems[Symbol.iterator]()
      for (i = 0; i < work.elems.size; i++) {
        let item = setIter.next().value
        item.style.height = work.beforeHeight[i] + 'px'
      }
    } else if (work.work === 'multiDelete') {
      let i
      for (i = work.elem.length - 1; i >= 0; i--) {
        work.afterParent[i].insertBefore(
          work.elem[i],
          work.afterParent[i].childNodes[work.nth[i]]
        )
      }
    }
  }
  redoWork(rework) {
    if (rework.work === 'style') {
      rework.elem.style[rework.style] = rework.afterValue
    } else if (rework.work === 'move') {
      rework.afterMovePosition.appendChild(rework.elem)
    } else if (rework.work === 'remove') {
      let parent = rework.position
      parent.removeChild(rework.elem)
    } else if (rework.work === 'add') {
      rework.position.appendChild(rework.elem)
    } else if (rework.work === 'copy') {
      $(rework.elem).after(rework.copyElem)
    } else if (rework.work === 'width') {
      rework.elem.style.width = rework.afterSize
    } else if (rework.work === 'height') {
      rework.elem.style.height = rework.afterSize
    } else if (rework.work === 'edit') {
      rework.elem.textContent = rework.afterEdit
    } else if (rework.work === 'widthChange') {
      let i
      let entries = rework.elems.entries()
      let setIter = rework.elems[Symbol.iterator]()
      for (i = 0; i < rework.elems.size; i++) {
        let item = setIter.next().value
        item.style.width = rework.afterWidth + 'px'
      }
    } else if (rework.work === 'heightChange') {
      let i
      let entries = rework.elems.entries()
      let setIter = rework.elems[Symbol.iterator]()
      for (i = 0; i < rework.elems.size; i++) {
        let item = setIter.next().value
        item.style.height = rework.afterHeight + 'px'
      }
    } else if (rework.work === 'multiDelete') {
      let i
      for (i = 0; i < rework.elem.length; i++) {
        rework.elem[i].parentElement.removeChild(rework.elem[i])
      }
    }
  }
}

export default new UndoRedoModule()
