<template>
  <div id="dashboard">
    <div class="editor-box" @scroll="handleScroll">
      <div
        @keydown.enter="isContentNotEditable"
        ref="dash"
        class="editor-component"
        :contenteditable="isContentEditable"
        @dblclick="onmouseDoubleClick"
        @click="onmouseClick"
        @mousemove="onmouseMove"
        @mouseup="mouseup"
        @mousedown="mousedown"
      >
        <HtmlLoader class="navi" />
        <!-- <Navi class="navi" /> -->
        <Dashboard />
        <Dashboard />
      </div>
    </div>
    <!-- <div v-if="isContentMovable" class="top-bar"></div>
    <div v-if="isContentMovable" class="bottom-bar"></div> -->

    <div class="selector-box">
      <div v-show="onelementSelected" class="tagname"></div>
      <div v-show="onelementSelected" class="right-border"></div>
      <div v-show="onelementSelected" class="bottom-border"></div>
      <div v-show="onelementSelected" class="top-border"></div>
      <div v-show="onelementSelected" class="left-border"></div>
    </div>
    <img
      @mousedown="moveElement"
      style="cursor:pointer"
      v-show="isContentClicked"
      src="../assets/move.svg"
      class="move-icon"
    />
    <img
    @click="copyElement"
      style="cursor:pointer"
      v-show="isContentCopied"
      src="../assets/copy.svg"
      class="copy-icon"
    />
    <img
      @click="removeContent"
      style="cursor:pointer"
      v-show="isContentRemovable"
      src="../assets/delete.svg"
      class="delete-icon"
    />
    <div
      v-if="isContentClicked"
      data-pos="top"
      style="cursor:ns-resize"
      @mousedown="mouseDownBoundary"
      class="boundary-line-top"
    ></div>
    <div
      v-if="isContentClicked"
      data-pos="left"
      style="cursor:ew-resize"
      @mousedown="mouseDownBoundary"
      class="boundary-line-left"
    ></div>
    <div
      v-if="isContentClicked"
      data-pos="right"
      style="cursor:ew-resize"
      @mousedown="mouseDownBoundary"
      class="boundary-line-right"
    ></div>
    <div
      v-if="isContentClicked"
      data-pos="bottom"
      style="cursor:ns-resize"
      @mousedown="mouseDownBoundary"
      class="boundary-line-bottom"
    ></div>
    <!-- <div id="add">
      <div class="add-1">aaaaa</div>
    </!-->
  </div>
</template>

<script>
import Dashboard from './dashboard.vue'
import Navi from './navi.vue'
import HtmlLoader from './htmlLoader.vue'
export default {
  components: { Dashboard, Navi, HtmlLoader },
  data () {
    return {
      selectedElement: null,
      borderstyle: null,
      onelementSelected: false,
      target: '',
      style: '',
      value: '',
      isContentEditable: false,
      clickedBorder: '',
      clickedElement: null,
      clickedBorderRadius: '',
      isContentClicked: false,
      elem: null,
      directionData: '',
      initialposition: '',
      resizedirection: '',
      initialwidth: '',
      initialheight: '',
      initialscale: '',
      isContentRemovable: false,
      add: false,
      isContentResizable: false,
      isContentMovable: false,
      mouseElem: null,
      movePosition: null,
      addComponentTag: null,
      borderTop: '',
      borderBottom: '',
      borderLeft: '',
      borderRight: '',
      isContentCopied: false,
      classIndex: 0
    }
  },
  mounted () {
    // let b = document.querySelector('.3')

    let a = document.querySelector('.editor-box')

    // let b = document.getElementsByClassName('editor-component')
    this.borderTop = a.getBoundingClientRect().top
    this.borderBottom = a.getBoundingClientRect().height + a.getBoundingClientRect().top
    this.borderLeft = a.getBoundingClientRect().left
    this.borderRight = a.getBoundingClientRect().left + a.getBoundingClientRect().width
    document.addEventListener('mouseover', e => {
      if (this.isContentMovable) {
        if (event.target.className === 'top-bar' || event.target.className === 'bottom-bar') {
          // border는 element move시에만 생기도록 해야함
          // border에 닿았을 때 scroll 위치 받아와서 위치 이동시켜야한다.
          // left,right border 생성해야함

          // console.log(b.scrollY)
        }
      }
    })
    window.addEventListener('mousemove', event => {
      event.preventDefault()
      if (this.isContentResizable) {
        if (this.resizedirection === 'right') {
          if (event.pageX < this.initialposition) {
            const size =
              (this.initialwidth - (this.initialposition - event.pageX) * 2) /
              parseInt(getComputedStyle(this.clickedElement).width)
            this.clickedElement.style.transform = `scale(${size})`
          } else if (event.pageX > this.initialposition) {
            const size =
              (this.initialwidth + (event.pageX - this.initialposition) * 2) /
              parseInt(getComputedStyle(this.clickedElement).width)
            this.clickedElement.style.transform = `scale(${size})`
          }
        } else if (this.resizedirection === 'left') {
          if (event.pageX < this.initialposition) {
            const size =
              (this.initialwidth + (this.initialposition - event.pageX) * 2) /
              parseInt(getComputedStyle(this.clickedElement).width)
            this.clickedElement.style.transform = `scale(${size})`
          } else if (event.pageX > this.initialposition) {
            const size =
              (this.initialwidth - (event.pageX - this.initialposition) * 2) /
              parseInt(getComputedStyle(this.clickedElement).width)
            this.clickedElement.style.transform = `scale(${size})`
          }
        } else if (this.resizedirection === 'top') {
          if (event.pageY < this.initialposition) {
            const size =
              (this.initialheight + (this.initialposition - event.pageY) * 2) /
              parseInt(getComputedStyle(this.clickedElement).height)
            this.clickedElement.style.transform = `scale(${size})`
          } else if (event.pageY > this.initialposition) {
            const size =
              (this.initialheight - (event.pageY - this.initialposition) * 2) /
              parseInt(getComputedStyle(this.clickedElement).height)
            this.clickedElement.style.transform = `scale(${size})`
          }
        } else if (this.resizedirection === 'bottom') {
          if (event.pageY < this.initialposition) {
            const size =
              (this.initialheight - (this.initialposition - event.pageY) * 2) /
              parseInt(getComputedStyle(this.clickedElement).height)
            this.clickedElement.style.transform = `scale(${size})`
          } else if (event.pageY > this.initialposition) {
            const size =
              (this.initialheight + (event.pageY - this.initialposition) * 2) /
              parseInt(getComputedStyle(this.clickedElement).height)
            this.clickedElement.style.transform = `scale(${size})`
          }
        }
      }
      if (this.isContentMovable) {
        let borderElem
        if (this.mouseElem === null) {
          if (
            event.target.className === 'left-border' ||
            event.target.className === 'right-border' ||
            event.target.className === 'top-border' ||
            event.target.className === 'bottom-border'
          ) {
            borderElem = document.querySelector('.' + event.target.className)
            borderElem.style.backgroundColor = '#0fdc28'
            this.mouseElem = borderElem
          }
        } else {
          if (this.mouseElem !== event.target) {
            this.mouseElem.style.backgroundColor = '#3e8ce4'
            if (
              event.target.className === 'left-border' ||
              event.target.className === 'right-border' ||
              event.target.className === 'top-border' ||
              event.target.className === 'bottom-border'
            ) {
              borderElem = document.querySelector('.' + event.target.className)
              borderElem.style.backgroundColor = '#0fdc28'
              this.mouseElem = borderElem
            }
          }
        }
      }

      if (this.clickedElement !== null) {
        let move = document.querySelector('.move-icon')
        move.style.left =
          this.clickedElement.getBoundingClientRect().left + 'px'
        move.style.top =
          this.clickedElement.getBoundingClientRect().top -
          move.getBoundingClientRect().height +
          'px'
        let deleteIcon = document.querySelector('.delete-icon')
        deleteIcon.style.left =
          this.clickedElement.getBoundingClientRect().left +
          parseInt(getComputedStyle(move).width) * 2 +
          'px'
        deleteIcon.style.top =
          this.clickedElement.getBoundingClientRect().top -
          deleteIcon.getBoundingClientRect().height +
          'px'
        let copyIcon = document.querySelector('.copy-icon')
        copyIcon.style.left = this.clickedElement.getBoundingClientRect().left + parseInt(getComputedStyle(move).width) + 'px'
        copyIcon.style.top = this.clickedElement.getBoundingClientRect().top - deleteIcon.getBoundingClientRect().height + 'px'
      }
    })
    window.addEventListener('mouseup', e => {
      if (this.isContentResizable) {
        this.isContentResizable = false
      }
      this.resizedirection = null

      if (this.mouseElem !== null && this.isContentMovable) {
        this.mouseElem.style.backgroundColor = '#3e8ce4'
        let addComponent = document.querySelector(
          '.' + this.clickedElement.className
        )
        this.clickedElement.style.filter = 'blur(0)'

        // console.log(e)

        // tag가 추가할 element. 자식이 된다.
        // console.log(position)
        // position이 추가할 위치에 있는 element. 부모가 된다.
        // this.movePosition.parentElement

        this.movePosition.target.appendChild(addComponent)
        if (
          e.target.className === 'left-border' ||
          e.target.className === 'right-border' ||
          e.target.className === 'top-border' ||
          e.target.className === 'bottom-border'
        ) {
          // let pos = e.target.className.split('-')[0]
          let addComponent = document.querySelector(
            '.' + this.clickedElement.className
          )
          this.movePosition.target.parentElement.appendChild(addComponent)
        }
      }
      this.isContentMovable = false

      this.$emit('elementresize', this.clickedElement)
    })
  },
  methods: {
    addComponentTagStudio () {

    },
    mousedown (e) {
      // this.addComponentTag=e.target
    },
    mouseup (e) {
      // console.log(this.addComponentTag)
      // console.log(e.target)
      // if(this.addComponentTag!=e.target)
      //   e.target.appendChild(this.addComponentTag)
      // console.log(this.addComponentTag)
      // console.log(this.addComponentTag)

    },
    onmouseMove (e) {
      // console.log(this.addComponentTag)
      // let dashboardElem = document.querySelector('.editor')
      this.onelementSelected = true
      if (this.selectedElement === null) {
        if (
          e.target.className !== 'tagname' &&
          e.target.className !== 'home' &&
          e.target.className !== 'editor-component'
        ) {
          this.onelementSelected = true
          this.selectedElement = e.target.getBoundingClientRect()
          this.movePosition = e
        }
      } else {
        if (this.selectedElement !== e.target) {
          if (
            e.target.className !== 'tagname' &&
            e.target.className !== 'home' &&
            e.target.className !== 'editor-component'
          ) {
            this.selectedElement = e.target.getBoundingClientRect()
            this.movePosition = e

            let tag = document.querySelector('.tagname')

            tag.textContent = e.target.tagName
            tag.style.left = this.selectedElement.left + 'px'

            tag.style.top =
              this.selectedElement.top -
              tag.getBoundingClientRect().height +
              'px'
            let bottomBord = document.querySelector('.bottom-border')
            let topBord = document.querySelector('.top-border')
            let rightBord = document.querySelector('.right-border')
            let leftBord = document.querySelector('.left-border')
            // let dashWrapper = document.querySelector('.navi')
            // let scrollBottomHeight =
            //   dashboardElem.getBoundingClientRect().height -
            //   dashWrapper.getBoundingClientRect().height
            topBord.style.left = this.selectedElement.left + 'px'
            topBord.style.top = this.selectedElement.top + 'px'
            topBord.style.width = this.selectedElement.width + 'px'
            // bottomBord.style.display = 'none'?
            leftBord.style.left = this.selectedElement.left + 'px'
            leftBord.style.top = this.selectedElement.top + 'px'
            leftBord.style.height = this.selectedElement.height + 'px'
            rightBord.style.left =
              this.selectedElement.left + this.selectedElement.width - 2 + 'px'
            rightBord.style.top = this.selectedElement.top + 'px'
            rightBord.style.height = this.selectedElement.height + 'px'
            bottomBord.style.left = this.selectedElement.left + 'px'
            bottomBord.style.top =
              this.selectedElement.top + this.selectedElement.height - 2 + 'px'
            bottomBord.style.width = this.selectedElement.width + 'px'
          }
        }
      }
    },
    onmouseClick (e) {
      if (this.clickedElement === null) {
        if (
          e.target.className !== 'tagname' &&
          e.target.className !== 'home' &&
          e.target.className !== 'editor-component'
        ) {
          this.$emit('componentSelected', e)

          this.clickedElement = e.target
          this.clickedBorder = getComputedStyle(e.target).border
          this.clickedBorderRadius = getComputedStyle(e.target).borderRadius
          e.target.style.border = '3px dashed #f75c51'
          e.target.style.borderRadius = getComputedStyle(e.target).borderRadius

          this.isContentClicked = true
          this.isContentRemovable = true
          this.isContentCopied = true

          this.$nextTick(() => {
            // eslint-disable-next-line camelcase
            let left_line = document.querySelector('.boundary-line-left')
            // eslint-disable-next-line camelcase
            let right_line = document.querySelector('.boundary-line-right')
            // eslint-disable-next-line camelcase
            let top_line = document.querySelector('.boundary-line-top')
            // eslint-disable-next-line camelcase
            let bottom_line = document.querySelector('.boundary-line-bottom')
            this.elem = e.target.getBoundingClientRect()

            this.$nextTick(() => {
              bottom_line.style.left = this.elem.left + 'px'
              bottom_line.style.top =
                this.elem.top + this.elem.height - 1 + 'px'
              bottom_line.style.width = this.elem.width + 'px'
              top_line.style.left = this.elem.left + 'px'
              top_line.style.top = this.elem.top + 1 + 'px'
              top_line.style.width = this.elem.width + 'px'
              left_line.style.left = this.elem.left - 1 + 'px'
              left_line.style.top = this.elem.top + 'px'
              left_line.style.height = this.elem.width + 'px'
              right_line.style.left =
                this.elem.left + this.elem.width - 1 + 'px'
              right_line.style.top = this.elem.top + 'px'
              right_line.style.height = this.elem.width + 'px'
            })
          })

          this.$nextTick(() => {
            let move = document.querySelector('.move-icon')
            move.style.left = this.elem.left + 'px'
            move.style.top =
              this.elem.top - move.getBoundingClientRect().height + 'px'
            let deleteIcon = document.querySelector('.delete-icon')
            deleteIcon.style.left = this.elem.left + move.getBoundingClientRect().width * 2 + 'px'
            deleteIcon.style.top =
              this.elem.top - deleteIcon.getBoundingClientRect().height + 'px'
            let copyIcon = document.querySelector('.copy-icon')
            copyIcon.style.left = this.elem.left + move.getBoundingClientRect().width + 'px'
            copyIcon.style.left = this.elem.top - copyIcon.getBoundingClientRect().height + 'px'
          })
        }
      } else if (this.clickedElement !== e.target) {
        if (
          e.target.className !== 'tagname' &&
          e.target.className !== 'home' &&
          e.target.className !== 'editor-component'
        ) {
          this.$emit('componentSelected', e)
          this.isContentClicked = true
          this.isContentRemovable = true
          this.isContentCopied = true

          this.clickedElement.style.border = this.clickedBorder
          this.clickedElement.style.borderRadius = this.clickedBorderRadius
          this.clickedElement = e.target
          this.clickedBorder = getComputedStyle(e.target).border
          this.clickedBorderRadius = getComputedStyle(e.target).borderRadius
          e.target.style.border = '3px dashed #f75c51'
          e.target.style.borderRadius = getComputedStyle(e.target).borderRadius

          // eslint-disable-next-line camelcase
          let left_line = document.querySelector('.boundary-line-left')
          // eslint-disable-next-line camelcase
          let right_line = document.querySelector('.boundary-line-right')
          // eslint-disable-next-line camelcase
          let top_line = document.querySelector('.boundary-line-top')
          // eslint-disable-next-line camelcase
          let bottom_line = document.querySelector('.boundary-line-bottom')
          // eslint-disable-next-line camelcase

          this.elem = e.target.getBoundingClientRect()
          top_line.style.left = this.elem.left + 'px'
          top_line.style.top = this.elem.top + 1 + 'px'
          top_line.style.width = this.elem.width + 'px'
          bottom_line.style.left = this.elem.left + 'px'
          bottom_line.style.top = this.elem.top + this.elem.height - 1 + 'px'
          bottom_line.style.width = this.elem.width + 'px'
          left_line.style.left = this.elem.left - 1 + 'px'
          left_line.style.top = this.elem.top + 'px'
          left_line.style.height = this.elem.width + 'px'
          right_line.style.left = this.elem.left + this.elem.width - 1 + 'px'
          right_line.style.top = this.elem.top + 'px'
          right_line.style.height = this.elem.width + 'px'

          this.isContentClicked = true
          this.isContentRemovable = true
          this.isContentCopied = true

          this.$nextTick(() => {
            this.elem = e.target.getBoundingClientRect()
            let moveIcon = document.querySelector('.move-icon')
            moveIcon.style.left = this.elem.left + 'px'
            moveIcon.style.top =
              this.elem.top - moveIcon.getBoundingClientRect().height + 'px'

            let deleteIcon = document.querySelector('.delete-icon')
            deleteIcon.style.left =
              this.elem.left + parseInt(getComputedStyle(moveIcon).width) * 2 + 'px'
            deleteIcon.style.top =
              this.elem.top - deleteIcon.getBoundingClientRect().height + 'px'

            let copyIcon = document.querySelector('.copy-icon')
            copyIcon.style.left = this.elem.left + parseInt(getComputedStyle(moveIcon).widht) + 'px'
            copyIcon.style.top = this.elem.top - deleteIcon.getBoundingClientRect().height + 'px'
          })
        }
      } else {
        if (
          e.target.className !== 'tagname' &&
          e.target.className !== 'home' &&
          e.target.className !== 'editor-component'
        ) {
          this.$emit('componentSelected', e)
        }
      }
    },
    styleChanged (data) {
      console.log(data)
      this.target = data.payload.classList
      var classValue = ''
      let i
      // console.log(data.payload.classList.length)
      for (i = 0; i < data.payload.classList.length; i++) {
        if (i === data.payload.classList.length - 1) {
          classValue += '.' + data.payload.classList[i]
        } else {
          classValue += '.' + data.payload.classList[i] + ' '
        }
      }
      // console.log(classValue)
      this.style = data.style
      this.value = data.value
      let element = document.getElementsByClassName(this.target)[0]
      // console.log(element)
      element.style[this.style] = this.value
    },
    focusInput (e) {
      if (
        e.target.className !== 'tagname' &&
        e.target.className !== 'home' &&
        e.target.className !== 'editor-component'
      ) {
        this.isContentEditable = true
        this.$nextTick(() => {
          const sel = window.getSelection()
          sel.removeAllRanges()
          const range = new Range()
          range.setStart(this.$refs.dash, 0)
          range.setEnd(this.$refs.dash, 0)
          sel.addRange(range)
          this.placeCaretAtEnd(this.$refs.dash)
        })
      }
    },
    onmouseDoubleClick (e) {
      if (
        e.target.className !== 'tagname' &&
        e.target.className !== 'home' &&
        e.target.className !== 'editor-component'
      ) {
        this.focusInput(e)
      }
    },
    placeCaretAtEnd (el) {
      el.focus()
      if (
        typeof window.getSelection !== 'undefined' &&
        typeof document.createRange !== 'undefined'
      ) {
        const range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      } else if (typeof document.body.createTextRange !== 'undefined') {
        const textRange = document.body.createTextRange()
        textRange.moveToElementText(el)
        textRange.collapse(false)
        textRange.select()
      }
    },
    isContentNotEditable (e) {
      e.preventDefault()
      this.isContentEditable = false
    },
    mouseDownBoundary (e) {
      this.$nextTick(() => {
        if (!this.isContentMovable) {
          this.isContentResizable = true
          this.directionData = e.target.getAttribute('data-pos')
          if (this.directionData === 'left') {
            this.initialposition = this.clickedElement.getBoundingClientRect().left
            this.resizedirection = 'left'
          } else if (this.directionData === 'top') {
            this.initialposition = this.clickedElement.getBoundingClientRect().top
            this.resizedirection = 'top'
          } else if (this.directionData === 'bottom') {
            this.initialposition = this.clickedElement.getBoundingClientRect().bottom
            this.resizedirection = 'bottom'
          } else if (this.directionData === 'right') {
            this.initialposition = this.clickedElement.getBoundingClientRect().right
            this.resizedirection = 'right'
          }

          this.initialwidth = this.clickedElement.getBoundingClientRect().width
          this.initialheight = this.clickedElement.getBoundingClientRect().height
          const scale = this.clickedElement.style.transform
          const regExp = /[+-]?\d+(?:\.\d+)?/g
          const regExpResult = regExp.exec(scale)
          let scaleVal = 1
          if (regExpResult) {
            scaleVal = Number(regExpResult[0])
          }
          this.initialscale = scaleVal
        }
      })
    },
    handleScroll (e) {
      if (this.selectedElement != null) {
        this.onelementSelected = false
      }
      if (this.clickedElement != null) {
        this.$nextTick(() => {
          let move = document.querySelector('.move-icon')
          let moveHeight = getComputedStyle(move).height
          let deleteIcon = document.querySelector('.delete-icon')
          let copyIcon = document.querySelector('.copy-icon')
          // move.style.left =
          //   this.clickedElement.getBoundingClientRect().left + 'px'
          let moveTop =
            this.clickedElement.getBoundingClientRect().top -
            parseInt(moveHeight)
          let moveLeft = this.clickedElement.getBoundingClientRect().left
          let moveBottom = this.clickedElement.getBoundingClientRect().bottom
          // let moveRight = this.clickedElement.getBoundingClientRect().right
          if (
            (moveTop < 210 && moveBottom < 800) ||
            (moveTop > 210 && moveBottom > 810)
          ) {
            this.$nextTick(() => {
              this.isContentClicked = false
              this.isContentRemovable = false
              this.isContentCopied = false
            })
          } else {
            this.isContentClicked = true
            this.isContentRemovable = true
            this.isContentCopied = true
            move.style.top = moveTop + 'px'
            deleteIcon.style.top = moveTop + 'px'
            copyIcon.style.top = moveTop + 'px'
          }
          if (moveLeft > 300) {
            this.isContentClicked = true
            this.isContentRemovable = true
            this.isContentCopied = true
            move.style.left = moveLeft + 'px'
            deleteIcon.style.left =
              moveLeft + parseInt(getComputedStyle(move).width) * 2 + 'px'
            copyIcon.style.left = moveLeft + parseInt(getComputedStyle(move).width) + 'px'
          } else {
            this.$nextTick(() => {
              this.isContentClicked = false
              this.isContentRemovable = false
              this.isContentCopied = false
            })
          }
        })
      }
    },
    removeContent () {
      this.clickedElement.parentNode.removeChild(this.clickedElement)
    },
    addContent (tag, position) {
      // console.log(tag)
      // console.log(position)
      let addTag = document.querySelector('#add')
      // console.log(tag)
      // tag가 추가할 element. 자식이 된다.
      // console.log(position)
      // position이 추가할 위치에 있는 element. 부모가 된다.
      position.appendChild(addTag)
    },
    selectOverview (payload) {
      let dashboardElem = document.querySelector('.editor')
      this.selectedElement = payload.getBoundingClientRect()

      let tag = document.querySelector('.tagname')

      tag.textContent = payload.tagName
      tag.style.left = this.selectedElement.left + 'px'

      tag.style.top =
        this.selectedElement.top - tag.getBoundingClientRect().height + 'px'
      let bottomBord = document.querySelector('.bottom-border')
      let topBord = document.querySelector('.top-border')
      let rightBord = document.querySelector('.right-border')
      let leftBord = document.querySelector('.left-border')
      let dashWrapper = document.querySelector('.dashboard-wrapper')
      let scrollBottomHeight =
        dashboardElem.getBoundingClientRect().height -
        dashWrapper.getBoundingClientRect().height
      topBord.style.left = this.selectedElement.left + 'px'
      topBord.style.top = this.selectedElement.top + 'px'
      topBord.style.width = this.selectedElement.width + 'px'
      if (
        this.selectedElement.bottom >
        dashboardElem.getBoundingClientRect().bottom
      ) {
        bottomBord.style.display = 'none'
        leftBord.style.left = this.selectedElement.left + 'px'
        leftBord.style.top = this.selectedElement.top + 'px'
        leftBord.style.height =
          this.selectedElement.height -
          (this.selectedElement.bottom -
            dashboardElem.getBoundingClientRect().bottom) -
          scrollBottomHeight +
          'px'
        rightBord.style.left =
          this.selectedElement.left + this.selectedElement.width - 2 + 'px'
        rightBord.style.top = this.selectedElement.top + 'px'
        rightBord.style.height =
          this.selectedElement.height -
          (this.selectedElement.bottom -
            dashboardElem.getBoundingClientRect().bottom) -
          scrollBottomHeight +
          'px'
      } else {
        bottomBord.style.display = ''
        bottomBord.style.left = this.selectedElement.left + 'px'
        bottomBord.style.top =
          this.selectedElement.top + this.selectedElement.height - 2 + 'px'
        bottomBord.style.width = this.selectedElement.width + 'px'
        leftBord.style.left = this.selectedElement.left + 'px'
        leftBord.style.top = this.selectedElement.top + 'px'
        leftBord.style.height = this.selectedElement.height + 'px'
        rightBord.style.left =
          this.selectedElement.left + this.selectedElement.width - 2 + 'px'
        rightBord.style.top = this.selectedElement.top + 'px'
        rightBord.style.height = this.selectedElement.height + 'px'
      }
    },
    moveElement (e) {
      this.clickedElement.style.filter = 'blur(0.8px)'
      this.isContentMovable = true
      // let bordTop = document.querySelector('.top-bar')
      // let bordBottom = document.querySelector('.bottom-bar')
      // this.$nextTick(() => {
      //   bordTop.style.top = this.borderTop + 20 + 'px'
      //   bordBottom.style.top = this.borderBottom - 50 + 'px'
      // })
    },
    windowResized () {
      this.onmouseMove(this.movePosition)
    },
    copyElement () {
      let elem = document.querySelector('.' + this.clickedElement.className)
      let copyElem = elem.cloneNode(true)

      let randomClass = elem.parentElement.classList.value.replace(/ /gi, '') + elem.classList.value.replace(/ /gi, '') + this.classIndex
      copyElem.classList.add(randomClass)
      this.classIndex++

      // for (i = 0; i < data.payload.classList.length; i++) {
      //   if (i === data.payload.classList.length - 1) {
      //     classValue += '.' + data.payload.classList[i]
      //   } else {
      //     classValue += '.' + data.payload.classList[i] + ' '
      //   }
      // }
      console.log(getComputedStyle(elem).right)

      // this.$nextTick(() => {
      this.clickedElement.parentElement.appendChild(copyElem)
      // })
    }
  }
}
</script>

<style lang="scss">
#dashboard {
  display: inline-block;
  align-items: center;
  width: 100%;
  .editor-box {
    width: 100%;
    height: 80%;
    // display:table
    overflow: auto;
    border: 1px solid #fff;

    .editor-component {
      // overflow: auto;
    }

  }
  .navi{
    width:100%;
    height:80%;
    //  overflow: auto;
    // overflow:"scroll";

  }
  .top-bar {
      height: 15px;
      width: 55%;
      background-color: #c200a8;
      position: fixed;
      top: 0;
    }
      .bottom-bar {
      color: #fff;
      height: 15px;
      width: 55%;
      background-color: #c200a8;
      position: fixed;
      bottom: 0;
    }

  .selector-box {
    display: flex;
    flex-direction: column;
    .tagname {
      color: white;
      padding: 0.2rem;
      position: fixed;
      z-index: 10;
      background-color: #3e8ce4;
      border-radius: 0.4rem;
      font-size: 0.8rem;
    }
    .compo-border {
      position: fixed;
      z-index: -1;
    }
    .bottom-border,
    .top-border {
      width: 100%;
      height: 4px;
      position: fixed;
      // z-index:
      background-color: #3e8ce4;
      // overflow: auto !important;
    }
    .right-border,
    .left-border {
      height: 100%;
      width: 4px;
      position: fixed;
      background-color: #3e8ce4;
    }
  }
  .move-icon {
    z-index: 2;
    position: fixed;
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    padding: 0.15rem;
    justify-content: center;
    background-color: #f75c51;
    fill: #fff;
    overflow: auto !important;
  }
  .copy-icon{
    z-index: 2;
    position: fixed;
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    padding: 0.15rem;
     justify-content: center;
    background-color: #f75c51;
    fill: #fff;
  }
  .delete-icon {
    z-index: 2;
    position: fixed;
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    padding: 0.2rem;
    justify-content: center;
    background-color: #f75c51;
    fill: #fff;
    overflow: auto !important;
  }
  .boundary-line-top,
  .boundary-line-bottom {
    width: 100%;
    height: 5px;
    position: fixed;
    z-index: 10000;
  }

  .boundary-line-left,
  .boundary-line-right {
    width: 5px;
    height: 100%;
    position: fixed;
    z-index: 10000;
  }
  #add {
    width: 5rem;
    height: 3rem;
    background-color: yellow;
    display: flex;
    justify-content: center;
    align-items: center;
    .add-1 {
      background-color: red;
    }
  }
  .dashboard-text{
    width:300px
  }
}
</style>
