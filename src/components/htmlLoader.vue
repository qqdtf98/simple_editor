<template>
    <div id="app">
        <div>
            <p id="newLoaderHtml" v-html="html"></p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      // yuri: 's',
      html: `
        <div class="dsa">
        <button class="dsadsadsa"
        type="button"
        style="color: #fff; background:blue; font-size:2em; border-radius:0.5em; padding:5px 20px;"
        @click="testLoaderScript"
        >도움말
        <div> dfdsfdsfds 
        <div> dfdsfdsfds </div>
        <div> dfdsfdsfds </div>
        </div>
        </button>
        <img class="adasdsadas" src='./static/studioImage/FooterBasic.png' width="300" height="300">
        <div> dfdsfdsfds </div>
        </div>
        `
    }
  },
  created () {
          var oScript = document.createElement('script');
      oScript.type ='text/javascript';
      oScript.charset ='utf-8';		  
      oScript.src = 'ssss.js';
      console.log(oScript)
      console.log(document.getElementsByTagName('head')[0])
  },
  methods: {
    onFileChange (file) {
      console.log(file)
      //   console.log(file.srcElement.value)
      console.log(file.target.files[0].name)
      //   var rawFile = new XMLHttpRequest();
      rawFile.open('GET', file.target.files[0].name)
      console.log(rawFile)
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            // var allText = ;
            console.log(rawFile)
            console.log(rawFile.responseText)
          }
        }
      }
      rawFile.send(null)
    },
    testLoaderScript(){
      var oScript = document.createElement('script');
      oScript.type ='text/javascript';
      oScript.charset ='utf-8';		  
      oScript.src = 'ssss.js';
      console.log(oScript)
      alert("s")
      document.getElementsByTagName('head')[0].appendChild(oScript);
      
    }
  }
}
</script>

<style lang="scss">

</style>
