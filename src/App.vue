<template>
  <div id="app">
    <!-- <spliter class="spliter"/> -->
    <div class="top-panel">
      <!-- <img class="scale" src="./assets/scale.svg" />
      <img class="width" src="./assets/width.svg" /> -->
      <div class="new-box">
        <img class="new" src="./assets/new.svg" />
        <div class="new-text">New</div>
      </div>
      <div class="open-box">
        <img class="open" src="./assets/open.svg" />
        <div class="open-text">Open</div>
      </div>
      <div class="save-box">
        <img class="save" src="./assets/save.svg" />
        <div class="save-text">Save</div>
      </div>
      <div class="export-box">
        <img class="export" src="./assets/export.svg" />
        <div class="export-text">Export</div>
      </div>
      <div class="setting-box">
        <img class="setting" src="./assets/settings.svg" />
        <div class="setting-text">Setting</div>
      </div>
      <div class="switch-box">
        <switches
          @click="toggleClicked"
          class="swtich"
          theme="bootstrap"
          color="info"
          v-model="enabled"
        />
        <div class="switch-text">Switch</div>
      </div>
      <div class="undo-box">
        <img @click="undoWork" class="undo" src="./assets/undo.svg" />
        <div @click="undoWork" class="undo-text">Undo</div>
      </div>
      <div class="redo-box">
        <img @click="redoWork" class="redo" src="./assets/undo.svg" />
        <div @click="redoWork" class="redo-text">Redo</div>
      </div>
    </div>
    <div class="main-panel">
      <div class="left-panel">
        <img @click="studioBtn" class="studio-btn" src="./assets/studio.svg" />
        <img
          @click="overviewBtn"
          class="overview-btn"
          src="./assets/overview.svg"
        />
      </div>
      <div class="editor-panel">
        <div class="center-panel">
          <div class="title">Editor</div>

          <div class="editor">
            <home
              ref="home"
              @componentSelected="componentSelected"
              @stack-push="stackPush"
              class="home"
            ></home>
          </div>
        </div>
        <div class="bottom-panel"></div>
      </div>
      <div class="right-panel">
        <img @click="layoutBtn" class="layout-btn" src="./assets/layout.svg" />
        <img @click="codeBtn" class="code-btn" src="./assets/code.svg" />
      </div>
    </div>
    <!--
    <div class="row bottom-panel">
          <span class="fileTitle">HTML</span>
          <span class="fileTitle">CSS</span>
          <span class="fileTitle">JavaScript</span>
    </div>
    <CodeLoader v-if="codeOn" class="code-loader"></CodeLoader>-->

    <CodeLoader v-if="codeOn" class="code-loader">
      
      assssssssssssssssssssssss<br>ffffffffffffffffffffffffffffffffffff<br>sddddddddddddddddddddddddddddddd<br>ddd</CodeLoader>
    <div @mousedown="loaderResize" v-if="codeOn" class="loader-bord"></div>
    <layout
      v-show="layoutOn"
      ref="layouts"
      :payload="payload"
      @userSelected="userSelectedWidth"
      @userSelectBorder="userSelectBorder"
      @selectDomElemented="selectDomElemented"
      class="layout"
    ></layout>
    <studio
      v-if="studioOn"
      @desc-close="tagNotSelected"
      @ui-select="uiSelected"
      @tag-select="tagSelected"
      @userSelectedTagComponent="userSelectedTagComponent"
      @close-studio="studioBtn"
      class="studio"
    ></studio>
    <overview
      v-if="overviewOn"
      ref="overview"
      @selectDomElement="selectDomElemented"
      @inParentTreeOption="inParentTreeOption"
      @domWithTree="domPushWithTree"
      @close-overview="overviewBtn"
      :getDocument="homeDocument"
      class="overview"
    ></overview>

    <span v-if="tagDescription" class="description-tag">
      <span class="desc-tag-text">tag</span>
    </span>
    <div v-if="uiDescription" class="description-ui">
      <img />
      <div class="image-name">name</div>
      <div class="desc-ui-text">text</div>
    </div>
    <div v-if="viewTemplate" class="description-img">
      <img />
    </div>
    <!-- <UndoRedo ref="undoredo" v-show="false"></UndoRedo> -->
  </div>
</template>

<script>
import htmlLoader from "./components/htmlLoader";
import home from "./components/home";
import layout from "./components/layout";
import studio from "./components/studio";
import overview from "./components/overview";
import spliter from "./components/spliter";
import Switches from "vue-switches";
import CodeLoader from "./components/CodeLoader";
// import UndoRedo from './components/UndoRedo'

export default {
  components: {
    htmlLoader,
    home,
    layout,
    studio,
    overview,
    spliter,
    Switches,
    CodeLoader
  },
  props: ["selectDomElement"],
  name: "App",
  data() {
    return {
      payload: "",
      data: "",
      homeLayoutLocation: "",
      tagDescription: false,
      childOFchil: [],
      enabled: false,
      homeDocument: "",
      uiDescription: false,
      dom: "",
      addTag: false,
      hasht: null,
      isPustHtml: true,
      mouseOverTarget: null,
      viewTemplate: false,
      isCtrl: false,
      i: 0,
      workStack: [],
      reworkStack: [],
      studioOn: false,
      overviewOn: false,
      layoutOn: false,
      codeOn: false,
      resizeLoader: false,
      initialTop: null,
      initialY: null,
      initialHeight: null,
      isShift : false
    };
  },
  watch: {
    enabled: function() {
      this.$refs.home.modeSelect(this.enabled);
    }
  },
  mounted() {
    $(window).resize(() => {
      this.$refs.home.windowResized();
    });
    document.addEventListener("keydown", e => {
      if (e.which === 17) {
        this.isCtrl = true;
      }
      if(e.which === 16){
        this.isShift = true
      }
      if (e.which === 90 && this.isCtrl &&!this.isShift) {
        this.undoWork();
      }
      if(e.which === 90 && this.isCtrl && this.isShift){
        this.redoWork()
      }
      if(e.which === 67 && this.isCtrl){
        //복사
      }
    });
    document.addEventListener('keyup', e => {
      if(e.which === 16){
        this.isShift = false
      }
    })
    document.addEventListener("mousemove", e => {
      if (this.viewTemplate) {
        this.$nextTick(() => {
          let img = document.querySelector(".description-img");
          let stu = document.querySelector(".studio");

          let name = this.selectedTemplate.target.innerHTML.replace(/ /gi, "");
          // ui 말고 나머지 템플릿의 사진을 추가하거나 예외처리해줘야함.
          // name은 ui와 tag구분없이 들어온다.
          img.children[0].src = "./static/studioImage/" + name + ".png";
          img.style.left = e.clientX + 10 + "px";
          img.style.top = e.clientY + 10 + "px";
          // ui.innerHTML = this.hasht[innerText]
        });
      }
      if(this.resizeLoader){
        let loader = document.querySelector(".code-loader");
        let bord = document.querySelector('.loader-bord')
        loader.style.height = this.initialHeight - (e.clientY - this.initialY) + 'px'
        console.log(parseInt(getComputedStyle(loader).top))
        console.log(parseInt(getComputedStyle(bord).height))
        this.$nextTick(()=>{
          bord.style.top = parseInt(getComputedStyle(loader).top)  + 'px'
        })
        
      }
    });
    this.homeDocument = document.getElementById("dashboard");
    document.addEventListener("mouseup", e => {
      this.resizeLoader = false
      this.viewTemplate = false;
      let tar = e.target;
      if (this.addTag) {
        // console.log(e.taret)
        // console.log(tar.parentElement.id)
        // console.log(tar.parentElement)
        // let i
        while (1) {
          if (tar.id === "dashboard") {
            // console.log(tar.className)
            // console.log('find')
            this.addTag = false;
            this.$refs.home.addContent(this.selectedTag, e.target);
            break;
          } else if (tar.id === "app") {
            break;
          } else {
            // console.log(tar)
            tar = tar.parentElement;
          }
        }
      }
    });
    var h = {};
    h["articleclean"] = "An article layout with a simple and clean design.";
    h["articledualcolumn"] = "An article layout which consists of two columns.";
    h["articlelist"] = "A list of articles with thumbnails and descriptions.";
    h["featuresblue"] = "This is a feature grid with a beautiful blue design.";
    h["featuresboxed"] = "A feature grid with a subtle white on blue design.";
    h["featuresclean"] =
      "A feature grid with a clean design with lots of white space.";
    h["footerbasic"] = "This is a basic footer with links and social buttons.";
    h["footerclean"] =
      "A complete footer design with link categories, social icons and a copyright line.";
    h["footerdark"] =
      "A dark footer design with link categories, social icons and a copyright line.";
    h["heading"] =
      "This is the HTML heading component. You can choose which HTML tag is used - from &lth1&gt to &lth6&gt.";
    h["paragraph"] =
      "This is the standard &ltp&gt  HTML element. Use it for writing body text. It is enhanced by Bootstrap's rich styling classes, available in the Options panel.";
    h["alert"] =
      "Use this component to show a message to users of your web app. Usually it is displayed near the top of your page. It can have an optional dismiss button and you can choose one of several color themes.";
    h["image"] =
      "This is the &ltimage&gt  HTML element. You can control its size, source, style and responsiveness from the Options panel.";
    h["icon"] =
      "This is the Icon component. You can choose from a number of available icon fonts. You can modify the icon's size and color by changing its CSS font-size and color properties.";
    h["carousel"] =
      "This is Bootstrap's versatile Carousel component. It can display and animate text and photos. You have to enable the slides' captions in order to place non-image elements inside them.";
    h["button"] =
      "This is the multi-functional Bootstrap Button component. You have a choice of possible themes, button types and sizes. Search for the related Dropdown and Split Button components if you need your button to trigger dropdown menus.";
    h["splitbutton"] =
      "This is the Bootstrap Split Button component. It consists of two buttons, the second of which triggers a dropdown menu. Look for the Dropdown component if you need only a single button.";
    h["buttongroup"] =
      "A Button Group is a Bootstrap component for grouping together buttons. If you need more than one group, check out the Button Toolbar component.";
    h["row"] =
      "This is the Bootstrap Row component. This is a fundamental building block of the responsive grid. Place Rows inside Containers, and drop Columns inside them to build a responsive page.";
    h["column"] =
      "This is the Bootstrap Column component. This is the fundamental building block of the responsive grid. Place columns inside Rows and control their width with the col-* responsive classes. There are lots of responsive options available in the Column's Option panel.";
    h["columnhelper"] =
      "This is the Bootstrap Column component. This is the fundamental building block of the responsive grid. Place columns inside Rows and control their width with the col-* responsive classes. There are lots of responsive options available in the Column's Option panel.";
    h["container"] =
      "Containers are Bootstrap components which limit the width of the page. Usually you would place a single Container as an element that wraps around all of your content. You can switch between fluid and fixed width containers from the Option panel.";
    h["tabs"] =
      "This is Bootstrap's Tabs component. Each tab has an associated Tab Pane which is displayed when the tab is active.";
    h["accordion"] =
      "This is a Bootstrap component for displaying content in vertical groups. Only one group is expanded at a time. This is a great way to organize FAQ pages and other layouts where vertical content is at a premium.";
    h["card"] =
      "Cards are flexible and extensible Bootstrap 4 containers. They can include headers, footers, a wide variety of content, contextual background colors, and powerful display options.";
    h["panel"] =
      "Panels are a variation of the Bootstrap 4 Card component. They can include headers, footers and multiple color styles.";
    h["thumbnail"] =
      "Thumbnails are a variation of the Bootstrap 4 Card component. They can include a header image, title, description and action buttons or links.";

    this.hasht = h;
  },
  methods: {
    loaderResize(event){
      let loader = document.querySelector(".code-loader");
      this.resizeLoader = true
      this.initialY = event.clientY
      this.initialHeight = parseInt(getComputedStyle(loader).height)
    },
    lo(to){
      let loader = document.querySelector('.code-loader')
      loader.style.top = to
    },
    codeBtn() {
      if (this.codeOn === true) {
        this.codeOn = false;
      } else {
        this.codeOn = true;
        this.$nextTick(() => {
          let loader = document.querySelector(".code-loader");
          let bord = document.querySelector('.loader-bord')
          bord.style.top = getComputedStyle(loader).top 
    this.initialTop = getComputedStyle(loader).top
        });
      }
    },
    layoutBtn() {
      if (this.layoutOn === true) {
        this.layoutOn = false;
      } else {
        this.layoutOn = true;
      }
    },
    studioBtn() {
      if (this.studioOn === true) {
        this.studioOn = false;
      } else {
        this.overviewOn = false;
        this.studioOn = true;
      }
    },
    overviewBtn() {
      if (this.overviewOn === true) {
        this.overviewOn = false;
      } else {
        this.studioOn = false;
        this.overviewOn = true;
      }
    },
    redoWork() {
      let i;
      console.log("redo");
      if (this.reworkStack.length !== 0) {
        for (i = 0; i < this.reworkStack.length; i++) {
          console.log(this.reworkStack[i]);
        }
        let rework = this.reworkStack.pop();
        let work = rework;
        if (rework.work === "style") {
          rework.elem.style[rework.style] = rework.afterValue;
        } else if (rework.work === "move") {
          rework.afterMovePosition.appendChild(rework.elem);
        } else if (rework.work === "remove") {
          let parent = rework.position;
          parent.removeChild(rework.elem);
        } else if (rework.work === "add") {
          rework.position.appendChild(rework.elem);
        } else if (rework.work === "copy") {
          $(rework.elem).after(rework.copyElem);
        } else if (rework.work === "width") {
          rework.elem.style.width = rework.afterSize;
        } else if (rework.work === "height") {
          rework.elem.style.height = rework.afterSize;
        } else if (rework.work === "edit") {
          rework.elem.textContent = rework.afterEdit;
        }
        this.stackPush(work);
      }
    },
    undoWork() {
      // console.log('aaa')
      let i;
      console.log("undo");
      if (this.workStack.length !== 0) {
        for (i = 0; i < this.workStack.length; i++) {
          console.log(this.workStack[i]);
        }
        let work = this.workStack.pop();
        let rework = work;
        this.reworkStack.push(rework);
        if (work.work === "style") {
          work.elem.style[work.style] = work.value;
        } else if (work.work === "remove") {
          let parent = work.position;
          $(work.elem).insertBefore(parent.children[work.nth]);
        } else if (work.work === "add") {
          let parent = work.position;
          parent.removeChild(work.elem);
        } else if (work.work === "copy") {
          work.position.removeChild(work.copyElem);
        } else if (work.work === "move") {
          work.afterMovePosition.removeChild(work.elem);
          work.position.appendChild(work.elem);
        } else if (work.work === "width") {
          console.log("aaa");
          work.elem.style.width = work.beforeSize;
        } else if (work.work === "height") {
          work.elem.style.height = work.beforeSize;
        } else if (work.work === "edit") {
          work.elem.textContent = work.beforeEdit;
        }
      }
    },
    stackPush(elem) {
      this.workStack.push(elem);
    },
    userSelectedTagComponent(e, tagComponent) {
      // this.$refs.home.addComponentTag = tagComponent
      this.addTag = true;
      this.viewTemplate = true;
      this.tagDescription = false;
      this.uiDescription = false;
      this.selectedTemplate = e;
      this.selectedTag = tagComponent;
      this.$nextTick(() => {
        let img = document.querySelector(".description-img");
        img.style.left = e.clientX + 10 + "px";
        img.style.top = e.clientY + 10 + "px";
      });
    },
    componentSelected(payload) {
      this.layoutOn=true
      // $('.layout-btn').trigger('click')
      // this.$refs.layouts.isData = true;
      this.payload = payload.target;
      // console.log(document.getElementsByClassName('dashboard')[0].getBoundingClientRect())
      // console.log(document.getElementById('dashboard'))
      this.homeLayoutLocation = document
        .getElementById("dashboard")
        .getBoundingClientRect();
      this.$refs.layouts.getData(payload, this.homeLayoutLocation);
      if (this.isPustHtml) {
        this.$refs.overview.printHomeDocument();
        this.isPustHtml = false;
      }
      this.$refs.overview.domSelection(payload.target);
      this.$refs.layouts.isData = true;
      this.$refs.layouts.makeTreeParent(this.payload);
    },
    userSelectedWidth(data) {
      console.log(data)
      this.data = data;
      this.$refs.home.styleChanged(this.data);
    },
    tagSelected(payload) {
      if (!this.viewTemplate) {
        this.tagDescription = true;
        this.uiDescription = false;
        this.$nextTick(() => {
          let text = document.querySelector(".description-tag");
          let stu = document.querySelector(".studio");
          let innerText = payload.target.innerHTML
            .toLowerCase()
            .replace(/ /gi, "");
          text.innerHTML = this.hasht[innerText];

          text.style.left = stu.getBoundingClientRect().right - 25 + "px";
          text.style.top =
            payload.target.getBoundingClientRect().top - 8 + "px";
        });
      }
    },
    tagNotSelected() {
      this.tagDescription = false;
      this.uiDescription = false;
    },
    uiSelected(payload) {
      if (!this.viewTemplate) {
        this.uiDescription = true;
        this.tagDescription = false;
        this.$nextTick(() => {
          let ui = document.querySelector(".description-ui");
          let stu = document.querySelector(".studio");
          let innerText = payload.target.innerHTML
            .toLowerCase()
            .replace(/ /gi, "");

          let name = payload.target.innerHTML.replace(/ /gi, "");
          ui.children[0].src = "./static/studioImage/" + name + ".png";
          ui.children[1].innerHTML = payload.target.innerHTML;
          ui.children[2].innerHTML = this.hasht[innerText];

          ui.style.left = stu.getBoundingClientRect().right - 25 + "px";
          ui.style.top = payload.target.getBoundingClientRect().top - 8 + "px";

          // ui.innerHTML = this.hasht[innerText]
        });
      }
    },
    // addElement (e) {
    //   this.addTag = true
    //   // console.log(e.target)
    //   this.selectedTag = e.target
    // },
    selectDomElemented(domElement) {
      this.dom = domElement;
      // console.log(this.dom)
      this.$refs.home.selectOverview(this.dom);
    },
    inParentTreeOption(dom) {
      this.$refs.layouts.parentDom = dom;
    },
    domPushWithTree(dom) {
      this.$refs.layouts.domWithTree = dom;
    },
    userSelectBorder(e) {
      this.$refs.home.borderStyleChanged(e);
    },
    toggleClicked() {
      console.log("aaa");
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // color: #fff;
  display: flex;
  flex-direction: column;
  // height: 58rem;
  background-color: #2c3134;
  align-items: center;
  height: 100vh;

  .spliter {
    left: 500px;
  }
  .studio {
    width: 20rem;
    height: 30rem;
    border: 1.5px solid #000000;
    position: fixed;
    left: 4%;
    background-color: #32373a;
    z-index: 11;
    top: 6%;
  }

  .overview {
    width: 20rem;
    z-index: 11;
    height: 30rem;
    border: 1.5px solid #000000;
    position: fixed;
    left: 4%;
    background-color: #32373a;
    top: 6%;
  }
 
  .top-panel {
    height: 6%;
    background-color: #3c474c;
    background-image: linear-gradient(to bottom, #48545a, #3d484d);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: left;

    // .scale {
    //   width: 2rem;
    // }
    // .width {
    //   width: 2rem;
    // }
    .switch-box {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 0.2rem;
      align-items: center;
      margin-left: 1rem;
      font-size: 0.9rem;
      margin-right: 1rem;
       border-radius: 0.3rem;
      .vue-switcher {
        // transform: scale(1);
        z-index: 9;
        // margin-right: 0.5rem;
        margin: 0;
        margin-right: 0.5rem;
        cursor: pointer;
      }
      .switch-text {
        cursor: pointer;
        color: #fff;
      }
       &:hover{
        background-color: #616c72;
      }
    }
    .undo-box, .redo-box, .new-box, .open-box, .save-box, .export-box, .setting-box {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
       padding: 0.2rem;
      margin-right: 1rem;
      font-size: 0.9rem;
      border-radius: 0.3rem;
      .undo, .redo, .new, .open, .save, .export, .setting  {
        cursor: pointer;
        height: 1.2rem;
        margin-right: 0.5rem;
      }
      .undo-text, .redo-text, .new-text, .open-text, .save-text, .export-text, .setting-text{
        cursor: pointer;
        color: #fff;
      }
      &:hover{
        background-color: #616c72;
      }
    }
    .new-box{
      margin-left: 1rem;
    }
    .undo-box{
      .undo{
        -moz-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        cursor: pointer;
        margin-right: 0.5rem;
        height: 1.2rem;
      }
    }
    
  }
  .main-panel {
    width: 100%;
    height: 94%;
    display: flex;
    flex-direction: row;

    .left-panel {
      width: 4%;
      height: 100%;
      background-color: #2c3134;
      display: flex;
      flex-direction: column;
      align-items: center;
      .studio-btn {
        width: 1.3rem;
        margin-top: 1rem;
        cursor: pointer;
      }
      .overview-btn {
        width: 1rem;
        margin-top: 1.3rem;
        cursor: pointer;
      }
    }
    .right-panel {
      width: 4%;
      background-color: #2c3134;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .layout-btn {
        margin-top: 1rem;
        width: 1rem;
        cursor: pointer;
      }
      .code-btn {
        margin-top: 1.3rem;
        background-color: #fff;
        width: 1rem;
        z-index: 100;
        cursor: pointer;
      }
    }
    .editor-panel {
      width: 92%;
      height: 100%;
      .center-panel {
        width: 100%;
        height: 95%;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;

        .title {
          position: absolute;
          text-align: center;
          left: 0;
          color: #fff;
          height: 4.02%;
          background-color: #545e66;
          padding: 0.3rem;
          padding-left: 0.9rem;
          padding-right: 0.9rem;
          top: 0;
        }
        .editor {
          width: 100%;
          position: absolute;
          bottom: 0;
          height: 96%;
          border: 3px solid #545e66;
          display: flex;
          align-items: center;
          justify-content: center;
          // overflow: hidden;
          .home {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 70rem;
            height: 55rem;
            overflow: hidden;
          }
        }
      }
      .bottom-panel {
        z-index: 10000;
        width: 100%;
        background-color: #3c474c;
        height: 5%;
      }
    }
  }
  .code-loader {
    width: 92%;
    z-index: 10000;
    position: fixed;
    bottom: 5%;
    height: 20rem;
    background-color: #23282b;
  }
   .loader-bord {
     cursor: n-resize;
    height:7px;
    width: 92%;
    position: fixed;
    z-index: 10000;
    //  bottom: 5%;
    background-color:#545e66 ;
  }

  .layout {
    width: 20rem;
    z-index: 11;
    height: 30rem;
    border: 1.5px solid #000000;
    position: fixed;
    right: 4%;
    background-color: #32373a;
    z-index: 12;
    top: 6%;
  }

  .description-tag,
  .description-ui {
    background-color: #000;
    position: fixed;
    z-index: 15;
    max-width: 30rem;
    float: left;
    left: 18%;
    padding: 0.5rem;
    color: #cecece;
  }

  .description-ui {
    max-height: 30rem;
    .image-name {
      color: #e2e2e2;
    }
    .desc-ui-text {
      color: #a1a1a1;
    }
  }
  .description-img {
    background-color: #000;
    position: fixed;
    z-index: 15;
    max-width: 30rem;
    float: left;
    filter: blur(0.8px);
  }
  .bottom-panel{
    width:92%;
  }
  .fileTitle {
    font-size: 15px;
    color:white;
    font-weight: bold;
    padding: 7px 14px;
    vertical-align: bottom;
    display: inline-block;
    margin-right: 25%;
    float: none;
    border: 2px solid black;
    background-color:#666666;
    
}
}
</style>
