<template>
    <div id="app">
        <div>
            <div id="newLoaderHtml" ref="mydiv" v-html="html"></div>
            <button id="test4" >test</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      // yuri: 's',
      html: 
`<div class="dsa">
  <button class="dsadsadsa" id="dsadsadsa"
  type="button"
  >도움말
  <div> dfdsfdsfds 
    <div> dfdsfdsfds </div>
    <div> dfdsfdsfds </div>
  </div>
  </button>
  <img class="adasdsadas" src='./static/studioImage/FooterBasic.png' width="300" height="300">
  <div> dfdsfdsfds </div>
</div>`,
      test: '2',
      loadJavaScript:

`var file = document.querySelector('#getfile');

file.onchange = function () { 
    var fileList = file.files ;
    
    // 읽기
    var reader = new FileReader();
    reader.readAsText(fileList [0]);

    //로드 한 후
    reader.onload = function  () {
        document.querySelector('#preview').textContent = reader.result ;
    }; 
};`,
      loadDate:[]
    }
  },
  created () {
    var oScript = document.createElement('style')
    oScript.type = 'text/css'
    oScript.innerHTML = 
`#dsadsadsa{
  color: #fff; 
  background:blue;
  font-size:2em; 
  border-radius:0.5em;
  padding:5px 20px;
}`
    document.getElementsByTagName('head')[0].appendChild(oScript)
    // var vScript = document.createElement('script');
    // vScript.type ='text/javascript';
    // vScript.charset ='utf-8';
    // vScript.innerHTML=`
    // open(){
    //   alert("s")
    // }
    // `
    // document.getElementsByTagName('head')[0].appendChild(vScript)
    this.loadDate.push(this.html)
    this.loadDate.push(oScript.innerHTML)
    this.loadDate.push(this.loadJavaScript)

    this.$emit('loadData', this.loadDate)
    
    // console.log(this.loadDate)
  },
  methods: {
    onFileChange (file) {
      // console.log(file)
      // //   console.log(file.srcElement.value)
      // console.log(file.target.files[0].name)
      //   var rawFile = new XMLHttpRequest();
      rawFile.open('GET', file.target.files[0].name)
      // console.log(rawFile)
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            // var allText = ;
            // console.log(rawFile)
            // console.log(rawFile.responseText)
          }
        }
      }
      rawFile.send(null)
    },
    testLoaderScript () {
      // var oScript = document.createElement('script');
      // oScript.type ='text/javascript';
      // oScript.charset ='utf-8';
      // oScript.src = 'ssss.js';
      // console.log(oScript)
      // alert("s")
      // document.getElementsByTagName('head')[0].appendChild(oScript);

    }
  },
  mounted () {
    console.log(this.$refs['mydiv'].firstChild)
    this.$refs['mydiv'].firstChild.addEventListener('click', function (event) {
      event.preventDefault()
      console.log('clicked: ', event.target)
      // alert('눌렀습니다')
    })
  }

}
</script>

<style lang="scss">

</style>
