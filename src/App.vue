<template>
  <div id="app">
    <div class="top-panel"></div>
    <div class="main-panel">
      <div class="left-panel">
        <img
          @click="tagTemplateState"
          class="tagTemplate-btn"
          src="./assets/tagTemplate.svg"
          title="tagTemplate"
        />
        <img
          class="overview-btn"
          src="./assets/overview.svg"
          title="overview"
        />
        <img class="sitemap-btn" src="./assets/sitemap.svg" title="sitemap" />
      </div>
      <div class="center-panel">
        <div class="main-top-panel"></div>
        <div class="main-center-panel">
          <div class="main-menu">
            
            <ho class="main-board"></ho>
        </div>
        </div>
        <div class="bottom-panel"></div>
      </div>
      <div class="right-panel">
        <div class="right-top-panel">
          <lay ref="lay" @stick="layStick" class="lay" />
        </div>
        <div class="right-bottom-panel">
          <div class="file-name-wrapper">
            <div @mousedown="moveTree" class="file-name-box">
              <div
                @mousedown.stop
                @click="changeTab"
                class="file-name"
                :key="title.index"
                v-for="title in titles"
              >
                <div @mousedown.stop @click="changePage" class="title">
                  {{ title.text }}
                </div>
              </div>
            </div>
            <div v-if="showhtml" class="htmlcontent" />
            <div v-if="!showhtml" class="filecontent" />
          </div>
        </div>
      </div>
    </div>
    <tagTemplate
      @close-template="tagTemplateState"
      class="tagTemplate"
      v-show="tagTemplateOn"
    ></tagTemplate>
    <div class="right-panel-border"></div>
  </div>
</template>

<script>
import tagTemplate from "./components/tagTemplate";
import lay from "./components/lay";
import ho from './components/ho'

export default {
  components: { tagTemplate, lay,ho },
  data() {
    return {
      tagTemplateOn: false,
      titles: [
        {
          text: "HTML"
        },
        {
          text: "Files"
        }
      ],
      showhtml: true,
      laySticky: true
    };
  },
  mounted() {
    let htmltree = document.querySelector(".file-name");
    htmltree.style.backgroundColor = "#4e4e5c";
    document.addEventListener("mousemove", e => {
      if (this.treeMove) {
        this.moveTarget.style.width = "-webkit-calc(100% - 83.5%)";
        this.moveTarget.style.height = "25rem";
        // this.moveTarget.style.right= e.clientX - this.xInter + "px";
        this.moveTarget.style.right =
          window.innerWidth -
          e.clientX -
          (parseInt(getComputedStyle(this.moveTarget).width) - this.xInter) +
          "px";
        this.moveTarget.style.top = e.clientY - this.yInter + "px";
        let rightBorder = document.querySelector(".right-panel-border");
        if (parseInt(getComputedStyle(this.moveTarget).right) < 30) {
          rightBorder.style.opacity = "1";
          rightBorder.style.backgroundImage =
            "linear-gradient(to right, #00000000, #68869250)";
          // rightBorder.style.backgroundColor = "#3a3a50"

          this.isSticklay = true;
        } else {
          rightBorder.style.opacity = "0";
          // rightBorder.style.backgroundColor = "#292931";
          this.isSticklay = false;
        }
      }
    });
    document.addEventListener("mouseup", () => {
      if (this.treeMove) {
        let rightBorder = document.querySelector(".right-panel-border");
        let rightTopPanel = document.querySelector(".right-top-panel");
        let rightBottomPanel = document.querySelector(".right-bottom-panel");
        // rightBorder.style.backgroundColor = "#292931";
        if (this.isSticklay) {
          rightBorder.style.opacity = "0";
          this.moveTarget.style.width = "-webkit-calc(100% - 83.5%)";
          this.moveTarget.style.right = "0";
          this.moveTarget.style.top = "34rem";
          this.moveTarget.style.height = "25rem";
          rightTopPanel.style.height = "30rem";
          rightBottomPanel.style.height = "25rem";
          let rightPanel = document.querySelector(".right-panel");
          let centerPanel = document.querySelector(".center-panel");
          rightPanel.style.width = "16.5%";
          centerPanel.style.width = "80%";
          this.$refs.lay.treeStick(0);
        } else {
          if (this.laySticky === false) {
            let rightPanel = document.querySelector(".right-panel");
            let centerPanel = document.querySelector(".center-panel");
            rightPanel.style.width = "0";
            centerPanel.style.width = "96.5%";
          } else {
            let rightPanel = document.querySelector(".right-panel");
            let centerPanel = document.querySelector(".center-panel");
            rightPanel.style.width = "16.5%";
            centerPanel.style.width = "80%";
          }
          this.$refs.lay.treeStick(1);
        }
        this.treeMove = false;
      }
    });
  },
  methods: {
    layStick(payload) {
      console.log(payload);
      if (payload === 0) {
        this.laySticky = true;
      } else if (payload === 1) {
        this.laySticky = false;
      }
    },
    moveTree(e) {
      e.target.parentElement.style.position = "fixed";
      let initX = e.clientX;
      let initY = e.clientY;
      let initLeft = parseInt(getComputedStyle(e.target.parentElement).left);
      let initTop = parseInt(getComputedStyle(e.target.parentElement).top);
      this.xInter = initX - initLeft;
      this.yInter = initY - initTop;
      this.treeMove = true;
      this.moveTarget = e.target.parentElement;
      this.moveTarget.style.height = "25rem";
    },
    tagTemplateState() {
      if (this.tagTemplateOn === true) {
        this.tagTemplateOn = false;
      } else {
        this.overviewOn = false;
        this.tagTemplateOn = true;
      }
      // if (this.codeOn === true) {
      //   this.codeOn = false;
      // }
    },
    changeTab(e) {
      let files = document.querySelectorAll(".file-name");
      //  e.target.parentElement.style.backgroundColor = '#4e4e5c'
      if (e.target.textContent.trim() === "HTML") {
        files[1].style.backgroundColor = "#292931";
        files[0].style.backgroundColor = "#4e4e5c";
        this.showhtml = true;
      } else if (e.target.textContent.trim() === "Files") {
        files[0].style.backgroundColor = "#292931";
        files[1].style.backgroundColor = "#4e4e5c";
        this.showhtml = false;
      }
    },
    changePage(e) {
      // let i;
      // let num;
      // for (
      //   i = 0;
      //   i < e.target.parentElement.parentElement.children.length - 3;
      //   i++
      // ) {
      //   if (
      //     e.target.parentElement.parentElement.children[i] ===
      //     e.target.parentElement
      //   ) {
      //     num = i;
      //     e.target.parentElement.style.backgroundColor = "#545e66";
      //   } else {
      //     e.target.parentElement.parentElement.children[
      //       i
      //     ].style.backgroundColor = "#2c3134";
      //   }
      // }
      // let j;
      // let editor = document.querySelectorAll(".board");
      // console.log(editor);
      // for (j = 0; j < editor.length; j++) {
      //   if (j === num) {
      //     editor[j].classList.remove("hidden");
      //     editor[j].classList.add("display");
      //   } else {
      //     editor[j].classList.remove("display");
      //     editor[j].classList.add("hidden");
      //   }
      // }
    }
  }
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  background-color: #34343d;
  .top-panel {
    border: 1px solid black;
    height: 6%;
    width: 100%;
    background-color: #292931;
  }
  .main-panel {
    border: 1px solid black;
    height: 94%;
    width: 100%;
    display: flex;
    flex-direction: row;
    .left-panel {
      width: 3.5%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #292931;
      .tagTemplate-btn {
        width: 1.4rem;
        margin-top: 1rem;
        cursor: pointer;
      }
      .overview-btn {
        width: 1.1rem;
        margin-top: 1.5rem;
        cursor: pointer;
      }
      .sitemap-btn {
        width: 1.1rem;
        margin-top: 1.5rem;
        cursor: pointer;
      }
    }
    .center-panel {
      width: 80%;
      height: 100%;
      border: 1px solid red;
      .main-top-panel {
        height: 6.5%;
        width: 100%;
        border: 1px solid blue;
      }
      .main-center-panel {
        height: 90.5%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        border: 1px solid blue;
        overflow: auto;
        .main-menu {
          width: 1200px;
          bottom: 0;
          height: 781px;
          display: flex;
          flex-direction: row;

          .main-board {
            width: 100%;
            height: 100%;
            border: 3px solid #545e66;
            display: flex;
            align-items: center;
            overflow: auto;
            justify-content: center;
          }
          .hidden {
            display: none;
          }
          .display {
            display: block;
          }
        }
      }
      .bottom-panel {
        height: 3%;

        border: 1px solid blue;
      }
    }
    .right-panel {
      width: 16.5%;
      height: 100%;
      .right-top-panel {
        background-color: #292931;
        width: 100%;
        height: 30rem;
        .lay {
          border: 1px solid black;
          width: 100%;
          height: 100%;
          background-color: #292931;
          z-index: 33;
        }
      }
      .right-bottom-panel {
        background-color: #292931;
        width: 100%;
        height: 25rem;
        display: flex;
        flex-direction: column;
        .file-name-wrapper{
          width: 100%;
          height: 24.8rem;
          border: 1px solid black;
          .file-name-box {
          display: flex;
          //  border: 1px solid black;
          cursor: move;
          flex-direction: row;
          .file-name {
            left: 0;
            height: 2rem;
            cursor: pointer;
            // background-color: #545e66;
            top: 0;
            width: 3.5rem;

            display: flex;
            // background-color: #4e4e5c;
            // border: 1px solid black;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            border-top-left-radius: 0.3rem;
            border-top-right-radius: 0.3rem;
            padding-left: 0.15rem;
            padding-right: 0.15rem;

            .title {
              text-align: center;
              padding: 0.1rem;
              padding-left: 0.4rem;
              padding-right: 0.3rem;
              color: #fff;
              width: 3.5rem;
              height: auto;
            }
          }
        }
        .htmlcontent {
          overflow: auto;
          background-color: red;
          width: 100%;
          height: 22.8rem
        }
        .filecontent {
          overflow: auto;
          width: 100%;
          height: 22.8rem;
          background-color: yellow;
        }
      }
        }
        
    }
  }
  .tagTemplate {
    width: 20rem;
    height: 30rem;
    border: 1px solid yellow;
    position: fixed;
    left: 3.5%;
    top: 6%;
    z-index: 33;
  }
  .right-panel-border {
    position: fixed;
    width: 56px;
    height: 94%;
    right: 0;
    bottom: 0;
    opacity: 0;
    // background-image: linear-gradient(to right, #00000000, #68869250);
    // background-color: red;
  }
}
</style>
