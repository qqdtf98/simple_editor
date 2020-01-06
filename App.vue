<template>
  <div class="blue lighten-3 pa-3">
    <h1>Editor Prototype</h1>
    <hr />
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <HomeComponent @child = "parents"></HomeComponent>
      </v-flex>
      <v-flex xs12 sm6>
        <LayoutComponent :isEdited="isEdited"></LayoutComponent>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import HomeComponent from './Home'
  import LayoutComponent from './Layout'
  export default{
    components:{
      HomeComponent,
      LayoutComponent,
    },
    data(){
      return{
        isEdited : false,
        
      }
    },
    methods:{
      parents(){
        this.isEdited = true
      }
    }
  }
</script>

<style lang="scss">
</style>
