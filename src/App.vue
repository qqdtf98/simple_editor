<template>
  <div id="app">
    <div class="left-panel">
      <studio @desc-close="tagNotSelected" @tag-select="tagSelected" class="studio"></studio>
      <overview class="overview"></overview>
    </div>
    <div class="center-panel">
    <div class="title">Editor</div>
    <div class="editor">
    <home ref="home" @componentSelected="componentSelected" class="home"></home>
    </div>
    </div>
    <layout ref="layouts" :payload="payload" @userSelected="userSelectedWidth" class="layout"></layout>
    <span v-if="tagDescription" class="description-tag">
        <span class="desc-tag-text">ccdffsdddd
        </span>
      </span>
  </div>
</template>

<script>
import home from './components/home'
import layout from './components/layout'
import studio from './components/studio'
import overview from './components/overview'

export default {
  components: {home, layout, studio, overview},
  name: 'App',
  data () {
    return {
      payload: '',
      data: '',
      homeLayoutLocation: '',
      tagDescription: false
    }
  },
  methods: {
    componentSelected (payload) {
      this.payload = payload.target
      // console.log(payload.x)
      // console.log(payload.y)
      // console.log(payload.target.getBoundingClientRect().width)
      // console.log(payload.target.getBoundingClientRect().height)
      // console.log(document.getElementsByClassName('dashboard')[0].getBoundingClientRect())
      this.homeLayoutLocation = document.getElementsByClassName('dashboard')[0].getBoundingClientRect()
      // console.log(this.homeLayoutLocation)
      this.$refs.layouts.getData(payload, this.homeLayoutLocation)
    },
    userSelectedWidth (data) {
      this.data = data
      this.$refs.home.styleChanged(this.data)
    },
    tagSelected (payload) {
      let text = document.querySelector('.desc-tag-text')
      if (payload.innerHTML === 'Image') {
        this.tagDescription = true
        text.innerHTML = 'This is the <image> HTML element.asdffffffffffffffffffffffffffffffffsdfsdfs'
        console.log(text.innerHTML)
      } else if (payload.innerHTML === 'Icon') {}
      // console.log(payload.innerHTML)
    },
    tagNotSelected () {
      this.tagDescription = false
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  height: 58rem;
  background-color: #2c3134;
  align-items: center;

  .left-panel{
    width:20%;
    height:100%;

    .studio{
      height: 50%;
    border: 2px solid #23282b;
    }

    .overview{
    border: 2px solid #23282b;
      height: 50%;
    }
  }
  .center-panel{
    width:60%;
    height: 80%;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    .title{
      position: absolute;
      text-align: center;
      left: 0;
      color: #fff;
      height:4.02%;
      background-color: #545e66;
      padding:0.3rem;
      padding-left: 0.9rem;
      padding-right: 0.9rem;
      top: 0;
    }
  .editor{
    width:100%;
    position: absolute;
    bottom:0;
    height: 96%;
    border: 2px solid #545e66;
    display: flex;
    align-items: center;
    justify-content: center;
    // overflow: hidden;
    .home{
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

  .description-tag{
      background-color: #000;
      padding: 0.5rem;
      .desc-tag-text{
        color: #cecece;
      }
    }

}
</style>
