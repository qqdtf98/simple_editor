<template>
  <div id="dashboard">
    <div
      @keydown.enter="isContentNotEditable"
      ref="dash"
      class="dashboard"
      :contenteditable="isContentEditable"
      @dblclick="onmouseDoubleClick"
      @click="onmouseClick"
      @mousemove="onmouseMove"
      @scroll="handleScroll"
    >
      <div class="dashboard-wrapper">
        <div class="text-wrapper">
          <div class="dashboard-text">Dashboard</div>
          <button class="generate">Generate Report</button>
        </div>
        <div class="component-wrapper">
          <div class="earning-box">
            <div class="earningm-wrapper">
              <div class="earningm-box">
                <span class="earningm">EARNINGS(MONTHLY)</span>
                <span class="dol1">$40000</span>
              </div>
              <button class="button1"></button>
            </div>
            <div class="earninga-wrapper">
              <div class="earninga-box">
                <span class="earninga">EARNINGS(ANNUAL)</span>
                <span class="dol2">$215,000</span>
              </div>
              <button class="button2"></button>
            </div>
          </div>
          <div class="task-box">
            <div class="tasks-wrapper">
              <div class="task-box">
                <span class="tasks">TASKS</span>
                <span class="task">50%</span>
              </div>
              <button class="button3"></button>
            </div>
            <div class="pending-wrapper">
              <div class="pending-box">
                <span class="pending">PENDING REQUESTS</span>
                <span class="pend">18</span>
              </div>
              <button class="button4"></button>
            </div>
          </div>
        </div>
        <div class="img-wrapper">
          <img class="img1" src="../assets/logo.png" />
          <img class="img2" src="../assets/logo.png" />
          <img class="img3" src="../assets/logo.png" />
        </div>
      </div>
      <div class="selector-box">
        <div v-show="onelementSelected" class="tagname"></div>
        <!-- <div class="compo-border"></div> -->
        <div class="left-border"></div>
        <div class="right-border"></div>
        <div class="top-border"></div>
        <div class="bottom-border"></div>
      </div>
      <img
        style="cursor:pointer"
        v-show="isContentMovable"
        src="../assets/move.svg"
        class="move-icon"
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
    </div>
  </div>
</template>

<script>
export default {
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
      initialscale: ''
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
    })
    window.addEventListener('mouseup', () => {
      this.resizedirection = null
      this.$emit('elementresize', this.clickedElement)
    })
  },
  methods: {
    onmouseMove (e) {
      this.onelementSelected = true
      if (this.selectedElement === null) {
        if (
          e.target.className !== 'tagname' &&
          e.target.className !== 'move-icon'
        ) {
          // border.style.zIndex = 3

          this.onelementSelected = true
          this.selectedElement = e.target.getBoundingClientRect()
        }
      } else {
        if (this.selectedElement !== e.target) {
          if (
            e.target.className !== 'tagname' &&
            e.target.className !== 'move-icon'
          ) {
            // border.style.zIndex = 3
            this.selectedElement = e.target.getBoundingClientRect()
            let tag = document.querySelector('.tagname')

            tag.textContent = e.target.tagName
            tag.style.left = this.selectedElement.left + 'px'

            tag.style.top =
              this.selectedElement.top -
              tag.getBoundingClientRect().height +
              'px'
            // let bord = document.querySelector('.compo-border')
            // bord.style.border = '2px solid #3e8ce4'
            // bord.style.left = this.selectedElement.left + 'px'
            // bord.style.top = this.selectedElement.top + 'px'
            // bord.style.width = this.selectedElement.width + 'px'
            // bord.style.height = this.selectedElement.height + 'px'
            let leftBord = document.querySelector('.left-border')
            let rightBord = document.querySelector('.right-border')
            let topBord = document.querySelector('.top-border')
            let bottomBord = document.querySelector('.bottom-border')
          }
        }
      }
    },
    onmouseClick (e) {
      if (this.clickedElement === null) {
        if (
          e.target.className !== 'tagname' &&
          e.target.className !== 'move-icon' &&
          e.target.className !== 'boundary-line-left'
        ) {
          this.$emit('componentSelected', e)

          this.clickedElement = e.target
          this.clickedBorder = getComputedStyle(e.target).border
          this.clickedBorderRadius = getComputedStyle(e.target).borderRadius
          e.target.style.border = '2px dashed #3e8ce4'
          e.target.style.borderRadius = '0'

          this.isContentMovable = true

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
            move.style.top = this.elem.top - move.getBoundingClientRect().height + 'px'
          })
        }
      } else if (this.clickedElement !== e.target) {
        if (
          e.target.className !== 'tagname' &&
          e.target.className !== 'move-icon' &&
          e.target.className !== 'boundary-line-left'
        ) {
          this.$emit('componentSelected', e)

          this.clickedElement.style.border = this.clickedBorder
          this.clickedElement.style.borderRadius = this.clickedBorderRadius
          this.clickedElement = e.target
          this.clickedBorder = getComputedStyle(e.target).border
          this.clickedBorderRadius = getComputedStyle(e.target).borderRadius
          e.target.style.border = '2px dashed #3e8ce4'
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

          this.$nextTick(() => {
            this.elem = e.target.getBoundingClientRect()
            let tag = document.querySelector('.move-icon')

            tag.style.left = this.elem.left + 'px'

            tag.style.top =
              this.elem.top - tag.getBoundingClientRect().height + 'px'
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
    focusInput () {
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
    },
    onmouseDoubleClick () {
      this.focusInput()
    },
    placeCaretAtEnd (el) {
      console.log('asd')
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
          if (tagTop > 170) {
            this.onelementSelected = true
            tag.style.top = tagTop + 'px'
          } else {
            this.onelementSelected = false
          }
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
            move.style.top = moveTop + 'px'
          } else {
            this.isContentMovable = false
          }
          if (moveLeft > 300) {
            this.isContentMovable = true
            move.style.left = moveLeft + 'px'
          } else {
            this.isContentMovable = false
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
#dashboard {
  display: flex;
  align-items: center;
  width: 100%;

  .dashboard {
    background-color: #f6f8fb;
    width: 100%;
    border: 1px solid black;
    height: 80%;
    max-height: 40rem;
    overflow: scroll;
    .dashboard-wrapper {
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
      .left-border, .right-border, .top-border, .bottom-border{
        height: 100%;
        width: 5px;
        position: fixed;
        z-index: 10000;
        background-color: red;
      }
      .top-border, .bottom-border{
        width: 100%;
        height: 5px;
        position: fixed;
        z-index: 10000;
        background-color: red;
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
  }
}
</style>
