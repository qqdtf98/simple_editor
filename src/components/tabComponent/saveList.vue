<template>
  <div id="savelist">
    <div @click="saveFile" class="save list-tab">Save</div>
    <div class="save-as list-tab">Save As</div>
    <div @click="exportFile" class="save-all list-tab">Save All</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  // 'C:/Users/anylogic/Desktop/sampleCode/HTML/index.html'
  methods: {
    saveFile() {
      var paramsToSend = {}
      var i = 1

      $.ajax({
        type: 'POST',
        url: 'C:/Users/anylogic/Desktop/sampleCode/HTML/index.html',
        data: { params: 'ererer' },
        success: function(data) {
          console.log('SUCCESS!!!')
        }
      })
    },
    exportFile() {
      // this.$emit('export')
      // console.log(
      //   $('iframe').get(0).contentWindow.document.documentElement.innerHTML
      // )
      $('iframe').get(0).contentWindow.document.documentElement.innerHTML =
        'eee'
      // var fs = require('fs')
      // fs.mkdir('C:/Users/anylogic/Desktop/문서')

      // var FileSaver = require('file-saver')
      // var blob = new Blob(
      //   [$('iframe').get(0).contentWindow.document.documentElement.innerHTML],
      //   {
      //     type: 'text/plain;charset=utf-8'
      //   }
      // )
      // FileSaver.saveAs(blob, 'C:/Users/anylogic/Desktop/문서/hello world.html')
      var filePath =
        'http://192.168.0.86:8581/editor_file_upload/lsm/Project_A.zip'
      var fileName = 'Project_A.zip'
      axios({
        url: filePath,
        method: 'GET',
        responseType: 'blob' // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
      })
    }
  }
}
</script>

<style lang="scss">
#savelist {
  // border: 1px solid black;
  color: #fff;
  box-shadow: 1px 0.5px 0.5px #000000;
  background-color: #1a1a24;
  .save,
  .save-as,
  .save-all {
    margin-top: 0.15rem;
    cursor: default;
    margin-bottom: 0.15rem;
    width: 8rem;
    font-size: 0.9rem;
    padding-left: 0.5rem;
    text-align: left;
    &:hover {
      background-color: #39394e;
    }
  }
}
</style>
