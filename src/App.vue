<template>
  <div id="app">
    <!-- <spliter class="spliter"/> -->
    <div class="top-panel">
      <!-- <img class="scale" src="./assets/scale.svg" />
      <img class="width" src="./assets/width.svg" /> -->
      <div @click="newPage" class="new-box">
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
        <img
          @click="studioBtn"
          class="studio-btn"
          src="./assets/studio.svg"
          title="studio"
        />
        <img
          @click="overviewBtn"
          class="overview-btn"
          src="./assets/overview.svg"
          title="overview"
        />
        <img
          @click="sitemapBtn"
          class="sitemap-btn"
          src="./assets/sitemap.svg"
          title="sitemap"
        />
      </div>
      <div class="editor-panel">
        <div class="center-panel">
          <div class="top-menu">
            <div class="file-name" :key="title.index" v-for="title in titles">
              <div @click="changePage" class="title">
                {{ title.text }}
              </div>
              <img
                @click="closePage"
                class="close-icon"
                src="./assets/close.svg"
              />
            </div>
          

          <img
            src="./assets/iphone.svg"
            @click="resizeEditor"
            class="iphone"
            title="375 x 667"
          />
          <img
            src="./assets/ipad.svg"
            @click="resizeEditor"
            class="ipad"
            title="768 x 1024"
          />
          <img
            src="./assets/monitor.svg"
            @click="resizeEditor"
            class="monitor"
            title="992 x 687"
          />
          </div>
        <div class="main-menu">
          <div class="editor">
            <home
              ref="home"
              @componentSelected="componentSelected"
              @stack-push="stackPush"
              @loadData="loadData"
              class="home"
            ></home>
          </div>
          <div v-if="isCommentOn" class="comment-board">
            <div class="add-comment">
              <textarea class="comment-input" placeholder="comment" />
              <img
                @click="addComment"
                class="add-comment-btn"
                src="./assets/plus.svg"
              />
            </div>
            <div
              :key="comment.index"
              v-for="comment in comments"
              class="comment-wrapper"
            >
              <div class="top-box">
                <div class="writer">{{ comment.writer }}</div>
                <div class="element">{{ comment.element }}</div>
                <div class="time">{{ comment.time }}</div>
              </div>
              <div class="comment-text">{{ comment.text }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="bottom-panel"></div> -->
      <div class="row bottom-panel">
      <div v-show="isData" class="loadDataPanel">
        <div @mousedown="loaderResize" class="loader-bord"></div>
        <div class="studio-text-box">
          <span class="studio-text">CodeReview</span>
          <img
            @click="closeCodeReview"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0wIDNDMCAxLjM0MzE1IDEuMzQzMTUgMCAzIDBINDdDNDguNjU2OSAwIDUwIDEuMzQzMTUgNTAgM1Y0N0M1MCA0OC42NTY5IDQ4LjY1NjkgNTAgNDcgNTBIM0MxLjM0MzE1IDUwIDAgNDguNjU2OSAwIDQ3VjI1VjNaIiBmaWxsPSIjOTI5MTkxIi8+DQo8cmVjdCB4PSIzNC42NjAyIiB5PSIzOS4wNjk3IiB3aWR0aD0iMzMuOTk4NyIgaGVpZ2h0PSI1Ljg4MjM1IiByeD0iMi45NDExOCIgdHJhbnNmb3JtPSJyb3RhdGUoLTEzNSAzNC42NjAyIDM5LjA2OTcpIiBmaWxsPSJ3aGl0ZSIvPg0KPHJlY3QgeD0iMTAuNzU2IiB5PSIzNC44MjEyIiB3aWR0aD0iMzQiIGhlaWdodD0iNS44ODIzNSIgcng9IjIuOTQxMTgiIHRyYW5zZm9ybT0icm90YXRlKC00NSAxMC43NTYgMzQuODIxMikiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg=="
            class="close-btn"
          />
        </div>
        <div class="showSorce">
          <div
            v-show="tabStep === 1"
            class="tab-pane"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div class="showCode">
              <pre
                id="preview1"
                v-highlightjs
              ><code class="HTML"> 불러올 데이터가 없습니다. </code></pre>
            </div>
          </div>
          <div
            v-show="tabStep === 2"
            class="tab-pane"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div class="showCode">
              <pre
                v-highlightjs
                id="preview2"
              ><code class="CSS"> 불러올 데이터가 없습니다.</code></pre>
            </div>
          </div>
          <div
            v-show="tabStep === 3"
            class="tab-pane"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
          >
            <div class="showCode">
              <textarea class="showJS" v-model="js" id="preview3">
 불러올 데이터가 없습니다. </textarea
              >
              <input
                style="float:left;"
                type="submit"
                value="Apply"
                @click="inputFile"
                id="getfile"
                accept="text/*"
              />
            </div>
          </div>
        </div>
      </div>
      <span class="fileTitle" @click="clickSource" name="html">HTML</span>
      <span class="fileTitle" @click="clickSource" name="css">CSS</span>
      <span class="fileTitle" @click="clickSource" name="js">JavaScript</span>
    </div>
    </div>

    <div class="right-panel">
      <img
        @click="layoutBtn"
        class="layout-btn"
        src="./assets/layout.svg"
        title="layout"
      />
      <img
        @click="codeBtn"
        class="code-btn"
        src="./assets/code.svg"
        title="code-editor"
      />
      <img
        @click="commentBtn"
        class="comment-btn"
        src="./assets/comment.svg"
        title="comment"
      />
    </div>
  </div>
    

    <CodeLoader
      @setFile="setFile"
      :loaderData="message"
      ref="codeloader"
      v-show="codeOn"
      class="code-loader"
    ></CodeLoader>

    <layout
      v-if="layoutOn"
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
    <sitemap
      ref="sitemap"
      v-show="sitemapOn"
      @copy-title="copyPage"
      @close-sitemap="sitemapBtn"
      class="sitemap"
    />
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
    <div v-if="isTitle" class="title-copy">
      bb
    </div>
</div>
  <!-- <UndoRedo ref="undoredo" v-show="false"></UndoRedo> -->
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
import sitemap from "./components/sitemap";

export default {
  components: {
    htmlLoader,
    home,
    layout,
    studio,
    overview,
    spliter,
    Switches,
    CodeLoader,
    sitemap
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
       sitemapOn: false,
      enabled: false,
      homeDocument: "",
      uiDescription: false,
      dom: "",
      addTag: false,
      selectedTemplate: null,
      selectedTag: null,
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
      isShift : false,
      message:"",
      isData:false,
      tabStep:0,
      js:" 불러올 데이터가 없습니다.",
      isShift: false,
      isCommentOn: false,
      comments: [
        {
          writer: "이성민",
          element: "aaa",
          time: "2020/01/28",
          text: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
          writer: "이성민",
          element: "adsfsdf",
          time: "2020/01/27",
          text:
            "annnnnnnnnnnnnnnaaaaaaaaaaerggggggggggsdddddddddddssssssssssssssssssssssssssssdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffsssssssssssssssssg"
        }
      ],
      commentTarget: null,
      titles: [
        {
          text: "Untitled"
        }
      ],
      editorNum: 1,
      isTitle: false,
      copyTitle: null
    };
  },
  computed:{
     testMessage: function (){
        this.test = document.getElementById("newLoaderHtml").innerHTML
        return this.test
     },
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
        let loader = document.querySelector(".loadDataPanel");
        let bord = document.querySelector('.loader-bord')
        loader.style.height = this.initialHeight - (e.clientY - this.initialY) + 'px'
        console.log(parseInt(getComputedStyle(loader).top))
        console.log(parseInt(getComputedStyle(bord).height))
        this.$nextTick(()=>{
          bord.style.top = parseInt(getComputedStyle(loader).top)  + 'px'
        });
        }
      if (this.isTitle) {
        // let sitemap = document.querySelector("#sitemap");
            let copy = document.querySelector(".title-copy");
            // console.log(this.copyTitle)
            copy.textContent = this.copyTitle.textContent;
            copy.style.left = e.clientX + 10 + "px";
            copy.style.top = e.clientY + 10 + "px";
      }
    });
    this.homeDocument = document.getElementById("dashboard");
    document.addEventListener("mouseup", e => {
      this.resizeLoader = false
      this.viewTemplate = false;
      let tar = e.target;
      if (this.addTag) {
        while (1) {
          if (tar.id === "dashboard") {
            this.addTag = false;
            this.$refs.home.addContent(this.selectedTag, e.target);
            break;
          } else if (tar.id === "app") {
            break;
          } else {
            tar = tar.parentElement;
          }
        }
      }
      if(this.isTitle){
        this.isTitle = false
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
     clickSource(e){
      this.isData=true
      console.log("s")
      // console.log(document.getElementById("newLoaderHtml").innerHTML)
      if (e.target.getAttribute('name')=='html') {
          this.tabStep = 1
          // this.chageContent()
          console.log("s")
      } else if (e.target.getAttribute('name')=='css') {
          this.tabStep = 2
      } else if (e.target.getAttribute('name')=='js') {
          this.tabStep = 3
      }
    },
    inputFile(e){
        alert("저장되었습니다")
        // console.log(this.message[2])
        var file = document.querySelector('#getfile');
        file.onchange = function () { 
            var fileList = file.files ;
            
            // 읽기
            var reader = new FileReader();
            reader.readAsText(fileList [0]);

            //로드 한 후
            reader.onload = function  () {
                document.querySelector('#preview').textContent = reader.result ;
            }; 
        }; 
    },
    setFile(file){
      // console.log(file)
      this.chageContent()
      this.isData=true
       if (file=='html') {
          this.tabStep = 1

      } else if (file=='css') {
          this.tabStep = 2
      } else if (file=='js') {
          this.tabStep = 3
      }
    },
    closeCodeReview(){
      this.isData=false
    },
     loadData(data){
      this.message = data
    },
    loaderResize(event){
      let loader = document.querySelector(".loadDataPanel");
      // console.log( document.querySelector(".code-loader"))
      // console.log( document.querySelector(".loadDataPanel"))
      this.resizeLoader = true
      this.initialY = event.clientY
      this.initialHeight = parseInt(getComputedStyle(loader).height)
    },
    lo(to){
      let loader = document.querySelector('.loadDataPanel')
      loader.style.top = to
    },
    copyPage(payload) {
      this.isTitle = true;
      this.copyTitle = payload.target
    },
    sitemapBtn() {
      if (this.sitemapOn === true) {
        this.sitemapOn = false;
      } else {
        this.sitemapOn = true;
      }
    },
    closePage(e) {
      let i;
      for (
        i = 0;
        i < e.target.parentElement.parentElement.children.length;
        i++
      ) {
        if (
          e.target.parentElement.parentElement.children[i] ===
          e.target.parentElement
        ) {
          console.log(i);
          break;
        }
      }
      this.titles.splice(i, 1);
      let editorCompo = document.querySelector(".editor-component");
      editorCompo.removeChild(editorCompo.children[i]);
    },
    changePage(e) {
      let i;
      let num;
      for (
        i = 0;
        i < e.target.parentElement.parentElement.children.length - 3;
        i++
      ) {
        if (
          e.target.parentElement.parentElement.children[i] ===
          e.target.parentElement
        ) {
          num = i;
          e.target.parentElement.style.backgroundColor = "#545e66";
        } else {
          e.target.parentElement.parentElement.children[
            i
          ].style.backgroundColor = "#2c3134";
        }
      }
      let j;
      let editor = document.querySelectorAll(".board");
      console.log(editor);
      for (j = 0; j < editor.length; j++) {
        if (j === num) {
          editor[j].classList.remove("hidden");
          editor[j].classList.add("display");
        } else {
          editor[j].classList.remove("display");
          editor[j].classList.add("hidden");
        }
      }
    },
    newPage(e) {
      let payload = {
        text: "aaa"
      };
      this.titles.push(payload);
      let editor = document.querySelector(".board");
      // let copy = editor.cloneNode(true)
      let newEditorBox = document.createElement("div");
      let ne = document.createElement("button");
      newEditorBox.classList.add("board");
      newEditorBox.classList.add("hidden");
      newEditorBox.classList.add("board" + this.editorNum);
      newEditorBox.appendChild(ne);
      // console.log(editor.parentElement);

      editor.parentElement.appendChild(newEditorBox);

      // console.log(newEditorBox.classList);
      this.editorNum++;

      let files = document.querySelectorAll(".file-name");
      let i;
      // files[files.length-1].style.backgroundColor = '#2c3134'
      for (i = 0; i < files.length; i++) {
        if (i === 0) {
          files[i].style.backgroundColor = "#545e66";
        } else {
          files[i].style.backgroundColor = "#2c3134";
        }
      }
      this.$refs.sitemap.loadSitemap(this.titles);
    },
    addComment() {
      let text = document.querySelector(".comment-input");
      let payload = {
        writer: "이성민",
        element: this.commentTarget.className,
        time: "",
        text: text.value
      };
      //writer는 유저의 이름으로 element는 선택한 element 또는 빈칸
      var date = new Date();
      payload.time =
        date.getFullYear() + "/" + date.getMonth() + 1 + "/" + date.getDate();
      this.comments.unshift(payload);
      text.value = "";
      // this.comments[this.comments.length-1]
    },
    commentBtn(target) {
      if (this.isCommentOn === false) {
        this.isCommentOn = true;
      } else {
        this.isCommentOn = false;
      }
      this.commentTarget = target;
      console.log(this.commentTarget.className);
    },
    resizeEditor(e) {
      let editor = document.querySelector(".editor-box");
      if (e.target.className === "iphone") {
        console.log("aad");
        editor.style.transform = "scale(1)";
        editor.style.width = "375px";
        editor.style.height = "667px";
      } else if (e.target.className === "ipad") {
        editor.style.transform = "scale(0.7)";
        editor.style.width = "768px";
        editor.style.height = "1024px";
      } else if (e.target.className === "monitor") {
        editor.style.transform = "scale(1)";
        editor.style.width = "992px";
        editor.style.height = "687px";
      }
    },
    codeBtn() {
      if (this.codeOn === true) {
        this.codeOn = false;
      } else {
        this.codeOn = true;
        this.$nextTick(() => {
          let loader = document.querySelector(".code-loader");
          let bord = document.querySelector(".loader-bord");
          bord.style.top = getComputedStyle(loader).top;
          this.initialTop = getComputedStyle(loader).top;
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
      this.$refs.layouts.isData = true;
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
      this.$refs.layouts.makeTreeParent(this.payload);
    },
    userSelectedWidth(data) {
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
// @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
@import url('http://fonts.googleapis.com/earlyaccess/notosanskr.css'); 
@import url('https://rsms.me/inter/inter.css');

#app {
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-family: 'Noto Sans KR', sans-serif;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
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
    z-index: 33;
    top: 6%;
  }

  .overview {
    width: 20rem;
    z-index: 33;
    height: 30rem;
    border: 1.5px solid #000000;
    position: fixed;
    left: 4%;
    background-color: #32373a;
    top: 6%;
  }
  .sitemap {
    width: 20rem;
    height: 30rem;
    border: 1.5px solid #000000;
    position: fixed;
    left: 4%;
    background-color: #32373a;
    z-index: 30;
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
      .sitemap-btn {
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
        .top-menu {
          display: flex;
          flex-direction: row;
          width: 100%;
          .file-name {
            left: 0;
            cursor: pointer;
            // background-color: #545e66;
            top: 0;
            display: flex;
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
              height: auto;
            }
            .close-icon {
              width: 0.7rem;
              padding-right: 0.1rem;
              margin-right: 0.2rem;
            }
          }

          .monitor,
          .iphone,
          .ipad {
            text-align: center;
            right: 0;
            top: 0.35rem;
            width: 1.4rem;
            cursor: pointer;
            z-index: 28;
            &:hover {
              border-radius: 0.15rem;
              background-color: #888888;
            }
          }
          .iphone {
            right: 5rem;
            margin-right: 0.7rem;
          }
          .ipad {
            width: 1.3rem;
            margin-right: 0.7rem;
            right: 2.5rem;
          }
          .monitor {
            width: 1.3rem;
          }
        }

        .main-menu {
          width: 100%;
          bottom: 0;
          height: 96%;
          display: flex;
          flex-direction: row;

          .editor {
            width: 100%;
            height: 100%;
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
              height: 100%;
              overflow: hidden;
            }
          }
          .hidden {
            display: none;
          }
          .display {
            display: block;
          }
          .comment-board {
            // position: absolute;
            right: 0;
            width: 25rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #dddddd;
            .add-comment {
              border-radius: 0.3rem;
              margin: 0.2rem;
              padding: 0.2rem;
              display: flex;
              flex-direction: row;
              width: 19rem;
              background-color: #ca8f8f;
              cursor: pointer;
              box-shadow: 1px 0.5px 0.5px #c0c0c0;
              .comment-input {
                background-color: inherit;
                // border:1px solid #646464;
                border: none;
                width: 15rem;
                border-radius: 0.3rem;
              }
              .add-comment-btn {
                width: 1rem;
                margin-left: 0.5rem;
                right: 0;
              }
            }
            .comment-wrapper {
              border-radius: 0.3rem;
              margin: 0.2rem;
              padding: 0.2rem;
              width: 19rem;
              background-color: #fff;
              box-shadow: 1px 0.5px 0.5px #c0c0c0;

              .top-box {
                width: 100%;
                margin-bottom: 0.15rem;
                display: flex;
                height: auto;
                position: relative;
                flex-direction: row;
                .writer {
                  left: 0;
                  font-weight: bold;
                  font-size: 1.1rem;
                  color: #696969;
                }
                .element {
                  width: 10rem;
                  position: absolute;
                  overflow: hidden;
                  right: 5.5rem;
                }
                .time {
                  position: absolute;
                  width: 5rem;
                  right: 0;
                }
              }
              .comment-text {
                font-size: 0.8rem;
                width: 100%;
                text-align: left;
                color: #8f8f8f;
                word-break: break-all;
              }
            }
          }
        }
      }
      .bottom-panel {
        z-index: 10000;
        width: 100%;
        background-color: #3c474c;
        height: 5%;
        margin: 0;
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
    z-index: 33;
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
    z-index: 34;
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
    z-index: 35;
    max-width: 30rem;
    float: left;
    filter: blur(0.8px);
  }
  .title-copy {
    text-align: left;
    height: 1.5rem;
    position: fixed;
    z-index: 33;
    background-color: #444444;
    padding: 0.2rem;
    color: #e7e4e4;
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

.loadDataPanel{
      width: 92%;
      z-index: 10000;
      position: fixed;
      bottom: 5%;
      height: 100%;
      background-color: #23282b;
        
    }
.showSorce{
    margin:14px 0px 0px 0px;
    height:60%;
}
.tab-pane{
  height:145%;
}
#pills-home{
  height:145%;
}
#pills-profile{
  height:145%;
}
#pills-contact{
  height:125%;
}
.showCode{
    height:100%;
}
.studio-text-box {
    height: 7%;
    justify-content: center;
    position: relative;
    .studio-text {
      padding: 0.2rem;
      color: #ffffff;
      font-size: 1.4rem;
      position: absolute;
      left: 0.4rem;
    }
    .close-btn{
      width: 1.1rem;
      right: 0.4rem;
      top: 0.4rem;
      cursor:pointer;
      position: absolute;
    }
  }

.editor-component {
  .board {
    width: 100%;
    height: 35rem;
  }
}
}
</style>
