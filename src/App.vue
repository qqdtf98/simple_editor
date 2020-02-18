<template>
  <div id="app">
    <div class="top-panel">
      <div class="Logo">Logo</div>
      <div @mouseover="fileTab" class="File menu-tab">
        File
      </div>
      <div @mouseover="editTab" class="Edit menu-tab">Edit</div>
      <div @mouseover="saveTab" class="Save menu-tab">Save</div>
      <div @mouseover="settingTab" class="Setting menu-tab">Setting</div>
      <div @mouseover="helpTab" class="Help menu-tab">Help</div>

      <!-- <div @click="newPage" class="new-box">
        <img class="new" src="./assets/images/new.svg" />
        <div class="new-text">New</div>
      </div>
      <div class="open-box">
        <img class="open" src="./assets/images/open.svg" />
        <div class="open-text">Open</div>
      </div>
      <div class="save-box">
        <img class="save" src="./assets/images/save.svg" />
        <div class="save-text">Save</div>
      </div>
      <div class="export-box">
        <img class="export" src="./assets/images/export.svg" />
        <div class="export-text">Export</div>
      </div>
      <div class="setting-box">
        <img class="setting" src="./assets/images/settings.svg" />
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
        <img @click="undoWork" class="undo" src="./assets/images/undo.svg" />
        <div @click="undoWork" class="undo-text">Undo</div>
      </div>
      <div class="redo-box">
        <img @click="redoWork" class="redo" src="./assets/images/undo.svg" />
        <div @click="redoWork" class="redo-text">Redo</div>
      </div> -->
    </div>
    <div class="main-panel">
      <div class="left-panel">
        <img
          @click="studioBtn"
          class="studio-btn"
          src="./assets/images/studio.svg"
          title="studio"
        />
        <!-- <img
          @click="overviewBtn"
          class="overview-btn"
          src="./assets/images/overview.svg"
          title="overview"
        /> -->
        <img
          @click="sitemapBtn"
          class="sitemap-btn"
          src="./assets/images/sitemap.svg"
          title="sitemap"
        />
      </div>
      <div class="center-panel">
        <div class="main-top-panel">
          <div class="top-menu">
            <div class="file-name" :key="title.index" v-for="title in titles">
              <div @click="changePage" class="title">
                {{ title.text }}
              </div>
              <img
                @click="closePage"
                class="close-icon"
                src="./assets/images/close.svg"
              />
            </div>

            <img
              src="./assets/images/iphone.svg"
              @click="resizeEditor"
              class="iphone"
              title="375 x 667"
            />
            <img
              src="./assets/images/ipad.svg"
              @click="resizeEditor"
              class="ipad"
              title="768 x 1024"
            />
            <img
              src="./assets/images/monitor.svg"
              @click="resizeEditor"
              class="monitor"
              title="992 x 687"
            />
          </div>
        </div>
        <div class="main-center-panel">
          <div class="main-menu">
            <home
              ref="home"
              @componentSelected="componentSelected"
              @stack-push="stackPush"
              @loadData="loadData"
              @open-code="openCode"
              class="home"
            ></home>
            <div v-show="isCommentOn" class="comment-board">
              <div class="add-comment">
                <textarea class="comment-input" placeholder="comment" />
                <img
                  @click="addComment"
                  class="add-comment-btn"
                  src="./assets/images/plus.svg"
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
        <div class="row bottom-panel">
          <div v-show="isData" class="loadDataPanel">
            <div @mousedown="loaderResize" class="loader-bord"></div>
            <div class="studio-text-box">
              <span class="studio-text">CodeReview</span>

              <div class="manualatag">
                mode
                <switches
                  class="toggleSwitch modeSwitch"
                  theme="bootstrap"
                  color="info"
                  v-model="enabled"
                />
              </div>
              <img
                @click="closeCodeReview"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0wIDNDMCAxLjM0MzE1IDEuMzQzMTUgMCAzIDBINDdDNDguNjU2OSAwIDUwIDEuMzQzMTUgNTAgM1Y0N0M1MCA0OC42NTY5IDQ4LjY1NjkgNTAgNDcgNTBIM0MxLjM0MzE1IDUwIDAgNDguNjU2OSAwIDQ3VjI1VjNaIiBmaWxsPSIjOTI5MTkxIi8+DQo8cmVjdCB4PSIzNC42NjAyIiB5PSIzOS4wNjk3IiB3aWR0aD0iMzMuOTk4NyIgaGVpZ2h0PSI1Ljg4MjM1IiByeD0iMi45NDExOCIgdHJhbnNmb3JtPSJyb3RhdGUoLTEzNSAzNC42NjAyIDM5LjA2OTcpIiBmaWxsPSJ3aGl0ZSIvPg0KPHJlY3QgeD0iMTAuNzU2IiB5PSIzNC44MjEyIiB3aWR0aD0iMzQiIGhlaWdodD0iNS44ODIzNSIgcng9IjIuOTQxMTgiIHRyYW5zZm9ybT0icm90YXRlKC00NSAxMC43NTYgMzQuODIxMikiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg=="
                class="close-btn"
              />
            </div>
            <div class="code-box">
              <div class="left-box">
                <div class="htmlTitle">index.html</div>
                <div class="showSorce">
                  <div
                    class="tab-pane"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div class="showCode">
                      <div
                        id="leftContainer"
                        ref="editor"
                        @change="onCodeChange"
                      ></div>
                    </div>
                  </div>
                  <div
                    v-show="tabStep === 2"
                    class="tab-pane"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  ></div>
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
              <div @mousedown="moveBorder" class="center-border"></div>
              <div class="right-box">
                <div class="cssTitle">style.css</div>
                <div class="showSorce">
                  <div
                    class="tab-pane"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div class="showCode">
                      <div
                        id="rightContainer"
                        ref="editor"
                        @change="onCodeChange"
                      ></div>
                    </div>
                  </div>
                  <div
                    v-show="tabStep === 2"
                    class="tab-pane"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  ></div>
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
            </div>
          </div>
          <span class="fileTitle" @click="clickSource" name="html">HTML</span>
          <span class="fileTitle" @click="clickSource" name="css">CSS</span>
          <span class="fileTitle" @click="clickSource" name="js"
            >JavaScript</span
          >
        </div>
      </div>
      <div class="right-panel">
        <div class="right-top-panel">
          <layout
            ref="layout"
            @userSelectedWidth="userSelectedWidth"
            @stick="layoutStick"
            class="layout"
          />
        </div>
        <div class="right-bottom-panel">
          <div class="tree-name-wrapper">
            <div @mousedown="moveTree" class="tree-name-box">
              <div
                @mousedown.stop
                @click="changeTab"
                class="tree-name"
                :key="tree.index"
                v-for="tree in trees"
              >
                <div @mousedown.stop class="tree">
                  {{ tree.text }}
                </div>
              </div>
            </div>
            <overview
              v-show="showhtml"
              ref="overview"
              @selectDomElement="selectDomElemented"
              @inParentTreeOption="inParentTreeOption"
              @domWithTree="domPushWithTree"
              :getDocument="homeDocument"
              class="htmlcontent"
            />
            <fileContent v-show="!showhtml" class="filecontent" />
          </div>
        </div>
      </div>
    </div>
    <!-- <CodeLoader
      @setFile="setFile"
      :loaderData="message"
      ref="codeloader"
      v-show="codeOn"
      class="code-loader"
    ></CodeLoader> -->

    <studio
      v-show="studioOn"
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
      @copy-title="copyTitleFunc"
      @close-sitemap="sitemapBtn"
      @reset-title="resetTitle"
      @right-click="openSitemapContext"
      class="sitemap"
    />

    <div class="right-panel-border"></div>

    <fileList
      @newpage="newPage"
      v-show="isFileTab"
      class="filelist-tab list-tab"
    />
    <editList
      @undo="undoWork"
      @redo="redoWork"
      v-show="isEditTab"
      class="editlist-tab list-tab"
    />
    <saveList v-show="isSaveTab" class="savelist-tab list-tab" />
    <settingList v-show="isSettingTab" class="settinglist-tab list-tab" />
    <helpList v-show="isHelpTab" class="helplist-tab list-tab" />

    <span v-show="tagDescription" class="description-tag">
      <span class="desc-tag-text">tag</span>
    </span>
    <div v-show="uiDescription" class="description-ui">
      <img />
      <div class="image-name">name</div>
      <div class="desc-ui-text">text</div>
    </div>
    <div v-show="viewTemplate" class="description-img">
      <img />
    </div>
    <div v-show="isTitle" class="title-copy"></div>
    <div v-show="isContextMenu" class="sitemapContext">
      <div @click="changePageSitemap" class="open">Open</div>
      <div @click="copyPage" class="copy">Copy</div>
      <div @click="rename" class="rename">Rename</div>
      <div @click="deleteTitle" class="delete">Delete</div>
    </div>
  </div>
  <!-- <UndoRedo ref="undoredo" v-show="false"></UndoRedo> -->
</template>

<script>
//자
import Vue from 'vue'
import Ruler from 'vue-component-ruler'
import 'vue-component-ruler/dist/ruler.min.css'
///
import htmlLoader from './components/htmlLoader'
import home from './components/home'
import layout from './components/layout'
import studio from './components/studio'
import overview from './components/overview'
import spliter from './sample/spliter'
import Switches from 'vue-switches'
import fileContent from './components/fileContent'
import sitemap from './components/sitemap'
import SlideRuler from 'slide-ruler'
import fileList from './components/tabComponent/fileList'
import editList from './components/tabComponent/editList'
import saveList from './components/tabComponent/saveList'
import settingList from './components/tabComponent/settingList'
import helpList from './components/tabComponent/helpList'
import MonacoEditor from 'monaco-editor-vue'
import * as monaco from 'monaco-editor'
import vueCustomScrollbar from 'vue-custom-scrollbar'

export default {
  components: {
    htmlLoader,
    home,
    layout,
    studio,
    overview,
    spliter,
    Switches,
    fileContent,
    sitemap,
    MonacoEditor,
    Ruler,
    SlideRuler,
    fileList,
    editList,
    saveList,
    settingList,
    helpList,
    vueCustomScrollbar
  },
  props: ['selectDomElement'],
  name: 'App',
  data() {
    return {
      borderWidth: [
        { text: 'White' },
        { text: 'Black' },
        { text: '' },
        { text: 'Thin' },
        { text: 'Length' }
      ],
      monacoIndex: 0,
      code:
        '<MonacoEditor language="typescript" :code="code" :editorOptions="options" @mounted="onMounted" @codeChange="onCodeChange"></MonacoEditor>',
      // options: {
      //   selectOnLineNumbers: true
      // },
      // code: 'const noop = () => {}',
      range: [0, 100],
      payload: '',
      data: '',
      homeLayoutLocation: '',
      isSticklayout: true,
      tagDescription: false,
      childOFchil: [],
      sitemapOn: false,
      enabled: false,
      homeDocument: '',
      uiDescription: false,
      dom: '',
      addTag: false,
      selectedTemplate: null,
      selectedTag: null,
      hasht: null,
      isPustHtml: true,
      viewTemplate: false,
      isCtrl: false,
      moveTarget: null,
      workStack: [],
      reworkStack: [],
      studioOn: false,
      codeOn: false,
      resizeLoader: false,
      initialTop: null,
      initialY: null,
      initialHeight: null,
      xInter: null,
      yInter: null,
      message: '',
      isData: true,
      tabStep: 0,
      js: ' 불러올 데이터가 없습니다.',
      isShift: false,
      isCommentOn: false,
      comments: [
        {
          writer: '이성민',
          element: 'aaa',
          time: '2020/01/28',
          text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        },
        {
          writer: '이성민',
          element: 'adsfsdf',
          time: '2020/01/27',
          text:
            'annnnnnnnnnnnnnnaaaaaaaaaaerggggggggggsdddddddddddssssssssssssssssssssssssssssdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffsssssssssssssssssg'
        }
      ],
      commentTarget: null,
      titles: [
        {
          text: 'Untitled',
          id: '0',
          parent_id: null
        }
      ],
      editorNum: 1,
      isTitle: false,
      copyTitle: null,
      trees: [
        {
          text: 'HTML'
        },
        {
          text: 'Files'
        }
      ],
      showhtml: true,
      layoutSticky: true,
      treeMove: false,
      isFileTab: false,
      isEditTab: false,
      initialLeftWidth: null,
      initialRightWidth: null,
      isSaveTab: false,
      isSettingTab: false,
      isHelpTab: false,
      isContextMenu: false,
      titleId: 0,
      selectedTitle: null,
      vsMode: '',
      select: null,
      moveLine: false,
      initialBorder: 0
    }
  },
  computed: {
    testMessage: function() {
      this.test = document.getElementById('newLoaderHtml').innerHTML
      return this.test
    }
  },
  watch: {
    enabled: function() {
      this.$refs.home.modeSelect(this.enabled)
    }
  },
  watch: {},
  mounted() {
    console.log('df')
    if (this.enabled) {
      this.vsMode = 'vs-dark'
    } else {
      this.vsMode = 'vs'
    }
    console.log(monaco.editor)
    let container = document.getElementById('leftContainer')
    // let custom = document.createElement('vue-custom-scrollbar')
    // custom.classList.add('custom' + this.monacoIndex)
    // container.appendChild(custom)
    // document.querySelector('.custom' + this.monacoIndex++).style['width'] =
    //   '50%'

    // let custom1 = document.createElement('vue-custom-scrollbar')
    // custom1.classList.add('custom' + this.monacoIndex)

    // container.appendChild(custom1)
    // document.querySelector('.custom' + this.monacoIndex++).style['width'] =
    //   '50%'
    var editor = monaco.editor.create(
      document.getElementById('leftContainer'),
      {
        value: 'console.log("Hello, world")',
        language: 'html',
        theme: 'vs-dark',
        height: 100,
        accessibilityPageSize: 4,
        lineDecorationsWidth: 10,
        mouseWheelZoom: true
        // find: 'IEditorFindOptions',
      }
    )
    var editor = monaco.editor.create(
      document.getElementById('rightContainer'),
      {
        value: 'console.log("Hello, world")',
        language: 'css',
        theme: 'vs-dark',
        height: 100,
        accessibilityPageSize: 4,
        lineDecorationsWidth: 10,
        mouseWheelZoom: true
        // find: 'IEditorFindOptions',
      }
    )

    var myBinding = editor.onDidChangeModelContent(function(e) {
      console.log('시작')
      console.log(editor.getValue())
      console.log(editor.getContentHeight())

      // alert(editor.getValue())
      console.log(e.target)
    })
    editor.onDidContentSizeChange(function(e) {
      console.log('시작s')
    })
    // monaco.editor.model.onDidChangeContent(event => {
    //   render()
    //   console.log('s')
    // })

    this.$refs.sitemap.loadSitemap(this.titles)
    let title = document.querySelector('.file-name')
    title.style.backgroundColor = 'rgb(78, 78, 92)'
    let htmltree = document.querySelector('.tree-name')
    htmltree.style.backgroundColor = '#4e4e5c'

    $(window).resize(() => {
      this.$refs.home.windowResized()
    })
    document.addEventListener('click', e => {
      if (e.button === 0) {
        this.isContextMenu = false
      }
    })
    document.addEventListener('mouseover', e => {
      // console.log(e.target.classList[1])
      let mouseoverTab = false
      if (
        e.target.classList[1] === 'menu-tab' ||
        e.target.classList[1] === 'list-tab'
      ) {
        mouseoverTab = true
      }
      if (!mouseoverTab) {
        this.isHelpTab = false
        this.isFileTab = false
        this.isEditTab = false
        this.isSettingTab = false
        this.isSaveTab = false
      }
    })
    document.addEventListener('mousedown', e => {
      this.select = e.target
    })
    document.addEventListener('keydown', e => {
      // if (e.which === 120) {
      //   alert('F9 pressed!')
      //   console.log(this.value)
      //   monaco.editor.addCommand(monaco.KeyCode.F9, function() {
      //     alert('F9 pressed!')
      //     console.log(this.value)
      //   })
      // }
      if (e.which === 17) {
        this.isCtrl = true
        this.$refs.home.multiChoice(true)
      }
      if (e.which === 16) {
        this.isShift = true
      }
      if (e.which === 90 && this.isCtrl && !this.isShift) {
        this.undoWork()
      }
      if (e.which === 90 && this.isCtrl && this.isShift) {
        this.redoWork()
      }
      if (e.which === 67 && this.isCtrl) {
      }
    })
    document.addEventListener('keyup', e => {
      if (e.which === 16) {
        this.isShift = false
      }
      if (e.which === 17) {
        this.isCtrl = false
        this.$refs.home.multiChoice(false)
      }
    })
    document.addEventListener('mousemove', e => {
      if (this.moveLine) {
        let leftBox = document.querySelector('.left-box')
        let rightBox = document.querySelector('.right-box')
        let bord = document.querySelector('.center-border')
        if (
          this.initialLeftWidth + (e.clientX - this.initialBorder) > 300 &&
          this.initialRightWidth - (e.clientX - this.initialBorder) > 300
        ) {
          leftBox.style.width =
            this.initialLeftWidth + (e.clientX - this.initialBorder) + 'px'
          rightBox.style.width =
            this.initialRightWidth - (e.clientX - this.initialBorder) + 'px'
          // document.getElementById('monacoContainer').removeChildAll()
          this.$nextTick(() => {
            bord.style.left = parseInt(getComputedStyle(leftBox).right) + 'px'
          })
        }
      }
      if (this.viewTemplate) {
        this.$nextTick(() => {
          let img = document.querySelector('.description-img')
          let stu = document.querySelector('.studio')

          let name = this.selectedTemplate.target.innerHTML.replace(/ /gi, '')
          // ui 말고 나머지 템플릿의 사진을 추가하거나 예외처리해줘야함.
          // name은 ui와 tag구분없이 들어온다.
          img.children[0].src = './static/studioImage/' + name + '.png'
          img.style.left = e.clientX + 10 + 'px'
          img.style.top = e.clientY + 10 + 'px'
          // ui.innerHTML = this.hasht[innerText]
        })
      }
      if (this.resizeLoader) {
        let loader = document.querySelector('.loadDataPanel')
        let bord = document.querySelector('.loader-bord')
        console.log(loader)
        console.log(bord)
        loader.style.height =
          this.initialHeight - (e.clientY - this.initialY) + 'px'
        // document.getElementById('monacoContainer').removeChildAll()
        this.$nextTick(() => {
          bord.style.top = parseInt(getComputedStyle(loader).top) + 'px'
        })
      }
      if (this.isTitle) {
        // let sitemap = document.querySelector("#sitemap");
        let copy = document.querySelector('.title-copy')
        // console.log(this.copyTitle)
        copy.textContent = this.copyTitle.textContent
        copy.style.left = e.clientX + 10 + 'px'
        copy.style.top = e.clientY + 10 + 'px'
      }
      if (this.treeMove) {
        this.moveTarget.style.width = '-webkit-calc(100% - 83.5%)'
        this.moveTarget.style.height = '25rem'
        // this.moveTarget.style.right= e.clientX - this.xInter + "px";
        this.moveTarget.style.right =
          window.innerWidth -
          e.clientX -
          (parseInt(getComputedStyle(this.moveTarget).width) - this.xInter) +
          'px'
        this.moveTarget.style.top = e.clientY - this.yInter + 'px'
        let rightBorder = document.querySelector('.right-panel-border')
        if (parseInt(getComputedStyle(this.moveTarget).right) < 30) {
          rightBorder.style.opacity = '1'
          rightBorder.style.backgroundImage =
            'linear-gradient(to right, #00000000, #68869250)'
          // rightBorder.style.backgroundColor = "#3a3a50"

          this.isSticklayout = true
        } else {
          rightBorder.style.opacity = '0'
          // rightBorder.style.backgroundColor = "#292931";
          this.isSticklayout = false
        }
      }
    })
    this.homeDocument = document.getElementById('dashboard')
    document.addEventListener('mouseup', e => {
      this.resizeLoader = false
      this.viewTemplate = false
      this.moveLine = false
      let tar = e.target
      if (this.addTag) {
        while (1) {
          if (tar.id === 'dashboard') {
            this.addTag = false
            this.$refs.home.addContent(this.selectedTag, e.target)
            break
          } else if (tar.id === 'app') {
            break
          } else {
            tar = tar.parentElement
          }
        }
      }
      if (this.isTitle) {
        this.isTitle = false
        if (this.select !== e.target && this.select !== null) {
          if (e.target.className === 'titles') {
            this.$refs.sitemap.movePosition(e.target, 'titles')
          } else {
            this.$refs.sitemap.movePosition(e.target, 'titles-box')
          }
        }
      }
      if (this.treeMove) {
        let rightBorder = document.querySelector('.right-panel-border')
        let rightTopPanel = document.querySelector('.right-top-panel')
        let rightBottomPanel = document.querySelector('.right-bottom-panel')
        // rightBorder.style.backgroundColor = "#292931";
        if (this.isSticklayout) {
          rightBorder.style.opacity = '0'
          this.moveTarget.style.width = '-webkit-calc(100% - 83.5%)'
          this.moveTarget.style.right = '0'
          this.moveTarget.style.top = 'calc(30rem + 3.5%)'
          this.moveTarget.style.height = '25rem'
          rightTopPanel.style.height = '30rem'
          rightBottomPanel.style.height = '25rem'
          let rightPanel = document.querySelector('.right-panel')
          let centerPanel = document.querySelector('.center-panel')
          rightPanel.style.width = '16.5%'
          centerPanel.style.width = '80%'
          this.$refs.layout.treeStick(0)
        } else {
          if (this.layoutSticky === false) {
            let rightPanel = document.querySelector('.right-panel')
            let centerPanel = document.querySelector('.center-panel')
            // this.moveTarget.style.borderTop = '1px solid black'
            rightPanel.style.width = '0'
            centerPanel.style.width = '96.5%'
          } else {
            let rightPanel = document.querySelector('.right-panel')
            let centerPanel = document.querySelector('.center-panel')
            rightPanel.style.width = '16.5%'
            centerPanel.style.width = '80%'
          }
          this.$refs.layout.treeStick(1)
        }
        this.treeMove = false
      }
    })
    var h = {}
    h['articleclean'] = 'An article layout with a simple and clean design.'
    h['articledualcolumn'] = 'An article layout which consists of two columns.'
    h['articlelist'] = 'A list of articles with thumbnails and descriptions.'
    h['featuresblue'] = 'This is a feature grid with a beautiful blue design.'
    h['featuresboxed'] = 'A feature grid with a subtle white on blue design.'
    h['featuresclean'] =
      'A feature grid with a clean design with lots of white space.'
    h['footerbasic'] = 'This is a basic footer with links and social buttons.'
    h['footerclean'] =
      'A complete footer design with link categories, social icons and a copyright line.'
    h['footerdark'] =
      'A dark footer design with link categories, social icons and a copyright line.'
    h['heading'] =
      'This is the HTML heading component. You can choose which HTML tag is used - from &lth1&gt to &lth6&gt.'
    h['paragraph'] =
      "This is the standard &ltp&gt  HTML element. Use it for writing body text. It is enhanced by Bootstrap's rich styling classes, available in the Options panel."
    h['alert'] =
      'Use this component to show a message to users of your web app. Usually it is displayed near the top of your page. It can have an optional dismiss button and you can choose one of several color themes.'
    h['image'] =
      'This is the &ltimage&gt  HTML element. You can control its size, source, style and responsiveness from the Options panel.'
    h['icon'] =
      "This is the Icon component. You can choose from a number of available icon fonts. You can modify the icon's size and color by changing its CSS font-size and color properties."
    h['carousel'] =
      "This is Bootstrap's versatile Carousel component. It can display and animate text and photos. You have to enable the slides' captions in order to place non-image elements inside them."
    h['button'] =
      'This is the multi-functional Bootstrap Button component. You have a choice of possible themes, button types and sizes. Search for the related Dropdown and Split Button components if you need your button to trigger dropdown menus.'
    h['splitbutton'] =
      'This is the Bootstrap Split Button component. It consists of two buttons, the second of which triggers a dropdown menu. Look for the Dropdown component if you need only a single button.'
    h['buttongroup'] =
      'A Button Group is a Bootstrap component for grouping together buttons. If you need more than one group, check out the Button Toolbar component.'
    h['row'] =
      'This is the Bootstrap Row component. This is a fundamental building block of the responsive grid. Place Rows inside Containers, and drop Columns inside them to build a responsive page.'
    h['column'] =
      "This is the Bootstrap Column component. This is the fundamental building block of the responsive grid. Place columns inside Rows and control their width with the col-* responsive classes. There are lots of responsive options available in the Column's Option panel."
    h['columnhelper'] =
      "This is the Bootstrap Column component. This is the fundamental building block of the responsive grid. Place columns inside Rows and control their width with the col-* responsive classes. There are lots of responsive options available in the Column's Option panel."
    h['container'] =
      'Containers are Bootstrap components which limit the width of the page. Usually you would place a single Container as an element that wraps around all of your content. You can switch between fluid and fixed width containers from the Option panel.'
    h['tabs'] =
      "This is Bootstrap's Tabs component. Each tab has an associated Tab Pane which is displayed when the tab is active."
    h['accordion'] =
      'This is a Bootstrap component for displaying content in vertical groups. Only one group is expanded at a time. This is a great way to organize FAQ pages and other layout where vertical content is at a premium.'
    h['card'] =
      'Cards are flexible and extensible Bootstrap 4 containers. They can include headers, footers, a wide variety of content, contextual background colors, and powerful display options.'
    h['panel'] =
      'Panels are a variation of the Bootstrap 4 Card component. They can include headers, footers and multiple color styles.'
    h['thumbnail'] =
      'Thumbnails are a variation of the Bootstrap 4 Card component. They can include a header image, title, description and action buttons or links.'

    this.hasht = h
  },
  methods: {
    moveBorder(e) {
      this.moveLine = true
      this.initialBorder = e.target.getBoundingClientRect().left
      let leftBox = document.querySelector('.left-box')
      let rightBox = document.querySelector('.right-box')
      this.initialLeftWidth = leftBox.getBoundingClientRect().width
      this.initialRightWidth = rightBox.getBoundingClientRect().width
    },
    openCode() {
      this.isData = true
    },
    copyPage() {
      console.log(this.selectedTitle)
      let titles = document.querySelectorAll('.titles')
      let i
      for (i = 0; i < titles.length; i++) {
        if (titles[i] === this.selectedTitle) {
          break
        }
      }
      let payload = {
        text: `${this.titles[i].text}`,
        id: `${++this.titleId}`,
        parentID: null
      }
      this.titles.push(payload)
      let editor = document.querySelector('#board')
      // let copy = editor.cloneNode(true)
      let newEditorBox = document.createElement('div')
      newEditorBox.classList.add('board')
      newEditorBox.classList.add('hidden')
      newEditorBox.setAttribute('id', 'board' + this.editorNum)
      // console.log(editor.parentElement);

      editor.parentElement.appendChild(newEditorBox)

      // console.log(newEditorBox.classList);
      this.editorNum++

      let files = document.querySelectorAll('.file-name')
      // files[files.length-1].style.backgroundColor = '#2c3134'
      for (i = 0; i < files.length; i++) {
        if (i === 0) {
          files[i].style.backgroundColor = '#545e66'
        } else {
          files[i].style.backgroundColor = '#2c3134'
        }
      }
      this.$refs.sitemap.loadSitemap(this.titles)
    },
    changePageSitemap(e) {
      if (this.selectedTitle.className === 'titles') {
        let titles = document.querySelectorAll('.titles')
        let editor = document.querySelectorAll('.board')
        let i
        for (i = 0; i < titles.length; i++) {
          if (titles[i] === this.selectedTitle) {
            break
          }
        }
        let j
        for (j = 0; j < editor.length; j++) {
          if (j === i) {
            editor[j].classList.remove('hidden')
            editor[j].classList.add('display')
            console.log(editor[j].getAttribute('id'))
          } else {
            editor[j].classList.remove('display')
            editor[j].classList.add('hidden')
          }
        }
      } else if (this.selectedTitle.className === 'titles-box') {
        let titles = document.querySelectorAll('.titles-box')
        let editor = document.querySelectorAll('.board')
        let i
        for (i = 0; i < titles.length; i++) {
          if (titles[i] === this.selectedTitle) {
            break
          }
        }
        let j
        for (j = 0; j < editor.length; j++) {
          if (j === i) {
            editor[j].classList.remove('hidden')
            editor[j].classList.add('display')
            console.log(editor[j].getAttribute('id'))
          } else {
            editor[j].classList.remove('display')
            editor[j].classList.add('hidden')
          }
        }
      }
    },
    deleteTitle() {
      this.$refs.sitemap.deleteTitle()
      // this.closePage()
    },
    resetTitle(titles) {
      console.log('reset')
      this.titles = titles
      // console.log(this.titles)
      let topMenu = document.querySelector('.top-menu')
    },
    rename() {
      this.$refs.sitemap.renameTitle()
    },
    openSitemapContext(e) {
      this.selectedTitle = e.target
      if (this.isContextMenu) {
        this.isContextMenu = false
      } else {
        this.isContextMenu = true
        this.$nextTick(() => {
          let context = document.querySelector('.sitemapContext')
          context.style.left = e.clientX + 'px'
          context.style.top = e.clientY + 'px'
        })
      }
    },
    helpTab(e) {
      this.isHelpTab = true
      this.isFileTab = false
      this.isEditTab = false
      this.isSettingTab = false
      this.isSaveTab = false
      this.$nextTick(() => {
        let helptab = document.querySelector('.helplist-tab')
        helptab.style.left = e.target.getBoundingClientRect().left + 'px'
        helptab.style.top =
          e.target.getBoundingClientRect().top +
          e.target.getBoundingClientRect().height +
          'px'
      })
    },
    settingTab(e) {
      this.isSettingTab = true
      this.isFileTab = false
      this.isEditTab = false
      this.isSaveTab = false
      this.isHelpTab = false
      this.$nextTick(() => {
        let settingtab = document.querySelector('.settinglist-tab')
        settingtab.style.left = e.target.getBoundingClientRect().left + 'px'
        settingtab.style.top =
          e.target.getBoundingClientRect().top +
          e.target.getBoundingClientRect().height +
          'px'
      })
    },
    saveTab(e) {
      this.isSaveTab = true
      this.isFileTab = false
      this.isEditTab = false
      this.isSettingTab = false
      this.isHelpTab = false
      this.$nextTick(() => {
        let savetab = document.querySelector('.savelist-tab')
        savetab.style.left = e.target.getBoundingClientRect().left + 'px'
        savetab.style.top =
          e.target.getBoundingClientRect().top +
          e.target.getBoundingClientRect().height +
          'px'
      })
    },
    editTab(e) {
      this.isEditTab = true
      this.isFileTab = false
      this.isSaveTab = false
      this.isSettingTab = false
      this.isHelpTab = false
      this.$nextTick(() => {
        let edittab = document.querySelector('.editlist-tab')
        edittab.style.left = e.target.getBoundingClientRect().left + 'px'
        edittab.style.top =
          e.target.getBoundingClientRect().top +
          e.target.getBoundingClientRect().height +
          'px'
      })
    },
    fileTab(e) {
      this.isFileTab = true
      this.isEditTab = false
      this.isSaveTab = false
      this.isSettingTab = false
      this.isHelpTab = false
      this.$nextTick(() => {
        let filetab = document.querySelector('.filelist-tab')
        filetab.style.left = e.target.getBoundingClientRect().left + 'px'
        filetab.style.top =
          e.target.getBoundingClientRect().top +
          e.target.getBoundingClientRect().height +
          'px'
      })
    },
    changeTab(e) {
      let trees = document.querySelectorAll('.tree-name')
      console.log(trees)
      //  e.target.parentElement.style.backgroundColor = '#4e4e5c'
      if (e.target.textContent.trim() === 'HTML') {
        trees[1].style.backgroundColor = '#292931'
        trees[0].style.backgroundColor = '#4e4e5c'
        this.showhtml = true
      } else if (e.target.textContent.trim() === 'Files') {
        trees[0].style.backgroundColor = '#292931'
        trees[1].style.backgroundColor = '#4e4e5c'
        this.showhtml = false
      }
    },
    moveTree(e) {
      e.target.parentElement.style.position = 'fixed'
      let initX = e.clientX
      let initY = e.clientY
      let initLeft = parseInt(getComputedStyle(e.target.parentElement).left)
      let initTop = parseInt(getComputedStyle(e.target.parentElement).top)
      this.xInter = initX - initLeft
      this.yInter = initY - initTop
      this.treeMove = true
      console.log(e.target)
      this.moveTarget = e.target.parentElement
      this.moveTarget.style.height = '25rem'
    },
    layoutStick(payload) {
      console.log(payload)
      if (payload === 0) {
        this.layoutSticky = true
      } else if (payload === 1) {
        this.layoutSticky = false
      }
    },
    clickSource(e) {
      this.isData = true
      console.log('s')
      // console.log(document.getElementById("newLoaderHtml").innerHTML)
      if (e.target.getAttribute('name') == 'html') {
        this.tabStep = 1
        // this.chageContent()
        console.log('s')
      } else if (e.target.getAttribute('name') == 'css') {
        this.tabStep = 2
      } else if (e.target.getAttribute('name') == 'js') {
        this.tabStep = 3
      }
    },
    inputFile(e) {
      alert('저장되었습니다')
      // console.log(this.message[2])
      var file = document.querySelector('#getfile')
      file.onchange = function() {
        var fileList = file.files

        // 읽기
        var reader = new FileReader()
        reader.readAsText(fileList[0])

        //로드 한 후
        reader.onload = function() {
          document.querySelector('#preview').textContent = reader.result
        }
      }
    },
    setFile(file) {
      // console.log(file)
      this.chageContent()
      this.isData = true
      if (file == 'html') {
        this.tabStep = 1
      } else if (file == 'css') {
        this.tabStep = 2
      } else if (file == 'js') {
        this.tabStep = 3
      }
    },
    closeCodeReview() {
      this.isData = false
    },
    loadData(data) {
      this.message = data
    },
    loaderResize(event) {
      let loader = document.querySelector('.loadDataPanel')
      // console.log( document.querySelector(".code-loader"))
      // console.log( document.querySelector(".loadDataPanel"))
      this.resizeLoader = true
      this.initialY = event.clientY
      this.initialHeight = parseInt(getComputedStyle(loader).height)
    },
    lo(to) {
      let loader = document.querySelector('.loadDataPanel')
      loader.style.top = to
    },
    copyTitleFunc(payload) {
      this.isTitle = true
      this.copyTitle = payload.target
      this.$nextTick(() => {
        let copy = document.querySelector('.title-copy')
        // console.log(this.copyTitle)
        copy.textContent = this.copyTitle.textContent
        copy.style.left = payload.clientX + 10 + 'px'
        copy.style.top = payload.clientY + 10 + 'px'
      })
    },
    sitemapBtn() {
      if (this.sitemapOn === true) {
        this.sitemapOn = false
      } else {
        this.sitemapOn = true
        this.studioOn = false
      }
    },
    closePage(e) {
      let i
      for (
        i = 0;
        i < e.target.parentElement.parentElement.children.length;
        i++
      ) {
        if (
          e.target.parentElement.parentElement.children[i] ===
          e.target.parentElement
        ) {
          console.log(i)
          break
        }
      }
      this.titles.splice(i, 1)
      let editorCompo = document.querySelector('.editor-component')
      editorCompo.removeChild(editorCompo.children[i])
    },
    changePage(e) {
      let i
      let num
      for (
        i = 0;
        i < e.target.parentElement.parentElement.children.length - 3;
        i++
      ) {
        if (
          e.target.parentElement.parentElement.children[i] ===
          e.target.parentElement
        ) {
          num = i
          e.target.parentElement.style.backgroundColor = '#545e66'
        } else {
          e.target.parentElement.parentElement.children[
            i
          ].style.backgroundColor = '#2c3134'
        }
      }
      let j
      let editor = document.querySelectorAll('.board')
      for (j = 0; j < editor.length; j++) {
        if (j === num) {
          editor[j].classList.remove('hidden')
          console.log(editor[j].getAttribute('id'))
          editor[j].classList.add('display')
        } else {
          editor[j].classList.remove('display')
          editor[j].classList.add('hidden')
        }
      }
    },
    newPage(e) {
      let payload = {
        text: `${this.titleId}`,
        id: `${++this.titleId}`,
        parentID: null
      }
      this.titles.push(payload)
      let editor = document.querySelector('#board')
      // let copy = editor.cloneNode(true)
      let newEditorBox = document.createElement('div')
      newEditorBox.classList.add('board')
      newEditorBox.classList.add('hidden')
      newEditorBox.setAttribute('id', 'board' + this.editorNum)

      let sampleCompo = document.createElement('div')
      sampleCompo.classList.add('sample-component')

      let sampleBtn = document.createElement('img')
      sampleBtn.classList.add('sample-add-btn')

      // console.log(editor.parentElement);

      sampleCompo.appendChild(sampleBtn)
      newEditorBox.appendChild(sampleCompo)
      editor.parentElement.appendChild(newEditorBox)

      // sampleBtn.src = './static/sample/plus.svg'
      $('.sample-add-btn').attr(
        'src',
        sampleBtn.setAttribute(
          'src',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUiIGhlaWdodD0iMzQiIHZpZXdCb3g9IjAgMCAzNSAzNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxyZWN0IHg9IjAuMTAwNTg2IiB5PSIxNC4xNTk0IiB3aWR0aD0iMzQiIGhlaWdodD0iNS44ODIzNSIgcng9IjIuOTQxMTgiIGZpbGw9IndoaXRlIi8+DQo8cmVjdCB4PSIxNCIgeT0iMzMuOTk4NyIgd2lkdGg9IjMzLjk5ODciIGhlaWdodD0iNS44ODIzNSIgcng9IjIuOTQxMTgiIHRyYW5zZm9ybT0icm90YXRlKC05MCAxNCAzMy45OTg3KSIgZmlsbD0id2hpdGUiLz4NCjwvc3ZnPg0K'
        )
      )

      console.log(sampleBtn)

      newEditorBox.style.height = '100%'
      newEditorBox.style.width = '100%'
      sampleCompo.style.width = '100%'
      sampleCompo.style.height = '100%'
      sampleCompo.style.display = 'flex'
      sampleCompo.style.alignItems = 'center'
      sampleCompo.style.justifyContent = 'center'
      sampleBtn.style.width = '5rem'
      sampleBtn.style.cursor = 'pointer'

      sampleBtn.addEventListener('click', e => {
        this.openCode()
      })

      // console.log(newEditorBox.classList);
      this.editorNum++

      let files = document.querySelectorAll('.file-name')
      let i
      // files[files.length-1].style.backgroundColor = '#2c3134'
      for (i = 0; i < files.length; i++) {
        if (i === 0) {
          files[i].style.backgroundColor = '#545e66'
        } else {
          files[i].style.backgroundColor = '#2c3134'
        }
      }
      this.$refs.sitemap.loadSitemap(this.titles)
    },
    addComment() {
      let text = document.querySelector('.comment-input')
      let payload = {
        writer: '이성민',
        element: this.commentTarget.className,
        time: '',
        text: text.value
      }
      //writer는 유저의 이름으로 element는 선택한 element 또는 빈칸
      var date = new Date()
      payload.time =
        date.getFullYear() + '/' + date.getMonth() + 1 + '/' + date.getDate()
      this.comments.unshift(payload)
      text.value = ''
      // this.comments[this.comments.length-1]
    },
    commentBtn(target) {
      if (this.isCommentOn === false) {
        this.isCommentOn = true
      } else {
        this.isCommentOn = false
      }
      this.commentTarget = target
      console.log(this.commentTarget.className)
    },
    resizeEditor(e) {
      let editor = document.querySelector('.editor-box')
      if (e.target.className === 'iphone') {
        console.log('aad')
        editor.style.transform = 'scale(1)'
        editor.style.width = '375px'
        editor.style.height = '667px'
      } else if (e.target.className === 'ipad') {
        editor.style.transform = 'scale(0.7)'
        editor.style.width = '768px'
        editor.style.height = '1024px'
      } else if (e.target.className === 'monitor') {
        editor.style.transform = 'scale(1)'
        editor.style.width = '992px'
        editor.style.height = '687px'
      }
    },
    codeBtn() {
      if (this.codeOn === true) {
        this.codeOn = false
      } else {
        this.codeOn = true
        this.$nextTick(() => {
          let loader = document.querySelector('.loadDataPanel')
          let bord = document.querySelector('.loader-bord')
          bord.style.top = getComputedStyle(loader).top
          this.initialTop = getComputedStyle(loader).top
        })
      }
    },
    studioBtn() {
      if (this.studioOn === true) {
        this.studioOn = false
      } else {
        this.studioOn = true
      }
      if (this.codeOn === true) {
        this.codeOn = false
      }
    },
    redoWork() {
      let i
      console.log('redo')
      if (this.reworkStack.length !== 0) {
        for (i = 0; i < this.reworkStack.length; i++) {
          console.log(this.reworkStack[i])
        }
        let rework = this.reworkStack.pop()
        let work = rework
        if (rework.work === 'style') {
          rework.elem.style[rework.style] = rework.afterValue
        } else if (rework.work === 'move') {
          rework.afterMovePosition.appendChild(rework.elem)
        } else if (rework.work === 'remove') {
          let parent = rework.position
          parent.removeChild(rework.elem)
        } else if (rework.work === 'add') {
          rework.position.appendChild(rework.elem)
        } else if (rework.work === 'copy') {
          $(rework.elem).after(rework.copyElem)
        } else if (rework.work === 'width') {
          rework.elem.style.width = rework.afterSize
        } else if (rework.work === 'height') {
          rework.elem.style.height = rework.afterSize
        } else if (rework.work === 'edit') {
          rework.elem.textContent = rework.afterEdit
        } else if (rework.work === 'widthChange') {
          let i
          let entries = rework.elems.entries()
          let setIter = rework.elems[Symbol.iterator]()
          for (i = 0; i < rework.elems.size; i++) {
            let item = setIter.next().value
            item.style.width = rework.afterWidth + 'px'
          }
        } else if (rework.work === 'heightChange') {
          let i
          let entries = rework.elems.entries()
          let setIter = rework.elems[Symbol.iterator]()
          for (i = 0; i < rework.elems.size; i++) {
            let item = setIter.next().value
            item.style.height = rework.afterHeight + 'px'
          }
        } else if (rework.work === 'multiDelete') {
          let i
          for (i = 0; i < rework.elem.length; i++) {
            rework.elem[i].parentElement.removeChild(rework.elem[i])
          }
        }
        this.stackPush(work)
      }
    },
    undoWork() {
      // console.log('aaa')
      let i
      console.log('undo')
      if (this.workStack.length !== 0) {
        for (i = 0; i < this.workStack.length; i++) {
          console.log(this.workStack[i])
        }
        let work = this.workStack.pop()
        let rework = work
        this.reworkStack.push(rework)
        if (work.work === 'style') {
          work.elem.style[work.style] = work.value
        } else if (work.work === 'remove') {
          console.log('remove')
          let parent = work.position
          $(work.elem).insertAfter(parent.children[work.nth - 1])
        } else if (work.work === 'add') {
          let parent = work.position
          parent.removeChild(work.elem)
        } else if (work.work === 'copy') {
          work.position.removeChild(work.copyElem)
        } else if (work.work === 'move') {
          work.afterMovePosition.removeChild(work.elem)
          work.position.appendChild(work.elem)
        } else if (work.work === 'width') {
          work.elem.style.width = work.beforeSize
        } else if (work.work === 'height') {
          work.elem.style.height = work.beforeSize
        } else if (work.work === 'edit') {
          work.elem.textContent = work.beforeEdit
        } else if (work.work === 'widthChange') {
          let i
          let entries = work.elems.entries()
          let setIter = work.elems[Symbol.iterator]()
          for (i = 0; i < work.elems.size; i++) {
            let item = setIter.next().value
            item.style.width = work.beforeWidth[i] + 'px'
          }
        } else if (work.work === 'heightChange') {
          let i
          let entries = work.elems.entries()
          let setIter = work.elems[Symbol.iterator]()
          for (i = 0; i < work.elems.size; i++) {
            let item = setIter.next().value
            item.style.height = work.beforeHeight[i] + 'px'
          }
        } else if (work.work === 'multiDelete') {
          let i
          for (i = work.elem.length - 1; i >= 0; i--) {
            console.log(work.nth[i])
            work.afterParent[i].insertBefore(
              work.elem[i],
              work.afterParent[i].childNodes[work.nth[i]]
            )
          }
        }
      }
    },
    stackPush(elem) {
      this.workStack.push(elem)
      if (this.tabStep == 1) {
        // document.querySelector('#preview').textContent = this.loadData[0]
        this.message[0] = document.getElementById('newLoaderHtml').innerHTML
        document.querySelector('#preview1').innerText = document.getElementById(
          'newLoaderHtml'
        ).innerHTML
        console.log(document.getElementById('newLoaderHtml').innerHTML)
        console.log(this.message[0])
      } else if (this.tabStep == 2) {
        document.querySelector('#preview2').innerHTML = this.message[1]
      } else if (this.tabStep == 3) {
        document.querySelector('#preview3').innerText = this.message[2]
      }
    },
    userSelectedTagComponent(e, tagComponent) {
      // this.$refs.home.addComponentTag = tagComponent
      this.addTag = true
      this.viewTemplate = true
      this.tagDescription = false
      this.uiDescription = false
      this.selectedTemplate = e
      this.selectedTag = tagComponent
      this.$nextTick(() => {
        let img = document.querySelector('.description-img')
        img.style.left = e.clientX + 10 + 'px'
        img.style.top = e.clientY + 10 + 'px'
      })
    },
    componentSelected(payload) {
      this.$refs.layout.isData = true
      this.payload = payload.target
      // console.log(document.getElementsByClassName('dashboard')[0].getBoundingClientRect())
      // console.log(document.getElementById('dashboard'))
      this.homeLayoutLocation = document
        .getElementById('dashboard')
        .getBoundingClientRect()

      console.log('이제 보낸다')
      console.log(payload)

      this.$refs.layout.getData(payload, this.homeLayoutLocation)
      if (this.isPustHtml) {
        this.isPustHtml = false
        this.$refs.overview.printHomeDocument()
      }
      this.$refs.overview.domSelection(payload.target)
      this.$refs.layout.isData = true
      this.$refs.layout.makeTreeParent(this.payload)
    },
    userSelectedWidth(data) {
      console.log(data)
      this.data = data
      this.$refs.home.styleChanged(this.data)
    },
    tagSelected(payload) {
      if (!this.viewTemplate) {
        this.tagDescription = true
        this.uiDescription = false
        this.$nextTick(() => {
          let text = document.querySelector('.description-tag')
          let stu = document.querySelector('.studio')
          let innerText = payload.target.innerHTML
            .toLowerCase()
            .replace(/ /gi, '')
          text.innerHTML = this.hasht[innerText]

          text.style.left = stu.getBoundingClientRect().right - 25 + 'px'
          text.style.top = payload.target.getBoundingClientRect().top - 8 + 'px'
        })
      }
    },
    tagNotSelected() {
      this.tagDescription = false
      this.uiDescription = false
    },
    uiSelected(payload) {
      if (!this.viewTemplate) {
        this.uiDescription = true
        this.tagDescription = false
        this.$nextTick(() => {
          let ui = document.querySelector('.description-ui')
          let stu = document.querySelector('.studio')
          let innerText = payload.target.innerHTML
            .toLowerCase()
            .replace(/ /gi, '')

          let name = payload.target.innerHTML.replace(/ /gi, '')
          ui.children[0].src = './static/studioImage/' + name + '.png'
          ui.children[1].innerHTML = payload.target.innerHTML
          ui.children[2].innerHTML = this.hasht[innerText]

          ui.style.left = stu.getBoundingClientRect().right - 25 + 'px'
          ui.style.top = payload.target.getBoundingClientRect().top - 8 + 'px'

          // ui.innerHTML = this.hasht[innerText]
        })
      }
    },
    // addElement (e) {
    //   this.addTag = true
    //   // console.log(e.target)
    //   this.selectedTag = e.target
    // },
    selectDomElemented(domElement) {
      this.$refs.home.selectOverview(domElement)
      // this.dom = domElement
    },
    inParentTreeOption(dom) {
      this.$refs.layout.parentDom = dom
    },
    domPushWithTree(dom) {
      this.$refs.layout.domWithTree = dom
    },
    userSelectBorder(e) {
      this.$refs.home.borderStyleChanged(e)
    },
    toggleClicked() {
      console.log('aaa')
    },
    loadData(data) {
      this.message = data
    },
    chageContent() {
      console.log(this.message)
      document.getElementById('newLoaderHtml').innerHTML
      if (this.tabStep == 1) {
        // document.querySelector('#preview').textContent = this.loadData[0]
        this.test = document.getElementById('newLoaderHtml').innerHTML
        document.querySelector('#preview1').innerText = document.getElementById(
          'newLoaderHtml'
        ).innerHTML
        console.log('dsd')
      } else if (this.tabStep == 2) {
        document.querySelector('#preview2').innerHTML = this.message[1]
      } else if (this.tabStep == 3) {
        console.log(document.querySelector('#preview3'))
        console.log(this.message[2])
        this.js = this.message[2]
        // document.querySelector('#preview3').innerText = this.message[2]
      }
    },
    inputFile(e) {
      alert('저장되었습니다')
      // console.log(this.message[2])
      var file = document.querySelector('#getfile')
      file.onchange = function() {
        var fileList = file.files

        // 읽기
        var reader = new FileReader()
        reader.readAsText(fileList[0])

        //로드 한 후
        reader.onload = function() {
          document.querySelector('#preview').textContent = reader.result
        }
      }
    },
    clickSoure(e) {
      this.isData = true
      console.log('s')
      // console.log(document.getElementById("newLoaderHtml").innerHTML)
      if (e.target.getAttribute('name') == 'html') {
        this.tabStep = 1
        // this.chageContent()
        console.log('s')
      } else if (e.target.getAttribute('name') == 'css') {
        this.tabStep = 2
      } else if (e.target.getAttribute('name') == 'js') {
        this.tabStep = 3
      }
    },
    setFile(file) {
      // console.log(file)
      this.chageContent()
      this.isData = true
      if (file == 'html') {
        this.tabStep = 1
      } else if (file == 'css') {
        this.tabStep = 2
      } else if (file == 'js') {
        this.tabStep = 3
      }
    },
    rulerChange(e) {
      console.log(e)
    },
    onCodeChange(e) {
      console.log(e)
      // console.log(e.target.value)
    }
  }
}
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
  background-color: #34343c;
  align-items: center;
  height: 100vh;

  .spliter {
    left: 500px;
  }
  .studio {
    width: 20rem;
    height: 30rem;
    // border: 1.5px solid #000000;
    box-shadow: 5px 5px 8px 1px #000000;
    position: fixed;
    left: 3.5%;
    background-color: #292931;
    z-index: 33;
    top: 3.5%;
  }

  .overview {
    width: 20rem;
    z-index: 33;
    height: 30rem;
    border: 1.5px solid #000000;
    position: fixed;
    left: 3.5%;
    padding: 0;
    background-color: #32373a;
    top: 3.5%;
  }
  .sitemap {
    width: 20rem;
    height: 30rem;
    border: 1.5px solid #000000;
    position: fixed;
    left: 3.5%;
    background-color: #292931;
    z-index: 30;
    top: 3.5%;
  }

  .top-panel {
    height: 3.5%;
    width: 100%;
    background-color: #292931;
    display: flex;
    align-items: center;
    flex-direction: row;
    color: #d6d5d5;
    .Logo,
    .File,
    .Edit,
    .Save,
    .Setting,
    .Help {
      // margin-right: 0.6rem;
      padding-right: 0.5rem;
      padding-left: 0.5rem;
      cursor: default;
      // margin-left: 0.6rem;
      // width: 4rem;
      text-align: center;
      font-size: 0.9rem;
    }
    .File,
    .Edit,
    .Save,
    .Setting,
    .Help {
      &:hover {
        background-color: #535363;
      }
    }
    // height: 6%;
    // background-color: #3c474c;
    // background-image: linear-gradient(to bottom, #48545a, #3d484d);
    // width: 100%;
    // display: flex;
    // align-items: center;
    // justify-content: left;
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
      &:hover {
        background-color: #616c72;
      }
    }
    // .undo-box,
    // .redo-box,
    // .new-box,
    // .open-box,
    // .save-box,
    // .export-box,
    // .setting-box {
    //   display: flex;
    //   flex-direction: row;
    //   justify-content: center;
    //   align-items: center;
    //   padding: 0.2rem;
    //   margin-right: 1rem;
    //   font-size: 0.9rem;
    //   border-radius: 0.3rem;
    //   .undo,
    //   .redo,
    //   .new,
    //   .open,
    //   .save,
    //   .export,
    //   .setting {
    //     cursor: pointer;
    //     height: 1.2rem;
    //     margin-right: 0.5rem;
    //   }
    //   .undo-text,
    //   .redo-text,
    //   .new-text,
    //   .open-text,
    //   .save-text,
    //   .export-text,
    //   .setting-text {
    //     cursor: pointer;
    //     color: #fff;
    //   }
    //   &:hover {
    //     background-color: #616c72;
    //   }
    // }
    // .new-box {
    //   margin-left: 1rem;
    // }
    // .undo-box {
    //   .undo {
    //     -moz-transform: scaleX(-1);
    //     -o-transform: scaleX(-1);
    //     -webkit-transform: scaleX(-1);
    //     transform: scaleX(-1);
    //     cursor: pointer;
    //     margin-right: 0.5rem;
    //     height: 1.2rem;
    //   }
    // }
  }
  .main-panel {
    width: 100%;
    height: 96.5%;
    display: flex;
    flex-direction: row;

    .left-panel {
      width: 3.5%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #292931;
      .studio-btn {
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
    .right-panel {
      width: 16.5%;
      background-color: #292931;

      // background-color: #2c3134;
      height: 100%;
      // display: flex;
      // flex-direction: column;
      // align-items: center;
      // .layout-btn {
      //   margin-top: 1rem;
      //   width: 1rem;
      //   cursor: pointer;
      // }
      // .code-btn {
      //   margin-top: 1.3rem;
      //   width: 1rem;
      //   z-index: 100;
      //   cursor: pointer;
      // }
      // .comment-btn {
      //   margin-top: 1.3rem;
      //   width: 1rem;
      //   z-index: 100;
      //   cursor: pointer;
      // }
      .right-top-panel {
        background-color: #292931;
        width: 100%;
        height: 30rem;
        .layout {
          // overflow: auto;
          border: 1px solid #525252;
          width: 100%;
          height: 100%;
          background-color: #292931;
          z-index: 33;
        }
      }
      .right-bottom-panel {
        background-color: #292931;
        width: 100%;
        // height: 25rem;
        display: flex;
        flex-direction: column;
        .tree-name-wrapper {
          width: 100%;
          height: 100%;
          border: 1px solid #525252;
          // border-top : none;
          .tree-name-box {
            background-color: #292931;
            display: flex;
            //  border: 1px solid black;
            cursor: move;
            flex-direction: row;
            .tree-name {
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

              .tree {
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
            // background-color: red;
            padding: 0;
            overflow: auto; // custom 바꾸기

            width: 100%;
            border-top: 1px solid #525252;
            border-bottom: 1px solid #525252;
            height: 22.8rem;
          }
          .filecontent {
            overflow: auto;
            width: 100%;
            height: 22.8rem;
            background-color: #292931;
          }
        }
      }
    }
    .center-panel {
      width: 80%;
      height: 100%;
      .main-top-panel {
        height: 6.5%;
        width: 100%;
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
      }
      .main-center-panel {
        height: 90.5%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        // border: 1px solid blue;
        .main-menu {
          width: 1200px;
          bottom: 0;
          height: 781px;
          display: flex;
          flex-direction: row;
          overflow: hidden;
          .home {
            width: 100%;
            height: 100%;
            // border: 3px solid #545e66;
            display: flex;
            align-items: center;
            // overflow: auto;
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
        z-index: 10000;
        width: 100%;
        background-color: #3c474c;
        height: 3%;
        margin: 0;
      }
    }
  }
  .code-loader {
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
  .loader-bord {
    cursor: n-resize;
    height: 7px;
    width: 100%;
    z-index: 10000;
    // background-color: #545e66;
  }

  // .layout {
  //   width: 20rem;
  //   z-index: 33;
  //   height: 30rem;
  //   border: 1.5px solid #000000;
  //   position: fixed;
  //   right: 4%;
  //   background-color: #32373a;
  //   z-index: 12;
  //   top: 6%;
  // }
  .filelist-tab {
    position: fixed;
    top: 3.5%;
    z-index: 50;
    // left: 10rem;
  }
  .editlist-tab {
    position: fixed;
    top: 3.5%;
    z-index: 50;
    // left: 10rem;
  }
  .savelist-tab {
    position: fixed;
    top: 3.5%;
    z-index: 50;
    // left: 10rem;
  }
  .settinglist-tab {
    position: fixed;
    top: 3.5%;
    z-index: 50;
    // left: 10rem;
  }
  .helplist-tab {
    position: fixed;
    top: 3.5%;
    z-index: 50;
    // left: 10rem;
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
  .title-copy {
    text-align: left;
    height: 1.5rem;
    position: fixed;
    z-index: 33;
    background-color: #444444;
    padding: 0.2rem;
    color: #e7e4e4;
  }
  .bottom-panel {
    width: 92%;
  }
  .sitemapContext {
    position: fixed;
    width: 10rem;
    background-color: #34343c;
    box-shadow: 5px 5px 8px 1px #000000;
    z-index: 100;
    .open,
    .copy,
    .rename,
    .delete {
      width: 100%;
      padding-top: 0.2rem;
      color: #fff;
      padding-bottom: 0.2rem;
      &:hover {
        cursor: pointer;
        background-color: #4b4b57;
      }
    }
  }

  .fileTitle {
    // font-size: 15px;
    color: white;
    font-weight: bold;
    // padding: 7px 14px;
    vertical-align: bottom;
    display: inline-block;
    // mar
    // margin-right: 25%;
    float: none;
    margin: 0;
    border: none;
    height: 100%;
    background-color: #666666;
  }

  .loadDataPanel {
    width: 80%;
    z-index: 10000;
    border: 1px solid #525252;
    position: fixed;
    bottom: 3%;
    height: 50%;
    background-color: #23282b;
  }

  .tab-pane {
    height: 100%;
  }
  #pills-home {
    height: 100%;
  }
  #pills-profile {
    height: 145%;
  }
  #pills-contact {
    height: 125%;
  }

  .studio-text-box {
    height: 2.5rem;
    display: flex;
    align-items: center;
    position: relative;
    .studio-text {
      padding: 0.2rem;
      color: #ffffff;
      font-size: 1.4rem;
      position: absolute;
      left: 0.4rem;
    }

    .manualatag {
      color: #fff;
      align-items: center;
      position: absolute;
      right: 1.6rem;
    }
    .close-btn {
      width: 1.1rem;
      right: 0.4rem;
      cursor: pointer;
      top: 0.6rem;
      position: absolute;
    }
  }
  .code-box {
    height: calc(100% - 7px - 2.5rem);
    width: 100%;
    display: flex;
    flex-direction: row;
    .center-border {
      width: 0.4%;
      height: 100%;
      background-color: #866a4fbd;
      &:hover {
        cursor: ew-resize;
      }
    }
    .left-box,
    .right-box {
      // border-left: 1.5px solid #86744fa6;
      height: 100%;
      width: 49.8%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: left;
      .htmlTitle {
        height: 5%;
        width: 100%;
        padding-left: 0.2rem;
        background-image: linear-gradient(to bottom, #48545a, #3d484d);
        // background-color: #2c3e50;?
        padding-right: 0.2rem;
        color: #ccc;
        cursor: pointer;
      }
      .cssTitle {
        height: 5%;
        width: 100%;
        color: #ccc;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
        background-image: linear-gradient(to bottom, #48545a, #3d484d);
        // background-color: #2c3e50;
        cursor: pointer;
      }
      .showSorce {
        height: 95%;
        width: 100%;
        .tab-pane {
          .showCode {
            height: 100%;
            .monaco-editor {
              width: 100% !important;
              margin: 0;
              height: 100% !important;
              // overflow: auto;
              padding: 0;
              .overflow-guard {
                width: 100% !important;
                height: 100% !important;
                .margin {
                  border: none;
                  // border-left: 1.5px solid #4f4f86a6;
                  border-right: 2px solid #4f4f86;
                  width: 55px !important;
                  height: 100% !important;
                }
                .monaco-scrollable-element {
                  width: calc(100% - 135px) !important;
                }
                .minimap {
                  width: 80px !important;
                }
              }
            }
          }
        }
      }
    }
  }

  #leftContainer {
    width: 100%;
    height: 100%;
    text-align: left;
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
  }
  #rightContainer {
    width: 100%;
    height: 100%;
    text-align: left;
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
  }

  .monaco_editor_container {
    width: 100% !important;
  }

  .view-lines {
    text-align: left;
    margin: 0px 0px 0px 0px;
  }
}
</style>
