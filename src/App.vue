<template>
  <div id="app">
    <div class="left-panel">
      <studio
        @desc-close="tagNotSelected"
        @ui-select="uiSelected"
        @tag-select="tagSelected"
        @addelement="addElement"
        class="studio"
      ></studio>
      <overview
        ref="overview"
        @selectDomElement="selectDomElemented"
        :getDocument="homeDocument"
        class="overview"
      ></overview>
    </div>
    <div class="center-panel">
      <div class="title">Editor</div>
      <div class="editor">
        <home
          ref="home"
          @componentSelected="componentSelected"
          class="home"
        ></home>
      </div>
    </div>
    <layout
      ref="layouts"
      :payload="payload"
      @userSelected="userSelectedWidth"
      class="layout"
    ></layout>
    <span v-if="tagDescription" class="description-tag">
      <span class="desc-tag-text">tag</span>
    </span>
    <div v-if="uiDescription" class="description-ui">
      <img  />
      <div class="image-name">name</div>
      <div class="desc-ui-text">text</div>
    </div>
  </div>
</template>

<script>
import home from './components/home'
import layout from './components/layout'
import studio from './components/studio'
import overview from './components/overview'

export default {
  components: { home, layout, studio, overview },
  props: ['selectDomElement'],
  name: 'App',
  data () {
    return {
      payload: '',
      data: '',
      homeLayoutLocation: '',
      tagDescription: false,
      childOFchil: [],
      homeDocument: '',
      uiDescription: false,
      dom: '',
      addTag: false,
      selectedTag: null
    }
  },
  mounted () {
    this.homeDocument = document.getElementById('dashboard')
    document.addEventListener('mouseup', (e) => {
      let tar = e.target
      if (this.addTag) {
        // console.log(e.taret)
        // console.log(tar.parentElement.id)
        // console.log(tar.parentElement)
        let i
        for (i = 0; i < 100; i++) {
          if (tar.id === 'dashboard') {
            // console.log(tar.className)
            // console.log('find')
            this.addTag = false
            this.$refs.home.addContent(this.selectedTag, e.target)
            break
          } else if (tar.id === 'app') {
            break
          } else {
            // console.log(tar)
            tar = tar.parentElement
          }
        }
      }
    })
  },
  methods: {
    componentSelected (payload) {
      this.payload = payload.target
      // console.log(document.getElementsByClassName('dashboard')[0].getBoundingClientRect())
      this.homeLayoutLocation = document.getElementsByClassName('dashboard')[0].getBoundingClientRect()
      this.$refs.layouts.getData(payload, this.homeLayoutLocation)
      this.$refs.overview.printHomeDocument()
    },
    userSelectedWidth (data) {
      this.data = data
      this.$refs.home.styleChanged(this.data)
    },
    tagSelected (payload) {
      this.tagDescription = true
      this.uiDescription = false
      this.$nextTick(() => {
        let text = document.querySelector('.description-tag')
        let stu = document.querySelector('.studio')

        // if (payload.target.innerHTML === 'Image') {
        //   text.innerHTML =
        //     'This is the <image> HTML element.asdffffffffffffffffffffffffffffffffsdfsdfs'
        // } else if (payload.target.innerHTML === 'Icon') {
        //   text.innerHTML = 'Icon'
        // }

        // text.innerHTML은 db에 저장하여 불러와야함

        text.style.left = stu.getBoundingClientRect().right - 25 + 'px'
        text.style.top = payload.target.getBoundingClientRect().top - 8 + 'px'
      })
    },
    tagNotSelected () {
      this.tagDescription = false
      this.uiDescription = false
    },
    uiSelected (payload) {
      this.uiDescription = true
      this.tagDescription = false
      this.$nextTick(() => {
        let ui = document.querySelector('.description-ui')
        let stu = document.querySelector('.studio')

        let name = payload.target.innerHTML.replace(/ /gi, '')
        // console.log(ui.children[0].src)
        ui.children[0].src = './static/studioImage/' + name + '.png'
        ui.children[1].innerHTML = payload.target.innerHTML

        ui.style.left = stu.getBoundingClientRect().right - 25 + 'px'
        ui.style.top = payload.target.getBoundingClientRect().top - 8 + 'px'
      })
    },
    addElement (e) {
      this.addTag = true
      // console.log(e.target)
      this.selectedTag = e.target
    },
    selectDomElemented (domElement) {
      this.dom = domElement
      // console.log(this.dom)
      this.$refs.home.selectOverview(this.dom)
    }
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  display: flex;
  flex-direction: row;
  height: 58rem;
  background-color: #2c3134;
  align-items: center;

  .left-panel {
    width: 20%;
    height: 100%;

    .studio {
      height: 50%;
      border: 2px solid #23282b;
    }

    .overview {
      border: 2px solid #23282b;
      height: 50%;
    }
  }
  .center-panel {
    width: 60%;
    height: 80%;
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
      border: 2px solid #545e66;
      display: flex;
      align-items: center;
      justify-content: center;
      // overflow: hidden;
      .home {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 97%;
        height: 100%;
        overflow: hidden;
      }
    }
  }

  .layout {
    width: 20%;
    height: 100%;
    border: 2px solid #23282b;
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
    .desc-tag-text {
      color: #cecece;
    }
  }

  .description-ui{
    max-height: 30rem;
    .image-name{
      color: #e2e2e2;
    }
    .desc-ui-text{
      color: #a1a1a1;
    }
  }
}
</style>
