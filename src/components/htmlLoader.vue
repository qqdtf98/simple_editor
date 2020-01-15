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
        html: 
        `<html>
        <body>
        <div class="jeongbin">
        <h1 class="seongmin">dsads</h1>
        </div>
        </body>
        </html>
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
