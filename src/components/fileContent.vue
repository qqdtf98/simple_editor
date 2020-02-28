<template>
  <div id="fileContent">
    <vue-custom-scrollbar class="file-scroll-area">
      <div class="file-box">
        <div class="tag-list-box">
          <span class="tag-list">HTML</span>
          <div class="html nested">
            <div
              @mouseup="mouseRightClick"
              :key="index"
              v-for="(title, index) in htmlTitles"
            >
              <!-- <div v-if="index == 0"> -->
              {{ title.text }}
              <!-- </div> -->
            </div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">CSS</span>
          <div class="nested">
            <div
              @mouseup="mouseRightClick"
              :key="title.key"
              v-for="title in cssTitles"
            >
              {{ title.text }}
            </div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">JS</span>
          <div class="nested">
            <div
              @mouseup="mouseRightClick"
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
export default {
  data() {
    return {
      htmlTitles: [],
      htmlTitle: null,
      cssTitles: [],
      jsTitles: [],
      contextTarget: null
    }
  },
  computed: {},
  components: { vueCustomScrollbar },
  methods: {
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
