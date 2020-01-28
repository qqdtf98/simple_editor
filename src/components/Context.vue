<template>
  <div id="context">
    <ol>
        <li @click="addMouseEvent" >마우스 이벤트</li>
        <li @click="comment">comment</li>
        <li>ㅇㅇㅇ</li>
    </ol>
  </div>
</template>

<script>
export default {
  data () {
    return {
      clickedElem: null,
      mouseElemStyle: null,
      mouseElemValue: null
    }
  },
  methods: {
    comment(){
      this.$emit('comment')
    },
    addMouseEvent (event) {
    // event 선택
      let mo = 'mousemove'
      //   let home = document.querySelector(')
      // style 속성 선택
      let co = 'backgroundColor'
      // style value 선택
      let val = 'rgb(62, 140, 228)'
      this.clickedElem.addEventListener(`${mo}`, (e) => {
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
    clickedElement (target) {
      this.clickedElem = target
    }
  }
}
</script>

<style lang="scss">
#context{
    width: 10rem;
    ol{
        width: 100%;
        height: 9rem;
        background-color:#363636f3;
        border-radius: 0.84rem;
        z-index: 99999;
        padding: 0;
        list-style: none;
        li{
            height:3rem;
            padding:auto;
            border-bottom: 1px solid black;
            width: 100%;
            text-align: center;
            color: #dadada;
            cursor: pointer;
            &:hover{
                background-color:#5e5e5ef3;
                 border-radius: 0.84rem;
            }
        }
    }
}

</style>
