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
        >
          <div id="board" class="board">
            <iframe
              name="iframe1"
              id="filecontainer"
              src="static/html/test.html"
              ref="iframe"
              width="100%"
              height="100%"
              style="background-color: #fff;"
            ></iframe>
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
    <div class="click-indicator-box"></div>
    <img
      @mousedown="moveElement"
      style="cursor:pointer"
      v-show="isContentClicked"
      src="../assets/images/move.svg"
      class="move-icon"
    />
    <img
      @click="duplicateElement"
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
      @mousedown="elementResize"
      class="boundary-line-top"
    ></div>
    <div
      v-if="isContentClicked"
      data-pos="left"
      style="cursor:ew-resize"
      @mousedown="elementResize"
      class="boundary-line-left"
    ></div>
    <div
      v-if="isContentClicked"
      data-pos="right"
      style="cursor:ew-resize"
      @mousedown="elementResize"
      class="boundary-line-right"
    ></div>
    <div
      v-if="isContentClicked"
      data-pos="bottom"
      style="cursor:ns-resize"
      @mousedown="elementResize"
      class="boundary-line-bottom"
    ></div>
    <Context
      @iframe-changed="iframeChanged"
      @close="closeMode"
      @upload-image="uploadImage"
      ref="context"
      class="context"
      v-show="mouseRightClick"
    />
  </div>
</template>

<script>
import HandleElement from '../modules/handle-element'
import { Work } from '../modules/undoredo'
import Dashboard from '../sample/dashboard.vue'
import SelectorModule from '../modules/selector.module'
import Boundary from '../modules/boundary'
import ElemIcon from '../modules/elem-icon'
import ClickIndicator from '../modules/click-indicator'
import Navi from '../sample/navi.vue'
import spliter from '../sample/spliter.vue'
import Context from '../components/Context'
import ss from '../sample/ss'
import vueCustomScrollbar from 'vue-custom-scrollbar'

export default {
  components: {
    Dashboard,
    Navi,
    spliter,
    Context,
    ss,
    vueCustomScrollbar
  },
  watch: {
    '$store.state.styleData.changedData'(newVal, oldVal) {
      console.log('??')
      let htmlSrc = $('iframe').get(0).contentWindow.document.documentElement
        .innerHTML
      console.log(newVal)
      newVal.payload.style[newVal.style] = newVal.value
      let afterHtmlSrc = $('iframe').get(0).contentWindow.document
        .documentElement.innerHTML

      let newWork = new Work(htmlSrc, afterHtmlSrc)
      this.$store.dispatch('workStackPush', newWork)

      // this.$emit(
      //   'iframe-changed',
      //   $('iframe')
      //     .get(0)
      //     .contentWindow.document.documentElement.innerHTML.split(
      //       '<style>'
      //     )[0] + '</body>'
      // )
    }
  },
  data() {
    return {
      elemWidth: null,
      elemHeight: null,
      elemLeft: null,
      initialX: 0,
      initialY: 0,
      sample: 'aaaaaaaaaaaaaaaff',
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
      isCtrl: false,
      isShift: false,
      setSize: null
    }
  },
  mounted() {
    let homeDoc = this
    $(document).ready(function() {
      var iframe = $('iframe')
      iframe.get(0).contentDocument.addEventListener('click', e => {
        homeDoc.onmouseClick(e)
      })
      iframe.get(0).contentDocument.addEventListener('mousemove', e => {
        window.dispatchEvent(
          new CustomEvent('mousemove', {
            detail: e
          })
        )
        homeDoc.onmouseMove(e)
      })
      iframe.get(0).contentDocument.addEventListener('mouseup', e => {
        window.dispatchEvent(
          new CustomEvent('mouseup', {
            detail: e
          })
        )
        homeDoc.onmouserightClick(e)
      })
      iframe.get(0).contentDocument.addEventListener('scroll', e => {
        homeDoc.handleScroll(e)
      })
      iframe.get(0).contentDocument.addEventListener('contextmenu', e => {
        homeDoc.onmouseClick(e)
      })
      iframe.get(0).contentDocument.addEventListener('keydown', e => {
        if (e.which === 17) {
          this.isCtrl = true
          homeDoc.multiChoice(true)
        }
        if (e.which === 16) {
          this.isShift = true
        }
        if (e.which === 90 && this.isCtrl && !this.isShift) {
          // this.undoWork()
        }
        if (e.which === 90 && this.isCtrl && this.isShift) {
          // this.redoWork()
        }
      })
      iframe.get(0).contentDocument.addEventListener('keyup', e => {
        if (e.which === 16) {
          this.isShift = false
        }
        if (e.which === 17) {
          console.log('frame ctrl')
          this.isCtrl = false
          homeDoc.multiChoice(false)
        }
      })
      // iframe.get(0).contentDocument.addEventListener('dblclick', e => {
      //   homeDoc.onmouseDoubleClick(e)
      // })
    })

    document.addEventListener('contextmenu', e => {
      e.preventDefault()
    })

    let editor = document.querySelector('.editor-box')

    this.borderTop = editor.getBoundingClientRect().top
    this.borderBottom =
      editor.getBoundingClientRect().height + editor.getBoundingClientRect().top
    this.borderLeft = editor.getBoundingClientRect().left
    this.borderRight =
      editor.getBoundingClientRect().left + editor.getBoundingClientRect().width

    window.addEventListener('mouseup', e => {
      // TODO resizeelement 기능 수정
      if (this.borderClicked) {
        // if (
        //   this.borderElem.className === 'boundary-line-right' ||
        //   this.borderElem.className === 'boundary-line-left'
        // ) {
        //   var resize = {
        //     work: 'width',
        //     elem: this.clickedElement,
        //     beforeSize: this.elemWidth,
        //     afterSize: getComputedStyle(this.clickedElement).width
        //   }
        // } else if (
        //   this.borderElem.className === 'boundary-line-top' ||
        //   this.borderElem.className === 'boundary-line-bottom'
        // ) {
        //   var resize = {
        //     work: 'height',
        //     elem: this.clickedElement,
        //     beforeSize: this.elemHeight,
        //     afterSize: getComputedStyle(this.clickedElement).height
        //   }
        // }
        this.$emit('stack-push')
        this.borderClicked = false
      }
      this.resizedirection = null

      this.$emit('elementresize', this.clickedElement)
    })
  },
  methods: {
    iframeChanged(change) {
      this.$emit(
        'iframe-changed',
        $('iframe')
          .get(0)
          .contentWindow.document.documentElement.innerHTML.split(
            '<style>'
          )[0] + '</body>'
      )
    },
    uploadImage() {
      let input = document.querySelector('#getfile')
      let uploadImg = input.cloneNode(true)
      uploadImg.ref = 'img1'
      console.log(uploadImg)
      console.log(this.clickedElement)
      this.clickedElement.appendChild(uploadImg)
      this.$nextTick(() => {
        $refs.img1.click()
      })
    },
    addCode(e) {
      this.$emit('open-code', e)
    },
    multiChoice(mode) {
      this.multiSelect = mode
    },
    closeMode(payload) {
      this.mouseRightClick = false
      if (payload !== null) {
        this.$emit('stack-push', payload)
      }
    },
    onmouseMove(e) {
      let board = document.querySelector('.board')
      this.onelementSelected = true
      if (this.selectedElement === null) {
        if (
          e.target.className !== 'tagname' &&
          e.target.className !== 'home' &&
          e.target.className !== 'editor-component' &&
          e.target.className !== 'sample-component' &&
          e.target.className !== 'sample-add-btn' &&
          e.target.className !== 'editor-box' &&
          e.target.className !== 'scroll-area'
        ) {
          this.onelementSelected = true
          this.selectedElement = e.target
          this.movePosition = e
        }
      } else {
        if (this.selectedElement !== e.target) {
          if (
            e.target.className !== 'tagname' &&
            e.target.className !== 'home' &&
            e.target.className !== 'editor-component' &&
            e.target.className !== 'sample-component' &&
            e.target.className !== 'sample-add-btn' &&
            e.target.className !== 'editor-box' &&
            e.target.className !== 'scroll-area'
          ) {
            this.selectedElement = e.target
            this.movePosition = e
            SelectorModule.activateSelector(e.target, 'move')
          }
        }
      }
    },
    /**
     * element 클릭 시 indicator 생성하는 함수
     */
    onmouseClick(e) {
      if (this.multiSelect) {
        let indicator = new ClickIndicator(e.target, true)
        this.$nextTick(() => {
          this.$emit('componentSelected', ClickIndicator.instances)
          this.$refs.context.multiState(true)
        })
      } else {
        let indicator = new ClickIndicator(e.target)
        ClickIndicator.instances.forEach(instance => {
          console.log(instance.target)
        })
        this.$refs.context.multiState(false)
        this.mouseRightClick = false
        if (this.clickedElement === null) {
          if (
            e.target.className !== 'tagname' &&
            e.target.className !== 'home' &&
            e.target.className !== 'editor-component' &&
            e.target.className !== 'sample-component' &&
            e.target.className !== 'sample-add-btn' &&
            e.target.className !== 'editor-box' &&
            e.target.className !== 'scroll-area'
          ) {
            this.$emit('componentSelected', ClickIndicator.instances)

            this.clickedElement = e.target
            this.isContentClicked = true
            this.isContentRemovable = true
            this.isContentCopied = true

            this.$nextTick(() => {
              Boundary.setBoundaryPosition(e)
              ElemIcon.setIconPosition(e.target.getBoundingClientRect())
            })
          }
        } else if (this.clickedElement !== e.target) {
          if (
            e.target.className !== 'tagname' &&
            e.target.className !== 'home' &&
            e.target.className !== 'editor-component' &&
            e.target.className !== 'sample-component' &&
            e.target.className !== 'sample-add-btn' &&
            e.target.className !== 'editor-box' &&
            e.target.className !== 'scroll-area'
          ) {
            this.$emit('componentSelected', ClickIndicator.instances)

            this.clickedElement = e.target

            this.isContentClicked = true
            this.isContentRemovable = true
            this.isContentCopied = true

            this.$nextTick(() => {
              Boundary.setBoundaryPosition(e)
              ElemIcon.setIconPosition(e.target.getBoundingClientRect())
            })
          }
        } else {
          if (
            e.target.className !== 'tagname' &&
            e.target.className !== 'home' &&
            e.target.className !== 'editor-component' &&
            e.target.className !== 'sample-component' &&
            e.target.className !== 'sample-add-btn' &&
            e.target.className !== 'editor-box' &&
            e.target.className !== 'scroll-area'
          ) {
            this.$emit('componentSelected', ClickIndicator.instances)
          }
        }
        if (this.mode) {
          this.clickedElement.style.display = 'flex'
          this.clickedElement.style.flexWrap = 'wrap'
        }
      }
    },
    styleChanged(data) {
      console.log('??')
      let htmlSrc = $('iframe').get(0).contentWindow.document.documentElement
        .innerHTML

      data.payload.style[data.style] = data.value
      let afterHtmlSrc = $('iframe').get(0).contentWindow.document
        .documentElement.innerHTML

      let newWork = new Work(htmlSrc, afterHtmlSrc)
      this.$store.dispatch('workStackPush', newWork)

      this.$emit(
        'iframe-changed',
        $('iframe')
          .get(0)
          .contentWindow.document.documentElement.innerHTML.split(
            '<style>'
          )[0] + '</body>'
      )
    },
    focusInput(e) {
      if (
        e.target.className !== 'tagname' &&
        e.target.className !== 'home' &&
        e.target.className !== 'editor-component' &&
        e.target.className !== 'sample-component' &&
        e.target.className !== 'sample-add-btn' &&
        e.target.className !== 'editor-box' &&
        e.target.className !== 'scroll-area'
      ) {
        this.isContentEditable = true
        this.targetText = e.target.textContent
        this.$nextTick(() => {
          const sel = window.getSelection()
          sel.removeAllRanges()
          const range = new Range()
          range.setStart(this.$refs.iframe, 0)
          range.setEnd(this.$refs.iframe, 0)
          sel.addRange(range)
          this.placeCaretAtEnd(this.$refs.iframe)
        })
      }
    },
    onmouseDoubleClick(e) {
      if (
        e.target.className !== 'tagname' &&
        e.target.className !== 'home' &&
        e.target.className !== 'editor-component' &&
        e.target.className !== 'sample-component' &&
        e.target.className !== 'sample-add-btn' &&
        e.target.className !== 'editor-box' &&
        e.target.className !== 'scroll-area'
      ) {
        this.focusInput(e)
        this.editElem = e.target
      }
    },
    placeCaretAtEnd(el) {
      console.log(el)
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
      var edit = {
        work: 'edit',
        elem: this.editElem,
        beforeEdit: this.targetText,
        afterEdit: this.editElem.textContent
      }
      this.$emit('stack-push', edit)
      this.isContentEditable = false
    },
    handleScroll(e) {
      if (this.selectedElement != null) {
        this.onelementSelected = false
      }
      if (this.clickedElement !== null) {
        let board = document.querySelector('.board')
        this.$nextTick(() => {
          let move = document.querySelector('.move-icon')
          let moveHeight = getComputedStyle(move).height
          let deleteIcon = document.querySelector('.delete-icon')
          let copyIcon = document.querySelector('.copy-icon')
          let leftLine = document.querySelector('.boundary-line-left')
          let rightLine = document.querySelector('.boundary-line-right')
          let topLine = document.querySelector('.boundary-line-top')
          let bottomLine = document.querySelector('.boundary-line-bottom')
          // move.style.left =
          //   this.clickedElement.getBoundingClientRect().left + 'px'
          let moveTop =
            this.clickedElement.getBoundingClientRect().top -
            parseInt(moveHeight)
          let moveLeft = this.clickedElement.getBoundingClientRect().left
          let moveBottom = this.clickedElement.getBoundingClientRect().bottom

          if (
            (moveTop < 0 && moveBottom < 905) ||
            (moveTop > 0 && moveBottom > 905)
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
            move.style.top = moveTop + board.getBoundingClientRect().top + 'px'
            deleteIcon.style.top =
              moveTop + board.getBoundingClientRect().top + 'px'
            copyIcon.style.top =
              moveTop + board.getBoundingClientRect().top + 'px'
            leftLine.style.top =
              this.clickedElement.getBoundingClientRect().top +
              board.getBoundingClientRect().top +
              'px'
            rightLine.style.top =
              this.clickedElement.getBoundingClientRect().top +
              board.getBoundingClientRect().top +
              'px'
            topLine.style.top =
              this.clickedElement.getBoundingClientRect().top +
              board.getBoundingClientRect().top +
              'px'
            bottomLine.style.top =
              this.clickedElement.getBoundingClientRect().top +
              this.clickedElement.getBoundingClientRect().height +
              board.getBoundingClientRect().top +
              'px'
          }
          if (moveLeft > 0) {
            this.isContentClicked = true
            this.isContentRemovable = true
            this.isContentCopied = true
            move.style.left =
              moveLeft + board.getBoundingClientRect().left + 'px'
            deleteIcon.style.left =
              moveLeft +
              board.getBoundingClientRect().left +
              parseInt(getComputedStyle(move).width) * 2 +
              'px'
            copyIcon.style.left =
              moveLeft +
              board.getBoundingClientRect().left +
              parseInt(getComputedStyle(move).width) +
              'px'
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
      this.classIndex = HandleElement.removeElement(
        this.clickedElement,
        this.classIndex
      )
      this.$nextTick(() => {
        this.$emit(
          'iframe-changed',
          $('iframe')
            .get(0)
            .contentWindow.document.documentElement.innerHTML.split(
              '<style>'
            )[0] + '</body>'
        )
      })
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
        this.$emit(
          'iframe-changed',
          $('iframe')
            .get(0)
            .contentWindow.document.documentElement.innerHTML.split(
              '<style>'
            )[0] + '</body>'
        )
      }

      var add = {
        work: 'add',
        position: position,
        elem: tag
      }
      this.$emit('stack-push', add)
    },
    selectOverview(payload) {
      SelectorModule.activateSelector(payload)
    },
    moveElement(e) {
      e.preventDefault()
      HandleElement.moveElement(this.clickedElement)
    },
    windowResized() {
      this.onmouseMove(this.movePosition)
    },
    duplicateElement() {
      this.classIndex = HandleElement.duplicateElement(
        this.clickedElement,
        this.classIndex
      )
      this.$nextTick(() => {
        this.$emit(
          'iframe-changed',
          $('iframe')
            .get(0)
            .contentWindow.document.documentElement.innerHTML.split(
              '<style>'
            )[0] + '</body>'
        )
      })
    },
    elementResize(e) {
      this.elemWidth = getComputedStyle(this.clickedElement).width
      this.elemHeight = getComputedStyle(this.clickedElement).height
      this.elemLeft = getComputedStyle(this.clickedElement).left
      this.initialX = e.clientX
      this.initialY = e.clientY
      this.borderElem = e.target
      this.borderClicked = true
    },
    onmouserightClick(e) {
      if (e.button === 2) {
        let board = document.querySelector('.board')
        this.mouseRightClick = true
        this.$nextTick(() => {
          let context = document.querySelector('.context')
          context.style.left =
            e.clientX + board.getBoundingClientRect().left + 'px'
          context.style.top =
            e.clientY + board.getBoundingClientRect().top + 'px'
          this.$refs.context.clickedElement(e.target)
        })
      }
    },
    loadData(data) {
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
  .click-indicator-box {
    display: flex;
    flex-direction: column;
    .click-bottom-border,
    .click-top-border {
      width: 100%;
      height: 3px;
      position: fixed;
      background-color: #f75c51;
    }
    .click-right-border,
    .click-left-border {
      height: 100%;
      width: 3px;
      position: fixed;
      background-color: #f75c51;
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
    // background-color: purple;
    position: fixed;
    z-index: 10000;
  }

  .boundary-line-left,
  .boundary-line-right {
    // background-color: purple;
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
