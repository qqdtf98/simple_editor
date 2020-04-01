<template>
  <div id="layout">
    <div @mousedown="movelayout" class="layout-text-box">
      <div @mousedown.stop class="layout-text">
        Layout
      </div>
    </div>
    <div class="layout-tab-box">
      <div @click="changeTab" class="layout-tab">Options</div>
      <div @click="changeTab" class="layout-tab">Animation</div>
    </div>
    <vue-custom-scrollbar class="layout-scroll-area">
      <LayoutAnimation v-if="!showOptions" />
      <LayoutOptions class="layout-options" v-if="showOptions" />
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import LayoutAnimation from './LayoutCompo/LayoutAnimation'
import LayoutOptions from './LayoutCompo/LayoutOptions'
import vueCustomScrollbar from 'vue-custom-scrollbar'

export default {
  components: { LayoutAnimation, LayoutOptions, vueCustomScrollbar },
  data() {
    return {
      showOptions: true
    }
  },
  mounted() {
    let tab = document.querySelector('.layout-tab')
    tab.style.backgroundColor = '#4e4e5c'
  },
  methods: {
    changeTab(e) {
      let tabs = document.querySelectorAll('.layout-tab')
      if (e.target.textContent.trim() === 'Options') {
        console.log('11111')
        tabs[0].style.backgroundColor = '#4e4e5c'
        tabs[1].style.backgroundColor = '#292931'
        this.showOptions = true
      } else if (e.target.textContent.trim() === 'Animation') {
        console.log('2222222')
        tabs[1].style.backgroundColor = '#4e4e5c'
        tabs[0].style.backgroundColor = '#292931'
        this.showOptions = false
      }
    },
    movelayout(e) {
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
    justify-content: center;
    display: flex;
    align-items: center;
    vertical-align: middle;
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
  }
  .layout-tab-box {
    width: 100%;
    height: 8%;
    margin-top: 0.2rem;
    display: flex;
    flex-direction: row;
    .layout-tab {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      width: 5.5rem;
      padding-top: 0.4rem;
      height: 100%;
      &:hover {
        color: #d3d3d3;
        cursor: pointer;
      }
    }
  }
  .layout-scroll-area {
    height: calc(85% - 0.6rem);
    .layout-options {
      height: 100%;
    }
  }
}
</style>
