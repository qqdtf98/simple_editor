<template>
    <div id="app">
        <div>
            <p v-html="html"></p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'App',
  data() {
      return {
        yuri:"s",
        html: `
        <div class="1">
        <button class="2"
        type="button"
        style="color: #fff; background:blue; font-size:2em; border-radius:0.5em; padding:5px 20px;"
        onclick="alert('눌렀습니다.')">도움말</button>
        <img class="3" src='./static/studioImage/FooterBasic.png' width="300" height="300">
        </div>
        `,
      }
  },
  mounted () {
    
  },
  methods: {
    onFileChange(file) {

    console.log(file)  
    //   console.log(file.srcElement.value)
      console.log(file.target.files[0].name)
    //   var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file.target.files[0].name);
        console.log(rawFile)
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    // var allText = ;
                    console.log(rawFile)
                    console.log(rawFile.responseText)
                }
            }
        }
        rawFile.send(null);
        }
    }  
}
</script>

<style lang="scss">

</style>
