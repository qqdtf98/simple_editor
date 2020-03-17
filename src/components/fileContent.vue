<template>
  <div id="fileContent">
    <vue-custom-scrollbar class="file-scroll-area">
      <div class="file-box">
        <div class="tag-list-box">
          <span @mouseup="openFolderContext" class="tag-list">HTML</span>
          <div class="html nested">
            <div
              ref="htmlName"
              @keydown.enter="setNewTitle"
              @dblclick="dblClick"
              @mouseup="mouseRightClick($event, index)"
              :key="index"
              :contenteditable="isContentEditable"
              v-for="(title, index) in htmlTitles"
            >
              {{ title.text }}
            </div>
          </div>
        </div>
        <div class="tag-list-box">
          <span @mouseup="openFolderContext" class="tag-list">CSS</span>
          <div class="css nested">
            <div
              ref="cssName"
              @mouseup="mouseRightClick($event, index)"
              @dblclick="dblClick"
              @keydown.enter="setNewTitle"
              :contenteditable="isContentEditable"
              :key="index"
              v-for="(title, index) in cssTitles"
            >
              {{ title.text }}
            </div>
          </div>
        </div>
        <div class="tag-list-box">
          <span @mouseup="openFolderContext" class="tag-list">JS</span>
          <div class="js nested">
            <div
              ref="jsName"
              @mouseup="mouseRightClick($event, index)"
              @keydown.enter="setNewTitle"
              @dblclick="dblClick"
              :contenteditable="isContentEditable"
              :key="index"
              v-for="(title, index) in jsTitles"
            >
              {{ title.text }}
            </div>
          </div>
        </div>
      </div>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import axios from 'axios'
import apiUrl from '../modules/api-url'

export default {
  data() {
    return {
      htmlTitles: [],
      htmlTitle: null,
      cssTitles: [],
      jsTitles: [],
      contextTarget: null,
      isContentEditable: false,
      project: null,
      type: null,
      folderSeq: [],
      beforeTitle: null,
      isNewFileAdd: false,
      sameTitle: false,
      stylePair: null,
      targetIndex: null
    }
  },
  computed: {},
  components: { vueCustomScrollbar },
  methods: {
    dblClick(e) {
      console.log(e.target)
      this.$emit('dbl-click', e)
    },
    setStylePair(pair) {
      this.stylePair = pair
    },
    setNewTitle(e) {
      e.preventDefault()
      if (e) {
        e.target.textContent =
          e.target.textContent.split('.')[0].trim() + '.' + this.type
        let i
        if (this.type === 'html') {
          for (i = 0; i < this.htmlTitles.length; i++) {
            if (
              this.htmlTitles[i].file_name ===
              e.target.textContent.split('.')[0].trim()
            ) {
              console.log(this.htmlTitles[i].file_name)
              console.log(e.target.textContent.split('.')[0])
              this.sameTitle = true
            }
          }
        } else if (this.type === 'css') {
          for (i = 0; i < this.cssTitles.length; i++) {
            if (
              this.cssTitles[i].file_name ===
              e.target.textContent.split('.')[0].trim()
            ) {
              this.sameTitle = true
            }
          }
        }
        if (this.sameTitle) {
          // 프론트에서 체크 - 중복 O
          console.log('sameme')
          e.target.classList.add('same-title')
          e.target.textContent = this.beforeTitle
          this.sameTitle = false
          // if (this.type === 'html') {
          //   this.htmlTitles.splice(this.htmlTitles.length - 1, 1)
          // } else if (this.type === 'css') {
          //   this.cssTitles.splice(this.cssTitles.length - 1, 1)
          // }
          // this.$emit(
          //   'reset-titles',
          //   this.htmlTitles,
          //   this.cssTitles,
          //   this.jsTitles
          // )
        } else {
          // 프론트에서 체크 - 중복 X
          // 서버에 이름 중복검사 요청
          let i
          for (i = 0; i < this.folderSeq.length; i++) {
            if (this.folderSeq[i].type === this.type) {
              break
            }
          }
          axios({
            ...apiUrl.file.checkName,
            params: {
              folder_seq: this.folderSeq[i].seq,
              file_type: this.type,
              file_name: e.target.textContent.split('.')[0].trim()
            }
          }).then(res => {
            if (res.data.responseCode === 'SUCCESS') {
              console.log('succ')
              // 서버에서 체크 - 중복 X
              if (this.isNewFileAdd) {
                // 새로운 파일 추가일때
                let data
                let i
                for (i = 0; i < this.folderSeq.length; i++) {
                  if (this.folderSeq[i].type === this.type) {
                    break
                  }
                }
                data = {
                  folder_seq: this.folderSeq[i].seq,
                  file_name: e.target.textContent.split('.')[0].trim(),
                  file_path:
                    this.project +
                    '/' +
                    this.type +
                    '/' +
                    e.target.textContent.split('.')[0].trim() +
                    '.' +
                    this.type,
                  file_type: this.type,
                  contents: ''
                }
                axios({
                  ...apiUrl.file.create,
                  data: {
                    files: [data]
                  }
                }).then(res => {
                  console.log(res)
                  if (res.data.responseCode === 'SUCCESS') {
                    console.log('succeseee')
                    if (res.data.data[0].file_type === 'html') {
                      console.log(res.data.data[0])
                      this.htmlTitles[this.htmlTitles.length - 1] =
                        res.data.data[0]
                      this.htmlTitles[this.htmlTitles.length - 1].text =
                        e.target.textContent.split('.')[0].trim() + '.html'
                      this.htmlTitles[
                        this.htmlTitles.length - 1
                      ].isEdited = false
                    } else if (res.data.data[0].file_type === 'css') {
                      this.cssTitles[this.cssTitles.length - 1] =
                        res.data.data[0]
                      this.cssTitles[this.cssTitles.length - 1].text =
                        e.target.textContent.split('.')[0] + '.css'
                      this.cssTitles[this.cssTitles.length - 1].isEdited = false
                    }
                    console.log(this.htmlTitles)

                    this.$emit(
                      'reset-titles',
                      this.htmlTitles,
                      this.cssTitles,
                      this.jsTitles
                    )
                    e.target.textContent =
                      e.target.textContent.split('.')[0] + '.' + this.type
                  } else {
                    console.log('ffffs')
                    if (res.data.data[0].file_type === 'html') {
                      this.htmlTitles.splice(this.htmlTitles.length - 1, 1)
                    } else if (res.data.data[0].file_type === 'css') {
                      this.cssTitles.splice(this.cssTitles.length - 1, 1)
                    }
                    this.$emit(
                      'reset-titles',
                      this.htmlTitles,
                      this.cssTitles,
                      this.jsTitles
                    )
                  }
                })
                this.isNewFileAdd = false
              } else {
                // 기존 파일 수정일 때
                console.log(this.contextTarget)
                let html = document.querySelector('.html')
                let i
                for (i = 0; i < html.children.length; i++) {
                  if (html.children[i] === this.contextTarget) break
                }
                let j
                for (j = 0; j < this.folderSeq.length; j++) {
                  if (this.folderSeq[j].type === this.type) {
                    break
                  }
                }
                console.log()
                axios({
                  ...apiUrl.file.update,
                  data: {
                    files: [
                      {
                        folder_seq: this.folderSeq[j].seq,
                        file_seq: this.htmlTitles[i].file_seq,
                        file_name: e.target.textContent.split('.')[0].trim(),
                        file_path:
                          this.htmlTitles[i].file_path.split(
                            this.htmlTitles[i].text
                          )[0] +
                          e.target.textContent.split('.')[0].trim() +
                          '.' +
                          this.type
                      }
                    ]
                  }
                }).then(res => {
                  console.log(res)
                  if (res.data.responseCode === 'SUCCESS') {
                    e.target.textContent =
                      e.target.textContent.split('.')[0] + '.' + this.type
                  } else {
                    if (res.data.data[0].file_type === 'html') {
                      this.htmlTitles.splice(this.htmlTitles.length - 1, 1)
                    } else if (res.data.data[0].file_type === 'css') {
                      this.cssTitles.splice(this.cssTitles.length - 1, 1)
                    }
                  }
                })
                this.htmlTitles[i].text =
                  e.target.textContent.split('.')[0] + '.html'
                this.htmlTitles[i].file_path =
                  this.htmlTitles[i].file_path.split(
                    this.htmlTitles[i].text
                  )[0] +
                  e.target.textContent.split('.')[0] +
                  '.' +
                  this.type
                this.$emit(
                  'reset-titles',
                  this.htmlTitles,
                  this.cssTitles,
                  this.jsTitles
                )
              }
              this.isContentEditable = false
            } else {
              console.log(res.data)
              console.log('failll')
              // 서버에서 체크 - 중복 O
              e.target.classList.add('same-title')
              e.target.textContent = this.beforeTitle
              this.sameTitle = false
              if (this.type === 'html') {
                this.htmlTitles.splice(this.htmlTitles.length - 1, 1)
              } else if (this.type === 'css') {
                this.cssTitles.splice(this.cssTitles.length - 1, 1)
              }
              this.$emit(
                'reset-titles',
                this.htmlTitles,
                this.cssTitles,
                this.jsTitles
              )
            }
          })
        }
      }
    },
    setFolderSeq(seq) {
      this.folderSeq = seq
    },
    openFolderContext(e) {
      if (e.button === 2) {
        this.$emit('folder-click', e)
      }
    },
    mouseRightClick(e, key) {
      if (e.button === 2) {
        this.contextTarget = e.target
        this.targetIndex = key
        this.$emit('right-click', e)
      }
    },
    setFiles(html, css, js) {
      this.htmlTitles = html
      this.htmlTitle = this.htmlTitles[0]
      this.cssTitles = css
      this.jsTitles = js
      this.$nextTick(() => {
        let htmlList = document.querySelector('.html')
        htmlList.parentElement.children[0].classList.add('caret-down')
        let i
        for (i = 0; i < htmlList.children.length; i++) {
          htmlList.children[i].classList.add('template')
        }
        htmlList.classList.add('active')
        let cssList = document.querySelector('.css')
        cssList.parentElement.children[0].classList.add('caret-down')
        for (i = 0; i < cssList.children.length; i++) {
          cssList.children[i].classList.add('template')
        }
        cssList.classList.add('active')
      })
    },
    placeCaretAtEnd(el) {
      el.focus()
      if (
        typeof window.getSelection !== 'undefined' &&
        typeof document.createRange !== 'undefined'
      ) {
        const range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      } else if (typeof document.body.createTextRange !== 'undefined') {
        const textRange = document.body.createTextRange()
        textRange.moveToElementText(el)
        textRange.collapse(false)
        textRange.select()
      }
    },
    focusInput(target) {
      target.classList.remove('same-title')
      if (!this.isNewFileAdd) {
        // 기존 파일의 이름을 수정할 때
        this.type = target.textContent.split('.')[1].trim()
      }
      this.beforeTitle = target.textContent.trim()
      this.isContentEditable = true
      this.$nextTick(() => {
        const sel = window.getSelection()
        sel.removeAllRanges()
        const range = new Range()
        range.setStart(target, 0)
        range.setEnd(target, 0)
        sel.addRange(range)
        this.placeCaretAtEnd(target)
      })
    },
    newFileName() {
      if (this.type === 'html') {
        let html = document.querySelector('.html')
        html.parentElement.children[0].classList.add('caret-down')
        html.children[html.children.length - 1].classList.add('template')
        html.classList.add('active')
        this.isNewFileAdd = true
        this.focusInput(html.children[html.children.length - 1])
      } else if (this.type === 'css') {
        let css = document.querySelector('.css')
        css.parentElement.children[0].classList.add('caret-down')
        css.children[css.children.length - 1].classList.add('template')
        css.classList.add('active')
        this.isNewFileAdd = true
        this.focusInput(css.children[css.children.length - 1])
      }
    },
    addFile(project, folder, type) {
      console.log(folder)
      this.project = project
      let payload
      this.type = type
      if (type === 'html') {
        payload = {
          seq: '',
          folder: '',
          path: project + '/html/',
          name: '',
          text: '',
          code: '',
          type: 'html'
        }
        this.htmlTitles.push(payload)
        this.$emit(
          'reset-titles',
          this.htmlTitles,
          this.cssTitles,
          this.jsTitles
        )
        this.$nextTick(() => {
          this.newFileName()
        })
      } else if (type === 'css') {
        payload = {
          seq: '',
          folder: '',
          path: '',
          name: '',
          text: '',
          code: '',
          type: 'css'
        }
        this.cssTitles.push(payload)
        this.$emit(
          'reset-titles',
          this.htmlTitles,
          this.cssTitles,
          this.jsTitles
        )
        this.$nextTick(() => {
          this.newFileName()
        })
      } else if (type === 'js') {
      }
    },
    addJS() {
      this.$emit('add-js')
    }
  }
}
</script>

<style lang="scss">
#fileContent {
  .file-scroll-area {
    height: 100%;
    .file-box {
      .tag-list-box {
        // float: left;
        text-align: left;
        margin: 0.1rem;
        .tag-list {
          margin-left: 0.4rem;
          color: #e7e4e4;
          cursor: pointer;
          user-select: none; /* Prevent text selection */
          //   float: left;
          transition: all 300ms ease;
        }

        /* Create the tag-list/arrow with a unicode, and style it */
        .tag-list::before {
          content: '\FF1E';
          color: #e7e4e4;
          display: inline-block;
          margin-right: 6px;
        }

        /* Rotate the tag-list/arrow icon when clicked on (using JavaScript) */
        .tag-list-down::before {
          transform: rotate(90deg);
        }
        .nested {
          display: none;
        }

        /* Show the nested list when the user clicks on the tag-list/arrow (with JavaScript) */
        .active {
          display: block;
        }
        .template {
          margin-left: 2rem;
          color: #e7e4e4;
          &:hover {
            background-color: #414649;
            cursor: default;
          }
        }
        .template::before {
          margin-right: 0.2rem;
        }
        .ui {
          margin-left: 1.2rem;
        }
      }
    }
  }
}
.same-title {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
