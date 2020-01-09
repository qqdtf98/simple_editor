<template>
  <div id="app">
    <div class="left-panel">
      <studio class="studio"></studio>
      <overview class="overview"></overview>
    </div>
    <div class="center-panel">
    <div class="title">Editor</div>
    <div class="editor">
    <home ref="home" @componentSelected="componentSelected" class="home"></home>
    </div>
    </div>
    <layout ref="layouts" :payload="payload" @userSelected="userSelectedWidth" class="layout"></layout>
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
      childOFchil:[],
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
      // console.log(document.body.children)
      // console.log(document.body.children[0].firstElementChild )
      // console.log(document.body.children[0].children )
      // console.log(document.body.children[0].children[1].children )
      // console.log(document.body.children[0].children[1].firstElementChild.children )
      // console.log(document.body.children[0].children[1].firstElementChild.firstElementChild )
      // console.log(document.body.children[0].children[1].lastElementChild  )
      var anchor = document.querySelector('body')
      //console.log(Object.keys(anchor))
      var child = document.body.children
      console.log(child)
      for(var i=0;i<child.length;i++){
        //console.log(child[i])
        if(typeof(child[i].children)!=='undefined'){
          //console.log("전")
          console.log(child[i].tagName)
          console.log("")
          //console.log(child[i].className)
          ///console.log(child[i].id)
          this.findChildren(child[i])
        }
      }

    },
    findChildren(child){
      //if(typeof(child.children)!=='undefined'){
        var childOFchil = child.children
        if(childOFchil.length!=0){
        //console.log(childOFchil)
          for(var i=0;i<childOFchil.length;i++){
            //console.log(child[i])
              //console.log("후")
              console.log(childOFchil[i])
              //this.childOFchil.push(childOFchil[i].tagName)
              this.findChildren(childOFchil[i])
          }
        }
        else{
          //console.log(this.childOFchil)
          //this.childOFchil = []
          console.log("자식끝")
        }
    }
    ,
    userSelectedWidth (data) {
      this.data = data
      this.$refs.home.styleChanged(this.data)
    },
 
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

}
</style>
