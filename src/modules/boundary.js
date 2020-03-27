class Boundary {
  setBoundaryPosition(e) {
    let leftLine = document.querySelector('.boundary-line-left')
    let rightLine = document.querySelector('.boundary-line-right')
    let topLine = document.querySelector('.boundary-line-top')
    let bottomLine = document.querySelector('.boundary-line-bottom')
    let elem = e.target.getBoundingClientRect()

    process.nextTick(() => {
      console.log(bottomLine)
      bottomLine.style.left =
        elem.left + board.getBoundingClientRect().left + 'px'
      bottomLine.style.top =
        elem.top + elem.height + board.getBoundingClientRect().top - 1 + 'px'
      bottomLine.style.width = elem.width + 'px'
      topLine.style.left = elem.left + board.getBoundingClientRect().left + 'px'
      topLine.style.top =
        elem.top + board.getBoundingClientRect().top + 1 + 'px'
      topLine.style.width = elem.width + 'px'
      leftLine.style.left =
        elem.left + board.getBoundingClientRect().left + 'px'
      leftLine.style.top =
        elem.top + board.getBoundingClientRect().top + 2 + 'px'
      leftLine.style.height = elem.height + 'px'
      rightLine.style.left =
        elem.left + elem.width + board.getBoundingClientRect().left - 2 + 'px'
      rightLine.style.top =
        elem.top + board.getBoundingClientRect().top + 2 + 'px'
      rightLine.style.height = elem.height + 'px'
    })
  }
}
export default new Boundary()
