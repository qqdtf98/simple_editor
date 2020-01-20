<template>
  <div id="app">
    <!-- <spliter class="spliter"/> -->
    <div class="left-panel">
      <studio
        @desc-close="tagNotSelected"
        @ui-select="uiSelected"
        @tag-select="tagSelected"
        @addelement="addElement"
        @userSelectedTagComponent = "userSelectedTagComponent"
        class="studio"
      ></studio>
      <overview
        ref="overview"
        @selectDomElement="selectDomElemented"
        @inParentTreeOption="inParentTreeOption"
        @domWithTree="domPushWithTree"
        :getDocument="homeDocument"
        class="overview"
      ></overview>
    </div>

    <div class="center-panel">
      <div class="title">Editor</div>
       <img class="scale" src="./assets/scale.svg" />
      <img class="width" src="./assets/width.svg" />
      <switches @click="toggleClicked" class="swtich" theme="bootstrap" color="info" v-model="enabled">

      </switches>
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
      @userSelectBorder="userSelectBorder"
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
import htmlLoader from './components/htmlLoader'
import home from './components/home'
import layout from './components/layout'
import studio from './components/studio'
import overview from './components/overview'
import spliter from './components/spliter'
import Switches from 'vue-switches'

export default {
  components: { htmlLoader, home, layout, studio, overview, spliter, Switches },
  props: ['selectDomElement'],
  name: 'App',
  data () {
    return {
      payload: '',
      data: '',
      homeLayoutLocation: '',
      tagDescription: false,
      childOFchil: [],
      enabled: false,
      homeDocument: '',
      uiDescription: false,
      dom: '',
      addTag: false,
      selectedTag: null,
      hasht: null,
      isPustHtml: true,
      mouseOverTarget: null
    }
  },
  watch: {
    enabled: function () {
      this.$refs.home.modeSelect(this.enabled)
    }
  },
  mounted () {
    $(window).resize(() => {
      this.$refs.home.windowResized()
    })
    this.homeDocument = document.getElementById('dashboard')
    document.addEventListener('mouseup', (e) => {
      let tar = e.target
      if (this.addTag) {
        // console.log(e.taret)
        // console.log(tar.parentElement.id)
        // console.log(tar.parentElement)
        // let i
        while (1) {
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
    var h = {}
    h['articleclean'] = 'An article layout with a simple and clean design.'
    h['articledualcolumn'] = 'An article layout which consists of two columns.'
    h['articlelist'] = 'A list of articles with thumbnails and descriptions.'
    h['featuresblue'] = 'This is a feature grid with a beautiful blue design.'
    h['featuresboxed'] = 'A feature grid with a subtle white on blue design.'
    h['featuresclean'] = 'A feature grid with a clean design with lots of white space.'
    h['footerbasic'] = 'This is a basic footer with links and social buttons.'
    h['footerclean'] = 'A complete footer design with link categories, social icons and a copyright line.'
    h['footerdark'] = 'A dark footer design with link categories, social icons and a copyright line.'
    h['heading'] = 'This is the HTML heading component. You can choose which HTML tag is used - from &lth1&gt to &lth6&gt.'
    h['paragraph'] = "This is the standard &ltp&gt  HTML element. Use it for writing body text. It is enhanced by Bootstrap's rich styling classes, available in the Options panel."
    h['alert'] = 'Use this component to show a message to users of your web app. Usually it is displayed near the top of your page. It can have an optional dismiss button and you can choose one of several color themes.'
    h['image'] = 'This is the &ltimage&gt  HTML element. You can control its size, source, style and responsiveness from the Options panel.'
    h['icon'] = "This is the Icon component. You can choose from a number of available icon fonts. You can modify the icon's size and color by changing its CSS font-size and color properties."
    h['carousel'] = "This is Bootstrap's versatile Carousel component. It can display and animate text and photos. You have to enable the slides' captions in order to place non-image elements inside them."
    h['button'] = 'This is the multi-functional Bootstrap Button component. You have a choice of possible themes, button types and sizes. Search for the related Dropdown and Split Button components if you need your button to trigger dropdown menus.'
    h['splitbutton'] = 'This is the Bootstrap Split Button component. It consists of two buttons, the second of which triggers a dropdown menu. Look for the Dropdown component if you need only a single button.'
    h['buttongroup'] = 'A Button Group is a Bootstrap component for grouping together buttons. If you need more than one group, check out the Button Toolbar component.'
    h['row'] = 'This is the Bootstrap Row component. This is a fundamental building block of the responsive grid. Place Rows inside Containers, and drop Columns inside them to build a responsive page.'
    h['column'] = "This is the Bootstrap Column component. This is the fundamental building block of the responsive grid. Place columns inside Rows and control their width with the col-* responsive classes. There are lots of responsive options available in the Column's Option panel."
    h['columnhelper'] = "This is the Bootstrap Column component. This is the fundamental building block of the responsive grid. Place columns inside Rows and control their width with the col-* responsive classes. There are lots of responsive options available in the Column's Option panel."
    h['container'] = 'Containers are Bootstrap components which limit the width of the page. Usually you would place a single Container as an element that wraps around all of your content. You can switch between fluid and fixed width containers from the Option panel.'
    h['tabs'] = "This is Bootstrap's Tabs component. Each tab has an associated Tab Pane which is displayed when the tab is active."
    h['accordion'] = 'This is a Bootstrap component for displaying content in vertical groups. Only one group is expanded at a time. This is a great way to organize FAQ pages and other layouts where vertical content is at a premium.'
    h['card'] = 'Cards are flexible and extensible Bootstrap 4 containers. They can include headers, footers, a wide variety of content, contextual background colors, and powerful display options.'
    h['panel'] = 'Panels are a variation of the Bootstrap 4 Card component. They can include headers, footers and multiple color styles.'
    h['thumbnail'] = 'Thumbnails are a variation of the Bootstrap 4 Card component. They can include a header image, title, description and action buttons or links.'

    this.hasht = h
  },
  methods: {
    userSelectedTagComponent (tagComponent) {
      this.$refs.home.addComponentTag = tagComponent
    },
    componentSelected (payload) {
      this.$refs.layouts.isData = true
      this.payload = payload.target
      // console.log(document.getElementsByClassName('dashboard')[0].getBoundingClientRect())
      // console.log(document.getElementById('dashboard'))
      this.homeLayoutLocation = document.getElementById('dashboard').getBoundingClientRect()
      this.$refs.layouts.getData(payload, this.homeLayoutLocation)
      if (this.isPustHtml) {
        this.$refs.overview.printHomeDocument()
        this.isPustHtml = false
      }
      this.$refs.overview.domSelection(payload.target)
      this.$refs.layouts.makeTreeParent(this.payload)
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
        let innerText = payload.target.innerHTML.toLowerCase().replace(/ /gi, '')
        text.innerHTML = this.hasht[innerText]

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
        let innerText = payload.target.innerHTML.toLowerCase().replace(/ /gi, '')

        let name = payload.target.innerHTML.replace(/ /gi, '')
        ui.children[0].src = './static/studioImage/' + name + '.png'
        ui.children[1].innerHTML = payload.target.innerHTML
        ui.children[2].innerHTML = this.hasht[innerText]

        ui.style.left = stu.getBoundingClientRect().right - 25 + 'px'
        ui.style.top = payload.target.getBoundingClientRect().top - 8 + 'px'

        // ui.innerHTML = this.hasht[innerText]
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
    },
    inParentTreeOption(dom){
       this.$refs.layouts.parentDom = dom
    },
    domPushWithTree(dom){
      this.$refs.layouts.domWithTree = dom
    },
    userSelectBorder(e){
      console.log(e)
      }.
    toggleClicked () {
      console.log('aaa')
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
  color: #2c3e50;
  // color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  height: 58rem;
  background-color: #2c3134;
  align-items: center;
  height: 100vh;

  .spliter{
    left: 500px;

  }

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
    .scale{
      position: absolute;
      width: 0.8rem;
      right: 2.7rem;
      height: 0.8rem;
      top:2.7rem;
    }
    .width{
      position: absolute;
      width: 1rem;
      right: 0.8rem;
      top:2.9rem;
    }
    .vue-switcher{
      position:absolute;
      right: 1rem;
      top: 4rem;
      transform: scale(1.25);
      z-index: 9999;
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
    color: #cecece;
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
