<template>
  <div id="dashboard">
    <div class="editor-box" @scroll="handleScroll">
      <div
      @mouseup="onmouseRightClick"
        @keydown.enter="isContentNotEditable"
        ref="dash"
        class="editor-component"
        :contenteditable="isContentEditable"
        @dblclick="onmouseDoubleClick"
        @click="onmouseClick"
        @mousemove="onmouseMove"
        @mousedown="mousedown"
      >
      <spliter />
        <HtmlLoader class="navi" />
        <!-- <Navi class="navi" /> -->
        <Dashboard />
      </div>
    </div>

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
      @mousedown="mousedownMode"
      class="boundary-line-top"
    ></div>
    <div
      v-if="isContentClicked"
      data-pos="left"
      style="cursor:ew-resize"
      @mousedown="mousedownMode"
      class="boundary-line-left"
    ></div>
    <div
      v-if="isContentClicked"
      data-pos="right"
      style="cursor:ew-resize"
      @mousedown="mousedownMode"
      class="boundary-line-right"
    ></div>
    <div
      v-if="isContentClicked"
      data-pos="bottom"
      style="cursor:ns-resize"
      @mousedown="mousedownMode"
      class="boundary-line-bottom"
    ></div>
    <Context class="context" v-if="mouserightClick" />

    <!-- <div id="add">
      <div class="add-1">aaaaa</div>
    </!-->
  </div>
</template>

<script>
import Dashboard from './dashboard.vue'
import Navi from './navi.vue'
import HtmlLoader from './htmlLoader.vue'
import spliter from './spliter.vue'
import Context from './Context'

export default {
  components: { Dashboard, Navi, HtmlLoader, spliter, Context },
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
      classIndex: 0,
      currentTop: 0,
      currentX: 0,
      currentY: 0,
      borderClicked: false,
      borderElem: null,
      mode: false,
      mouserightClick: false
    }
  },
  mounted () {
    // let b = document.querySelector('.3')
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })

    let editor = document.querySelector('.editor-box')

    // let b = document.getElementsByClassName('editor-component')
    this.borderTop = editor.getBoundingClientRect().top
    this.borderBottom = editor.getBoundingClientRect().height + editor.getBoundingClientRect().top
    this.borderLeft = editor.getBoundingClientRect().left
    this.borderRight = editor.getBoundingClientRect().left + editor.getBoundingClientRect().width

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
      // this.clickedElement.style.filter = 'blur(0)'
      if (this.isContentResizable) {
        this.isContentResizable = false
      }
      this.resizedirection = null
      if (this.isContentMovable) {
        this.clickedElement.style.filter = 'blur(0)'
        if (this.mouseElem !== null) {
          this.mouseElem.style.backgroundColor = '#3e8ce4'
          // let i
          // let classValue = ''
          // for (i = 0; i < this.clickedElement.classList.length; i++) {
          //   if (i === this.clickedElement.classList.length - 1) {
          //     classValue += '.' + this.clickedElement.classList[i]
          //   } else {
          //     classValue += '.' + this.clickedElement.classList[i] + ' '
          //   }
          // }
          let addComponent = document.getElementsByClassName(this.clickedElement.classList.value)
          this.$nextTick(() => {
            console.log(addComponent[0])
            // console.log(e)

            // tag가 추가할 element. 자식이 된다.
            // console.log(position)
            // position이 추가할 위치에 있는 element. 부모가 된다.
            // this.movePosition.parentElement

            this.movePosition.target.appendChild(addComponent[0])
            if (
              e.target.className === 'left-border' ||
          e.target.className === 'right-border' ||
          e.target.className === 'top-border' ||
          e.target.className === 'bottom-border'
            ) {
            // let pos = e.target.className.split('-')[0]
              let addComponent = document.getElementsByClassName(this.clickedElement.classList.value)
              this.movePosition.target.parentElement.appendChild(addComponent[0])
            }
          })
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
      this.mouserightClick = false
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
      if (this.mode) {
        console.log(getComputedStyle(this.clickedElement).flexWrap)
        this.clickedElement.style.display = 'flex'
        this.clickedElement.style.flexWrap = 'wrap'
        console.log(getComputedStyle(this.clickedElement).flexWrap)
      }
    },
    styleChanged (data) {
      this.target = data.payload.classList
      var classValue = ''
      let i
      console.log(data.payload.classList.length)
      for (i = 0; i < data.payload.classList.length; i++) {
        if (i === data.payload.classList.length - 1) {
          classValue += '.' + data.payload.classList[i]
        } else {
          classValue += '.' + data.payload.classList[i] + ' '
        }
      }
      console.log(classValue)
      this.style = data.style
      this.value = data.value
      let element = document.getElementsByClassName(this.target)[0]
      console.log(element)
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
    },
    windowResized () {
      this.onmouseMove(this.movePosition)
    },
    copyElement () {
      let classValue = ''
      let i
      console.log(this.clickedElement.classList.length)
      for (i = 0; i < this.clickedElement.classList.length; i++) {
        if (i === this.clickedElement.classList.length - 1) {
          classValue += '.' + this.clickedElement.classList[i]
        } else {
          classValue += '.' + this.clickedElement.classList[i] + ' '
        }
      }
      console.log(classValue)
      let elem = document.getElementsByClassName(this.clickedElement.classList.value)
      console.log(elem[0])
      let copyElem = elem[0].cloneNode(true)

      let randomClass = elem[0].parentElement.classList.value.replace(/ /gi, '') + elem[0].classList.value.replace(/ /gi, '') + this.classIndex
      copyElem.classList.add(randomClass)
      this.classIndex++

      var newparent = document.createElement('div')

      this.$nextTick(() => {
        console.log(this.clickedElement.parentElement.children)
        this.clickedElement.parentElement.appendChild(newparent)
        newparent.appendChild(elem[0])
        newparent.appendChild(copyElem)
        // if (getComputedStyle(elem).position === 'absolute') {
        this.$nextTick(() => {
          // console.log(parseInt(getComputedStyle(elem).))
          // newparent.style.width = parseInt(getComputedStyle(elem[0]).width) * 2 + 'px'
          newparent.style.height = parseInt(getComputedStyle(elem[0]).height) + 'px'
          if (getComputedStyle(elem[0]).right !== 0) {
            console.log('right')
            copyElem.style.left = parseInt(getComputedStyle(elem[0]).left) - parseInt(getComputedStyle(elem[0]).width) + 'px'
            copyElem.style.border = this.clickedBorder
            copyElem.style.borderRadius = this.clickedBorderRadius
          } else {
            console.log('left')
            copyElem.style.left = parseInt(getComputedStyle(elem[0]).left) + parseInt(getComputedStyle(elem[0]).width) + 'px'
            copyElem.style.border = this.clickedBorder
            copyElem.style.borderRadius = this.clickedBorderRadius
          }

          // console.log(getComputedStyle(copyElem).right)
        })
        // }
      })
    },
    splitBorder (e) {
      this.borderClicked = true
      // let bottomBord = document.querySelector('.bottom-border')
      // let topBord = document.querySelector('.top-border')
      // let rightBord = document.querySelector('.right-border')
      // let leftBord = document.querySelector('.left-border')

      // topBord.style.backgroundColor = '#34d6c1'
      // bottomBord.style.backgroundColor = '#34d6c1'

      let elemWidth = getComputedStyle(this.clickedElement).width
      let elemHeight = getComputedStyle(this.clickedElement).height
      let elemLeft = getComputedStyle(this.clickedElement).left
      let initialX = e.clientX
      let initialY = e.clientY
      this.borderElem = e.target
      // let initialLeft = getComputedStyle(this.clickedElement).left

      let edit = document.querySelector('.editor')

      edit.addEventListener('mousemove', (event) => {
        if (this.borderClicked) {
          if (this.borderElem.className === 'boundary-line-right') {
            this.clickedElement.style.width = parseInt(elemWidth) - (initialX - event.clientX) * 2 + 'px'
          } else if (this.borderElem.className === 'boundary-line-left') {
            this.clickedElement.style.width = parseInt(elemWidth) - (event.clientX - initialX) * 2 + 'px'
          } else if (this.borderElem.className === 'boundary-line-top') {
            this.clickedElement.style.height = parseInt(elemHeight) - (event.clientY - initialY) * 2 + 'px'
          } else if (this.borderElem.className === 'boundary-line-bottom') {
            this.clickedElement.style.height = parseInt(elemHeight) - (initialY - event.clientY) * 2 + 'px'
          }
        }
      })
      edit.addEventListener('mouseup', () => {
        this.borderClicked = false
      })
    },
    mousedownMode (e) {
      if (this.mode) {
        this.splitBorder(e)
      } else {
        this.mouseDownBoundary(e)
      }
    },
    modeSelect (mode) {
      console.log(mode)
      this.mode = mode
    },
    onmouseRightClick (e) {
      console.log('aaaa')
      if (e.button === 2) {
        let context = document.querySelector('.context')
        this.mouserightClick = true
        console.log(e.target)
        console.log(getComputedStyle(e.target).width)
        this.$nextTick(() => {
          context.style.left = parseInt(getComputedStyle(e.target).left) + parseInt(getComputedStyle(e.target).width) / 2 + 'px'
          context.style.top = parseInt(getComputedStyle(e.target).top) + parseInt(getComputedStyle(e.target).height) / 2 + 'px'
        })
      }
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
    scroll-behavior: smooth;
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
  // .top-bar {
  //     height: 15px;
  //     width: 55%;
  //     background-color: #c200a8;
  //     position: fixed;
  //     top: 0;
  //     z-index:100000;
  //   }
  //     .bottom-bar {
  //     color: #fff;
  //     height: 15px;
  //     width: 55%;
  //     background-color: #c200a8;
  //     position: fixed;
  //     bottom: 0;
  //     z-index: 100000;
  //   }

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
  .context{
    position:fixed;
  }
}
</style>
