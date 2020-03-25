class SelectorModule {
  /**
   * Render border around target element
   * @param {HTMLElement} target HTML element target for selector
   */
  activateSelector(target) {
    let board = document.querySelector('.board')
    let tag = document.querySelector('.tagname')

    tag.textContent = target.tagName
    tag.style.left =
      target.getBoundingClientRect().left +
      board.getBoundingClientRect().left +
      'px'

    tag.style.top =
      target.getBoundingClientRect().top +
      board.getBoundingClientRect().top -
      tag.getBoundingClientRect().height +
      'px'
    let bottomBord = document.querySelector('.bottom-border')
    let topBord = document.querySelector('.top-border')
    let rightBord = document.querySelector('.right-border')
    let leftBord = document.querySelector('.left-border')

    let leftOver = false
    let rightOver = false
    let bottomOver = false
    let topOver = false

    if (
      target.getBoundingClientRect().left + board.getBoundingClientRect().left <
      board.getBoundingClientRect().left
    ) {
      leftOver = true
    }
    if (
      target.getBoundingClientRect().right +
        board.getBoundingClientRect().left >
      board.getBoundingClientRect().right
    ) {
      rightOver = true
    }
    if (
      target.getBoundingClientRect().top + board.getBoundingClientRect().top <
      board.getBoundingClientRect().top
    ) {
      topOver = true
    }
    if (
      target.getBoundingClientRect().bottom +
        board.getBoundingClientRect().top >
      board.getBoundingClientRect().bottom
    ) {
      bottomOver = true
    }
    if (leftOver && topOver && !rightOver && !bottomOver) {
      // left, top 벗어날 때
      tag.style.display = 'none'
      leftBord.style.display = 'none'
      topBord.style.display = 'none'
      rightBord.style.display = 'block'
      bottomBord.style.display = 'block'

      rightBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        target.getBoundingClientRect().width -
        2 +
        'px'
      rightBord.style.top = board.getBoundingClientRect().top + 'px'
      rightBord.style.height =
        target.getBoundingClientRect().height +
        target.getBoundingClientRect().top +
        'px'
      bottomBord.style.left = board.getBoundingClientRect().left + 'px'
      bottomBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        target.getBoundingClientRect().height -
        2 +
        'px'
      bottomBord.style.width =
        target.getBoundingClientRect().width +
        target.getBoundingClientRect().left +
        'px'
      // 1
    } else if (!leftOver && topOver && !rightOver && !bottomOver) {
      // top 벗어날 때
      tag.style.display = 'none'
      leftBord.style.display = 'block'
      topBord.style.display = 'none'
      rightBord.style.display = 'block'
      bottomBord.style.display = 'block'

      rightBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        target.getBoundingClientRect().width -
        2 +
        'px'
      rightBord.style.top = board.getBoundingClientRect().top + 'px'
      rightBord.style.height =
        target.getBoundingClientRect().height +
        target.getBoundingClientRect().top +
        'px'

      leftBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      leftBord.style.top = board.getBoundingClientRect().top + 'px'
      leftBord.style.height =
        target.getBoundingClientRect().height +
        target.getBoundingClientRect().top +
        'px'

      bottomBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      bottomBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        target.getBoundingClientRect().height -
        2 +
        'px'
      bottomBord.style.width = target.getBoundingClientRect().width + 'px'
      // 2
    } else if (!leftOver && topOver && rightOver && !bottomOver) {
      // right, top 벗어날 때
      tag.style.display = 'none'
      rightBord.style.display = 'none'
      topBord.style.display = 'none'
      leftBord.style.display = 'block'
      bottomBord.style.display = 'block'

      leftBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      leftBord.style.top = board.getBoundingClientRect().top + 'px'
      leftBord.style.height =
        target.getBoundingClientRect().height +
        target.getBoundingClientRect().top +
        'px'
      bottomBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      bottomBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        target.getBoundingClientRect().height +
        'px'
      bottomBord.style.width =
        target.getBoundingClientRect().width -
        (target.getBoundingClientRect().right -
          board.getBoundingClientRect().right) -
        board.getBoundingClientRect().left +
        'px'
      // 3
    } else if (!leftOver && !topOver && rightOver && !bottomOver) {
      // right 벗어날 때
      tag.style.display = 'block'
      leftBord.style.display = 'block'
      rightBord.style.display = 'none'
      topBord.style.display = 'block'
      bottomBord.style.display = 'block'

      leftBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      leftBord.style.top =
        board.getBoundingClientRect().top +
        target.getBoundingClientRect().top +
        'px'
      leftBord.style.height = target.getBoundingClientRect().height + 'px'

      bottomBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      bottomBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        target.getBoundingClientRect().height -
        2 +
        'px'
      bottomBord.style.width =
        target.getBoundingClientRect().width -
        (target.getBoundingClientRect().right -
          board.getBoundingClientRect().right) -
        board.getBoundingClientRect().left +
        'px'

      topBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      topBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      topBord.style.width =
        target.getBoundingClientRect().width -
        (target.getBoundingClientRect().right -
          board.getBoundingClientRect().right) -
        board.getBoundingClientRect().left +
        'px'
      // 4
    } else if (!leftOver && !topOver && rightOver && bottomOver) {
      // right, bottom 벗어날 때
      tag.style.display = 'block'
      leftBord.style.display = 'block'
      rightBord.style.display = 'none'
      topBord.style.display = 'block'
      bottomBord.style.display = 'none'

      leftBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      leftBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        2 +
        'px'
      leftBord.style.height =
        target.getBoundingClientRect().height -
        (target.getBoundingClientRect().bottom -
          board.getBoundingClientRect().bottom) -
        board.getBoundingClientRect().top +
        'px'

      topBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      topBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      topBord.style.width =
        target.getBoundingClientRect().width -
        (target.getBoundingClientRect().right -
          board.getBoundingClientRect().right) -
        board.getBoundingClientRect().left +
        'px'
      // 5
    } else if (!leftOver && !topOver && !rightOver && bottomOver) {
      // bottom 벗어날 때
      tag.style.display = 'block'
      leftBord.style.display = 'block'
      rightBord.style.display = 'block'
      topBord.style.display = 'block'
      bottomBord.style.display = 'none'

      leftBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      leftBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        2 +
        'px'
      leftBord.style.height =
        target.getBoundingClientRect().height -
        (target.getBoundingClientRect().bottom -
          board.getBoundingClientRect().bottom) -
        board.getBoundingClientRect().top +
        'px'

      rightBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        target.getBoundingClientRect().width +
        'px'
      rightBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        2 +
        'px'
      rightBord.style.height =
        target.getBoundingClientRect().height -
        (target.getBoundingClientRect().bottom -
          board.getBoundingClientRect().bottom) -
        board.getBoundingClientRect().top +
        'px'

      topBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      topBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      topBord.style.width = target.getBoundingClientRect().width + 2 + 'px'
      // 6
    } else if (leftOver && !topOver && !rightOver && bottomOver) {
      // left, bottom 벗어날 때
      tag.style.display = 'none'
      leftBord.style.display = 'none'
      rightBord.style.display = 'block'
      topBord.style.display = 'block'
      bottomBord.style.display = 'none'

      rightBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        target.getBoundingClientRect().width +
        'px'
      rightBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        2 +
        'px'
      rightBord.style.height =
        target.getBoundingClientRect().height -
        (target.getBoundingClientRect().bottom -
          board.getBoundingClientRect().bottom) -
        board.getBoundingClientRect().top +
        'px'

      topBord.style.left = board.getBoundingClientRect().left + 'px'
      topBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      topBord.style.width =
        target.getBoundingClientRect().width -
        (board.getBoundingClientRect().left -
          target.getBoundingClientRect().left) +
        board.getBoundingClientRect().left +
        2 +
        'px'
      // 7
    } else if (leftOver && !topOver && !rightOver && !bottomOver) {
      // left, bottom 벗어날 때
      tag.style.display = 'none'
      leftBord.style.display = 'none'
      rightBord.style.display = 'block'
      topBord.style.display = 'block'
      bottomBord.style.display = 'block'

      rightBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        target.getBoundingClientRect().width +
        'px'
      rightBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        2 +
        'px'
      rightBord.style.height = target.getBoundingClientRect().height + 'px'

      topBord.style.left = board.getBoundingClientRect().left + 2 + 'px'
      topBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      topBord.style.width =
        target.getBoundingClientRect().width -
        (board.getBoundingClientRect().left -
          target.getBoundingClientRect().left) +
        board.getBoundingClientRect().left +
        'px'

      bottomBord.style.left = board.getBoundingClientRect().left + 'px'
      bottomBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        target.getBoundingClientRect().height +
        'px'
      bottomBord.style.width =
        target.getBoundingClientRect().width -
        (board.getBoundingClientRect().left -
          target.getBoundingClientRect().left) +
        board.getBoundingClientRect().left +
        'px'
      // 8
    } else if (leftOver && !topOver && rightOver && !bottomOver) {
      // left, right 벗어날 때
      tag.style.display = 'none'
      leftBord.style.display = 'none'
      rightBord.style.display = 'none'
      topBord.style.display = 'block'
      bottomBord.style.display = 'block'

      topBord.style.left = board.getBoundingClientRect().left + 2 + 'px'
      topBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      topBord.style.width =
        target.getBoundingClientRect().width -
        (board.getBoundingClientRect().left -
          target.getBoundingClientRect().left) -
        (target.getBoundingClientRect().right -
          board.getBoundingClientRect().right) -
        4 +
        'px'

      bottomBord.style.left = board.getBoundingClientRect().left + 2 + 'px'
      bottomBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top -
        2 +
        target.getBoundingClientRect().height +
        'px'
      bottomBord.style.width =
        target.getBoundingClientRect().width -
        (board.getBoundingClientRect().left -
          target.getBoundingClientRect().left) -
        (target.getBoundingClientRect().right -
          board.getBoundingClientRect().right) -
        4 +
        'px'
      // 9
    } else if (!leftOver && topOver && !rightOver && bottomOver) {
      // top, bottom 벗어날 때
      tag.style.display = 'none'
      leftBord.style.display = 'block'
      rightBord.style.display = 'block'
      topBord.style.display = 'none'
      bottomBord.style.display = 'none'

      rightBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        target.getBoundingClientRect().width +
        'px'
      rightBord.style.top = board.getBoundingClientRect().top + 2 + 'px'
      rightBord.style.height =
        target.getBoundingClientRect().height -
        (board.getBoundingClientRect().top -
          target.getBoundingClientRect().top) -
        (target.getBoundingClientRect().bottom -
          board.getBoundingClientRect().bottom) -
        4 +
        'px'

      leftBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      leftBord.style.top = board.getBoundingClientRect().top + 2 + 'px'
      leftBord.style.height =
        target.getBoundingClientRect().height -
        (board.getBoundingClientRect().top -
          target.getBoundingClientRect().top) -
        (target.getBoundingClientRect().bottom -
          board.getBoundingClientRect().bottom) -
        4 +
        'px'
      // 10
    } else if (leftOver && topOver && !rightOver && bottomOver) {
      // left, top, bottom 벗어날 때
      tag.style.display = 'none'
      leftBord.style.display = 'none'
      rightBord.style.display = 'block'
      topBord.style.display = 'none'
      bottomBord.style.display = 'none'

      rightBord.style.left =
        target.getBoundingClientRect().left +
        target.getBoundingClientRect().width +
        board.getBoundingClientRect().left +
        'px'
      rightBord.style.top = board.getBoundingClientRect().top + 2 + 'px'
      rightBord.style.height =
        target.getBoundingClientRect().height -
        (board.getBoundingClientRect().top -
          target.getBoundingClientRect().top) -
        (target.getBoundingClientRect().bottom -
          board.getBoundingClientRect().bottom) -
        4 +
        'px'
      // 11
    } else if (leftOver && topOver && rightOver && !bottomOver) {
      // left, top, right 벗어날 때
      tag.style.display = 'none'
      leftBord.style.display = 'none'
      rightBord.style.display = 'none'
      topBord.style.display = 'none'
      bottomBord.style.display = 'block'

      bottomBord.style.left = board.getBoundingClientRect().left + 'px'
      bottomBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        target.getBoundingClientRect().height +
        'px'
      bottomBord.style.width =
        target.getBoundingClientRect().width -
        (board.getBoundingClientRect().left -
          target.getBoundingClientRect().left) -
        (target.getBoundingClientRect().right -
          board.getBoundingClientRect().right) -
        4 +
        'px'
      // 12
    } else if (!leftOver && topOver && rightOver && bottomOver) {
      // right, top, bottom 벗어날 때
      tag.style.display = 'none'
      leftBord.style.display = 'block'
      rightBord.style.display = 'none'
      topBord.style.display = 'none'
      bottomBord.style.display = 'none'

      leftBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      leftBord.style.top = board.getBoundingClientRect().top + 2 + 'px'
      leftBord.style.height =
        target.getBoundingClientRect().height -
        (board.getBoundingClientRect().top -
          target.getBoundingClientRect().top) -
        (target.getBoundingClientRect().bottom -
          board.getBoundingClientRect().bottom) -
        4 +
        'px'
      // 13
    } else if (leftOver && !topOver && rightOver && bottomOver) {
      // right, top, bottom 벗어날 때
      tag.style.display = 'none'
      leftBord.style.display = 'none'
      rightBord.style.display = 'none'
      topBord.style.display = 'block'
      bottomBord.style.display = 'none'

      topBord.style.left = board.getBoundingClientRect().left + 2 + 'px'
      topBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      topBord.style.width =
        target.getBoundingClientRect().width -
        (board.getBoundingClientRect().left -
          target.getBoundingClientRect().left) -
        (target.getBoundingClientRect().right -
          board.getBoundingClientRect().right) -
        4 +
        'px'
      // 14
    } else if (leftOver && topOver && rightOver && bottomOver) {
      // 사방 벗어날 때
      tag.style.display = 'none'
      leftBord.style.display = 'none'
      rightBord.style.display = 'none'
      topBord.style.display = 'none'
      bottomBord.style.display = 'none'
      // 15
    } else {
      tag.style.display = 'block'
      leftBord.style.display = 'block'
      topBord.style.display = 'block'
      rightBord.style.display = 'block'
      bottomBord.style.display = 'block'
      topBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      topBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      topBord.style.width = target.getBoundingClientRect().width + 'px'
      // bottomBord.style.display = 'none'?
      leftBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      leftBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      leftBord.style.height = target.getBoundingClientRect().height + 'px'
      rightBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        target.getBoundingClientRect().width +
        'px'
      rightBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      rightBord.style.height = target.getBoundingClientRect().height + 2 + 'px'
      bottomBord.style.left =
        target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      bottomBord.style.top =
        target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        target.getBoundingClientRect().height +
        'px'
      bottomBord.style.width = target.getBoundingClientRect().width + 'px'
    }
  }
}

export default new SelectorModule()
