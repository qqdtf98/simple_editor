<template>
  <div id="sitemap">
    <div @mousedown="moveSitemap" class="sitemap-text-box">
      <span @mousedown.stop class="sitemap-text">Sitemap</span>
      <img
        @mousedown.stop
        @click="closeSitemap"
        class="close-btn"
        src="../assets/images/close.svg"
      />
    </div>
    <vue-custom-scrollbar class="sitemap-scroll-area">
      <div
        ref="dash"
        @mousedown="refineSitemap"
        @mouseup="mouseRightClick"
        class="title-map"
      >
        <div
          :key="title.id"
          @keydown.enter="isContentNotEditable"
          :contenteditable="isContentEditable"
          class="titles"
          v-for="title in titles"
        >
          {{ title.text }}
        </div>
      </div>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'

export default {
  components: { vueCustomScrollbar },
  data() {
    return {
      titles: [],
      sitemapMove: false,
      xInter: 0,
      yInter: 0,
      moveTarget: null,
      target: null,
      targetId: null,
      position: null,
      positionId: null,
      contextTarget: null,
      isContentEditable: false
    }
  },
  mounted() {
    document.addEventListener('mousemove', e => {
      if (this.sitemapMove) {
        this.moveTarget.style.left = e.clientX - this.xInter + 'px'
        this.moveTarget.style.top = e.clientY - this.yInter + 'px'
        let leftPanel = document.querySelector('.left-panel')
        if (parseInt(getComputedStyle(this.moveTarget).left) < 25) {
          leftPanel.style.backgroundColor = '#3a3a50'
          this.isStickSitemap = true
        } else {
          leftPanel.style.backgroundColor = '#292931'
          this.isStickSitemap = false
        }
      }
    })
    document.addEventListener('mouseup', () => {
      if (this.sitemapMove) {
        let leftPanel = document.querySelector('.left-panel')
        leftPanel.style.backgroundColor = '#292931'
        if (this.isStickSitemap) {
          this.moveTarget.style.left = '3.5%'
          this.moveTarget.style.top = '3.5%'
        }
        this.sitemapMove = false
      }
      if (this.isContentEditable) {
        this.isContentNotEditable()
      }
    })
  },
  methods: {
    deleteTitle() {
      console.log(this.contextTarget)
      let i
      let titles = document.querySelectorAll('.titles')
      for (i = 0; i < titles.length; i++) {
        console.log(titles[i])
        if (titles[i] === this.contextTarget) {
          break
        }
      }
      console.log(i)
      this.titles.splice(i, 1)
      console.log(this.titles)
      this.$emit('reset-title', this.titles)
    },
    isContentNotEditable(e) {
      if (e) {
        console.log(e)
        e.preventDefault()
      }

      let titles = document.querySelectorAll('.titles')
      let i
      for (i = 0; i < titles.length; i++) {
        if (titles[i] === this.contextTarget) {
          console.log(this.contextTarget.textContent.trim())
          this.titles[i].text = this.contextTarget.textContent.trim()
          break
        }
      }
      console.log(titles)
      this.$emit('reset-title', this.titles)
      this.isContentEditable = false
    },
    renameTitle() {
      console.log(this.contextTarget)
      this.focusInput(this.contextTarget)
    },
    focusInput(e) {
      this.isContentEditable = true
      this.$nextTick(() => {
        const sel = window.getSelection()
        sel.removeAllRanges()
        const range = new Range()
        range.setStart(this.$refs.dash, 0)
        range.setEnd(this.$refs.dash, 0)
        sel.addRange(range)
        // console.log(this.$ref.dash)
        this.placeCaretAtEnd(e)
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
    movePosition(payload) {
      this.position = payload
      let i
      let titles = document.querySelectorAll('.titles')
      for (i = 0; i < titles.length; i++) {
        if (titles[i] === payload) {
          this.positionId = i
          break
        }
      }
      let target = this.titles.splice(this.targetId, 1)
      console.log(target[0])
      this.titles.splice(this.positionId, 0, target[0])
    },
    mouseRightClick(e) {
      if (e.button === 2) {
        console.log('rightclick')
        this.contextTarget = e.target
        this.$emit('right-click', e)
      }
    },
    moveSitemap(e) {
      e.target.parentElement.style.position = 'fixed'
      let initX = e.clientX
      let initY = e.clientY
      let initLeft = parseInt(getComputedStyle(e.target.parentElement).left)
      let initTop = parseInt(getComputedStyle(e.target.parentElement).top)
      this.xInter = initX - initLeft
      this.yInter = initY - initTop
      this.sitemapMove = true
      this.moveTarget = e.target.parentElement
    },
    refineSitemap(e) {
      if (e.button === 0) {
        this.target = e.target
        let i
        let titles = document.querySelectorAll('.titles')
        for (i = 0; i < titles.length; i++) {
          if (titles[i] === e.target) {
            this.targetId = i
            break
          }
        }
        this.$emit('copy-title', e)
      }
    },
    closeSitemap() {
      this.$emit('close-sitemap')
    },
    loadSitemap(titles) {
      this.titles = titles
    }
  }
}
</script>

<style lang="scss">
#sitemap {
  .sitemap-text-box {
    height: 7%;
    background-color: #292931;
    justify-content: center;
    position: relative;
    cursor: move;
    .sitemap-text {
      padding: 0.2rem;
      color: #ffffff;
      font-size: 1.4rem;
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
  .sitemap-scroll-area {
    padding: 0.4rem;
    height: 93%;
    .title-map {
      background-color: #292931;
      color: #e7e4e4;
      padding-left: 0.4rem;
      align-items: left;
      .titles {
        text-align: left;
        height: 1.5rem;
        &:hover {
          background-color: #505557;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
