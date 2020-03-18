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
    </div>
    <div class="main-panel">
      <div class="left-panel">
        <img
          @click="studioBtn"
          class="studio-btn"
          src="./assets/images/studio.svg"
          title="studio"
        />
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
            <div
              class="file-name"
              :key="title.index"
              v-for="title in openTitles"
            >
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
          <input
            style="display:none"
            type="file"
            @change="onFileSelected"
            id="getfile"
            ref="fileInput"
          />

          <div v-show="isProjectLoaded" class="main-menu">
            <home
              ref="home"
              @iframe-changed="iframeChanged"
              @componentSelected="componentSelected"
              @stack-push="stackPush"
              @loadData="loadData"
              @open-code="openCode"
              @every-select="setEverySelectedElement"
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
          <div v-show="!isProjectLoaded" class="empty-iframe">
            <div class="sample-component">
              <img
                src="./assets/images/plus.svg"
                @click="addProject"
                class="sample-add-btn"
              />
            </div>
          </div>
        </div>
        <div class="row bottom-panel">
          <div v-show="isData" class="loadDataPanel">
            <div @mousedown="loaderResize" class="loader-bord"></div>
            <div class="studio-text-box">
              <span @click="testtt" class="studio-text">CodeReview</span>

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
                <div class="leftTitle">
                  <vue-custom-scrollbar class="left-title-scroll">
                    <div
                      class="left-title"
                      v-for="leftTitle in leftTitlesArr"
                      :key="leftTitle.id"
                    >
                      <div @click="changeSourceTab" class="left-title-text">
                        {{ leftTitle.text }}
                      </div>
                      <img
                        @click="closeSource"
                        class="close-icon"
                        src="./assets/images/close.svg"
                      />
                    </div>
                  </vue-custom-scrollbar>
                </div>
                <div class="leftSource" id="leftSource">
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
                </div>
              </div>
              <div @mousedown="moveBorder" class="center-border"></div>
              <div class="right-box">
                <div class="rightTitle">
                  <vue-custom-scrollbar class="right-title-scroll">
                    <div
                      class="right-title"
                      v-for="rightTitle in rightTitlesArr"
                      :key="rightTitle.id"
                    >
                      <div @click="changeSourceTab" class="right-title-text">
                        {{ rightTitle.text }}
                      </div>

                      <img
                        @click="closeSource"
                        class="close-icon"
                        src="./assets/images/close.svg"
                      />
                    </div>
                  </vue-custom-scrollbar>
                </div>
                <div class="rightSource" id="rightSource">
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
                </div>
              </div>
            </div>
          </div>
          <span class="fileTitle" @click="clickSource" name="html"
            >Code Editor</span
          >
        </div>
      </div>
      <div class="right-panel">
        <div class="right-top-panel">
          <layout
            ref="layout"
            @userSelectedWidth="userSelectedWidth"
            @stick="layoutStick"
            @manualSelet="manualSelet"
            class="layout"
          />
        </div>
        <div v-show="isProjectLoaded" class="right-bottom-panel">
          <div class="tree-name-wrapper">
            <!-- <div class="tree-top-border"></div>
            <div class="tree-left-border"></div>
            <div class="tree-right-border"></div>
            <div class="tree-bottom-border"></div> -->
            <!-- resize용 border -->
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
            <fileContent
              @reset-titles="resetAllTitle"
              @dbl-click="setSelectedFile"
              @folder-click="folderClick"
              @right-click="openFileContext"
              v-show="!showhtml"
              class="filecontent"
              ref="filecontent"
            />
            <div class="testYap" data-event="zzzzz"></div>
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
      @newpage="newPageInput"
      @addproject="addProject"
      v-show="isFileTab"
      class="filelist-tab list-tab"
    />
    <editList
      @undo="undoWork"
      @redo="redoWork"
      v-show="isEditTab"
      class="editlist-tab list-tab"
    />
    <saveList
      @save-all="saveAll"
      v-show="isSaveTab"
      class="savelist-tab list-tab"
    />
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
      <div @click="deleteTitle" class="delete">Delete</div>
    </div>
    <div v-show="isContextMenu2" class="fileContext">
      <div @click="loadFile" class="open">Open</div>
      <div class="copy">Copy</div>
      <div @click="renameFile" class="rename">Rename</div>
      <div @click="deletePopUp" class="delete">Delete</div>
    </div>
    <div v-show="isContextMenu3" class="folderContext">
      <div class="addFolder">Add Folder</div>
      <div @click="addFile" class="addFile">Add File</div>
      <div class="rename">Rename</div>
    </div>
    <div v-if="isPopUpActive" class="popup">
      <div class="bg" @click="deactivatePopUp" />
      <div class="input-box">
        <div v-if="firstPopUp" class="new-project" @click="newProject">
          <img class="project-btn-icon" src="./assets/images/delete.svg" />
          <div class="new-project-text">새로운 프로젝트</div>
        </div>
        <div @click="openProject" v-if="firstPopUp" class="open-project">
          <img class="project-btn-icon" src="./assets/images/delete.svg" />
          <div class="open-project-text">폴더 열기</div>
        </div>
        <div @click="openServer" v-if="firstPopUp" class="open-server">
          <img class="project-btn-icon" src="./assets/images/delete.svg" />
          <div class="open-server-text">서버에서 열기</div>
        </div>

        <img
          v-if="secondPopUp"
          @click="backToFirst"
          class="back"
          src="./assets/images/back.svg"
        />
        <input
          v-if="secondPopUp"
          class="new-project-name"
          placeholder="프로젝트 제목"
        />
        <div
          @click="createNewProject"
          v-if="secondPopUp"
          class="new-project-create"
        >
          확인
        </div>
        <div
          @click="cancleProject"
          v-if="secondPopUp"
          class="new-project-cancel"
        >
          취소
        </div>
        <img
          v-if="thirdPopUp"
          @click="backToFirst"
          class="back"
          src="./assets/images/back.svg"
        />
        <div v-if="thirdPopUp" class="project-wrapper">
          <vue-custom-scrollbar class="project-scroll-area">
            <div
              :key="index"
              @click="selectProject"
              v-for="(title, index) in projectTitles"
              class="project-list"
            >
              {{ title.title }}
            </div>
          </vue-custom-scrollbar>
        </div>

        <input
          style="display:none;"
          type="file"
          id="flup"
          ref="folderInput"
          @change="onFolderSelected"
          webkitdirectory
          mozdirectory
          msdirectory
          odirectory
          directory
          multiple
        />
      </div>
    </div>
    <div v-if="isPopUp2Active" class="popup2">
      <div class="bg" @click="deactivatePopUp2" />
      <div class="input-wrapper">
        <input
          @input="titleInput"
          class="title-input"
          placeholder="페이지 제목"
        />
        <div @click="newPage" class="o-btn">확인</div>
        <div @click="closeInput" class="c-btn">취소</div>
      </div>
    </div>
    <div v-if="isPopUp3Active" class="popup3">
      <div class="bg" @click="deactivatePopUp3" />

      <div class="popup-wrapper">
        <div class="delete-text"></div>
        <div class="btn-wrapper">
          <div @click="deleteFile" class="o-btn">확인</div>
          <div @click="deactivatePopUp3" class="c-btn">취소</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiUrl from './modules/api-url'
import Vue from 'vue'
import axios from 'axios'
import Ruler from 'vue-component-ruler'
import 'vue-component-ruler/dist/ruler.min.css'
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
      zzzzz: 3,
      isProjectLoaded: false,
      isUsed: false,
      everySelectedElement: null,
      firstPopUp: true,
      projectFileList: [],
      isSetEditor2: false,
      cssLink: [],
      usedPair: null,
      stylePair: [],
      secondPopUp: false,
      thirdPopUp: false,
      folder_seq: [],
      isPopUpActive: false,
      isServer: false,
      isProject: null,
      deleteFileNum: null,
      isPopUp2Active: false,
      isPopUp3Active: false,
      isEditor1Load: null,
      isEditor2Load: null,
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
      css: '',
      range: [0, 100],
      payload: '',
      dataPayload: '',
      openTitles: [],
      data: '',
      homeLayoutLocation: '',
      newTitle: null,
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
      manualScript: null,
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
      leftSourceIndex: 1,
      rightSourceIndex: 1,
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
      titles: [],
      editorNum: 1,
      isTitle: false,
      copyTitle: null,
      trees: [
        {
          text: 'Files'
        },
        {
          text: 'HTML'
        }
      ],
      showhtml: false,
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
      isContextMenu2: false,
      isContextMenu3: false,
      titleId: 0,
      selectedTitle: null,
      selectedFile: null,
      selectedFolder: null,
      showCode: true,
      codeReview: new Map(),
      overView: new Map(),
      editor1: '',
      editor2: '',
      idSelected: 'board',
      vsMode: '',
      select: null,
      currentRightTab: null,
      currentLeftTab: null,
      moveLine: false,
      initialBorder: 0,
      projectTitles: [],
      htmlTitles: [],
      cssTitles: [],
      jsTitles: [],
      imgTitles: [],
      leftTitles: null,
      rightTitles: null,
      leftTitlesArr: [],
      rightTitlesArr: []
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
    this.currentRightTab = 0
    this.everySelectedElement = new Set()
    this.currentLeftTab = 0
    if (this.enabled) {
      this.vsMode = 'vs-dark'
    } else {
      this.vsMode = 'vs'
    }
    let container = document.getElementById('leftContainer')

    this.code = document.getElementById('filecontainer')
    this.editor1 = monaco.editor.create(
      document.getElementById('leftContainer'),
      {
        id: 'editorMonaco1',
        value: 'html 파일을 로드해주세요.',
        language: 'html',
        theme: 'vs-dark',
        height: 100,
        accessibilityPageSize: 4,
        lineDecorationsWidth: 10,
        mouseWheelZoom: true
      }
    )
    this.editor1.onMouseDown(e => {
      console.log('안녕')

      var elem = ''
      var length = this.editor1.getValue().split('\n').length
      console.log(this.editor1.getValue().split('\n').length)

      var clickElement = ''
      var isEnd = 1
      for (var i = e.target.position.lineNumber - 1; i >= 0; i--) {
        if (isEnd > 0) {
          var temp = ''
          if (i == e.target.position.lineNumber - 1) {
            var j = e.target.position.column - 2
            console.log(j)
            while (j > 0) {
              if (this.editor1.getValue().split('\n')[i][j] == '<') {
                clickElement =
                  this.editor1.getValue().split('\n')[i][j] + clickElement

                if (temp != '/') {
                  isEnd--
                }
                if (isEnd < 2) {
                  isEnd--
                  break
                }
                temp = this.editor1.getValue().split('\n')[i][j]
                j--
              } else if (this.editor1.getValue().split('\n')[i][j] == '/') {
                clickElement =
                  this.editor1.getValue().split('\n')[i][j] + clickElement
                temp = this.editor1.getValue().split('\n')[i][j]
                isEnd++
                j--
              } else {
                console.log(this.editor1.getValue().split('\n')[i][j])
                clickElement =
                  this.editor1.getValue().split('\n')[i][j] + clickElement
                temp = this.editor1.getValue().split('\n')[i][j]
                j--
              }
            }
          } else {
            var j = this.editor1.getValue().split('\n')[i].length - 1
            while (j > 0) {
              if (this.editor1.getValue().split('\n')[i][j] == '<') {
                clickElement =
                  this.editor1.getValue().split('\n')[i][j] + clickElement

                if (temp != '/') {
                  isEnd--
                }
                if (isEnd < 2) {
                  isEnd--
                  break
                }
                temp = this.editor1.getValue().split('\n')[i][j]
                j--
              } else if (this.editor1.getValue().split('\n')[i][j] == '/') {
                clickElement =
                  this.editor1.getValue().split('\n')[i][j] + clickElement
                temp = this.editor1.getValue().split('\n')[i][j]
                isEnd++
                j--
              } else {
                console.log(this.editor1.getValue().split('\n')[i][j])
                clickElement =
                  this.editor1.getValue().split('\n')[i][j] + clickElement
                temp = this.editor1.getValue().split('\n')[i][j]
                j--
              }
            }
          }
        } else {
          break
        }
      }
      var copyclickElement = clickElement
      var check =
        '</' +
        copyclickElement
          .split('>')[0]
          .replace('<', '')
          .split(' ')[0] +
        '>'

      var isInclude = true
      var bracketslash = clickElement.match(/<[/]/g)
      var bracket = clickElement.match(/</g)
      console.log(bracketslash)
      if (!clickElement.match(/<[/]/g)) {
        console.log('짜란')
      }
      console.log(clickElement)
      console.log(bracket)
      for (var i = e.target.position.lineNumber - 1; i < length; i++) {
        if (isInclude) {
          if (i == e.target.position.lineNumber - 1) {
            var j = e.target.position.column - 1
            while (j < this.editor1.getValue().split('\n')[i].length) {
              clickElement += this.editor1.getValue().split('\n')[i][j]
              if (clickElement.match(/</g)) {
                var bracket = clickElement.match(/</g).length
              } else {
                var bracket = 0
              }
              if (clickElement.match(/<[/]/g)) {
                var bracketslash = clickElement.match(/<[/]/g).length
              } else {
                var bracketslash = 0
              }
              if (bracketslash == bracket - bracketslash) {
                console.log('끝났다')
                isInclude = false
                break
              }
              j++
            }
          } else {
            var j = 0
            while (j < this.editor1.getValue().split('\n')[i].length) {
              clickElement += this.editor1.getValue().split('\n')[i][j]
              if (clickElement.match(/</g)) {
                var bracket = clickElement.match(/</g).length
              } else {
                var bracket = 0
              }
              if (clickElement.match(/<[/]/g)) {
                var bracketslash = clickElement.match(/<[/]/g).length
              } else {
                var bracketslash = 0
              }
              if (bracketslash == bracket - bracketslash) {
                isInclude = false
                break
              }
              j++
            }
          }
        }
        // }
      }

      var clickDom = document.createElement('div')
      clickDom.innerHTML = clickElement.substring(0, clickElement.length - 2)

      for (var i = 0; i < e.target.position.lineNumber; i++) {
        var j = 0
        if (i != e.target.position.lineNumber) {
          while (
            typeof this.editor1.getValue().split('\n')[i][j] !== 'undefined'
          ) {
            elem += this.editor1.getValue().split('\n')[i][j]
            j++
          }
        } else {
          while (j < e.target.position.column - 1) {
            elem += this.editor1.getValue().split('\n')[i][j]
            j++
          }
        }
      }
      console.log(elem)
      var newDIV = document.createElement('div')
      newDIV.innerHTML = `<!-- skip_nav -->
   <div class="sknav">
      <a href="#contents" class="sknavi">콘텐츠 바로가기</a>
   </div>
   <!-- // skip_nav -->

   <!-- wrap -->
   <div id="wrap">
      <!-- container -->
      <div id="container">

         <!-- nav -->
         <nav id="nav">
            <div class="user_box">
          </nav>`
      console.log(newDIV)
      var selectedDom = newDIV.children[newDIV.children.length - 1]

      console.log(clickDom)

      console.log(selectedDom)

      console.log(clickDom.children[0])
      console.log('들어갑니다')
      selectedDom = this.findChildren(selectedDom, clickDom)
      console.log('나왔습니다')

      console.log(selectedDom)

      var elem = e.target.element.innerHTML.replace(/&nbsp;/gi, ' ')
      elem = elem.replace(/amp;/gi, '')
    })

    const percentBar = document.querySelector('#board')
    let compStyles = window.getComputedStyle(percentBar)
    for (var key in percentBar.style) {
      if (percentBar.style[key] != '') {
        console.log(`${key} : ${compStyles.getPropertyValue[key]}`)
      }
    }

    this.editor2 = monaco.editor.create(
      document.getElementById('rightContainer'),
      {
        value: 'css 파일을 로드해주세요.',
        language: 'css',
        theme: 'vs-dark',
        height: 100,
        accessibilityPageSize: 4,
        lineDecorationsWidth: 10,
        mouseWheelZoom: true
      }
    )
    var myBinding1 = this.editor1.onDidChangeModelContent(e => {
      let i
      let j
      let style = ''
      let link = $('iframe')
        .get(0)
        .contentWindow.document.head.getElementsByTagName('link')
      if (this.cssLink !== link) {
        // 링크가 추가되거나 삭제된 경우 서버에 통신해야함.
        this.cssLink = link
      }
      for (i = 0; i < link.length; i++) {
        for (j = 0; j < link[i].attributes.href.value.split('/').length; j++) {
          if (link[i].attributes.href.value.split('/')[j] === '..') {
            console.log(
              // ../css/.css 일때 project/css/.css로 변환
              this.isEditor1Load.file_path.split('/')[0] +
                '/' +
                link[i].attributes.href.value.split('/')[1] +
                '/' +
                link[i].attributes.href.value.split('/')[2]
            )
          }
        }
      }
      for (i = 0; i < this.usedPair.length; i++) {
        for (j = 0; j < this.cssTitles.length; j++) {
          if (this.cssTitles[j].file_seq === this.usedPair[i].css_file_seq) {
            style += this.cssTitles[j].contents
          }
        }
      }
      $('iframe').get(0).contentWindow.document.documentElement.innerHTML =
        this.editor1.getValue() + '<style>' + style + '</style>'
      for (i = 0; i < this.htmlTitles.length; i++) {
        if (this.htmlTitles[i] === this.isEditor1Load) {
          this.htmlTitles[i].contents = this.editor1.getValue()
          this.htmlTitles[i].isEdited = true
        }
      }
      this.$refs.filecontent.setFiles(
        this.htmlTitles,
        this.cssTitles,
        this.jsTitles
      )
      this.$refs.overview.printHomeDocument()
    })

    var oScript = document.createElement('style')
    oScript.setAttribute('id', 'jumsimmuk')
    oScript.setAttribute('lang', 'scss')
    oScript.type = 'text/css'
    document.getElementsByTagName('head')[0].appendChild(oScript)

    var myBinding2 = this.editor2.onDidChangeModelContent(e => {
      if (this.isSetEditor2) {
        console.log('set')
        axios({
          ...apiUrl.file.pair,
          params: {
            css_file_seq: this.isEditor2Load.file_seq
          }
        }).then(res => {
          if (res.data.responseCode === 'SUCCESS') {
            console.log(res.data)
            let i
            for (i = 0; i < res.data.data.length; i++) {
              if (
                res.data.data[i].html_file_seq === this.isEditor1Load.file_seq
              ) {
                console.log('111')
                this.isUsed = true
              } else {
                console.log('2222')
                this.isUsed = false
              }
            }
          } else {
            console.log('3333')
            this.isUsed = false
          }
        })
        this.isSetEditor2 = false
      } else {
        let i
        for (i = 0; i < this.cssTitles.length; i++) {
          if (this.cssTitles[i] === this.isEditor2Load) {
            this.cssTitles[i].contents = this.editor2.getValue()
            this.cssTitles[i].isEdited = true
            break
          }
        }
        this.$refs.filecontent.setFiles(
          this.htmlTitles,
          this.cssTitles,
          this.jsTitles
        )
        if (this.isUsed) {
          let cssCode = ''
          for (
            i = 0;
            i <
            this.stylePair.find(c => c.html === this.isEditor1Load.file_seq).css
              .length;
            i++
          ) {
            cssCode += this.cssTitles.find(
              t =>
                t.file_seq ===
                this.stylePair.find(c => c.html === this.isEditor1Load.file_seq)
                  .css[i]
            ).contents
          }
          console.log(cssCode)
          $('iframe')
            .get(0)
            .contentWindow.document.getElementsByTagName(
              'style'
            )[0].innerHTML = cssCode
        }
      }
    })

    this.isData = false

    this.$refs.sitemap.loadSitemap(this.titles)
    let htmltree = document.querySelector('.tree-name')
    htmltree.style.backgroundColor = '#4e4e5c'

    $(window).resize(() => {
      this.$refs.home.windowResized()
    })
    document.addEventListener('click', e => {
      if (e.button === 0) {
        this.isContextMenu = false
        this.isContextMenu2 = false
        this.isContextMenu3 = false
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
      if (e.which === 83 && this.isCtrl) {
        e.preventDefault()
        if (this.isData) {
          const iterator1 = this.everySelectedElement[Symbol.iterator]()
          // 파일 업데이트
          if (this.isEditor1Load !== null && this.isEditor2Load !== null) {
            let i
            for (i = 0; i < this.everySelectedElement.size; i++) {
              let val = iterator1.next().value
              $(val).css('border', '')
              $(val).css('border-radius', '')
            }
            axios({
              ...apiUrl.file.update,
              data: {
                files: [
                  {
                    file_seq: this.isEditor1Load.file_seq,
                    folder_seq: this.isEditor1Load.folder_seq,
                    file_name: this.isEditor1Load.file_name,
                    file_path: this.isEditor1Load.file_path,
                    file_type: this.isEditor1Load.file_type,
                    contents:
                      $('iframe')
                        .get(0)
                        .contentWindow.document.documentElement.innerHTML.split(
                          '<style>'
                        )[0] + '</body>'
                  },
                  {
                    file_seq: this.isEditor2Load.file_seq,
                    folder_seq: this.isEditor2Load.folder_seq,
                    file_name: this.isEditor2Load.file_name,
                    file_path: this.isEditor2Load.file_path,
                    file_type: this.isEditor2Load.file_type,
                    contents: this.editor2.getValue()
                  }
                ]
              }
            }).then(res => {
              console.log(res)
            })
          } else if (
            this.isEditor1Load !== null &&
            this.isEditor2Load === null
          ) {
            let i
            for (i = 0; i < this.everySelectedElement.size; i++) {
              let val = iterator1.next().value
              $(val).css('border', '')
              $(val).css('border-radius', '')
            }
            console.log(
              $('iframe').get(0).contentWindow.document.documentElement
                .innerHTML
            )
            axios({
              ...apiUrl.file.update,
              data: {
                files: [
                  {
                    file_seq: this.isEditor1Load.file_seq,
                    folder_seq: this.isEditor1Load.folder_seq,
                    file_name: this.isEditor1Load.file_name,
                    file_path: this.isEditor1Load.file_path,
                    file_type: this.isEditor1Load.file_type,
                    contents:
                      $('iframe')
                        .get(0)
                        .contentWindow.document.documentElement.innerHTML.split(
                          '<style>'
                        )[0] + '</body>'
                  }
                ]
              }
            }).then(res => {
              console.log(res)
            })
          } else if (
            this.isEditor1Load === null &&
            this.isEditor2Load !== null
          ) {
            axios({
              ...apiUrl.file.update,
              data: {
                files: [
                  {
                    file_seq: this.isEditor2Load.file_seq,
                    folder_seq: this.isEditor2Load.folder_seq,
                    file_name: this.isEditor2Load.file_name,
                    file_path: this.isEditor2Load.file_path,
                    file_type: this.isEditor2Load.file_type,
                    contents: this.editor2.getValue()
                  }
                ]
              }
            }).then(res => {
              console.log(res)
            })
          }
        }
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
        loader.style.height =
          this.initialHeight - (e.clientY - this.initialY) + 'px'
        // document.getElementById('monacoContainer').removeChildAll()
        this.$nextTick(() => {
          bord.style.top = parseInt(getComputedStyle(loader).top) + 'px'
        })
        document.getElementsByClassName(
          'monaco-editor no-user-select  showUnused vs-dark'
        )[0].style.height = loader.style.height
        console.log(
          document.getElementsByClassName(
            'monaco-editor no-user-select  showUnused vs-dark'
          )[0].style.height
        )
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

    var manual = {}
    manual['blur'] = '이미지의 블러 효과를 설정합니다.'
    manual['brightness'] = '이미지의 고 어두움 정도를 설정합니다.'
    manual['contrast'] = '이미지의 대비를 설정합니다.'
    manual['grayscale'] = '이미지의 그레이스케일를 설정합니다.'
    manual['hue'] = '이미지의 색조를 설정합니다.'
    manual['invert'] = '이미지를 반전합니다.'
    manual['opacity'] = '이미지의 투명도를 설정합니다.'
    manual['saturate'] = '이미지의 채도를 설정합니다.'
    manual['sepia'] = '이미지의 세피아 효과를 설정합니다.'

    this.manualScript = manual
  },
  methods: {
    iframeChanged(change) {
      this.editor1.setValue(change)
    },
    setSelectedFile(e) {
      this.selectedFile = e.target
      this.loadFile(e)
    },
    setEverySelectedElement(select) {
      this.everySelectedElement = select
    },
    resetAllTitle(html, css, js) {
      this.htmlTitles = html
      this.cssTitles = css
      this.jsTitles = js
    },
    saveAll() {
      let i
      let changedFile = []
      let payload
      for (i = 0; i < this.htmlTitles.length; i++) {
        if (this.htmlTitles[i].isEdited === true) {
          payload = this.htmlTitles[i]
          changedFile.push(payload)
        }
      }
      for (i = 0; i < this.cssTitles.length; i++) {
        if (this.cssTitles[i].isEdited === true) {
          payload = this.cssTitles[i]
          changedFile.push(payload)
        }
      }
      console.log(changedFile)

      axios({
        ...apiUrl.file.update,
        data: {
          files: changedFile
        }
      }).then(res => {
        console.log(res.data.message)
      })
    },
    addFile() {
      this.$refs.filecontent.addFile(
        this.isProject.title,
        this.selectedFolder,
        this.selectedFolder.textContent.trim().toLowerCase()
      )
    },
    deletePopUp() {
      console.log(this.selectedFile)
      this.isPopUp3Active = true
      this.$nextTick(() => {
        let text = document.querySelector('.delete-text')
        text.textContent = `${this.selectedFile.textContent.trim()}를 삭제하시겠습니까?`
      })
    },
    deleteFile() {
      this.isPopUp3Active = false
      let i
      if (this.selectedFile.textContent.split('.')[1].trim() === 'html') {
        for (i = 0; i < this.htmlTitles.length; i++) {
          if (
            this.htmlTitles[i].text === this.selectedFile.textContent.trim()
          ) {
            this.deleteFileNum = i
            axios({
              ...apiUrl.file.delete,
              data: {
                files: [
                  {
                    file_seq: this.htmlTitles[i].file_seq
                  }
                ]
              }
            }).then(res => {
              console.log(res)
              if (res.data.responseCode === 'SUCCESS') {
                this.$nextTick(() => {
                  this.htmlTitles.splice(this.deleteFileNum, 1)
                  this.titles.splice(this.deleteFileNum, 1)
                  this.$nextTick(() => {
                    this.$refs.filecontent.setFiles(
                      this.htmlTitles,
                      this.cssTitles,
                      this.jsTitles
                    )

                    this.$refs.sitemap.loadSitemap(this.titles)
                  })
                })

                console.log(res.data.message)
              }
            })
          }
        }
      } else if (this.selectedFile.textContent.split('.')[1].trim() === 'css') {
        for (i = 0; i < this.cssTitles.length; i++) {
          if (this.cssTitles[i].text === this.selectedFile.textContent.trim()) {
            this.deleteFileNum = i
            axios({
              ...apiUrl.file.delete,
              data: {
                files: [
                  {
                    file_seq: this.cssTitles[i].file_seq
                  }
                ]
              }
            }).then(res => {
              console.log(res)
              if (res.data.responseCode === 'SUCCESS') {
                this.$nextTick(() => {
                  this.cssTitles.splice(this.deleteFileNum, 1)
                  this.$nextTick(() => {
                    this.$refs.filecontent.setFiles(
                      this.htmlTitles,
                      this.cssTitles,
                      this.jsTitles
                    )
                  })
                })
              }
            })
          }
        }
      }
    },
    folderClick(e) {
      this.selectedFolder = e.target
      if (this.isContextMenu3) {
        this.isContextMenu3 = false
      } else {
        this.isContextMenu3 = true
        this.isContextMenu2 = false
        this.isContextMenu = false
        this.$nextTick(() => {
          let context = document.querySelector('.folderContext')
          context.style.left = e.clientX + 'px'
          context.style.top = e.clientY + 'px'
        })
      }
    },
    renameFile() {
      this.$refs.filecontent.focusInput(this.selectedFile)
    },
    findChildren(selectedDom, clickDom) {
      var childrenLength = selectedDom.children.length
      for (var i = 0; i < childrenLength; i++) {
        var stringDom = document.createElement('div')
        stringDom.appendChild(selectedDom.children[i])
        var B = document.createElement('div')
        B.appendChild(clickDom.children[0])
        console.log(B.innerHTML)
        console.log(stringDom.innerHTML)
        if (stringDom.innerHTML == B.innerHTML) {
          console.log('찾았다')
          return selectedDom
        } else {
          console.log('다르다')
          console.log(selectedDom)
          console.log(selectedDom.children[i])
          console.log(selectedDom.children[i].children)
          if (selectedDom.children[i].children.length != 0) {
            this.findChildren(selectedDom.children[i], clickDom)
          }
        }
      }
    },
    loadFile(e) {
      if (this.selectedFile.textContent.trim().split('.')[1] === 'html') {
        let i
        for (i = 0; i < this.htmlTitles.length; i++) {
          if (
            this.htmlTitles[i].text === this.selectedFile.textContent.trim()
          ) {
            if (this.isServer) {
              this.usedPair = this.htmlTitles[i].html_css_pair
              this.leftTitles.add(this.htmlTitles[i])
              this.isEditor1Load = this.htmlTitles[i]
              this.editor1.setValue(this.htmlTitles[i].contents)
              this.leftTitlesArr = Array.from(this.leftTitles)
            }
            this.isData = true
            break
          }
        }
        this.$nextTick(() => {
          let titles = document.querySelectorAll('.left-title')
          let j
          for (j = 0; j < titles.length; j++) {
            if (titles[j].textContent.trim() === this.htmlTitles[i].text) {
              titles[j].style.backgroundColor = '#545e66'
            } else {
              titles[j].style.backgroundColor = '#2c3134'
            }
          }
        })
      } else if (this.selectedFile.textContent.trim().split('.')[1] === 'css') {
        let i
        for (i = 0; i < this.cssTitles.length; i++) {
          if (this.cssTitles[i].text === this.selectedFile.textContent.trim()) {
            console.log('select')
            this.rightTitles.add(this.cssTitles[i])
            this.rightTitlesArr = Array.from(this.rightTitles)
            this.isSetEditor2 = true
            this.isEditor2Load = this.cssTitles[i]
            this.editor2.setValue(this.cssTitles[i].contents)
            this.isData = true
            break
          }
        }
        this.$nextTick(() => {
          let titles = document.querySelectorAll('.right-title')
          let j
          for (j = 0; j < titles.length; j++) {
            if (titles[j].textContent.trim() === this.cssTitles[i].text) {
              titles[j].style.backgroundColor = '#545e66'
            } else {
              titles[j].style.backgroundColor = '#2c3134'
            }
          }
        })
      } else if (this.selectedFile.textContent.trim().split('.')[1] === 'js') {
      }
    },
    openFileContext(e) {
      this.selectedFile = e.target
      if (this.isContextMenu2) {
        this.isContextMenu2 = false
      } else {
        this.isContextMenu2 = true
        this.isContextMenu = false
        this.isContextMenu3 = false
        this.$nextTick(() => {
          let context = document.querySelector('.fileContext')
          context.style.left = e.clientX + 'px'
          context.style.top = e.clientY + 'px'
        })
      }
    },
    selectProject(e) {
      this.folder_seq = []
      let i
      for (i = 0; i < this.projectTitles.length; i++) {
        if (this.projectTitles[i].title === e.target.textContent.trim()) {
          // 해당 프로젝트의 파일 받아오기
          this.isProject = this.projectTitles[i]
          axios({
            ...apiUrl.project.get,
            params: {
              project_seq: this.projectTitles[i].seq
            }
          }).then(res => {
            console.log(res)
            if (res.data.responseCode === 'SUCCESS') {
              this.isProjectLoaded = true
              // this.folders = res.data.data.folders
              let i
              let folder
              let j
              let k
              let title
              let pair
              for (i = 0; i < res.data.data.folders.length; i++) {
                folder = {
                  type: res.data.data.folders[i].folder_name,
                  seq: res.data.data.folders[i].folder_seq
                }
                this.folder_seq.push(folder)
                for (j = 0; j < res.data.data.folders[i].files.length; j++) {
                  let css_list = []
                  title = res.data.data.folders[i].files[j]
                  title.isEdited = false
                  title.text =
                    res.data.data.folders[i].files[j].file_name +
                    '.' +
                    res.data.data.folders[i].files[j].file_type
                  if (res.data.data.folders[i].folder_name === 'html') {
                    if (
                      res.data.data.folders[i].files[j].html_css_pair.length > 0
                    ) {
                      for (
                        k = 0;
                        k <
                        res.data.data.folders[i].files[j].html_css_pair.length;
                        k++
                      ) {
                        css_list.push(
                          res.data.data.folders[i].files[j].html_css_pair[k]
                            .css_file_seq
                        )
                      }
                      pair = {
                        html: res.data.data.folders[i].files[j].file_seq,
                        css: css_list
                      }
                      this.stylePair.push(pair)
                    }
                    this.titles.push(title)
                    this.htmlTitles.push(title)
                  } else if (res.data.data.folders[i].folder_name === 'css') {
                    this.cssTitles.push(title)
                  } else if (res.data.data.folders[i].folder_name === 'js') {
                    this.jsTitles.push(title)
                  }
                }
              }
              this.$refs.filecontent.setFolderSeq(this.folder_seq)
              this.$refs.filecontent.setStylePair(this.stylePair)
              this.$refs.filecontent.setFiles(
                this.htmlTitles,
                this.cssTitles,
                this.jsTitles
              )
              this.$refs.sitemap.loadSitemap(this.titles)
            }
          })
          this.isPopUpActive = false
          break
        }
      }
    },
    closeInput() {
      this.isPopUp2Active = false
    },
    titleInput(e) {
      this.newTitle = e.target.value
    },
    onFolderSelected(e) {
      this.htmlTitles = []
      this.cssTitles = []
      this.jsTitles = []
      this.imgTitles = []
      this.titles = []
      this.projectTitles = []
      this.openTitles = []
      this.leftTitles = new Set()
      this.rightTitles = new Set()
      this.leftTitlesArr = []
      this.rightTitlesArr = []
      var fs = require('fs')
      var file = require('file-system')
      console.log(file)
      let data = 'eeeeeeeeeeeeeeee'

      let i
      for (i = 0; i < e.target.files.length; i++) {
        this.processFile(e.target.files[i])
      }
      this.isPopUpActive = false
      this.$refs.sitemap.loadSitemap(this.titles)
      this.$refs.filecontent.setFiles(
        this.htmlTitles,
        this.cssTitles,
        this.jsTitles
      )
    },
    processFile(file) {
      var reader = new FileReader()
      reader.onload = e => {
        let title = file.name.split('.')
        var payload = {
          text: file.name,
          code: reader.result,
          type: title[1]
        }
        if (title[1] === 'html') {
          title = {
            text: file.name.replace('.html', ''),
            code: reader.result
          }
          this.htmlTitles.push(payload)
          this.titles.push(title)
        } else if (title[1] === 'css') {
          this.cssTitles.push(payload)
        } else if (title[1] === 'js') {
          this.jsTitles.push(payload)
        } else if (title[1] === 'png') {
          this.imgTitles.push(payload)
        }
      }
      reader.readAsText(file)
    },
    openServer() {
      this.isServer = true
      this.firstPopUp = false
      this.secondPopUp = false
      this.thirdPopUp = true
      axios({
        ...apiUrl.project.list,
        params: {
          user_id: 'lsm'
        }
      }).then(res => {
        console.log(res)
        if (res.data.responseCode === 'SUCCESS') {
          let i
          this.htmlTitles = []
          this.cssTitles = []
          this.jsTitles = []
          this.imgTitles = []
          this.titles = []
          this.projectTitles = []
          this.openTitles = []
          this.leftTitles = new Set()
          this.rightTitles = new Set()
          this.leftTitlesArr = []
          this.rightTitlesArr = []
          this.isEditor1Load = null
          this.isEditor2Load = null
          this.editor1.setValue('html 파일을 로드해주세요.')
          this.editor2.setValue('css 파일을 로드해주세요.')
          $('iframe').get(0).contentWindow.document.documentElement.innerHTML =
            '파일을 로드해주세요.'
          for (i = 0; i < res.data.data.length; i++) {
            let title = {
              seq: res.data.data[i].project_seq,
              title: res.data.data[i].project_name
            }
            this.projectTitles.push(title)
          }
        }
      })
    },
    createNewProject() {
      let title = document.querySelector('.new-project-name')
      axios({
        ...apiUrl.project.create,
        data: {
          projects: [
            {
              user_seq: 2,
              project_name: title.value
            }
          ]
        }
      }).then(res => {
        console.log(res)
        if (res.data.responseCode === 'SUCCESS') {
          console.log(res.data)
          // 프로젝트 seq 받아서 저장하기
          this.htmlTitles = []
          this.cssTitles = []
          this.jsTitles = []
          this.imgTitles = []
          this.titles = []
          this.projectTitles = []
          this.openTitles = []
          this.leftTitles = new Set()
          this.rightTitles = new Set()
          this.leftTitlesArr = []
          this.rightTitlesArr = []
          this.isEditor1Load = null
          this.isEditor2Load = null
          this.editor1.setValue('html 파일을 로드해주세요.')
          this.editor2.setValue('css 파일을 로드해주세요.')
          $('iframe').get(0).contentWindow.document.documentElement.innerHTML =
            ''
          this.$nextTick(() => {
            let project = {
              title: res.data.data[0].project_name,
              seq: res.data.data[0].project_seq
            }
            console.log(project)
            this.isProject = project
            console.log(this.isProject)
            let folder_seq = []
            let payload
            let i
            for (i = 0; i < res.data.data[0].folders.length; i++) {
              payload = {
                type: res.data.data[0].folders[i].folder_name,
                seq: res.data.data[0].folders[i].folder_seq
              }
              folder_seq.push(payload)
            }
            console.log(folder_seq)
            this.$refs.filecontent.setFolderSeq(folder_seq)
          })
        }
      })
      this.isPopUpActive = false
    },
    cancleProject() {
      this.isPopUpActive = false
    },
    openProject() {
      this.isServer = false
      this.$refs.folderInput.click()
    },
    backToFirst() {
      this.secondPopUp = false
      this.firstPopUp = true
      this.thirdPopUp = false
    },
    newProject() {
      this.isServer = true
      this.firstPopUp = false
      this.secondPopUp = true
      this.thirdPopUp = false
      console.log('1111111q')
      console.log(this.secondPopUp)
    },
    activatePopUp() {
      this.isPopUpActive = true
    },
    deactivatePopUp() {
      this.isPopUpActive = false
    },
    deactivatePopUp2() {
      this.isPopUp2Active = false
    },
    deactivatePopUp3() {
      this.isPopUp3Active = false
    },
    addProject() {
      this.activatePopUp()
      this.secondPopUp = false
      this.firstPopUp = true
      this.thirdPopUp = false
    },
    onFileSelected(e) {
      var file = e.target
      var fileList = file.files
      // 읽기
      var reader = new FileReader()
      // console.log(reader)
      //로드 한 후
      var vm = this
      reader.readAsDataURL(fileList[0])
      reader.onload = function() {
        vm.onFileApply(reader.result)
      }
      this.imageLoder = true
    },
    onFileApply(submit) {
      console.log(submit)
      let panel = document.querySelector('.main-center-panel')
      let img = document.createElement('img')
      img.src = submit
      panel.insertBefore(img, panel.childNodes[0])
      // for (let payload of this.payload) {
      //   this.submitSorce.payload = payload
      //   this.submitSorce.style = 'background-image'
      //   this.submitSorce.value = submit
      //   this.submitSorce.change = 1
      //   // this.$emit('userSelectedWidth', this.submitSorce)
      // }
    },
    testtt(e) {
      console.log(
        window.parent.document
          .getElementsByTagName('body')[0]
          .querySelector('.testYap').dataset.event
      )
      // this.currentRightTab = 0
      // this.currentLeftTab = 0
      // let leftTitle = document.querySelector('.left-title')
      // let rightTitle = document.querySelector('.right-title')
      // leftTitle.style.backgroundColor = '#3f3f3f'
      // rightTitle.style.backgroundColor = '#3f3f3f'
      // if (this.enabled) {
      //   this.vsMode = 'vs-dark'
      // } else {
      //   this.vsMode = 'vs'
      // }
      // console.log(monaco.editor)
      // let container = document.getElementById('leftContainer')

      // this.code = document.getElementById('filecontainer')
      console.log('나와라참')
      console.log($('iframe').get(0).contentWindow.document.body.innerHTML)
      console.log(
        $('iframe')
          .get(0)
          .contentWindow.document.getElementsByTagName('head')[0]
      )
      console.log(
        $('iframe')
          .get(0)
          .contentWindow.document.getElementsByTagName('style')[0].innerHTML
      )
      console.log($('iframe'))
      console.log($('iframe').get(0).parentElement)
    },
    closeSource(e) {
      if (
        e.target.parentElement.children[0].textContent.trim().split('.')[1] ===
        'html'
      ) {
        let i
        for (i = 0; i < this.leftTitlesArr.length; i++) {
          if (
            this.leftTitlesArr[i].text ===
            e.target.parentElement.children[0].textContent.trim()
          ) {
            this.leftTitles.delete(this.leftTitlesArr[i])
            this.leftTitlesArr.splice(i, 1)
            if (this.leftTitlesArr.length === 0) {
              this.isEditor1Load = null
              this.editor1.setValue('파일오픈')
            } else if (i === this.leftTitlesArr.length) {
              this.isEditor1Load = this.leftTitlesArr[i - 1]
              this.editor1.setValue(this.leftTitlesArr[i - 1].contents)
            } else {
              this.isEditor1Load = this.leftTitlesArr[i]
              this.editor1.setValue(this.leftTitlesArr[i].contents)
            }
          }
        }
      } else if (
        e.target.parentElement.children[0].textContent.trim().split('.')[1] ===
        'css'
      ) {
        let i
        for (i = 0; i < this.rightTitlesArr.length; i++) {
          if (
            this.rightTitlesArr[i].text ===
            e.target.parentElement.children[0].textContent.trim()
          ) {
            this.rightTitles.delete(this.rightTitlesArr[i])
            this.rightTitlesArr.splice(i, 1)
            if (this.rightTitlesArr.length === 0) {
              this.isEditor2Load = null
              this.editor2.setValue('파일오픈')
            } else if (i === this.rightTitlesArr.length) {
              this.isEditor2Load = this.rightTitlesArr[i - 1]
              this.editor2.setValue(this.rightTitlesArr[i - 1].contents)
            } else {
              this.isEditor2Load = this.rightTitlesArr[i]
              this.editor2.setValue(this.rightTitlesArr[i].contents)
            }
          }
        }
      }
    },
    changeSourceTab(e) {
      if (e.target.textContent.trim().split('.')[1] === 'html') {
        let i
        let titles = document.querySelectorAll('.left-title')
        for (i = 0; i < this.leftTitlesArr.length; i++) {
          if (this.leftTitlesArr[i].text === e.target.textContent.trim()) {
            this.isEditor1Load = this.leftTitlesArr[i]
            this.usedPair = this.leftTitlesArr[i].html_css_pair
            console.log(this.leftTitlesArr)
            this.editor1.setValue(this.leftTitlesArr[i].contents)
            titles[i].style.backgroundColor = '#545e66'
          } else {
            titles[i].style.backgroundColor = '#2c3134'
          }
        }
      } else if (e.target.textContent.trim().split('.')[1] === 'css') {
        let i
        let titles = document.querySelectorAll('.right-title')
        for (i = 0; i < this.rightTitlesArr.length; i++) {
          if (this.rightTitlesArr[i].text === e.target.textContent.trim()) {
            this.isEditor2Load = this.rightTitlesArr[i]
            this.editor2.setValue(this.rightTitlesArr[i].contents)
            titles[i].style.backgroundColor = '#545e66'
          } else {
            titles[i].style.backgroundColor = '#2c3134'
          }
        }
      }
    },
    generateCode(id) {
      this.idSelected = id
      this.code = document.getElementById(id).innerHTML
      console.log(this.code)
      // editor.setValue(this.code)
      this.editor1.setValue(this.code)
      document.getElementById(id).innerHTML = this.editor1.getValue()
    },
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
        code: this.titles[i].code
      }
      this.titles.push(payload)
      let editor = document.querySelector('#board')
      let newEditorBox = document.createElement('div')
      newEditorBox.classList.add('board')
      newEditorBox.classList.add('hidden')
      newEditorBox.setAttribute('id', 'board' + this.editorNum)

      editor.parentElement.appendChild(newEditorBox)

      this.editorNum++

      let files = document.querySelectorAll('.file-name')
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
      let titles = document.querySelectorAll('.titles')
      let i
      for (i = 0; i < titles.length; i++) {
        if (
          titles[i].textContent.trim() === this.selectedTitle.textContent.trim()
        ) {
          break
        }
      }
      this.openTitles.push(this.titles[i])
      if (this.isServer) {
        this.usedPair = this.htmlTitles[i].html_css_pair
        this.editor1.setValue(this.htmlTitles[i].contents)
        this.isEditor1Load = this.htmlTitles[i]
      } else {
        this.isEditor1Load = this.htmlTitles[i]
        this.editor1.setValue(
          this.htmlTitles[i].contents
            .split('<body>')[1]
            .split('</body>')[0]
            .split('<script ')[0]
        )
      }
      this.isData = true
    },
    deleteTitle() {
      this.$refs.sitemap.deleteTitle()
    },
    resetTitle(titles) {
      console.log('reset')
      this.titles = titles
      let topMenu = document.querySelector('.top-menu')
    },
    openSitemapContext(e) {
      this.selectedTitle = e.target
      if (this.isContextMenu) {
        this.isContextMenu = false
      } else {
        this.isContextMenu = true
        this.isContextMenu3 = false
        this.isContextMenu2 = false
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
      //  e.target.parentElement.style.backgroundColor = '#4e4e5c'
      if (e.target.textContent.trim() === 'HTML') {
        trees[0].style.backgroundColor = '#292931'
        trees[1].style.backgroundColor = '#4e4e5c'
        this.showhtml = true
      } else if (e.target.textContent.trim() === 'Files') {
        trees[1].style.backgroundColor = '#292931'
        trees[0].style.backgroundColor = '#4e4e5c'
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
      // console.log(document.getElementById("newLoaderHtml").innerHTML)
      if (e.target.getAttribute('name') == 'html') {
        this.tabStep = 1
        // this.chageContent()
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
        this.uiDescription = false
        this.tagDescription = false
        this.viewTemplate = false
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
          this.$refs.overview.setId(editor[j].getAttribute('id'))
          this.generateCode(editor[j].getAttribute('id'))
          editor[j].classList.add('display')
        } else {
          editor[j].classList.remove('display')
          editor[j].classList.add('hidden')
        }
      }
    },
    newPageInput() {
      this.isPopUp2Active = true
    },
    newPage(e) {
      // this.isPopUp2Active = false
      // this.$refs.sitemap.loadSitemap(this.titles)
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
        this.uiDescription = false
        this.tagDescription = false
        this.viewTemplate = false
      } else {
        this.studioOn = true
      }
      if (this.codeOn === true) {
        this.codeOn = false
      }
    },
    redoWork() {
      let i
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
      if (this.workStack.length !== 0) {
        // for (i = 0; i < this.workStack.length; i++) {
        //   console.log(this.workStack[i])
        // }
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
      this.payload = payload
      // console.log(document.getElementsByClassName('dashboard')[0].getBoundingClientRect())
      // console.log(document.getElementById('dashboard'))
      this.homeLayoutLocation = document
        .getElementById('dashboard')
        .getBoundingClientRect()

      console.log('이제 보낸다')
      console.log(payload)
      this.$refs.layout.getData(payload, this.homeLayoutLocation)
      for (let item of payload) {
        console.log(item)
        console.log(this.dataPayload)
        this.dataPayload = item
      }
      console.log(this.dataPayload)

      if (this.isPustHtml) {
        this.isPustHtml = false
        this.$refs.overview.printHomeDocument()
      }
      this.$refs.overview.domSelection(this.dataPayload)
      this.$refs.layout.isData = true
      // this.$refs.layout.makeTreeParent(this.payload)
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
    },
    manualSelet(payload) {
      if (payload.target.tagName == 'A') {
        this.tagDescription = true
        this.uiDescription = false
        this.$nextTick(() => {
          let text = document.querySelector('.description-tag')
          let stu = document.querySelector('#layout')
          text.innerHTML = this.manualScript['blur']

          console.log(stu)
          text.style.right = stu.getBoundingClientRect().right + 'px'
          text.style.top = payload.target.getBoundingClientRect().top - 8 + 'px'
        })
      } else {
        this.tagDescription = false
        this.uiDescription = false
      }
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
    z-index: 151;
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
    z-index: 151;
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
          z-index: 151;
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
          z-index: 150;
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
        .empty-iframe {
          height: 781px;
          width: 1200px;
          bottom: 0;
          display: flex;
          flex-direction: row;
          border: 3px solid #545e66;
          .sample-component {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .sample-add-btn {
              width: 5rem;
              cursor: pointer;
              height: 5rem;
            }
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
    z-index: 155;
    // left: 10rem;
  }
  .editlist-tab {
    position: fixed;
    top: 3.5%;
    z-index: 155;
    // left: 10rem;
  }
  .savelist-tab {
    position: fixed;
    top: 3.5%;
    z-index: 155;
    // left: 10rem;
  }
  .settinglist-tab {
    position: fixed;
    top: 3.5%;
    z-index: 155;
    // left: 10rem;
  }
  .helplist-tab {
    position: fixed;
    top: 3.5%;
    z-index: 155;
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
    z-index: 160;
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
  .fileContext {
    position: fixed;
    width: 10rem;
    background-color: #34343c;
    box-shadow: 5px 5px 8px 1px #000000;
    z-index: 160;
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
  .folderContext {
    position: fixed;
    width: 10rem;
    background-color: #34343c;
    box-shadow: 5px 5px 8px 1px #000000;
    z-index: 160;
    .addFolder,
    .addFile,
    .rename {
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
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 10000;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(#000, 0.7);
    }

    .input-box {
      background-color: #292931;
      padding: 1rem;
      z-index: 1;
      border-radius: 0.5rem;
      height: 35rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 45rem;
      position: relative;
      .new-project,
      .open-project,
      .open-server {
        width: 12rem;
        border: 1px solid #525252;
        height: 17rem;
        color: #e7e4e4;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &:hover {
          cursor: pointer;
          background-color: #454550;
        }
        .project-btn-icon {
          width: 7rem;
          height: 7rem;
        }
        .new-project-text,
        .open-project-text,
        .open-server-text {
          font-size: 1.1rem;
          color: #d8d8d8;
        }
      }
      .back {
        position: absolute;
        left: 1rem;
        top: 1rem;
        width: 1rem;
        &:hover {
          cursor: pointer;
        }
      }
      .new-project,
      .open-project {
        margin-right: 2rem;
      }
      .new-project-name,
      .new-project-create,
      .new-project-cancel {
        background-color: #292931;
        width: 12rem;
        border: 1px solid #525252;
        height: 17rem;
        color: #e7e4e4;
        &:hover {
          cursor: pointer;
          background-color: #454550;
        }
      }
      .new-project-name,
      .new-project-create {
        margin-right: 2rem;
      }
      .project-wrapper {
        border: 1px solid #525252;
        width: 50%;
        height: 50%;
        display: flex;
        flex-direction: column;
        // justify-content: left;
        .project-scroll-area {
          width: 100%;
          height: 100%;
          .project-list {
            color: #e7e4e4;
            padding-left: 1rem;
            height: 2rem;
            padding-top: 0.2rem;

            text-align: left;
            background-color: #292931;
            &:hover {
              cursor: pointer;
              background-color: #3a3a44;
            }
          }
        }
      }

      .input {
        height: 100%;
        font-size: 100%;
      }
    }
  }
  .popup2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 10000;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(#000, 0.7);
    }

    .input-wrapper {
      background-color: #fff;
      padding: 0.7rem;
      z-index: 1;
      border-radius: 0.5rem;
      height: 3.5rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 23rem;
      position: relative;

      .title-input {
        width: 16.5rem;
        height: 2rem;
        border: none;
      }
      .o-btn,
      .c-btn {
        width: 2.5rem;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .popup3 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(#000, 0.7);
    }

    .popup-wrapper {
      background-color: #292931;
      padding: 0.7rem;
      z-index: 1;
      border-radius: 0.5rem;
      height: 9rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 23rem;
      position: relative;
      .delete-text {
        color: #dddddd;
        height: 3rem;
      }
      .btn-wrapper {
        display: flex;
        flex-direction: row;
        .o-btn,
        .c-btn {
          color: #cecece;
          border: 1px solid #525252;
          height: 1.5rem;
          border-radius: 0.2rem;
          width: 3.2rem;
          font-size: 0.95rem;
          &:hover {
            cursor: pointer;
            background-color: #464650;
          }
        }
        .o-btn {
          margin-right: 1.5rem;
        }
      }
    }
  }

  .fileTitle {
    // font-size: 15px;
    color: white;
    // font-weight: bold;
    // padding: 7px 14px;
    vertical-align: bottom;
    display: inline-block;
    // mar
    // margin-right: 25%;
    float: none;
    margin: 0;
    border: none;
    padding-right: 0.3rem;
    padding-left: 0.3rem;
    height: 100%;
    background-color: #666666;
    &:hover {
      cursor: pointer;
    }
  }

  .loadDataPanel {
    width: 80%;
    z-index: 100;
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
      position: relative;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .leftTitle,
      .rightTitle {
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: row;
        align-items: left;
        height: 2.5rem;
        width: 100%;
        cursor: pointer;
        .right-title-scroll,
        .left-title-scroll {
          height: 100%;
          display: flex;
          flex-direction: row;
          .left-title,
          .right-title {
            // background-color: #3f3f3f;
            padding-right: 0.25rem;
            padding-left: 0.25rem;
            display: flex;
            flex-direction: row;
            height: 1.7rem;

            .right-title-text,
            .left-title-text {
              margin-right: 0.3rem;
              padding-left: 0.15rem;
              padding-right: 0.15rem;
              color: #ccc;
            }
            .close-icon {
              width: 0.7rem;
              padding-right: 0.1rem;
            }
          }
        }
      }
      .leftSource,
      .rightSource {
        height: calc(100% - 2.5rem);
        width: 100%;
        position: absolute;
        bottom: 0;
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
                position: relative;
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
                  position: absolute;
                  right: 0 !important;
                  width: 80px !important;
                  left: auto !important;
                }
              }
            }
          }
        }
      }
      .hidden {
        display: none;
      }
      .display {
        display: block;
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
