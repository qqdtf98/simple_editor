<template>
  <div id="context">
    <ol>
      <li @click="calcAverageWidth">너비 평균 크기로 맞춤</li>
      <li @click="calcAverageHeight">높이 평균 크기로 맞춤</li>
      <li @click="multiDelete">다중 삭제</li>
      <li @click="uploadImage">이미지 업로드</li>
      <li @click="addMouseEvent">마우스 이벤트</li>
      <li @click="comment">comment</li>
    </ol>
  </div>
</template>

<script>
import ClickIndicator from '../modules/click-indicator'
import { Work } from '../modules/undoredo'
import HandleMultiFunc from '../modules/handle-multi-func'

export default {
  data() {
    return {
      clickedElem: null,
      mouseElemStyle: null,
      mouseElemValue: null,
      state: false,
      multiWidth: [],
      totalWidth: 0,
      multiHeight: [],
      totalHeight: 0
    }
  },
  mounted() {},
  methods: {
    uploadImage() {
      this.$emit('upload-image')
    },
    multiState(state) {
      this.state = state
    },
    calcAverageWidth() {
      if (this.state) {
        HandleMultiFunc.calcAverageWidth()
        this.$nextTick(() => {
          this.$emit('close')
          this.$emit(
            'iframe-changed',
            $('iframe')
              .get(0)
              .contentWindow.document.documentElement.innerHTML.split(
                '<style>'
              )[0] + '</body>'
          )
        })
      }
    },
    calcAverageHeight() {
      if (this.state) {
        let i
        let entries = this.multiSelectedElement.entries()
        let setIter = this.multiSelectedElement[Symbol.iterator]()
        for (i = 0; i < this.multiSelectedElement.size; i++) {
          let item = setIter.next().value
          this.multiHeight[i] = item.getBoundingClientRect().height
          this.totalHeight += item.getBoundingClientRect().height
        }
        let avgHeight = this.totalHeight / this.multiSelectedElement.size
        setIter = this.multiSelectedElement[Symbol.iterator]()
        for (i = 0; i < this.multiSelectedElement.size; i++) {
          let item = setIter.next().value
          item.style.height = avgHeight + 'px'
        }
        var heightChange = {
          work: 'heightChange',
          beforeHeight: this.multiHeight,
          elems: this.multiSelectedElement,
          afterHeight: avgHeight
        }
        this.$emit('close', heightChange)
      }
    },
    multiDelete() {
      if (this.state) {
        HandleMultiFunc.multiDelete()
        this.$nextTick(() => {
          this.$emit('close')
          this.$emit(
            'iframe-changed',
            $('iframe')
              .get(0)
              .contentWindow.document.documentElement.innerHTML.split(
                '<style>'
              )[0] + '</body>'
          )
        })
      } else {
        console.log('다중선택아님')
        this.$emit('close', null)
      }
    },
    comment() {
      this.$emit('close')
    },
    addMouseEvent(event) {
      // event 선택
      let mo = 'mousemove'
      //   let home = document.querySelector(')
      // style 속성 선택
      let co = 'backgroundColor'
      // style value 선택
      let val = 'rgb(62, 140, 228)'
      this.clickedElem.addEventListener(`${mo}`, e => {
        if (e.target === this.clickedElem) {
          this.mouseElemStyle = co
          if (getComputedStyle(e.target)[`${co}`] !== val) {
            this.mouseElemValue = getComputedStyle(e.target)[`${co}`]
          }
          //   this.mouseElemValue = '#f75c51'
          //   console.log(this.mouseElemValue)
          //   console.log(this.mouseElemStyle)
          e.target.style[`${co}`] = val
        }
      })
      this.clickedElem.addEventListener('mouseleave', () => {
        // console.log('aaaaasdfs')
        // console.log(this.mouseElemStyle)
        // console.log(this.mouseElemValue)
        this.clickedElem.style[`${this.mouseElemStyle}`] = this.mouseElemValue
      })
    },
    clickedElement(target) {
      this.clickedElem = target
    }
  }
}
</script>

<style lang="scss">
#context {
  width: 10rem;
  ol {
    width: 100%;
    background-color: #34343c;
    z-index: 99999;
    padding: 0;
    box-shadow: 5px 3px 8px 1px #000000;
    list-style: none;
    li {
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
      font-size: 0.9rem;
      border-bottom: 1px solid #5e5e5ef3;
      width: 100%;
      text-align: center;
      color: #dadada;
      cursor: pointer;
      &:hover {
        background-color: #5e5e5ef3;
      }
    }
  }
}
</style>
