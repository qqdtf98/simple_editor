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
export default {
  data() {
    return {
      clickedElem: null,
      mouseElemStyle: null,
      mouseElemValue: null,
      state: false,
      multiSelectedElement: null,
      multiWidth: [],
      totalWidth: 0,
      multiHeight: [],
      totalHeight: 0,
      multiElementParent: [],
      multiElementCurrentParent: [],
      notDeletedParent: [],
      notDeletedCurrentParent: [],
      notDeletedElem: [],
      notDeletedNth: []
    }
  },
  mounted() {
    this.multiSelectedElement = new Set()
  },
  methods: {
    uploadImage() {
      this.$emit('upload-image')
    },
    multiState(state, elem, parent) {
      this.state = state
      this.multiSelectedElement = elem
      this.multiElementParent = parent
    },
    calcAverageWidth() {
      if (this.state) {
        let i
        let entries = this.multiSelectedElement.entries()
        let setIter = this.multiSelectedElement[Symbol.iterator]()
        for (i = 0; i < this.multiSelectedElement.size; i++) {
          let item = setIter.next().value
          this.multiWidth[i] = item.getBoundingClientRect().width
          this.totalWidth += item.getBoundingClientRect().width
        }
        let avgWidth = this.totalWidth / this.multiSelectedElement.size
        setIter = this.multiSelectedElement[Symbol.iterator]()
        for (i = 0; i < this.multiSelectedElement.size; i++) {
          let item = setIter.next().value
          item.style.width = avgWidth + 'px'
        }
        var widthChange = {
          work: 'widthChange',
          beforeWidth: this.multiWidth,
          elems: this.multiSelectedElement,
          afterWidth: avgWidth
        }
        this.$emit('close', widthChange)
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
        let i
        let entries = this.multiSelectedElement.entries()
        let setIter = this.multiSelectedElement[Symbol.iterator]()
        for (i = 0; i < this.multiSelectedElement.size; i++) {
          let item = setIter.next().value
          this.multiElementCurrentParent.push(item.parentElement)
          if (!this.multiSelectedElement.has(item.parentElement)) {
            this.notDeletedElem.push(item)
            this.notDeletedCurrentParent.push(item.parentElement)
            this.notDeletedParent.push(this.multiElementParent[i])
            let j
            for (j = 0; j < item.parentElement.children.length; j++) {
              if (item.parentElement.children[j] === item) {
                break
              }
            }
            this.notDeletedNth.push(j)
            item.parentElement.removeChild(item)
          } else {
            console.log('has')
          }
        }
        var multiDelete = {
          work: 'multiDelete',
          beforeParent: this.notDeletedParent,
          afterParent: this.notDeletedCurrentParent,
          elem: this.notDeletedElem,
          nth: this.notDeletedNth
        }
        this.$emit('close', multiDelete)
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
