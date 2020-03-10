<template>
  <div id="fileContent">
    <vue-custom-scrollbar class="file-scroll-area">
      <div class="file-box">
        <div class="tag-list-box">
          <span @mouseup="openFolderContext" class="tag-list">HTML</span>
          <div class="html nested">
            <div
              ref="htmlName"
              @keyup.enter="setNewTitle"
              @mouseup="mouseRightClick"
              :key="index"
              :contenteditable="isContentEditable"
              v-for="(title, index) in htmlTitles"
            >
              <!-- <div v-if="index == 0"> -->
              {{ title.text }}
              <!-- </div> -->
            </div>
          </div>
        </div>
        <div class="tag-list-box">
          <span @mouseup="openFolderContext" class="tag-list">CSS</span>
          <div class="css nested">
            <div
              ref="cssName"
              @mouseup="mouseRightClick"
              @keyup.enter="setNewTitle"
              :contenteditable="isContentEditable"
              :key="title.key"
              v-for="title in cssTitles"
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
              @mouseup="mouseRightClick"
              @keyup.enter="setNewTitle"
              :contenteditable="isContentEditable"
              :key="title.key"
              v-for="title in jsTitles"
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
      folderSeq: [],
      beforeTitle: null,
      isNewFileAdd: false,
      sameTitle: false
    }
  },
  computed: {},
  components: { vueCustomScrollbar },
  methods: {
    setNewTitle(e) {
      e.preventDefault()
      if (e) {
        e.target.textContent = e.target.textContent.trim()
        let i
        if (this.type === 'html') {
          for (i = 0; i < this.htmlTitles.length; i++) {
            if (
              this.htmlTitles[i].file_name ===
              e.target.textContent.split('.')[0]
            ) {
              this.sameTitle = true
            }
          }
        } else if (this.type === 'css') {
          for (i = 0; i < this.htmlTitles.length; i++) {
            if (
              this.cssTitles[i].file_name === e.target.textContent.split('.')[0]
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
        } else {
          // 프론트에서 체크 - 중복 X
          // 서버에 이름 중복검사 요청
          let i
          for (i = 0; i < this.folderSeq.length; i++) {
            if (this.folderSeq[i].type === this.type) {
              break
            }
          }
          axios
            .get('http://192.168.0.86:8581/editor/file/checkFileName', {
              params: {
                folder_seq: this.folderSeq[i].seq,
                file_type: this.type,
                file_name: e.target.textContent.split('.')[0]
              }
            })
            .then(res => {
              if (res.data.responseCode === 'SUCCESS') {
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
                    file_name: e.target.textContent.split('.')[0],
                    file_path:
                      this.project +
                      '/' +
                      this.type +
                      '/' +
                      e.target.textContent.split('.')[0] +
                      '.' +
                      this.type,
                    file_type: this.type,
                    contents: ''
                  }
                  axios
                    .post('http://192.168.0.86:8581/editor/file/createFile', {
                      files: [data]
                    })
                    .then(res => {
                      console.log(res)
                      if (res.data.responseCode === 'SUCCESS') {
                        if (res.data.data[0].file_type === 'html') {
                          this.htmlTitles[this.htmlTitles.length - 1] =
                            res.data.data[0]
                          this.htmlTitles[this.htmlTitles.length - 1].text =
                            e.target.textContent.split('.')[0] + '.html'
                          this.htmlTitles[
                            this.htmlTitles.length - 1
                          ].isEdited = false
                        } else if (res.data.data[0].file_type === 'css') {
                          this.cssTitles[this.cssTitles.length - 1] =
                            res.data.data[0]
                          this.cssTitles[this.cssTitles.length - 1].text =
                            e.target.textContent.split('.')[0] + '.css'
                          this.cssTitles[
                            this.cssTitles.length - 1
                          ].isEdited = false
                        }

                        this.$emit(
                          'reset-titles',
                          this.htmlTitles,
                          this.cssTitles,
                          this.jsTitles
                        )
                        console.log(res.data.message)
                      } else {
                        if (res.data.data[0].file_type === 'html') {
                          this.htmlTitles.splice(this.htmlTitles.length - 1, 1)
                        } else if (res.data.data[0].file_type === 'css') {
                          this.cssTitles.splice(this.cssTitles.length - 1, 1)
                        }
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
                  axios
                    .post('http://192.168.0.86:8581/editor/file/updateFile', {
                      files: [
                        {
                          folder_seq: this.folderSeq[j].seq,
                          file_seq: this.htmlTitles[i].folder_seq,
                          file_name: e.target.textContent.split('.')[0],
                          file_path:
                            this.htmlTitles[i].file_path.split(
                              this.htmlTitles[i].text
                            )[0] +
                            e.target.textContent.split('.')[0] +
                            '.' +
                            this.type
                        }
                      ]
                    })
                    .then(res => {
                      console.log(res)
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
              } else {
                // 서버에서 체크 - 중복 O
                console.log('sameme')
                e.target.classList.add('same-title')
                e.target.textContent = this.beforeTitle
                this.sameTitle = false
              }
            })
        }
        this.isContentEditable = false
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
    mouseRightClick(e) {
      if (e.button === 2) {
        this.contextTarget = e.target
        this.$emit('right-click', e)
      }
    },
    setFiles(html, css, js) {
      this.htmlTitles = html
      this.htmlTitle = this.htmlTitles[0]
      this.cssTitles = css
      this.jsTitles = js
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
