<template>
  <div id="screen">
    <div class="editor-box">
      <div @mousemove="onmouseMove" class="editor-component">
        <div class="board">
          <Dashboard /> -->
          <!-- <ss /> -->

          <spliter />
          <HtmlLoader class="navi" />
          <Navi class="navi" />
        </div>
      </div>
    </div>
    <div class="selector-box">
      <div v-show="onelementSelected" class="tagname"></div>
      <div v-show="onelementSelected" class="right-border"></div>
      <div v-show="onelementSelected" class="bottom-border"></div>
      <div v-show="onelementSelected" class="top-border"></div>
      <div v-show="onelementSelected" class="left-border"></div>
    </div>
  </div>
</template>

<script>
import Dashboard from "./dashboard.vue";
import Navi from "./navi.vue";
import HtmlLoader from "./htmlLoader.vue";
import spliter from "./spliter.vue";
import Context from "./Context";
import ss from "./ss";
export default {
  components: { Dashboard, Navi, HtmlLoader, spliter, Context, ss },
  methods: {
    onmouseMove(e) {
      if (this.selected.element === null) {
        if (
          e.target.className !== "tagname" &&
          e.target.className !== "home" &&
          e.target.className !== "editor-component"
        ) {
          this.onelementSelected = true;
          this.selectedElement = e.target.getBoundingClientRect();
          this.movePosition = e;
          let bottomBord = document.querySelector(".bottom-border");
            let topBord = document.querySelector(".top-border");
            let rightBord = document.querySelector(".right-border");
            let leftBord = document.querySelector(".left-border");
            // let dashWrapper = document.querySelector('.navi')
            // let scrollBottomHeight =
            //   dashboardElem.getBoundingClientRect().height -
            //   dashWrapper.getBoundingClientRect().height
            topBord.style.left = this.selectedElement.left + "px";
            topBord.style.top = this.selectedElement.top + "px";
            topBord.style.width = this.selectedElement.width + "px";
            // bottomBord.style.display = 'none'?
            leftBord.style.left = this.selectedElement.left + "px";
            leftBord.style.top = this.selectedElement.top + "px";
            leftBord.style.height = this.selectedElement.height + "px";
            rightBord.style.left =
              this.selectedElement.left + this.selectedElement.width - 2 + "px";
            rightBord.style.top = this.selectedElement.top + "px";
            rightBord.style.height = this.selectedElement.height + "px";
            bottomBord.style.left = this.selectedElement.left + "px";
            bottomBord.style.top =
              this.selectedElement.top + this.selectedElement.height - 2 + "px";
            bottomBord.style.width = this.selectedElement.width + "px";
        }
      } else {
      }
    }
  }
};
</script>

<style lang="scss">
#screen {
  display: inline-block;
  height: 100%;
  width: 100%;
  align-items: center;
  .editor-box {
    width: 100%;
    height: 100%;
    scroll-behavior: smooth;

    .editor-component {
      height: 100%;
      .board {
        overflow: auto;
        height: 100%;
        border: 1px solid #000000;
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
}
</style>
