<template>
  <div id="tagTemplate">
    <div @mousedown="moveTemplate" class="template-text-box">
      <span class="template-text">Tag Templates</span>
      <img
      @mousedown.stop
        @click="closeTemplate"
        class="close-btn"
        src="../assets/images/close.svg"
      />
    </div>
    <div class="template-box"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      xInter: null,
      yInter: null,
      studioMove: false,
      moveTarget: null,
      isStickStudio: false
    }
  },
  mounted(){
    document.addEventListener("mousemove", e => {
      if (this.studioMove) {
        this.moveTarget.style.left = e.clientX - this.xInter + "px";
        this.moveTarget.style.top = e.clientY - this.yInter + "px";
        let leftPanel = document.querySelector('.left-panel')
        if (parseInt(getComputedStyle(this.moveTarget).left) < 25) {
          leftPanel.style.backgroundColor = "#3a3a50"
          this.isStickStudio = true;
        } else {
          leftPanel.style.backgroundColor = "#292931";
          this.isStickStudio = false;
        }
      }
    });
    document.addEventListener("mouseup", () => {
      if (this.studioMove) {
        let leftPanel = document.querySelector('.left-panel')
        leftPanel.style.backgroundColor = "#292931";
        if (this.isStickStudio) {
          this.moveTarget.style.left = "3.5%";
          this.moveTarget.style.top = "6%";
        }
        this.studioMove = false;
      }
    });
  },
  methods:{
    moveTemplate(e) {
      // console.log(e.target.parentElement.parentElement)
      e.target.parentElement.parentElement.style.position = "fixed";
      let initX = e.clientX;
      let initY = e.clientY;
      let initLeft = parseInt(getComputedStyle(e.target.parentElement.parentElement).left);
      let initTop = parseInt(getComputedStyle(e.target.parentElement.parentElement).top);
      this.xInter = initX - initLeft;
      this.yInter = initY - initTop;
      this.studioMove = true;
      this.moveTarget = e.target.parentElement.parentElement;
    },
    closeTemplate() {
      this.$emit("close-template");
    },
  }
}
</script>

<style lang="scss">
#tagTemplate{
  color: #fff;
  background-color: #292931;
  .template-text-box {
    background-color: #34343d;
    height: 7%;
    justify-content: center;
    cursor: move;
    position: relative;
    .template-text {
      padding: 0.2rem;
      color: #ffffff;
      font-size: 1.3rem;
      width: 89%;
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
  .template-box {
    height: 93%;
    padding: 0.4rem;
    overflow: auto;
  }
}
</style>
