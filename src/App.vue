<template>
  <div id="app">
    <div class="left-panel">
      <studio class="studio"></studio>
      <overview class="overview"></overview>
    </div>
    <home @componentSelected="componentSelected" class="home"></home>
    <layout ref="layouts" :payload="payload" @userSelected="userSelected" class="layout"></layout>
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
  data(){
    return{
      payload : '',
    }
  },
  methods: {
    componentSelected(payload){
      this.payload = payload.target
      console.log(payload.x)
      console.log(payload.y)
      console.log(payload.target.getBoundingClientRect().width)
      console.log(payload.target.getBoundingClientRect().height)
      this.$refs.layouts.getData(payload)

    },
    userSelected(data){
      console.log(data)
    }
  }
}
</script>

<style lang="scss">
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

  .left-panel{
    width:20%;
    

    .studio{
      height: 50%;
    border: 1px solid #23282b;
    }

    .overview{
    border: 1px solid #23282b;
      height: 50%;
    }
  }
  
  .home{
    width:60%; 
    height: 100%;
  }

  .layout {
    width: 20%;
    height: 100%;
    border: 1px solid #23282b;
  }

}
</style>