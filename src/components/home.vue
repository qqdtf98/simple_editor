<template>
  <div id="dashboard">
    <div class="editor-box">
    <div
      @keydown.enter="isContentNotEditable"
      ref="dash"
        class="editor-component"
      :contenteditable="isContentEditable"
      @dblclick="onmouseDoubleClick"
      @click="onmouseClick"
      @mousemove="onmouseMove"
      @scroll="handleScroll"
    >
        <Navi class="navi" />
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
        style="cursor:pointer"
        v-show="isContentMovable"
        src="../assets/move.svg"
        class="move-icon"
      />
    <img
      @click="removeContent"
      style="cursor:pointer"
      v-show="isContentRemovable"
      src="../assets/delete.svg"
      class="delete-icon"
    />
      <div
        v-if="isContentMovable"
        data-pos="top"
        style="cursor:ns-resize"
        @mousedown="mouseDownBoundary"
        class="boundary-line-top"
      ></div>
      <div
        v-if="isContentMovable"
        data-pos="left"
        style="cursor:ew-resize"
        @mousedown="mouseDownBoundary"
        class="boundary-line-left"
      ></div>
      <div
        v-if="isContentMovable"
        data-pos="right"
        style="cursor:ew-resize"
        @mousedown="mouseDownBoundary"
        class="boundary-line-right"
      ></div>
      <div
        v-if="isContentMovable"
        data-pos="bottom"
        style="cursor:ns-resize"
        @mousedown="mouseDownBoundary"
        class="boundary-line-bottom"
      ></div>
    <!-- <div id="add">
        <div class="add-1">aaaaa</div>
    </!-->
    -->
      </div>
</template>

<script>
import Dashboard from './dashboard.vue'
import Navi from './navi.vue'
export default {
  components: { Dashboard, Navi },
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
      isContentMovable: false,
      elem: null,
      directionData: '',
      initialposition: '',
      resizedirection: '',
      initialwidth: '',
      initialheight: '',
      initialscale: '',
      isContentRemovable: false,
      add: false
    }
  },
  mounted () {
    window.addEventListener('mousemove', event => {
      event.preventDefault()
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
      if (this.clickedElement !== null) {
        let move = document.querySelector('.move-icon')
        move.style.left = this.clickedElement.getBoundingClientRect().left + 'px'
        move.style.top = this.clickedElement.getBoundingClientRect().top - move.getBoundingClientRect().height + 'px'
        let deleteIcon = document.querySelector('.delete-icon')
        deleteIcon.style.left = this.clickedElement.getBoundingClientRect().left + parseInt(getComputedStyle(move).width) + 'px'
        deleteIcon.style.top = this.clickedElement.getBoundingClientRect().top - deleteIcon.getBoundingClientRect().height + 'px'
      }
    })
    window.addEventListener('mouseup', () => {
      this.resizedirection = null
      this.$emit('elementresize', this.clickedElement)
    })
  },
  methods: {
    onmouseMove (e) {
      let dashboardElem = document.querySelector('.dashboard')
      this.onelementSelected = true
      if (this.selectedElement === null) {
        if (
          e.target.className !== 'tagname' &&
          e.target.className !== 'move-icon' &&
          e.target.className !== 'delete-icon' &&
          e.target.className !== 'left-border' &&
          e.target.className !== 'right-border' && e.target.className !== 'top-border' &&
          e.target.className !== 'bottom-border' &&
          e.target.className !== 'boundary-line-left' &&
          e.target.className !== 'boundary-line-right' &&
          e.target.className !== 'boundary-line-top' &&
          e.target.className !== 'boundary-line-bottom'
        ) {
          this.onelementSelected = true
          this.selectedElement = e.target.getBoundingClientRect()
        }
      } else {
        if (this.selectedElement !== e.target) {
          if (
            e.target.className !== 'tagname' && e.target.className !== 'delete-icon' &&
            e.target.className !== 'move-icon' && e.target.className !== 'left-border' &&
            e.target.className !== 'right-border' && e.target.className !== 'top-border' &&
            e.target.className !== 'bottom-border' &&
            e.target.className !== 'boundary-line-left' &&
            e.target.className !== 'boundary-line-right' &&
            e.target.className !== 'boundary-line-top' &&
            e.target.className !== 'boundary-line-bottom'
          ) {
            this.selectedElement = e.target.getBoundingClientRect()

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
            let dashWrapper = document.querySelector('.dashboard-wrapper')
            let scrollBottomHeight = dashboardElem.getBoundingClientRect().height - dashWrapper.getBoundingClientRect().height
            topBord.style.left = this.selectedElement.left + 'px'
            topBord.style.top = this.selectedElement.top + 'px'
            topBord.style.width = this.selectedElement.width + 'px'
            if (this.selectedElement.bottom > dashboardElem.getBoundingClientRect().bottom) {
              bottomBord.style.display = 'none'
              leftBord.style.left = this.selectedElement.left + 'px'
              leftBord.style.top = this.selectedElement.top + 'px'
              leftBord.style.height = this.selectedElement.height - (this.selectedElement.bottom - dashboardElem.getBoundingClientRect().bottom) - scrollBottomHeight + 'px'
              rightBord.style.left = this.selectedElement.left + this.selectedElement.width - 2 + 'px'
              rightBord.style.top = this.selectedElement.top + 'px'
              rightBord.style.height = this.selectedElement.height - (this.selectedElement.bottom - dashboardElem.getBoundingClientRect().bottom) - scrollBottomHeight + 'px'
            } else {
              bottomBord.style.display = ''
              bottomBord.style.left = this.selectedElement.left + 'px'
              bottomBord.style.top = this.selectedElement.top + this.selectedElement.height - 2 + 'px'
              bottomBord.style.width = this.selectedElement.width + 'px'
              leftBord.style.left = this.selectedElement.left + 'px'
              leftBord.style.top = this.selectedElement.top + 'px'
              leftBord.style.height = this.selectedElement.height + 'px'
              rightBord.style.left = this.selectedElement.left + this.selectedElement.width - 2 + 'px'
              rightBord.style.top = this.selectedElement.top + 'px'
              rightBord.style.height = this.selectedElement.height + 'px'
            }
            if (this.selectedElement.left < dashboardElem.getBoundingClientRect().left) {
              leftBord.style.display = 'none'
              bottomBord.style.left = this.selectedElement.left + 'px'
            }
          }
        }
      }
    },
    onmouseClick (e) {
      if (this.clickedElement === null) {
        if (
          e.target.className !== 'tagname' &&
          e.target.className !== 'move-icon' && e.target.className !== 'delete-icon' &&
          e.target.className !== 'boundary-line-left' &&
          e.target.className !== 'boundary-line-right' &&
          e.target.className !== 'boundary-line-top' &&
          e.target.className !== 'boundary-line-bottom' &&
          e.target.className !== 'left-border' &&
           e.target.className !== 'right-border' && e.target.className !== 'top-border' &&
            e.target.className !== 'bottom-border'
        ) {
          this.$emit('componentSelected', e)

          this.clickedElement = e.target
          this.clickedBorder = getComputedStyle(e.target).border
          this.clickedBorderRadius = getComputedStyle(e.target).borderRadius
          e.target.style.border = '3px dashed #f75c51'
          e.target.style.borderRadius = '0'

          this.isContentMovable = true
          this.isContentRemovable = true

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
              bottom_line.style.top = this.elem.top + this.elem.height - 1 + 'px'
              bottom_line.style.width = this.elem.width + 'px'
              top_line.style.left = this.elem.left + 'px'
              top_line.style.top = this.elem.top + 1 + 'px'
              top_line.style.width = this.elem.width + 'px'
              left_line.style.left = this.elem.left - 1 + 'px'
              left_line.style.top = this.elem.top + 'px'
              left_line.style.height = this.elem.width + 'px'
              right_line.style.left = this.elem.left + this.elem.width - 1 + 'px'
              right_line.style.top = this.elem.top + 'px'
              right_line.style.height = this.elem.width + 'px'
            })
          })

          this.$nextTick(() => {
            let move = document.querySelector('.move-icon')
            move.style.left = this.elem.left + 'px'
            move.style.top = this.elem.top - move.getBoundingClientRect().height + 'px'
            let deleteIcon = document.querySelector('.delete-icon')
            deleteIcon.style.left = this.elem.left + 'px'
            deleteIcon.style.top = this.elem.top - deleteIcon.getBoundingClientRect().height + 'px'
          })
        }
      } else if (this.clickedElement !== e.target) {
        if (
          e.target.className !== 'tagname' &&
          e.target.className !== 'move-icon' && e.target.className !== 'delete-icon' &&
          e.target.className !== 'boundary-line-left' &&
          e.target.className !== 'boundary-line-right' &&
          e.target.className !== 'boundary-line-top' &&
          e.target.className !== 'boundary-line-bottom' && e.target.className !== 'left-border' &&
          e.target.className !== 'right-border' && e.target.className !== 'top-border' &&
          e.target.className !== 'bottom-border'
        ) {
          this.$emit('componentSelected', e)

          this.clickedElement.style.border = this.clickedBorder
          this.clickedElement.style.borderRadius = this.clickedBorderRadius
          this.clickedElement = e.target
          this.clickedBorder = getComputedStyle(e.target).border
          this.clickedBorderRadius = getComputedStyle(e.target).borderRadius
          e.target.style.border = '3px dashed #f75c51'
          e.target.style.borderRadius = 0

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

          this.isContentMovable = true
          this.isContnetRemovable = true

          this.$nextTick(() => {
            this.elem = e.target.getBoundingClientRect()
            let tag = document.querySelector('.move-icon')

            tag.style.left = this.elem.left + 'px'

            tag.style.top =
              this.elem.top - tag.getBoundingClientRect().height + 'px'
            let deleteIcon = document.querySelector('.delete-icon')

            deleteIcon.style.left = this.elem.left + parseInt(getComputedStyle(tag).width) + 'px'

            deleteIcon.style.top =
              this.elem.top - deleteIcon.getBoundingClientRect().height + 'px'
          })
        }
      }
    },
    styleChanged (data) {
      this.target = data.payload.className
      this.style = data.style
      this.value = data.value
      let element = document.querySelector(`.${this.target}`)
      element.style[this.style] = this.value
    },
    focusInput (e) {
      if (e.target.className !== 'tagname' &&
          e.target.className !== 'move-icon' &&
          e.target.className !== 'delete-icon' &&
          e.target.className !== 'boundary-line-left' &&
          e.target.className !== 'boundary-line-right' &&
          e.target.className !== 'boundary-line-top' &&
          e.target.className !== 'boundary-line-bottom' && e.target.className !== 'left-border' &&
          e.target.className !== 'right-border' && e.target.className !== 'top-border' &&
          e.target.className !== 'bottom-border') {
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
      if (e.target.className !== 'tagname' &&
          e.target.className !== 'move-icon' &&
          e.target.className !== 'delete-icon' &&
          e.target.className !== 'boundary-line-left' &&
          e.target.className !== 'boundary-line-right' &&
          e.target.className !== 'boundary-line-top' &&
          e.target.className !== 'boundary-line-bottom' && e.target.className !== 'left-border' &&
          e.target.className !== 'right-border' && e.target.className !== 'top-border' &&
          e.target.className !== 'bottom-border') {
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
    },
    handleScroll (e) {
      if (this.selectedElement != null) {
        this.$nextTick(() => {
          let tag = document.querySelector('.tagname')
          tag.style.left = this.selectedElement.left + 'px'
          let tagTop = this.selectedElement.top - tag.getBoundingClientRect().height - e.target.scrollTop
          if (tagTop > 190) {
            this.onelementSelected = true
            tag.style.top = tagTop + 'px'
          } else {
            this.onelementSelected = false
          }
          let borderTop = document.querySelector('.top-border')
          let borderLeft = document.querySelector('.left-border')
          let borderBottom = document.querySelector('.bottom-border')
          let borderRight = document.querySelector('.right-border')
          borderTop.style.left = this.selectedElement.left + 'px'
          borderTop.style.top = this.selectedElement.top - e.target.scrollTop + 'px'
          borderLeft.style.left = this.selectedElement.left + 'px'
          borderLeft.style.top = this.selectedElement.top - e.target.scrollTop + 'px'
          borderRight.style.left = this.selectedElement.left + this.selectedElement.width - 2 + 'px'
          borderRight.style.top = this.selectedElement.top - e.target.scrollTop + 'px'
          borderBottom.style.left = this.selectedElement.left + 'px'
          borderBottom.style.top = this.selectedElement.top + this.selectedElement.height - e.target.scrollTop - 2 + 'px'
        })
      }
      if (this.clickedElement != null) {
        this.$nextTick(() => {
          let move = document.querySelector('.move-icon')
          move.style.left = this.clickedElement.getBoundingClientRect().left + 'px'
          let moveTop = this.clickedElement.getBoundingClientRect().top - move.getBoundingClientRect().height
          let moveLeft = this.clickedElement.getBoundingClientRect().left
          if (moveTop > 190) {
            this.isContentMovable = true
            this.isContentRemovable = true
            move.style.top = moveTop + 'px'
          } else {
            this.isContentMovable = false
            this.isContentRemovable = false
          }
          if (moveLeft > 300) {
            this.isContentMovable = true
            this.isContentRemovable = true
            move.style.left = moveLeft + 'px'
          } else {
            this.isContentMovable = false
            this.isContentRemovable = false
          }
        })
      }
    },
    removeContent () {
      this.clickedElement.parentNode.removeChild(this.clickedElement)
    },
    addContent (tag, position) {
      let addTag = document.querySelector('#add')
      // console.log(tag)
      // tag가 추가할 element. 자식이 된다.
      // console.log(position)
      // position이 추가할 위치에 있는 element. 부모가 된다.
      position.appendChild(addTag)
    },
    selectOverview (payload) {
      // console.log(payload)
      let dashboardElem = document.querySelector('.dashboard')
      console.log(payload)
      // console.log(payload.getBoundingClientRect())
      this.selectedElement = payload.getBoundingClientRect()

      let tag = document.querySelector('.tagname')
      // console.log(payload.className)

      tag.textContent = payload.tagName
      tag.style.left = this.selectedElement.left + 'px'

      tag.style.top =
              this.selectedElement.top -
              tag.getBoundingClientRect().height +
              'px'
      let bottomBord = document.querySelector('.bottom-border')
      let topBord = document.querySelector('.top-border')
      let rightBord = document.querySelector('.right-border')
      let leftBord = document.querySelector('.left-border')
      let dashWrapper = document.querySelector('.dashboard-wrapper')
      let scrollBottomHeight = dashboardElem.getBoundingClientRect().height - dashWrapper.getBoundingClientRect().height
      topBord.style.left = this.selectedElement.left + 'px'
      topBord.style.top = this.selectedElement.top + 'px'
      topBord.style.width = this.selectedElement.width + 'px'
      if (this.selectedElement.bottom > dashboardElem.getBoundingClientRect().bottom) {
        bottomBord.style.display = 'none'
        leftBord.style.left = this.selectedElement.left + 'px'
        leftBord.style.top = this.selectedElement.top + 'px'
        leftBord.style.height = this.selectedElement.height - (this.selectedElement.bottom - dashboardElem.getBoundingClientRect().bottom) - scrollBottomHeight + 'px'
        rightBord.style.left = this.selectedElement.left + this.selectedElement.width - 2 + 'px'
        rightBord.style.top = this.selectedElement.top + 'px'
        rightBord.style.height = this.selectedElement.height - (this.selectedElement.bottom - dashboardElem.getBoundingClientRect().bottom) - scrollBottomHeight + 'px'
      } else {
        bottomBord.style.display = ''
        bottomBord.style.left = this.selectedElement.left + 'px'
        bottomBord.style.top = this.selectedElement.top + this.selectedElement.height - 2 + 'px'
        bottomBord.style.width = this.selectedElement.width + 'px'
        leftBord.style.left = this.selectedElement.left + 'px'
        leftBord.style.top = this.selectedElement.top + 'px'
        leftBord.style.height = this.selectedElement.height + 'px'
        rightBord.style.left = this.selectedElement.left + this.selectedElement.width - 2 + 'px'
        rightBord.style.top = this.selectedElement.top + 'px'
        rightBord.style.height = this.selectedElement.height + 'px'
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

  .dashboard {
    background-color: #f6f8fb;
    width: 100%;
    border: 1px solid black;
    height: 80%;
    max-height: 40rem;
    overflow: auto;
    display: inline-block;
    .dashboard-wrapper {
      // overflow: hidden;
      height: 100%;
      .text-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0.5rem;
        position: relative;
        .dashboard-text {
          color: #5a5c69;
          font-size: 2.5rem;
        }
        .generate {
          background-color: #8b8bcc;
          position: absolute;
          border-radius: 0.4rem;
          padding: 0.3rem;
          right: 10px;
        }
      }
      .component-wrapper {
        padding: 0.5rem;
        .earning-box {
          display: flex;
          flex-direction: row;
          margin-bottom: 1rem;
          align-items: center;
          justify-content: center;
        }
        .earningm-wrapper {
          border: 2px solid #d95353;
          box-shadow: 1px 0.5px 0.5px #c0c0c0;
          width: 50%;
          display: flex;
          height: 5rem;
          flex-direction: row;
          padding: 0.5rem;
          border-radius: 0.4rem;
          margin-right: 1rem;
          align-items: center;
          position: relative;
          background-color: #fff;
          .earningm {
            color: #d95353;
            font-size: 0.75rem;
            font-weight: bold;
          }
          .dol1 {
            text-align: left;
            font-size: 1.2rem;
          }
        }
        .earninga-wrapper {
          border: 2px solid #1cc88a;
          display: flex;
          flex-direction: row;
          background-color: #fff;
          height: 5rem;
          padding: 0.5rem;
          border-radius: 0.4rem;
          box-shadow: 1px 0.5px 0.5px #c0c0c0;
          width: 50%;
          position: relative;
          align-items: center;
          .earninga {
            color: #1cc88a;
            font-size: 0.75rem;
            font-weight: bold;
          }
          .dol2 {
            text-align: left;
            font-size: 1.2rem;
          }
        }
        .button1,
        .button2 {
          position: absolute;
          background-color: #dddfeb;
          background-image: linear-gradient(to bottom, #dddfeb, #cfd2e2);
          margin-left: 1rem;
          border-radius: 0.84rem;
          border: none;
          height: 3.8rem;
          width: 3.8rem;
          right: 10px;
        }

        .earningm-box,
        .earninga-box {
          display: flex;
          flex-direction: column;
          margin-left: 0.5rem;
        }

        .task-box {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          .tasks-wrapper {
            border: 2px solid #36b9cc;
            box-shadow: 1px 0.5px 0.5px #c0c0c0;
            height: 5rem;
            background-color: #fff;
            align-items: center;
            width: 50%;
            display: flex;
            flex-direction: row;
            padding: 0.5rem;
            border-radius: 0.4rem;
            position: relative;
            margin-right: 1rem;
            .tasks {
              color: #36b9cc;
              font-size: 0.75rem;
              font-weight: bold;
            }
            .task {
              text-align: left;
              font-size: 1.2rem;
            }
          }

          .pending-wrapper {
            border: 2px solid #f6c23e;
            width: 50%;
            display: flex;
            flex-direction: row;
            padding: 0.5rem;
            box-shadow: 1px 0.5px 0.5px #c0c0c0;
            height: 5rem;
            background-color: #fff;
            position: relative;
            align-items: center;
            border-radius: 0.4rem;
            .pending {
              color: #f6c23e;
              font-size: 0.75rem;
              font-weight: bold;
            }
            .pend {
              text-align: left;
              font-size: 1.2rem;
            }
          }
          .button3,
          .button4 {
            position: absolute;
            background-color: #dddfeb;
            background-image: linear-gradient(to bottom, #dddfeb, #cfd2e2);
            margin-left: 1rem;
            border-radius: 0.84rem;
            border: none;
            height: 3.8rem;
            width: 3.8rem;
            right: 10px;
          }

          .pending-box,
          .task-box {
            display: flex;
            flex-direction: column;
            margin-left: 0.5rem;
          }
        }
      }

      .img-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;

        .img1,
        .img2,
        .img3 {
          width: 10rem;
        }
      }
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
      .bottom-border, .top-border{

        width: 100%;
        height: 3px;
        position: fixed;
        // z-index:
        background-color: #3e8ce4;
        // overflow: auto !important;
      }
      .right-border, .left-border{
        height: 100%;
        width: 3px;
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
      fill:#fff;
      overflow: auto !important;
    }
    .delete-icon{
      z-index: 2;
      position: fixed;
      width: 1.2rem;
      height: 1.2rem;
      display: flex;
      align-items: center;
      padding: 0.2rem;
      justify-content: center;
      background-color: #f75c51;
      fill:#fff;
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
    #add{
      width: 5rem;
      height: 3rem;
      background-color: yellow;
      display: flex;
      justify-content: center;
      align-items: center;
      .add-1{
        background-color: red;
      }
    }
  }
}
</style>
