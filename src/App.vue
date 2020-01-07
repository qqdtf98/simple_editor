<template>
  <div id="app">
    <div class="left-panel">
      <studio class="studio"></studio>
      <overview class="overview"></overview>
    </div>
    <home ref="home" @componentSelected="componentSelected" class="home"></home>
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
  data(){
    return{
      payload : '',
      data: ''
    }
  },
  methods: {
    componentSelected(payload){
      this.payload = payload.target
      this.$refs.layouts.getData(payload)
    },
    userSelectedWidth(data){
      this.data = data
      this.$refs.home.styleChanged(this.data)
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