<template>
  <div id="dashboard">
    <div class="editor-box">
      <vue-custom-scrollbar
        @ps-scroll-y="handleScroll"
        @ps-scroll-x="handleScroll"
        class="scroll-area"
      >
        <div
          @mouseup="onmouserightClick"
          @keydown.enter="isContentNotEditable"
          ref="dash"
          class="editor-component"
          :contenteditable="isContentEditable"
          @dblclick="onmouseDoubleClick"
          @click="onmouseClick"
          @mousemove="onmouseMove"
          @mousedown="mousedown"
        >
          <div id="board" class="board">
            <div class="sample-component">
              <img
                src="../assets/images/plus.svg"
                @click="addCode"
                class="sample-add-btn"
              />
              <!-- <div class="line" />
              <div class="verti" /> -->
            </div>
            <!-- <Dashboard />
            <Dashboard />
            <Dashboard />
            <spliter />
            <HtmlLoader class="navi" />
            <Navi class="navi" /> -->
          </div>
        </div>
      </vue-custom-scrollbar>
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
      src="../assets/images/move.svg"
      class="move-icon"
    />
    <img
      @click="copyElement"
      style="cursor:pointer"
      v-show="isContentCopied"
      src="../assets/images/copy.svg"
      class="copy-icon"
    />
    <img
      @click="removeContent"
      style="cursor:pointer"
      v-show="isContentRemovable"
      src="../assets/images/delete.svg"
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
    <Context
      @close="closeMode"
      ref="context"
      class="context"
      v-show="mouseRightClick"
    />

    <!-- <div id="add">
      <div class="add-1">aaaaa</div>
    </!-->
  </div>
</template>

<script>
import Dashboard from '../sample/dashboard.vue'
import Navi from '../sample/navi.vue'
import HtmlLoader from './htmlLoader.vue'
import spliter from '../sample/spliter.vue'
import Context from '../components/Context'
import ss from '../sample/ss'
import vueCustomScrollbar from 'vue-custom-scrollbar'

export default {
  components: {
    Dashboard,
    Navi,
    HtmlLoader,
    spliter,
    Context,
    ss,
    vueCustomScrollbar
  },
  data() {
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
      mouseRightClick: false,
      size: null,
      targetText: null,
      editElem: null,
      multiSelect: null,
      multiSelectedElement: null,
      multiSelectedBorder: [],
      multiSelectedBorderRadius: [],
      multiSelectIndex: 1,
      multiElementParent: [],
      setSize: null
    }
  },
  mounted() {
    // let b = document.querySelector('.3')
    this.multiSelectedElement = new Set()
    document.addEventListener('contextmenu', e => {
      e.preventDefault()
    })

    let editor = document.querySelector('.editor-box')

    // let b = document.getElementsByClassName('editor-component')
    this.borderTop = editor.getBoundingClientRect().top
    this.borderBottom =
      editor.getBoundingClientRect().height + editor.getBoundingClientRect().top
    this.borderLeft = editor.getBoundingClientRect().left
    this.borderRight =
      editor.getBoundingClientRect().left + editor.getBoundingClientRect().width

    window.addEventListener('mousemove', event => {
      event.preventDefault()
      if (this.isContentResizable) {
        if (this.resizedirection === 'right') {
          if (event.pageX < this.initialposition) {
            const size =
              (this.initialwidth - (this.initialposition - event.pageX) * 2) /
              parseInt(getComputedStyle(this.clickedElement).width)
            this.clickedElement.style.transform = `scale(${size})`
            this.size = size
          } else if (event.pageX > this.initialposition) {
            const size =
              (this.initialwidth + (event.pageX - this.initialposition) * 2) /
              parseInt(getComputedStyle(this.clickedElement).width)
            this.clickedElement.style.transform = `scale(${size})`
            this.size = size
          }
        } else if (this.resizedirection === 'left') {
          if (event.pageX < this.initialposition) {
            const size =
              (this.initialwidth + (this.initialposition - event.pageX) * 2) /
              parseInt(getComputedStyle(this.clickedElement).width)
            this.clickedElement.style.transform = `scale(${size})`
            this.size = size
          } else if (event.pageX > this.initialposition) {
            const size =
              (this.initialwidth - (event.pageX - this.initialposition) * 2) /
              parseInt(getComputedStyle(this.clickedElement).width)
            this.clickedElement.style.transform = `scale(${size})`
            this.size = size
          }
        } else if (this.resizedirection === 'top') {
          if (event.pageY < this.initialposition) {
            const size =
              (this.initialheight + (this.initialposition - event.pageY) * 2) /
              parseInt(getComputedStyle(this.clickedElement).height)
            this.clickedElement.style.transform = `scale(${size})`
            this.size = size
          } else if (event.pageY > this.initialposition) {
            const size =
              (this.initialheight - (event.pageY - this.initialposition) * 2) /
              parseInt(getComputedStyle(this.clickedElement).height)
            this.clickedElement.style.transform = `scale(${size})`
            this.size = size
          }
        } else if (this.resizedirection === 'bottom') {
          if (event.pageY < this.initialposition) {
            const size =
              (this.initialheight - (this.initialposition - event.pageY) * 2) /
              parseInt(getComputedStyle(this.clickedElement).height)
            this.clickedElement.style.transform = `scale(${size})`
            this.size = size
          } else if (event.pageY > this.initialposition) {
            const size =
              (this.initialheight + (event.pageY - this.initialposition) * 2) /
              parseInt(getComputedStyle(this.clickedElement).height)
            this.clickedElement.style.transform = `scale(${size})`
            this.size = size
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
        copyIcon.style.left =
          this.clickedElement.getBoundingClientRect().left +
          parseInt(getComputedStyle(move).width) +
          'px'
        copyIcon.style.top =
          this.clickedElement.getBoundingClientRect().top -
          deleteIcon.getBoundingClientRect().height +
          'px'
      }
    })
    window.addEventListener('mouseup', e => {
      // this.clickedElement.style.filter = 'blur(0)'
      if (this.isContentResizable) {
        var style = {
          work: 'style',
          elem: this.clickedElement,
          style: 'transform',
          afterValue: `scale(${this.size})`,
          value: `scale(${this.initialscale})`
        }
        this.$emit('stack-push', style)
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
          if (this.clickedElement.className === '') {
            console.log('없음')
            var move = {
              work: 'move',
              position: this.clickedElement.parentElement,
              elem: this.clickedElement,
              afterMovePosition: this.movePosition.target
            }
            this.$emit('stack-push', move)
            this.movePosition.target.appendChild(this.clickedElement)
          } else {
            let addComponent = document.getElementsByClassName(
              this.clickedElement.classList.value
            )
            let i
            // console.log(addComponent)
            for (i = 0; i < addComponent.length; i++) {
              if (addComponent[i] === this.clickedElement) {
                // console.log(i);
                // console.log(addComponent[i]);
                break
              }
            }
            var move = {
              work: 'move',
              position: this.clickedElement.parentElement,
              elem: this.clickedElement,
              afterMovePosition: this.movePosition.target
            }
            this.$emit('stack-push', move)
            // console.log(addComponent[i])
            this.movePosition.target.appendChild(addComponent[i])

            this.$nextTick(() => {
              // console.log(addComponent);
              // console.log(e)

              // tag가 추가할 element. 자식이 된다.
              // console.log(position)
              // position이 추가할 위치에 있는 element. 부모가 된다.
              // this.movePosition.parentElement

              if (
                e.target.className === 'left-border' ||
                e.target.className === 'right-border' ||
                e.target.className === 'top-border' ||
                e.target.className === 'bottom-border'
              ) {
                // let pos = e.target.className.split('-')[0]
                let addComponent = document.getElementsByClassName(
                  this.clickedElement.classList.value
                )
                let i
                for (i = 0; i < addComponent.length; i++) {
                  if (addComponent[i] === this.clickedElement) {
                    console.log(i)
                    break
                  }
                }
                this.movePosition.target.parentElement.appendChild(
                  addComponent[i]
                )
              }
            })
          }
        }
      }

      this.isContentMovable = false

      this.$emit('elementresize', this.clickedElement)
    })
  },
  methods: {
    addCode(e) {
      console.log(e.target.parentElement.parentElement)
      console.log()
      this.$emit(
        'open-code',
        e.target.parentElement.parentElement.getAttribute('id')
      )
    },
    multiChoice(mode) {
      this.multiSelect = mode
    },
    closeMode(payload) {
      this.mouseRightClick = false
      this.$emit('comment', this.clickedElement)
      if (payload !== null) {
        this.$emit('stack-push', payload)
      }
      //연결안되어있음
    },
    addComponentTagStudio() {},
    mousedown(e) {
      // this.addComponentTag=e.target
    },
    mouseup(e) {
      // console.log(this.addComponentTag)
      // console.log(e.target)
      // if(this.addComponentTag!=e.target)
      //   e.target.appendChild(this.addComponentTag)
      // console.log(this.addComponentTag)
      // console.log(this.addComponentTag)
    },
    onmouseMove(e) {
      // console.log(this.addComponentTag)
      // let dashboardElem = document.querySelector('.editor')
      this.onelementSelected = true
      if (this.selectedElement === null) {
        if (
          e.target.className !== 'tagname' &&
          e.target.className !== 'home' &&
          e.target.className !== 'editor-component' &&
          e.target.className !== 'sample-component' &&
          e.target.className !== 'sample-add-btn'
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
            e.target.className !== 'editor-component' &&
            e.target.className !== 'sample-component' &&
            e.target.className !== 'sample-add-btn'
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
            let editorBox = document.querySelector('.editor-box')

            let leftOver = false
            let rightOver = false
            let bottomOver = false
            let topOver = false

            if (
              e.target.getBoundingClientRect().left <
              editorBox.getBoundingClientRect().left
            ) {
              leftOver = true
            }
            if (
              e.target.getBoundingClientRect().right >
              editorBox.getBoundingClientRect().right
            ) {
              rightOver = true
            }
            if (
              e.target.getBoundingClientRect().top <
              editorBox.getBoundingClientRect().top
            ) {
              topOver = true
            }
            if (
              e.target.getBoundingClientRect().bottom >
              editorBox.getBoundingClientRect().bottom
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
                this.selectedElement.left +
                this.selectedElement.width -
                2 +
                'px'
              rightBord.style.top =
                editorBox.getBoundingClientRect().top + 2 + 'px'
              rightBord.style.height =
                this.selectedElement.height -
                (editorBox.getBoundingClientRect().top -
                  this.selectedElement.top) -
                2 +
                'px'
              bottomBord.style.left =
                editorBox.getBoundingClientRect().left + 2 + 'px'
              bottomBord.style.top =
                this.selectedElement.top +
                this.selectedElement.height -
                2 +
                'px'
              bottomBord.style.width =
                this.selectedElement.width -
                (editorBox.getBoundingClientRect().left -
                  this.selectedElement.left) -
                2 +
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
                this.selectedElement.left +
                this.selectedElement.width -
                2 +
                'px'
              rightBord.style.top =
                editorBox.getBoundingClientRect().top + 2 + 'px'
              rightBord.style.height =
                this.selectedElement.height -
                (editorBox.getBoundingClientRect().top -
                  this.selectedElement.top) -
                2 +
                'px'

              leftBord.style.left = this.selectedElement.left + 'px'
              leftBord.style.top =
                editorBox.getBoundingClientRect().top + 2 + 'px'
              leftBord.style.height =
                this.selectedElement.height -
                (editorBox.getBoundingClientRect().top -
                  this.selectedElement.top) -
                2 +
                'px'

              bottomBord.style.left = this.selectedElement.left + 'px'
              bottomBord.style.top =
                this.selectedElement.top +
                this.selectedElement.height -
                2 +
                'px'
              bottomBord.style.width = this.selectedElement.width + 'px'
              // 2
            } else if (!leftOver && topOver && rightOver && !bottomOver) {
              // right, top 벗어날 때
              tag.style.display = 'none'
              rightBord.style.display = 'none'
              topBord.style.display = 'none'
              leftBord.style.display = 'block'
              bottomBord.style.display = 'block'

              leftBord.style.left = this.selectedElement.left + 'px'
              leftBord.style.top =
                editorBox.getBoundingClientRect().top + 2 + 'px'
              leftBord.style.height =
                this.selectedElement.height -
                (editorBox.getBoundingClientRect().top -
                  this.selectedElement.top) -
                2 +
                'px'
              bottomBord.style.left = this.selectedElement.left + 'px'
              bottomBord.style.top =
                this.selectedElement.top +
                this.selectedElement.height -
                2 +
                'px'
              bottomBord.style.width =
                this.selectedElement.width -
                (this.selectedElement.right -
                  editorBox.getBoundingClientRect().right) -
                2 +
                'px'
              // 3
            } else if (!leftOver && !topOver && rightOver && !bottomOver) {
              // right 벗어날 때
              tag.style.display = 'block'
              leftBord.style.display = 'block'
              rightBord.style.display = 'none'
              topBord.style.display = 'block'
              bottomBord.style.display = 'block'

              leftBord.style.left = this.selectedElement.left + 'px'
              leftBord.style.top = this.selectedElement.top + 2 + 'px'
              leftBord.style.height = this.selectedElement.height + 'px'

              bottomBord.style.left = this.selectedElement.left + 'px'
              bottomBord.style.top =
                this.selectedElement.top +
                this.selectedElement.height -
                2 +
                'px'
              bottomBord.style.width =
                this.selectedElement.width -
                (this.selectedElement.right -
                  editorBox.getBoundingClientRect().right) -
                2 +
                'px'

              topBord.style.left = this.selectedElement.left + 'px'
              topBord.style.top = this.selectedElement.top + 'px'
              topBord.style.width =
                this.selectedElement.width -
                (this.selectedElement.right -
                  editorBox.getBoundingClientRect().right) -
                2 +
                'px'
              // 4
            } else if (!leftOver && !topOver && rightOver && bottomOver) {
              // right, bottom 벗어날 때
              tag.style.display = 'block'
              leftBord.style.display = 'block'
              rightBord.style.display = 'none'
              topBord.style.display = 'block'
              bottomBord.style.display = 'none'

              leftBord.style.left = this.selectedElement.left + 'px'
              leftBord.style.top = this.selectedElement.top + 2 + 'px'
              leftBord.style.height =
                this.selectedElement.height -
                (this.selectedElement.bottom -
                  editorBox.getBoundingClientRect().bottom) -
                2 +
                'px'

              topBord.style.left = this.selectedElement.left + 'px'
              topBord.style.top = this.selectedElement.top + 'px'
              topBord.style.width =
                this.selectedElement.width -
                (this.selectedElement.right -
                  editorBox.getBoundingClientRect().right) -
                2 +
                'px'
              // 5
            } else if (!leftOver && !topOver && !rightOver && bottomOver) {
              // bottom 벗어날 때
              tag.style.display = 'block'
              leftBord.style.display = 'block'
              rightBord.style.display = 'block'
              topBord.style.display = 'block'
              bottomBord.style.display = 'none'

              leftBord.style.left = this.selectedElement.left + 'px'
              leftBord.style.top = this.selectedElement.top + 2 + 'px'
              leftBord.style.height =
                this.selectedElement.height -
                (this.selectedElement.bottom -
                  editorBox.getBoundingClientRect().bottom) -
                2 +
                'px'

              rightBord.style.left =
                this.selectedElement.left + this.selectedElement.width + 'px'
              rightBord.style.top = this.selectedElement.top + 2 + 'px'
              rightBord.style.height =
                this.selectedElement.height -
                (this.selectedElement.bottom -
                  editorBox.getBoundingClientRect().bottom) -
                2 +
                'px'

              topBord.style.left = this.selectedElement.left + 'px'
              topBord.style.top = this.selectedElement.top + 'px'
              topBord.style.width = this.selectedElement.width + 2 + 'px'
              // 6
            } else if (leftOver && !topOver && !rightOver && bottomOver) {
              // left, bottom 벗어날 때
              tag.style.display = 'none'
              leftBord.style.display = 'none'
              rightBord.style.display = 'block'
              topBord.style.display = 'block'
              bottomBord.style.display = 'none'

              rightBord.style.left =
                this.selectedElement.left + this.selectedElement.width + 'px'
              rightBord.style.top = this.selectedElement.top + 2 + 'px'
              rightBord.style.height =
                this.selectedElement.height -
                (this.selectedElement.bottom -
                  editorBox.getBoundingClientRect().bottom) -
                2 +
                'px'

              topBord.style.left = editorBox.getBoundingClientRect().left + 'px'
              topBord.style.top = this.selectedElement.top + 'px'
              topBord.style.width =
                this.selectedElement.width -
                (editorBox.getBoundingClientRect().left -
                  this.selectedElement.left) +
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
                this.selectedElement.left + this.selectedElement.width + 'px'
              rightBord.style.top = this.selectedElement.top + 2 + 'px'
              rightBord.style.height = this.selectedElement.height + 'px'

              topBord.style.left =
                editorBox.getBoundingClientRect().left + 2 + 'px'
              topBord.style.top = this.selectedElement.top + 'px'
              topBord.style.width =
                this.selectedElement.width -
                (editorBox.getBoundingClientRect().left -
                  this.selectedElement.left) +
                1 +
                'px'

              bottomBord.style.left =
                editorBox.getBoundingClientRect().left + 2 + 'px'
              bottomBord.style.top =
                this.selectedElement.top + this.selectedElement.height + 'px'
              bottomBord.style.width =
                this.selectedElement.width -
                (editorBox.getBoundingClientRect().left -
                  this.selectedElement.left) +
                1 +
                'px'
              // 8
            } else if (leftOver && !topOver && rightOver && !bottomOver) {
              // left, right 벗어날 때
              tag.style.display = 'none'
              leftBord.style.display = 'none'
              rightBord.style.display = 'none'
              topBord.style.display = 'block'
              bottomBord.style.display = 'block'

              topBord.style.left =
                editorBox.getBoundingClientRect().left + 2 + 'px'
              topBord.style.top = this.selectedElement.top + 'px'
              topBord.style.width =
                this.selectedElement.width -
                (editorBox.getBoundingClientRect().left -
                  this.selectedElement.left) -
                (this.selectedElement.right -
                  editorBox.getBoundingClientRect().right) -
                4 +
                'px'

              bottomBord.style.left =
                editorBox.getBoundingClientRect().left + 2 + 'px'
              bottomBord.style.top =
                this.selectedElement.top +
                this.selectedElement.height -
                6 +
                'px'
              bottomBord.style.width =
                this.selectedElement.width -
                (editorBox.getBoundingClientRect().left -
                  this.selectedElement.left) -
                (this.selectedElement.right -
                  editorBox.getBoundingClientRect().right) -
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
                this.selectedElement.left + this.selectedElement.width + 'px'
              rightBord.style.top =
                editorBox.getBoundingClientRect().top + 2 + 'px'
              rightBord.style.height =
                this.selectedElement.height -
                (editorBox.getBoundingClientRect().top -
                  this.selectedElement.top) -
                (this.selectedElement.bottom -
                  editorBox.getBoundingClientRect().bottom) -
                4 +
                'px'

              leftBord.style.left = this.selectedElement.left + 'px'
              leftBord.style.top =
                editorBox.getBoundingClientRect().top + 2 + 'px'
              leftBord.style.height =
                this.selectedElement.height -
                (editorBox.getBoundingClientRect().top -
                  this.selectedElement.top) -
                (this.selectedElement.bottom -
                  editorBox.getBoundingClientRect().bottom) -
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
                this.selectedElement.left + this.selectedElement.width + 'px'
              rightBord.style.top =
                editorBox.getBoundingClientRect().top + 2 + 'px'
              rightBord.style.height =
                this.selectedElement.height -
                (editorBox.getBoundingClientRect().top -
                  this.selectedElement.top) -
                (this.selectedElement.bottom -
                  editorBox.getBoundingClientRect().bottom) -
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

              bottomBord.style.left =
                editorBox.getBoundingClientRect().left + 'px'
              bottomBord.style.top =
                this.selectedElement.top + this.selectedElement.height + 'px'
              bottomBord.style.width =
                this.selectedElement.width -
                (editorBox.getBoundingClientRect().left -
                  this.selectedElement.left) -
                (this.selectedElement.right -
                  editorBox.getBoundingClientRect().right) -
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

              leftBord.style.left = this.selectedElement.left + 'px'
              leftBord.style.top =
                editorBox.getBoundingClientRect().top + 2 + 'px'
              leftBord.style.height =
                this.selectedElement.height -
                (editorBox.getBoundingClientRect().top -
                  this.selectedElement.top) -
                (this.selectedElement.bottom -
                  editorBox.getBoundingClientRect().bottom) -
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

              topBord.style.left =
                editorBox.getBoundingClientRect().left + 2 + 'px'
              topBord.style.top = this.selectedElement.top + 'px'
              topBord.style.width =
                this.selectedElement.width -
                (editorBox.getBoundingClientRect().left -
                  this.selectedElement.left) -
                (this.selectedElement.right -
                  editorBox.getBoundingClientRect().right) -
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
              // 14
            } else {
              tag.style.display = 'block'
              leftBord.style.display = 'block'
              topBord.style.display = 'block'
              rightBord.style.display = 'block'
              bottomBord.style.display = 'block'
              topBord.style.left = this.selectedElement.left + 'px'
              topBord.style.top = this.selectedElement.top + 'px'
              topBord.style.width = this.selectedElement.width + 'px'
              // bottomBord.style.display = 'none'?
              leftBord.style.left = this.selectedElement.left + 'px'
              leftBord.style.top = this.selectedElement.top + 'px'
              leftBord.style.height = this.selectedElement.height + 'px'
              rightBord.style.left =
                this.selectedElement.left +
                this.selectedElement.width -
                2 +
                'px'
              rightBord.style.top = this.selectedElement.top + 'px'
              rightBord.style.height = this.selectedElement.height + 'px'
              bottomBord.style.left = this.selectedElement.left + 'px'
              bottomBord.style.top =
                this.selectedElement.top +
                this.selectedElement.height -
                2 +
                'px'
              bottomBord.style.width = this.selectedElement.width + 'px'
            }
          }
        }
      }
    },
    onmouseClick(e) {
      if (this.multiSelect) {
        if (this.multiSelectedElement.size === 0) {
          this.$nextTick(() => {
            this.multiSelectedBorder[this.multiSelectIndex] = getComputedStyle(
              e.target
            ).border
            this.multiSelectedBorderRadius[
              this.multiSelectIndex
            ] = getComputedStyle(e.target).borderRadius
            this.multiSelectIndex++
            e.target.style.border = '3px dashed #f75c51'
            e.target.style.borderRadius = getComputedStyle(
              e.target
            ).borderRadius
            // this.multiSelectedElement.add(this.clickedElement)
            // this.multiElementParent.push(this.clickedElement.parentElement)
            // this.setSize = this.multiSelectedElement.size

            this.multiSelectedElement.add(e.target)
            if (this.setSize !== this.multiSelectedElement.size) {
              this.multiElementParent.push(e.target.parentElement)
            }
            this.setSize = this.multiSelectedElement.size

            this.$emit('componentSelected', this.multiSelectedElement)
            // this.multiElementParent.push(this.clickedElement.parentElement)
            // this.multiElementParent.pus(e.target)
            this.$refs.context.multiState(
              true,
              this.multiSelectedElement,
              this.multiElementParent
            )
            // console.log(this.multiSelectedElement)
          })
        } else {
          this.multiSelectedBorder[this.multiSelectIndex] = getComputedStyle(
            e.target
          ).border
          this.multiSelectedBorderRadius[
            this.multiSelectIndex
          ] = getComputedStyle(e.target).borderRadius
          this.multiSelectIndex++
          e.target.style.border = '3px dashed #f75c51'
          e.target.style.borderRadius = getComputedStyle(e.target).borderRadius
          this.multiSelectedElement.add(e.target)
          if (this.setSize !== this.multiSelectedElement.size) {
            this.multiElementParent.push(e.target.parentElement)
          }
          this.setSize = this.multiSelectedElement.size
          this.$emit('componentSelected', this.multiSelectedElement)

          this.$refs.context.multiState(
            true,
            this.multiSelectedElement,
            this.multiElementParent
          )
          // console.log(this.multiSelectedElement)
        }
        // console.log(this.multiElementParent)
      } else {
        let i
        let entries = this.multiSelectedElement.entries()
        let setIter = this.multiSelectedElement[Symbol.iterator]()
        for (i = 0; i < this.multiSelectedElement.size; i++) {
          let item = setIter.next().value
          item.style.border = this.multiSelectedBorder[i]
          item.style.borderRadius = this.multiSelectedBorderRadius[i]
        }
        this.multiSelectedElement.clear()
        this.multiSelectedBorder = []
        this.multiSelectedBorderRadius = []
        this.multiSelectIndex = 1

        this.$refs.context.multiState(false, null)
        this.mouseRightClick = false
        if (this.clickedElement === null) {
          if (
            e.target.className !== 'tagname' &&
            e.target.className !== 'home' &&
            e.target.className !== 'editor-component' &&
            e.target.className !== 'sample-component' &&
            e.target.className !== 'sample-add-btn'
          ) {
            this.multiSelectedElement = new Set()
            this.multiSelectedElement.add(e.target)
            if (this.setSize !== this.multiSelectedElement.size) {
              this.multiElementParent.push(e.target.parentElement)
            }
            this.setSize = this.multiSelectedElement.size
            this.$emit('componentSelected', this.multiSelectedElement)

            this.clickedElement = e.target

            this.clickedBorder = getComputedStyle(e.target).border
            this.clickedBorderRadius = getComputedStyle(e.target).borderRadius
            e.target.style.border = '3px dashed #f75c51'
            e.target.style.borderRadius = getComputedStyle(
              e.target
            ).borderRadius

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
              deleteIcon.style.left =
                this.elem.left + move.getBoundingClientRect().width * 2 + 'px'
              deleteIcon.style.top =
                this.elem.top - deleteIcon.getBoundingClientRect().height + 'px'
              let copyIcon = document.querySelector('.copy-icon')
              copyIcon.style.left =
                this.elem.left + move.getBoundingClientRect().width + 'px'
              copyIcon.style.left =
                this.elem.top - copyIcon.getBoundingClientRect().height + 'px'
            })
          }
        } else if (this.clickedElement !== e.target) {
          if (
            e.target.className !== 'tagname' &&
            e.target.className !== 'home' &&
            e.target.className !== 'editor-component' &&
            e.target.className !== 'sample-component' &&
            e.target.className !== 'sample-add-btn'
          ) {
            this.multiSelectedElement.add(e.target)
            if (this.setSize !== this.multiSelectedElement.size) {
              this.multiElementParent.push(e.target.parentElement)
            }
            this.setSize = this.multiSelectedElement.size

            this.$emit('componentSelected', this.multiSelectedElement)
            this.isContentClicked = true
            this.isContentRemovable = true
            this.isContentCopied = true

            this.clickedElement.style.border = this.clickedBorder
            this.clickedElement.style.borderRadius = this.clickedBorderRadius
            this.clickedElement = e.target
            this.clickedBorder = getComputedStyle(e.target).border
            this.clickedBorderRadius = getComputedStyle(e.target).borderRadius
            e.target.style.border = '3px dashed #f75c51'
            e.target.style.borderRadius = getComputedStyle(
              e.target
            ).borderRadius

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
                this.elem.left +
                parseInt(getComputedStyle(moveIcon).width) * 2 +
                'px'
              deleteIcon.style.top =
                this.elem.top - deleteIcon.getBoundingClientRect().height + 'px'

              let copyIcon = document.querySelector('.copy-icon')
              copyIcon.style.left =
                this.elem.left +
                parseInt(getComputedStyle(moveIcon).widht) +
                'px'
              copyIcon.style.top =
                this.elem.top - deleteIcon.getBoundingClientRect().height + 'px'
            })
          }
        } else {
          if (
            e.target.className !== 'tagname' &&
            e.target.className !== 'home' &&
            e.target.className !== 'editor-component' &&
            e.target.className !== 'sample-component' &&
            e.target.className !== 'sample-add-btn'
          ) {
            this.$emit('componentSelected', e)
          }
        }
        if (this.mode) {
          // console.log(getComputedStyle(this.clickedElement).flexWrap)
          this.clickedElement.style.display = 'flex'
          this.clickedElement.style.flexWrap = 'wrap'
          // console.log(getComputedStyle(this.clickedElement).flexWrap)
        }
      }
    },
    styleChanged(data) {
      if (data.payload.className === '') {
        console.log('없')
        var style = {
          work: 'style',
          elem: this.clickedElement,
          style: this.style,
          afterValue: data.value,
          value: getComputedStyle(data.payload)[this.style]
        }
        this.$emit('stack-push', style)

        this.value = data.value

        // console.log(element)
        data.payload.style[this.style] = this.value
      } else {
        this.style = data.style
        this.value = data.value

        var style = {
          work: 'style',
          elem: data.payload,
          style: this.style,
          afterValue: this.value,
          value: getComputedStyle(data.payload)[this.style]
        }
        this.$emit('stack-push', style)
        data.payload.style[data.style] = data.value
      }

      // console.log("바꼈다")
      // console.log(document.getElementsByClassName(this.target)[0].className)
      // console.log((document.getElementsByClassName(document.getElementsByClassName(this.target)[0].className)[0].style.cssText))
    },
    borderStyleChanged(data) {
      // console.log(data)
      this.target = data.payload.classList
      this.style = data.style
      this.value = data.value
      // console.log(this.clickedBorder)
      if (this.clickedBorder === '0px none rgb(44, 62, 80)') {
        this.clickedBorder = '1px solid rgb(0, 0, 0)'
        // console.log("click")
      }
      let prevBorder = this.clickedBorder.split(' ')
      let element = document.getElementsByClassName(this.target)[0]
      // console.log(element)
      // console.log(this.style)
      this.value =
        prevBorder[0] +
        ' ' +
        data.value +
        ' ' +
        prevBorder[2] +
        ' ' +
        prevBorder[3] +
        ' ' +
        prevBorder[4]
      element.style[this.style] = this.value
      this.clickedBorder = this.value
    },
    focusInput(e) {
      if (
        e.target.className !== 'tagname' &&
        e.target.className !== 'home' &&
        e.target.className !== 'editor-component' &&
        e.target.className !== 'sample-component' &&
        e.target.className !== 'sample-add-btn'
      ) {
        this.isContentEditable = true
        this.targetText = e.target.textContent
        console.log(this.targetText)
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
    onmouseDoubleClick(e) {
      if (
        e.target.className !== 'tagname' &&
        e.target.className !== 'home' &&
        e.target.className !== 'editor-component' &&
        e.target.className !== 'sample-component' &&
        e.target.className !== 'sample-add-btn'
      ) {
        this.focusInput(e)
        this.editElem = e.target
      }
    },
    placeCaretAtEnd(el) {
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
    isContentNotEditable(e) {
      e.preventDefault()
      console.log('abc')
      console.log(this.editElem)
      console.log('bcd')
      var edit = {
        work: 'edit',
        elem: this.editElem,
        beforeEdit: this.targetText,
        afterEdit: this.editElem.textContent
      }
      this.$emit('stack-push', edit)
      this.isContentEditable = false
    },
    mouseDownBoundary(e) {
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
          console.log(this.initialscale)
        }
      })
    },
    handleScroll(e) {
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
            copyIcon.style.left =
              moveLeft + parseInt(getComputedStyle(move).width) + 'px'
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
    removeContent() {
      let i
      let nChild
      for (i = 0; i < this.clickedElement.parentElement.children.length; i++) {
        if (
          this.clickedElement.parentElement.children[i] === this.clickedElement
        ) {
          nChild = i
          break
        }
      }
      var remove = {
        work: 'remove',
        position: this.clickedElement.parentNode,
        elem: this.clickedElement,
        nth: nChild
      }
      this.clickedElement.parentNode.removeChild(this.clickedElement)
      this.$emit('stack-push', remove)
    },
    addContent(tag, position) {
      // console.log(tag)
      // console.log(position)
      let addTag = document.querySelector('#add')
      // console.log(tag)
      // tag가 추가할 element. 자식이 된다.
      // console.log(position)
      // position이 추가할 위치에 있는 element. 부모가 된다.
      if (
        position.className !== 'right-border' &&
        position.className !== 'left-border' &&
        position.className !== 'top-border' &&
        position.className !== 'bottom-border'
      ) {
        position.appendChild(tag)
      }

      var add = {
        work: 'add',
        position: position,
        elem: tag
      }
      this.$emit('stack-push', add)
    },
    selectOverview(payload) {
      let bottomBord = document.querySelector('.bottom-border')
      let topBord = document.querySelector('.top-border')
      let rightBord = document.querySelector('.right-border')
      let leftBord = document.querySelector('.left-border')
      let editorBox = document.querySelector('.editor-box')

      let tag = document.querySelector('.tagname')

      tag.textContent = payload.tagName
      tag.style.left = payload.getBoundingClientRect().left + 'px'

      tag.style.top =
        payload.getBoundingClientRect().top -
        tag.getBoundingClientRect().height +
        'px'

      let leftOver = false
      let rightOver = false
      let bottomOver = false
      let topOver = false

      if (
        payload.getBoundingClientRect().left <
        editorBox.getBoundingClientRect().left
      ) {
        leftOver = true
      }
      if (
        payload.getBoundingClientRect().right >
        editorBox.getBoundingClientRect().right
      ) {
        rightOver = true
      }
      if (
        payload.getBoundingClientRect().top <
        editorBox.getBoundingClientRect().top
      ) {
        topOver = true
      }
      if (
        payload.getBoundingClientRect().bottom >
        editorBox.getBoundingClientRect().bottom
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
          payload.getBoundingClientRect().left +
          payload.getBoundingClientRect().width -
          2 +
          'px'
        rightBord.style.top = editorBox.getBoundingClientRect().top + 2 + 'px'
        rightBord.style.height =
          payload.getBoundingClientRect().height -
          (editorBox.getBoundingClientRect().top -
            payload.getBoundingClientRect().top) -
          2 +
          'px'
        bottomBord.style.left =
          editorBox.getBoundingClientRect().left + 2 + 'px'
        bottomBord.style.top =
          payload.getBoundingClientRect().top +
          payload.getBoundingClientRect().height -
          2 +
          'px'
        bottomBord.style.width =
          payload.getBoundingClientRect().width -
          (editorBox.getBoundingClientRect().left -
            payload.getBoundingClientRect().left) -
          2 +
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
          payload.getBoundingClientRect().left +
          payload.getBoundingClientRect().width -
          2 +
          'px'
        rightBord.style.top = editorBox.getBoundingClientRect().top + 2 + 'px'
        rightBord.style.height =
          payload.getBoundingClientRect().height -
          (editorBox.getBoundingClientRect().top -
            payload.getBoundingClientRect().top) -
          2 +
          'px'

        leftBord.style.left = payload.getBoundingClientRect().left + 'px'
        leftBord.style.top = editorBox.getBoundingClientRect().top + 2 + 'px'
        leftBord.style.height =
          payload.getBoundingClientRect().height -
          (editorBox.getBoundingClientRect().top -
            payload.getBoundingClientRect().top) -
          2 +
          'px'

        bottomBord.style.left = payload.getBoundingClientRect().left + 'px'
        bottomBord.style.top =
          payload.getBoundingClientRect().top +
          payload.getBoundingClientRect().height -
          2 +
          'px'
        bottomBord.style.width = payload.getBoundingClientRect().width + 'px'
        // 2
      } else if (!leftOver && topOver && rightOver && !bottomOver) {
        // right, top 벗어날 때
        tag.style.display = 'none'
        rightBord.style.display = 'none'
        topBord.style.display = 'none'
        leftBord.style.display = 'block'
        bottomBord.style.display = 'block'

        leftBord.style.left = payload.getBoundingClientRect().left + 'px'
        leftBord.style.top = editorBox.getBoundingClientRect().top + 2 + 'px'
        leftBord.style.height =
          payload.getBoundingClientRect().height -
          (editorBox.getBoundingClientRect().top -
            payload.getBoundingClientRect().top) -
          2 +
          'px'
        bottomBord.style.left = payload.getBoundingClientRect().left + 'px'
        bottomBord.style.top =
          payload.getBoundingClientRect().top +
          payload.getBoundingClientRect().height -
          2 +
          'px'
        bottomBord.style.width =
          payload.getBoundingClientRect().width -
          (payload.getBoundingClientRect().right -
            editorBox.getBoundingClientRect().right) -
          2 +
          'px'
        // 3
      } else if (!leftOver && !topOver && rightOver && !bottomOver) {
        // right 벗어날 때
        tag.style.display = 'block'
        leftBord.style.display = 'block'
        rightBord.style.display = 'none'
        topBord.style.display = 'block'
        bottomBord.style.display = 'block'

        leftBord.style.left = payload.getBoundingClientRect().left + 'px'
        leftBord.style.top = payload.getBoundingClientRect().top + 2 + 'px'
        leftBord.style.height = payload.getBoundingClientRect().height + 'px'

        bottomBord.style.left = payload.getBoundingClientRect().left + 'px'
        bottomBord.style.top =
          payload.getBoundingClientRect().top +
          payload.getBoundingClientRect().height -
          2 +
          'px'
        bottomBord.style.width =
          payload.getBoundingClientRect().width -
          (payload.getBoundingClientRect().right -
            editorBox.getBoundingClientRect().right) -
          2 +
          'px'

        topBord.style.left = payload.getBoundingClientRect().left + 'px'
        topBord.style.top = payload.getBoundingClientRect().top + 'px'
        topBord.style.width =
          payload.getBoundingClientRect().width -
          (payload.getBoundingClientRect().right -
            editorBox.getBoundingClientRect().right) -
          2 +
          'px'
        // 4
      } else if (!leftOver && !topOver && rightOver && bottomOver) {
        // right, bottom 벗어날 때
        tag.style.display = 'block'
        leftBord.style.display = 'block'
        rightBord.style.display = 'none'
        topBord.style.display = 'block'
        bottomBord.style.display = 'none'

        leftBord.style.left = payload.getBoundingClientRect().left + 'px'
        leftBord.style.top = payload.getBoundingClientRect().top + 2 + 'px'
        leftBord.style.height =
          payload.getBoundingClientRect().height -
          (payload.getBoundingClientRect().bottom -
            editorBox.getBoundingClientRect().bottom) -
          2 +
          'px'

        topBord.style.left = payload.getBoundingClientRect().left + 'px'
        topBord.style.top = payload.getBoundingClientRect().top + 'px'
        topBord.style.width =
          payload.getBoundingClientRect().width -
          (payload.getBoundingClientRect().right -
            editorBox.getBoundingClientRect().right) -
          2 +
          'px'
        // 5
      } else if (!leftOver && !topOver && !rightOver && bottomOver) {
        // bottom 벗어날 때
        tag.style.display = 'block'
        leftBord.style.display = 'block'
        rightBord.style.display = 'block'
        topBord.style.display = 'block'
        bottomBord.style.display = 'none'

        leftBord.style.left = payload.getBoundingClientRect().left + 'px'
        leftBord.style.top = payload.getBoundingClientRect().top + 2 + 'px'
        leftBord.style.height =
          payload.getBoundingClientRect().height -
          (payload.getBoundingClientRect().bottom -
            editorBox.getBoundingClientRect().bottom) -
          2 +
          'px'

        rightBord.style.left =
          payload.getBoundingClientRect().left +
          payload.getBoundingClientRect().width +
          'px'
        rightBord.style.top = payload.getBoundingClientRect().top + 2 + 'px'
        rightBord.style.height =
          payload.getBoundingClientRect().height -
          (payload.getBoundingClientRect().bottom -
            editorBox.getBoundingClientRect().bottom) -
          2 +
          'px'

        topBord.style.left = payload.getBoundingClientRect().left + 'px'
        topBord.style.top = payload.getBoundingClientRect().top + 'px'
        topBord.style.width = payload.getBoundingClientRect().width + 2 + 'px'
        // 6
      } else if (leftOver && !topOver && !rightOver && bottomOver) {
        // left, bottom 벗어날 때
        tag.style.display = 'none'
        leftBord.style.display = 'none'
        rightBord.style.display = 'block'
        topBord.style.display = 'block'
        bottomBord.style.display = 'none'

        rightBord.style.left =
          payload.getBoundingClientRect().left +
          payload.getBoundingClientRect().width +
          'px'
        rightBord.style.top = payload.getBoundingClientRect().top + 2 + 'px'
        rightBord.style.height =
          payload.getBoundingClientRect().height -
          (payload.getBoundingClientRect().bottom -
            editorBox.getBoundingClientRect().bottom) -
          2 +
          'px'

        topBord.style.left = editorBox.getBoundingClientRect().left + 'px'
        topBord.style.top = payload.getBoundingClientRect().top + 'px'
        topBord.style.width =
          payload.getBoundingClientRect().width -
          (editorBox.getBoundingClientRect().left -
            payload.getBoundingClientRect().left) +
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
          payload.getBoundingClientRect().left +
          payload.getBoundingClientRect().width +
          'px'
        rightBord.style.top = payload.getBoundingClientRect().top + 2 + 'px'
        rightBord.style.height = payload.getBoundingClientRect().height + 'px'

        topBord.style.left = editorBox.getBoundingClientRect().left + 2 + 'px'
        topBord.style.top = payload.getBoundingClientRect().top + 'px'
        topBord.style.width =
          payload.getBoundingClientRect().width -
          (editorBox.getBoundingClientRect().left -
            payload.getBoundingClientRect().left) +
          1 +
          'px'

        bottomBord.style.left =
          editorBox.getBoundingClientRect().left + 2 + 'px'
        bottomBord.style.top =
          payload.getBoundingClientRect().top +
          payload.getBoundingClientRect().height +
          'px'
        bottomBord.style.width =
          payload.getBoundingClientRect().width -
          (editorBox.getBoundingClientRect().left -
            payload.getBoundingClientRect().left) +
          1 +
          'px'
        // 8
      } else if (leftOver && !topOver && rightOver && !bottomOver) {
        // left, right 벗어날 때
        tag.style.display = 'none'
        leftBord.style.display = 'none'
        rightBord.style.display = 'none'
        topBord.style.display = 'block'
        bottomBord.style.display = 'block'

        topBord.style.left = editorBox.getBoundingClientRect().left + 2 + 'px'
        topBord.style.top = payload.getBoundingClientRect().top + 'px'
        topBord.style.width =
          payload.getBoundingClientRect().width -
          (editorBox.getBoundingClientRect().left -
            payload.getBoundingClientRect().left) -
          (payload.getBoundingClientRect().right -
            editorBox.getBoundingClientRect().right) -
          4 +
          'px'

        bottomBord.style.left =
          editorBox.getBoundingClientRect().left + 2 + 'px'
        bottomBord.style.top =
          payload.getBoundingClientRect().top +
          payload.getBoundingClientRect().height -
          6 +
          'px'
        bottomBord.style.width =
          payload.getBoundingClientRect().width -
          (editorBox.getBoundingClientRect().left -
            payload.getBoundingClientRect().left) -
          (payload.getBoundingClientRect().right -
            editorBox.getBoundingClientRect().right) -
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
          payload.getBoundingClientRect().left +
          payload.getBoundingClientRect().width +
          'px'
        rightBord.style.top = editorBox.getBoundingClientRect().top + 2 + 'px'
        rightBord.style.height =
          payload.getBoundingClientRect().height -
          (editorBox.getBoundingClientRect().top -
            payload.getBoundingClientRect().top) -
          (payload.getBoundingClientRect().bottom -
            editorBox.getBoundingClientRect().bottom) -
          4 +
          'px'

        leftBord.style.left = payload.getBoundingClientRect().left + 'px'
        leftBord.style.top = editorBox.getBoundingClientRect().top + 2 + 'px'
        leftBord.style.height =
          payload.getBoundingClientRect().height -
          (editorBox.getBoundingClientRect().top -
            payload.getBoundingClientRect().top) -
          (payload.getBoundingClientRect().bottom -
            editorBox.getBoundingClientRect().bottom) -
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
          payload.getBoundingClientRect().left +
          payload.getBoundingClientRect().width +
          'px'
        rightBord.style.top = editorBox.getBoundingClientRect().top + 2 + 'px'
        rightBord.style.height =
          payload.getBoundingClientRect().height -
          (editorBox.getBoundingClientRect().top -
            payload.getBoundingClientRect().top) -
          (payload.getBoundingClientRect().bottom -
            editorBox.getBoundingClientRect().bottom) -
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

        bottomBord.style.left = editorBox.getBoundingClientRect().left + 'px'
        bottomBord.style.top =
          payload.getBoundingClientRect().top +
          payload.getBoundingClientRect().height +
          'px'
        bottomBord.style.width =
          payload.getBoundingClientRect().width -
          (editorBox.getBoundingClientRect().left -
            payload.getBoundingClientRect().left) -
          (payload.getBoundingClientRect().right -
            editorBox.getBoundingClientRect().right) -
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

        leftBord.style.left = payload.getBoundingClientRect().left + 'px'
        leftBord.style.top = editorBox.getBoundingClientRect().top + 2 + 'px'
        leftBord.style.height =
          payload.getBoundingClientRect().height -
          (editorBox.getBoundingClientRect().top -
            payload.getBoundingClientRect().top) -
          (payload.getBoundingClientRect().bottom -
            editorBox.getBoundingClientRect().bottom) -
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

        topBord.style.left = editorBox.getBoundingClientRect().left + 2 + 'px'
        topBord.style.top = payload.getBoundingClientRect().top + 'px'
        topBord.style.width =
          payload.getBoundingClientRect().width -
          (editorBox.getBoundingClientRect().left -
            payload.getBoundingClientRect().left) -
          (payload.getBoundingClientRect().right -
            editorBox.getBoundingClientRect().right) -
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
        // 14
      } else {
        tag.style.display = 'block'
        leftBord.style.display = 'block'
        topBord.style.display = 'block'
        rightBord.style.display = 'block'
        bottomBord.style.display = 'block'
        topBord.style.left = payload.getBoundingClientRect().left + 'px'
        topBord.style.top = payload.getBoundingClientRect().top + 'px'
        topBord.style.width = payload.getBoundingClientRect().width + 'px'
        // bottomBord.style.display = 'none'?
        leftBord.style.left = payload.getBoundingClientRect().left + 'px'
        leftBord.style.top = payload.getBoundingClientRect().top + 'px'
        leftBord.style.height = payload.getBoundingClientRect().height + 'px'
        rightBord.style.left =
          payload.getBoundingClientRect().left +
          payload.getBoundingClientRect().width -
          2 +
          'px'
        rightBord.style.top = payload.getBoundingClientRect().top + 'px'
        rightBord.style.height = payload.getBoundingClientRect().height + 'px'
        bottomBord.style.left = payload.getBoundingClientRect().left + 'px'
        bottomBord.style.top =
          payload.getBoundingClientRect().top +
          payload.getBoundingClientRect().height -
          2 +
          'px'
        bottomBord.style.width = payload.getBoundingClientRect().width + 'px'
      }
    },
    moveElement(e) {
      this.clickedElement.style.filter = 'blur(0.8px)'
      this.isContentMovable = true
    },
    windowResized() {
      this.onmouseMove(this.movePosition)
    },
    copyElement() {
      let classValue = ''
      let i
      // console.log(this.clickedElement.classList.length)
      for (i = 0; i < this.clickedElement.classList.length; i++) {
        if (i === this.clickedElement.classList.length - 1) {
          classValue += '.' + this.clickedElement.classList[i]
        } else {
          classValue += '.' + this.clickedElement.classList[i] + ' '
        }
      }
      // console.log(classValue)
      let nChild
      for (i = 0; i < this.clickedElement.parentElement.children.length; i++) {
        if (
          this.clickedElement.parentElement.children[i] === this.clickedElement
        ) {
          nChild = i
          break
        }
      }
      if (this.clickedElement.className === '') {
        console.log('없음')
        let copyElem = this.clickedElement.cloneNode(true)
        console.log(copyElem)
        let randomClass =
          this.clickedElement.parentElement.classList.value.replace(/ /gi, '') +
          this.clickedElement.classList.value.replace(/ /gi, '') +
          this.classIndex
        copyElem.classList.add(randomClass)
        this.classIndex++
        var copy = {
          work: 'copy',
          position: this.clickedElement.parentElement,
          elem: this.clickedElement,
          copyElem: copyElem,
          nth: nChild
        }
        // console.log(copy);
        $(this.clickedElement).after(copyElem)
        this.$emit('stack-push', copy)
      } else {
        let elem = document.getElementsByClassName(
          this.clickedElement.classList.value
        )
        // console.log(elem)
        for (i = 0; i < elem.length; i++) {
          if (elem[i] === this.clickedElement) {
            console.log(i)
            break
          }
        }

        console.log(elem[i])

        let copyElem = elem[i].cloneNode(true)

        let randomClass =
          elem[i].parentElement.classList.value.replace(/ /gi, '') +
          elem[i].classList.value.replace(/ /gi, '') +
          this.classIndex
        copyElem.classList.add(randomClass)
        this.classIndex++
        // console.log(this.clickedElement.parentElement.children);

        // var newparent = document.createElement("div");
        var copy = {
          work: 'copy',
          position: this.clickedElement.parentElement,
          elem: elem[i],
          copyElem: copyElem,
          nth: nChild
        }
        // console.log(copy);
        $(elem[i]).after(copyElem)
        this.$emit('stack-push', copy)
      }

      // this.$nextTick(() => {
      //   // console.log(this.clickedElement.parentElement.children)
      //   this.clickedElement.parentElement.appendChild(newparent);
      //   newparent.appendChild(elem[0]);
      //   newparent.appendChild(copyElem);
      //   // if (getComputedStyle(elem).position === 'absolute') {
      //   this.$nextTick(() => {
      //     // console.log(parseInt(getComputedStyle(elem).))
      //     // newparent.style.width = parseInt(getComputedStyle(elem[0]).width) * 2 + 'px'
      //     newparent.style.height =
      //       parseInt(getComputedStyle(elem[0]).height) + "px";
      //     if (getComputedStyle(elem[0]).right !== 0) {
      //       // console.log('right')
      //       copyElem.style.left =
      //         parseInt(getComputedStyle(elem[0]).left) -
      //         parseInt(getComputedStyle(elem[0]).width) +
      //         "px";
      //       copyElem.style.border = this.clickedBorder;
      //       copyElem.style.borderRadius = this.clickedBorderRadius;
      //     } else {
      //       // console.log('left')
      //       copyElem.style.left =
      //         parseInt(getComputedStyle(elem[0]).left) +
      //         parseInt(getComputedStyle(elem[0]).width) +
      //         "px";
      //       copyElem.style.border = this.clickedBorder;
      //       copyElem.style.borderRadius = this.clickedBorderRadius;
      //     }

      //     // console.log(getComputedStyle(copyElem).right)
      //   });
      //   // }
      // });
    },
    splitBorder(e) {
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

      edit.addEventListener('mousemove', event => {
        if (this.borderClicked) {
          if (this.borderElem.className === 'boundary-line-right') {
            this.clickedElement.style.width =
              parseInt(elemWidth) - (initialX - event.clientX) * 2 + 'px'
          } else if (this.borderElem.className === 'boundary-line-left') {
            this.clickedElement.style.width =
              parseInt(elemWidth) - (event.clientX - initialX) * 2 + 'px'
          } else if (this.borderElem.className === 'boundary-line-top') {
            this.clickedElement.style.height =
              parseInt(elemHeight) - (event.clientY - initialY) * 2 + 'px'
          } else if (this.borderElem.className === 'boundary-line-bottom') {
            this.clickedElement.style.height =
              parseInt(elemHeight) - (initialY - event.clientY) * 2 + 'px'
          }
        }
      })
      edit.addEventListener('mouseup', () => {
        if (
          this.borderElem.className === 'boundary-line-right' ||
          this.borderElem.className === 'boundary-line-left'
        ) {
          var resize = {
            work: 'width',
            elem: this.clickedElement,
            beforeSize: elemWidth,
            afterSize: getComputedStyle(this.clickedElement).width
          }
        } else if (
          this.borderElem.className === 'boundary-line-top' ||
          this.borderElem.className === 'boundary-line-bottom'
        ) {
          var resize = {
            work: 'height',
            elem: this.clickedElement,
            beforeSize: elemHeight,
            afterSize: getComputedStyle(this.clickedElement).height
          }
        }
        this.$emit('stack-push', resize)
        this.borderClicked = false
      })
    },
    mousedownMode(e) {
      if (this.mode) {
        this.splitBorder(e)
      } else {
        this.mouseDownBoundary(e)
      }
    },
    modeSelect(mode) {
      // console.log(mode)
      this.mode = mode
    },
    onmouserightClick(e) {
      if (e.button === 2) {
        console.log('right')
        this.mouseRightClick = true
        this.$nextTick(() => {
          let context = document.querySelector('.context')
          context.style.left = e.clientX + 'px'
          context.style.top = e.clientY + 'px'
          this.$refs.context.clickedElement(e.target)
          // context.style.top = parseInt(getComputedStyle(e.target).top) + parseInt(getComputedStyle(e.target).height) / 2 + 'px'
        })
      }
    },
    loadData(data) {
      // console.log(data)
      this.$emit('loadData', data)
    }
  }
}
</script>

<style lang="scss">
#dashboard {
  display: inline-block;
  height: 100%;
  width: 100%;
  align-items: center;
  .editor-box {
    width: 100%;
    height: 100%;
    border: 3px solid #545e66;
    // display:table
    // overflow: auto;
    scroll-behavior: smooth;
    .scroll-area {
      width: 100%;
      position: relative;
      height: 100%;
      .editor-component {
        // overflow: auto;
        height: 100%;

        .board {
          height: 100%;
          width: 100%;
          .sample-component {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .verti {
              height: 5rem;
              width: 7px;
              background-color: #fff;
            }
            .line {
              width: 5rem;
              background-color: #fff;
              height: 7px;
            }
            .sample-add-btn {
              width: 5rem;
              cursor: pointer;
              height: 5rem;
            }
          }
        }
      }
      .ruler-box {
        opacity: 0.5;
        width: 100%;
        top: 0;
        right: 0;
        position: absolute;
        height: 3rem;
        background-color: white;
        .ruler-line {
          width: 100%;
          height: 2rem;
          display: flex;
          flex-direction: row;
          .ruler-1 {
            width: 1.5px;
            height: 2rem;
            margin-right: 50px;
            background-color: black;
          }
          .ruler-2 {
            width: 1.5px;
            margin-right: 50px;
            height: 1.5rem;
            background-color: black;
          }
        }
      }
    }
  }

  .navi {
    width: 100%;
    height: 80%;
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
      background-color: #27e460;
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
      height: 3px;
      position: fixed;
      // z-index:
      background-color: #27e460;
      // overflow: auto !important;
    }
    .right-border,
    .left-border {
      height: 100%;
      width: 3px;
      position: fixed;
      background-color: #27e460;
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
  .copy-icon {
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
  .dashboard-text {
    width: 300px;
  }
  .context {
    position: fixed;
  }
}
</style>
