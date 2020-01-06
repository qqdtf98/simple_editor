<template>
  <div id="app">
    <home></home>
    <layout></layout>
  </div>
</template>

<script>
import home from './components/home'
import layout from './components/layout'

export default {
  components: {home, layout},
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>