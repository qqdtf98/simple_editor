import { install } from 'vuex'

/**
 * iframe 내의 element 클릭 시 indicator를 표시해주는 기능을 하는 클래스.
 * 클릭된 element 당 하나의 instance를 생성함.
 * 생성된 instance들은 set에 저장되어 있음.
 */
export default class ClickIndicator {
  /**
   * ClickIndicator 클래스의 constructor.
   * 클래스 내의 변수 초기화 및 함수 호출
   * @param {HTMLElement} target
   * @param {boolean} isMulti 여러 개 클릭
   */
  constructor(target, isMulti = false) {
    this.target = target
    this.box = null
    this.left = null
    this.right = null
    this.top = null
    this.bottom = null

    if (isMulti) {
      let selected = true
      ClickIndicator.instances.forEach(instance => {
        if (instance.target === target) {
          console.log('already exists', target)
          selected = false
          instance.removeBorder()
          ClickIndicator.instances.delete(instance)
        }
      })
      console.log('selected', selected)
      if (selected) {
        this.createBorder()
        this.setBorderPosition()
        ClickIndicator.instances.add(this)
      }
    } else {
      ClickIndicator.instances.forEach(instance => {
        instance.removeBorder()
      })
      ClickIndicator.instances.clear()
      ClickIndicator.instances.add(this)

      this.createBorder()
      this.setBorderPosition()
    }
  }

  /**
   * element를 둘러싸는 indicator를 생성함.
   */
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

  /**
   * 선택 해제 시 해당 element의 indicator 제거
   */
  removeBorder() {
    this.box.removeChild(this.top)
    this.box.removeChild(this.right)
    this.box.removeChild(this.bottom)
    this.box.removeChild(this.left)
  }

  /**
   * iframe 위치와 element의 위치를 사용하여 border의 position과 length 계산
   */
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
    } else if (leftOver && topOver && rightOver && bottomOver) {
      // 사방 벗어날 때
      this.left.style.display = 'none'
      this.right.style.display = 'none'
      this.top.style.display = 'none'
      this.bottom.style.display = 'none'
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
