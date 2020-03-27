class ElemIcon {
  setIconPosition(elem) {
    let move = document.querySelector('.move-icon')
    move.style.left = elem.left + 'px'
    move.style.top = elem.top - move.getBoundingClientRect().height + 'px'
    let deleteIcon = document.querySelector('.delete-icon')
    deleteIcon.style.left =
      elem.left + move.getBoundingClientRect().width * 2 + 'px'
    deleteIcon.style.top =
      elem.top - deleteIcon.getBoundingClientRect().height + 'px'
    let copyIcon = document.querySelector('.copy-icon')
    copyIcon.style.left = elem.left + move.getBoundingClientRect().width + 'px'
    copyIcon.style.left =
      elem.top - copyIcon.getBoundingClientRect().height + 'px'
  }
}

export default new ElemIcon()
