<template>
  <div id="layout">
    <div @mousedown="movelayout" class="layout-text-box">
      <div @mousedown.stop class="layout-text">Layout</div>
      <!-- <img
      @mousedown.stop
        @click="closelayout"
        class="close-btn"
        src="../assets/clTose.svg"
      /> -->
    </div>
    <div class="layout-box"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xInter: null,
      yInter: null,
      layoutMove: false,
      moveTarget: null,
      isSticky: false,
      treeSticky: true
    }
  },
  mounted() {
    document.addEventListener('mousemove', e => {
      if (this.layoutMove) {
        this.moveTarget.style.width = '-webkit-calc(100% - 83.5%)'
        this.moveTarget.style.height = '30rem'
        // this.moveTarget.style.right= e.clientX - this.xInter + "px";
        this.moveTarget.style.right =
          window.innerWidth -
          e.clientX -
          (parseInt(getComputedStyle(this.moveTarget).width) - this.xInter) +
          'px'
        this.moveTarget.style.top = e.clientY - this.yInter + 'px'
        let rightBorder = document.querySelector('.right-panel-border')
        // console.log(parseInt(getComputedStyle(this.moveTarget).right))
        if (parseInt(getComputedStyle(this.moveTarget).right) < 30) {
          // console.log('1')
          rightBorder.style.opacity = '1'
          rightBorder.style.backgroundImage =
            'linear-gradient(to right, #00000000, #68869250)'
          // rightBorder.style.backgroundColor = "#3a3a50"

          this.isSticky = true
        } else {
          // console.log('0')
          rightBorder.style.opacity = '0'
          // rightBorder.style.backgroundColor = "#292931";
          this.isSticky = false
        }
      }
    })
    document.addEventListener('mouseup', () => {
      if (this.layoutMove) {
        let rightBorder = document.querySelector('.right-panel-border')
        let rightTopPanel = document.querySelector('.right-top-panel')
        let rightBottomPanel = document.querySelector('.right-bottom-panel')
        // rightBorder.style.backgroundColor = "#292931";
        if (this.isSticky) {
          console.log('0')
          rightBorder.style.opacity = '0'
          this.moveTarget.style.width = '-webkit-calc(100% - 83.5%)'
          this.moveTarget.style.right = '0'
          this.moveTarget.style.top = '3.5%'
          this.moveTarget.style.height = '30rem'
          rightTopPanel.style.height = '30rem'
          rightBottomPanel.style.height = '25rem'
          let rightPanel = document.querySelector('.right-panel')
          let centerPanel = document.querySelector('.center-panel')
          rightPanel.style.width = '16.5%'
          centerPanel.style.width = '80%'
          this.$emit('stick', 0)
        } else {
          if (this.treeSticky === false) {
            console.log('2')
            let rightPanel = document.querySelector('.right-panel')
            let centerPanel = document.querySelector('.center-panel')
            rightPanel.style.width = '0'
            centerPanel.style.width = '96.5%'
          } else {
            console.log('3')
            let rightPanel = document.querySelector('.right-panel')
            let centerPanel = document.querySelector('.center-panel')
            rightPanel.style.width = '16.5%'
            centerPanel.style.width = '80%'
          }
          this.$emit('stick', 1)
        }
        this.layoutMove = false
      }
    })
  },
  methods: {
    treeStick(payload) {
      // console.log(payload + 'aaa')
      if (payload === 0) {
        this.treeSticky = true
      } else if (payload === 1) {
        this.treeSticky = false
      }
    },
    movelayout(e) {
      // console.log(e.target.parentElement.parentElement)
      console.log(e.target.parentElement)
      e.target.parentElement.style.position = 'fixed'
      let initX = e.clientX
      let initY = e.clientY
      let initLeft = parseInt(getComputedStyle(e.target.parentElement).left)
      let initTop = parseInt(getComputedStyle(e.target.parentElement).top)
      this.xInter = initX - initLeft
      this.yInter = initY - initTop
      this.layoutMove = true
      this.moveTarget = e.target.parentElement
      this.moveTarget.style.height = '30rem'
    },
    closelayout() {
      this.$emit('close-layout')
    }
  }
}
</script>

<style lang="scss">
#layout {
  color: #fff;
  background-color: #292931;
  .layout-text-box {
    // background-color: #2c?2c46;
    height: 7%;
    justify-content: center;
    cursor: move;
    position: relative;
    .layout-text {
      padding: 0.2rem;
      color: #dfdfdf;
      font-size: 1.3rem;
      cursor: default;
      position: absolute;
      left: 0.4rem;
    }
    .close-btn {
      width: 1.1rem;
      right: 0.4rem;
      top: 0.4rem;
      cursor: pointer;
      position: absolute;
    }
  }
  .layout-box {
    height: 93%;
    // display: flex;
    // flex-direction: column;
    padding: 0.4rem;
    overflow: auto;
  }
}
</style>
