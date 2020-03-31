class ElemIcon {
  setIconPosition(elem) {
    let board = document.querySelector('.board')
    let move = document.querySelector('.move-icon')
    move.style.left = elem.left + board.getBoundingClientRect().left + 'px'
    console.log(elem.left)
    console.log(board.getBoundingClientRect().left)
    move.style.top =
      board.getBoundingClientRect().top +
      elem.top -
      move.getBoundingClientRect().height +
      'px'
    let deleteIcon = document.querySelector('.delete-icon')
    deleteIcon.style.left =
      elem.left +
      board.getBoundingClientRect().left +
      move.getBoundingClientRect().width * 2 +
      'px'
    deleteIcon.style.top =
      board.getBoundingClientRect().top +
      elem.top -
      deleteIcon.getBoundingClientRect().height +
      'px'
    let copyIcon = document.querySelector('.copy-icon')
    copyIcon.style.left =
      elem.left +
      board.getBoundingClientRect().left +
      move.getBoundingClientRect().width +
      'px'
    copyIcon.style.top =
      board.getBoundingClientRect().top +
      elem.top -
      deleteIcon.getBoundingClientRect().height +
      'px'
  }
}

export default new ElemIcon()
