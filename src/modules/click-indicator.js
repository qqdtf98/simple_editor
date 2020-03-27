export default class ClickIndicator {
  /**
   *
   * @param {HTMLElement} target
   * @param {boolean} isMulti
   */
  constructor(target, isMulti = false) {
    this.target = target
    this.box = null
    this.left = null
    this.right = null
    this.top = null
    this.bottom = null
    this.createBorder()
    this.setBorderPosition()
    if (isMulti) {
      ClickIndicator.instances.add(this)
    } else {
      ClickIndicator.instances.forEach(instance => {
        instance.removeBorder()
      })
      ClickIndicator.instances.clear()
      ClickIndicator.instances.add(this)
    }
  }
  createBorder() {
    this.box = document.querySelector('.click-indicator-box')
    this.right = document.createElement('div')
    this.right.classList.add('click-right-border')
    this.bottom = document.createElement('div')
    this.bottom.classList.add('click-bottom-border')
    this.top = document.createElement('div')
    this.top.classList.add('click-top-border')
    this.left = document.createElement('div')
    this.left.classList.add('click-left-border')
    this.box.appendChild(this.right)
    this.box.appendChild(this.bottom)
    this.box.appendChild(this.top)
    this.box.appendChild(this.left)
  }
  removeBorder() {
    this.box.removeChild(this.top)
    this.box.removeChild(this.right)
    this.box.removeChild(this.bottom)
    this.box.removeChild(this.left)
  }
  setBorderPosition() {
    let board = document.querySelector('.board')

    let leftOver = false
    let rightOver = false
    let bottomOver = false
    let topOver = false

    if (
      this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left <
      board.getBoundingClientRect().left
    ) {
      leftOver = true
    }
    if (
      this.target.getBoundingClientRect().right +
        board.getBoundingClientRect().left >
      board.getBoundingClientRect().right
    ) {
      rightOver = true
    }
    if (
      this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top <
      board.getBoundingClientRect().top
    ) {
      topOver = true
    }
    if (
      this.target.getBoundingClientRect().bottom +
        board.getBoundingClientRect().top >
      board.getBoundingClientRect().bottom
    ) {
      bottomOver = true
    }
    if (leftOver && topOver && !rightOver && !bottomOver) {
      // left, top 벗어날 때
      this.left.style.display = 'none'
      this.top.style.display = 'none'
      this.right.style.display = 'block'
      this.bottom.style.display = 'block'

      this.right.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        this.target.getBoundingClientRect().width -
        2 +
        'px'
      this.right.style.top = board.getBoundingClientRect().top + 'px'
      this.right.style.height =
        this.target.getBoundingClientRect().height +
        this.target.getBoundingClientRect().top +
        'px'
      this.bottom.style.left = board.getBoundingClientRect().left + 'px'
      this.bottom.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        this.target.getBoundingClientRect().height -
        2 +
        'px'
      this.bottom.style.width =
        this.target.getBoundingClientRect().width +
        this.target.getBoundingClientRect().left +
        'px'
      // 1
    } else if (!leftOver && topOver && !rightOver && !bottomOver) {
      // top 벗어날 때
      this.left.style.display = 'block'
      this.top.style.display = 'none'
      this.right.style.display = 'block'
      this.bottom.style.display = 'block'

      this.right.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        this.target.getBoundingClientRect().width -
        2 +
        'px'
      this.right.style.top = board.getBoundingClientRect().top + 'px'
      this.right.style.height =
        this.target.getBoundingClientRect().height +
        this.target.getBoundingClientRect().top +
        'px'

      this.left.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      this.left.style.top = board.getBoundingClientRect().top + 'px'
      this.left.style.height =
        this.target.getBoundingClientRect().height +
        this.target.getBoundingClientRect().top +
        'px'

      this.bottom.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      this.bottom.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        this.target.getBoundingClientRect().height -
        2 +
        'px'
      this.bottom.style.width = this.target.getBoundingClientRect().width + 'px'
      // 2
    } else if (!leftOver && topOver && rightOver && !bottomOver) {
      // right, top 벗어날 때
      this.right.style.display = 'none'
      this.top.style.display = 'none'
      this.left.style.display = 'block'
      this.bottom.style.display = 'block'

      this.left.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      this.left.style.top = board.getBoundingClientRect().top + 'px'
      this.left.style.height =
        this.target.getBoundingClientRect().height +
        this.target.getBoundingClientRect().top +
        'px'
      this.bottom.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      this.bottom.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        this.target.getBoundingClientRect().height +
        'px'
      this.bottom.style.width =
        this.target.getBoundingClientRect().width -
        (this.target.getBoundingClientRect().right -
          board.getBoundingClientRect().right) -
        board.getBoundingClientRect().left +
        'px'
      // 3
    } else if (!leftOver && !topOver && rightOver && !bottomOver) {
      // right 벗어날 때
      this.left.style.display = 'block'
      this.right.style.display = 'none'
      this.top.style.display = 'block'
      this.bottom.style.display = 'block'

      this.left.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      this.left.style.top =
        board.getBoundingClientRect().top +
        this.target.getBoundingClientRect().top +
        'px'
      this.left.style.height = this.target.getBoundingClientRect().height + 'px'

      this.bottom.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      this.bottom.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        this.target.getBoundingClientRect().height -
        2 +
        'px'
      this.bottom.style.width =
        this.target.getBoundingClientRect().width -
        (this.target.getBoundingClientRect().right -
          board.getBoundingClientRect().right) -
        board.getBoundingClientRect().left +
        'px'

      this.top.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      this.top.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      this.top.style.width =
        this.target.getBoundingClientRect().width -
        (this.target.getBoundingClientRect().right -
          board.getBoundingClientRect().right) -
        board.getBoundingClientRect().left +
        'px'
      // 4
    } else if (!leftOver && !topOver && rightOver && bottomOver) {
      // right, bottom 벗어날 때
      this.left.style.display = 'block'
      this.right.style.display = 'none'
      this.top.style.display = 'block'
      this.bottom.style.display = 'none'

      this.left.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      this.left.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        2 +
        'px'
      this.left.style.height =
        this.target.getBoundingClientRect().height -
        (this.target.getBoundingClientRect().bottom -
          board.getBoundingClientRect().bottom) -
        board.getBoundingClientRect().top +
        'px'

      this.top.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      this.top.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      this.top.style.width =
        this.target.getBoundingClientRect().width -
        (this.target.getBoundingClientRect().right -
          board.getBoundingClientRect().right) -
        board.getBoundingClientRect().left +
        'px'
      // 5
    } else if (!leftOver && !topOver && !rightOver && bottomOver) {
      // bottom 벗어날 때
      this.left.style.display = 'block'
      this.right.style.display = 'block'
      this.top.style.display = 'block'
      this.bottom.style.display = 'none'

      this.left.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      this.left.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        2 +
        'px'
      this.left.style.height =
        this.target.getBoundingClientRect().height -
        (this.target.getBoundingClientRect().bottom -
          board.getBoundingClientRect().bottom) -
        board.getBoundingClientRect().top +
        'px'

      this.right.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        this.target.getBoundingClientRect().width +
        'px'
      this.right.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        2 +
        'px'
      this.right.style.height =
        this.target.getBoundingClientRect().height -
        (this.target.getBoundingClientRect().bottom -
          board.getBoundingClientRect().bottom) -
        board.getBoundingClientRect().top +
        'px'

      this.top.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      this.top.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      this.top.style.width =
        this.target.getBoundingClientRect().width + 2 + 'px'
      // 6
    } else if (leftOver && !topOver && !rightOver && bottomOver) {
      // left, bottom 벗어날 때
      this.left.style.display = 'none'
      this.right.style.display = 'block'
      this.top.style.display = 'block'
      this.bottom.style.display = 'none'

      this.right.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        this.target.getBoundingClientRect().width +
        'px'
      this.right.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        2 +
        'px'
      this.right.style.height =
        this.target.getBoundingClientRect().height -
        (this.target.getBoundingClientRect().bottom -
          board.getBoundingClientRect().bottom) -
        board.getBoundingClientRect().top +
        'px'

      this.top.style.left = board.getBoundingClientRect().left + 'px'
      this.top.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      this.top.style.width =
        this.target.getBoundingClientRect().width -
        (board.getBoundingClientRect().left -
          this.target.getBoundingClientRect().left) +
        board.getBoundingClientRect().left +
        2 +
        'px'
      // 7
    } else if (leftOver && !topOver && !rightOver && !bottomOver) {
      // left, bottom 벗어날 때
      this.left.style.display = 'none'
      this.right.style.display = 'block'
      this.top.style.display = 'block'
      this.bottom.style.display = 'block'

      this.right.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        this.target.getBoundingClientRect().width +
        'px'
      this.right.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        2 +
        'px'
      this.right.style.height =
        this.target.getBoundingClientRect().height + 'px'

      this.top.style.left = board.getBoundingClientRect().left + 2 + 'px'
      this.top.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      this.top.style.width =
        this.target.getBoundingClientRect().width -
        (board.getBoundingClientRect().left -
          this.target.getBoundingClientRect().left) +
        board.getBoundingClientRect().left +
        'px'

      this.bottom.style.left = board.getBoundingClientRect().left + 'px'
      this.bottom.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        this.target.getBoundingClientRect().height +
        'px'
      this.bottom.style.width =
        this.target.getBoundingClientRect().width -
        (board.getBoundingClientRect().left -
          this.target.getBoundingClientRect().left) +
        board.getBoundingClientRect().left +
        'px'
      // 8
    } else if (leftOver && !topOver && rightOver && !bottomOver) {
      // left, right 벗어날 때
      this.left.style.display = 'none'
      this.right.style.display = 'none'
      this.top.style.display = 'block'
      this.bottom.style.display = 'block'

      this.top.style.left = board.getBoundingClientRect().left + 2 + 'px'
      this.top.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      this.top.style.width =
        this.target.getBoundingClientRect().width -
        (board.getBoundingClientRect().left -
          this.target.getBoundingClientRect().left) -
        (this.target.getBoundingClientRect().right -
          board.getBoundingClientRect().right) -
        4 +
        'px'

      this.bottom.style.left = board.getBoundingClientRect().left + 2 + 'px'
      this.bottom.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top -
        2 +
        this.target.getBoundingClientRect().height +
        'px'
      this.bottom.style.width =
        this.target.getBoundingClientRect().width -
        (board.getBoundingClientRect().left -
          this.target.getBoundingClientRect().left) -
        (this.target.getBoundingClientRect().right -
          board.getBoundingClientRect().right) -
        4 +
        'px'
      // 9
    } else if (!leftOver && topOver && !rightOver && bottomOver) {
      // top, bottom 벗어날 때
      this.left.style.display = 'block'
      this.right.style.display = 'block'
      this.top.style.display = 'none'
      this.bottom.style.display = 'none'

      this.right.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        this.target.getBoundingClientRect().width +
        'px'
      this.right.style.top = board.getBoundingClientRect().top + 2 + 'px'
      this.right.style.height =
        this.target.getBoundingClientRect().height -
        (board.getBoundingClientRect().top -
          this.target.getBoundingClientRect().top) -
        (this.target.getBoundingClientRect().bottom -
          board.getBoundingClientRect().bottom) -
        4 +
        'px'

      this.left.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      this.left.style.top = board.getBoundingClientRect().top + 2 + 'px'
      this.left.style.height =
        this.target.getBoundingClientRect().height -
        (board.getBoundingClientRect().top -
          this.target.getBoundingClientRect().top) -
        (this.target.getBoundingClientRect().bottom -
          board.getBoundingClientRect().bottom) -
        4 +
        'px'
      // 10
    } else if (leftOver && topOver && !rightOver && bottomOver) {
      // left, top, bottom 벗어날 때
      this.left.style.display = 'none'
      this.right.style.display = 'block'
      this.top.style.display = 'none'
      this.bottom.style.display = 'none'

      this.right.style.left =
        this.target.getBoundingClientRect().left +
        this.target.getBoundingClientRect().width +
        board.getBoundingClientRect().left +
        'px'
      this.right.style.top = board.getBoundingClientRect().top + 2 + 'px'
      this.right.style.height =
        this.target.getBoundingClientRect().height -
        (board.getBoundingClientRect().top -
          this.target.getBoundingClientRect().top) -
        (this.target.getBoundingClientRect().bottom -
          board.getBoundingClientRect().bottom) -
        4 +
        'px'
      // 11
    } else if (leftOver && topOver && rightOver && !bottomOver) {
      // left, top, right 벗어날 때
      this.left.style.display = 'none'
      this.right.style.display = 'none'
      this.top.style.display = 'none'
      this.bottom.style.display = 'block'

      this.bottom.style.left = board.getBoundingClientRect().left + 'px'
      this.bottom.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        this.target.getBoundingClientRect().height +
        'px'
      this.bottom.style.width =
        this.target.getBoundingClientRect().width -
        (board.getBoundingClientRect().left -
          this.target.getBoundingClientRect().left) -
        (this.target.getBoundingClientRect().right -
          board.getBoundingClientRect().right) -
        4 +
        'px'
      // 12
    } else if (!leftOver && topOver && rightOver && bottomOver) {
      // right, top, bottom 벗어날 때
      this.left.style.display = 'block'
      this.right.style.display = 'none'
      this.top.style.display = 'none'
      this.bottom.style.display = 'none'

      this.left.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      this.left.style.top = board.getBoundingClientRect().top + 2 + 'px'
      this.left.style.height =
        this.target.getBoundingClientRect().height -
        (board.getBoundingClientRect().top -
          this.target.getBoundingClientRect().top) -
        (this.target.getBoundingClientRect().bottom -
          board.getBoundingClientRect().bottom) -
        4 +
        'px'
      // 13
    } else if (leftOver && !topOver && rightOver && bottomOver) {
      // right, top, bottom 벗어날 때
      this.left.style.display = 'none'
      this.right.style.display = 'none'
      this.top.style.display = 'block'
      this.bottom.style.display = 'none'

      this.top.style.left = board.getBoundingClientRect().left + 2 + 'px'
      this.top.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      this.top.style.width =
        this.target.getBoundingClientRect().width -
        (board.getBoundingClientRect().left -
          this.target.getBoundingClientRect().left) -
        (this.target.getBoundingClientRect().right -
          board.getBoundingClientRect().right) -
        4 +
        'px'
      // 14
    } else if (leftOver && topOver && rightOver && bottomOver) {
      // 사방 벗어날 때
      this.left.style.display = 'none'
      this.right.style.display = 'none'
      this.top.style.display = 'none'
      this.bottom.style.display = 'none'
      // 15
    } else {
      this.left.style.display = 'block'
      this.top.style.display = 'block'
      this.right.style.display = 'block'
      this.bottom.style.display = 'block'
      this.top.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      this.top.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      this.top.style.width = this.target.getBoundingClientRect().width + 'px'
      // this.bottom.style.display = 'none'?
      this.left.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      this.left.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      this.left.style.height = this.target.getBoundingClientRect().height + 'px'
      this.right.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        this.target.getBoundingClientRect().width +
        'px'
      this.right.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        'px'
      this.right.style.height =
        this.target.getBoundingClientRect().height + 2 + 'px'
      this.bottom.style.left =
        this.target.getBoundingClientRect().left +
        board.getBoundingClientRect().left +
        'px'
      this.bottom.style.top =
        this.target.getBoundingClientRect().top +
        board.getBoundingClientRect().top +
        this.target.getBoundingClientRect().height +
        'px'
      this.bottom.style.width = this.target.getBoundingClientRect().width + 'px'
    }
  }
}

/** @type {Set<ClickIndicator>} */
ClickIndicator.instances = new Set()
