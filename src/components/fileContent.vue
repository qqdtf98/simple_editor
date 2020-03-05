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
          <div class="nested">
            <div
              ref="cssName"
              @mouseup="mouseRightClick"
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
          <div class="nested">
            <div
              ref="jsName"
              @mouseup="mouseRightClick"
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
      isContentEditable: false
    }
  },
  computed: {},
  components: { vueCustomScrollbar },
  methods: {
    setNewTitle(e) {
      e.preventDefault()
      if (e) {
        console.log(e.target.textContent)
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
    newFileName(type) {
      if (type === 'html') {
        let html = document.querySelector('.html')
        html.parentElement.children[0].classList.add('caret-down')
        html.children[html.children.length - 1].classList.add('template')
        html.classList.add('active')
        this.focusInput(html.children[html.children.length - 1])
      }
    },
    addFile(project, folder, type) {
      console.log(folder)
      this.project = project
      let payload
      this.type = type
      if (type === 'html') {
        payload = {
          path: project + '/html/',
          name: '',
          text: '',
          code: '',
          type: 'html'
        }
        this.htmlTitles.push(payload)
        this.$nextTick(() => {
          this.newFileName()
        })
      } else if (type === 'css') {
        payload = {
          path: '',
          name: '',
          text: '',
          code: '',
          type: 'css'
        }
        this.cssTitles.push(payload)
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
</style>
