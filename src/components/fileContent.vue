<template>
  <div class="container">
    <ul class="tree">
      <label for="root">HTML </label>
      <input type="checkbox" id="root" />

      <ul>
        <li>html</li>
      </ul>
    </ul>
    <ul class="tree">
      <label for="root">CSS </label>
      <input type="checkbox" id="root" />

      <ul>
        <li>css</li>
      </ul>
    </ul>
    <ul class="tree">
      <label for="root">JavaScript </label>
      <input type="checkbox" id="root" />

      <ul>
        <li @click="addJS">js</li>
      </ul>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: ['loaderData'],
  data() {
    return {
      loadData: '',
      isData: true,
      kindOfLoadDate: 0,
      tabStep: 1
    }
  },
  computed: {
    testMessage: function() {
      this.test = document.getElementById('newLoaderHtml').innerHTML
      return this.test
    }
  },
  methods: {
    addJS() {
      this.$emit('add-js')
    },
    chageTab(e) {
      console.log(e.target.name)
      if (e.target.getAttribute('name') == 'html') {
        this.tabStep = 1
        this.kindOfLoadDate = 1
      } else if (e.target.getAttribute('name') == 'css') {
        this.tabStep = 2
        this.kindOfLoadDate = 2
      } else if (e.target.getAttribute('name') == 'js') {
        this.tabStep = 3
        this.kindOfLoadDate = 3
      }
      this.chageContent()
    },
    chageContent() {
      if (this.kindOfLoadDate == 1) {
        // document.querySelector('#preview').textContent = this.loadData[0]
        this.test = document.getElementById('newLoaderHtml').innerHTML
      } else if (this.kindOfLoadDate == 2) {
        document.querySelector('#preview2').textContent = this.loaderData[1]
      } else if (this.kindOfLoadDate == 3) {
        console.log(document.querySelector('#preview3'))
        document.querySelector('#preview3').innerHTML = this.loaderData[2]
      }
    },
    inputFile(e) {
      var file = document.querySelector('#getfile')
      file.onchange = function() {
        var fileList = file.files

        // 읽기
        var reader = new FileReader()
        reader.readAsText(fileList[0])

        //로드 한 후
        reader.onload = function() {
          document.querySelector('#preview').textContent = reader.result
        }
      }
    },
    setFileCodeLoder(e) {
      if (e.target.getAttribute('name') == 'html') {
        this.$emit('setFile', 'html')
      } else if (e.target.getAttribute('name') == 'css') {
        this.$emit('setFile', 'css')
      } else if (e.target.getAttribute('name') == 'js') {
        this.$emit('setFile', 'js')
      }
    },
    closeFileList(e) {
      $(document.getElementById('codeBtnFileList')).trigger('click')
    }
  }
}
</script>
<style lang="scss">
.tree {
  color: #fff;
}
input[type='checkbox'] {
  // display:none;
}
input[type='checkbox']:checked ~ ul {
  display: none;
}

.bottom-panel {
  width: 100%;
}
.fileTitle {
  font-size: 15px;
  color: white;
  padding-right: 14px;
  padding-left: 14px;
  padding-top: 4px;

  vertical-align: bottom;
  display: inline-block;
  text-align: center;
  margin-right: 28%;
  margin-bottom: 0.2%;
  float: none;
  border: 2px solid black;
  background-color: #666666;
}
pre,
.showJS {
  text-align: left;
  width: 100%;
  height: 100%;
  padding: 1em;
  background: rgb(240, 240, 240);
  color: rgb(0, 0, 0);
  border-radius: 0.5em;
  overflow: auto;
}
.tag-box {
  // overflow:scroll;
  align-items: left;
  justify-content: left;
  .tag-list-box {
    // float: left;
    text-align: left;
    margin: 0.1rem;
    .tag-list {
      margin-left: 0.4rem;
      color: #e7e4e4;
      cursor: pointer;
      user-select: none; /* Prevent text selection */
      //   float: left;
      transition: all 300ms ease;
    }

    /* Create the tag-list/arrow with a unicode, and style it */
    .tag-list::before {
      content: '\25B6';
      color: #e7e4e4;
      display: inline-block;
      margin-right: 6px;
    }

    /* Rotate the file-list/arrow icon when clicked on (using JavaScript) */
    .tag-list-down::before {
      transform: rotate(90deg);
    }
    .nested {
      display: none;
    }

    /* Show the nested-file list when the user clicks on the tag-list/arrow (with JavaScript) */
    .active {
      display: block;
    }
    .template {
      margin-left: 2rem;
      color: #e7e4e4;
      &:hover {
        background-color: #414649;
        cursor: default;
      }
    }
    .template::before {
      content: '\2B1A';
      margin-right: 0.2rem;
    }
    .ui {
      margin-left: 1.2rem;
    }
  }
  .filter {
    color: white;
    text-align: left;
    margin-left: 1rem;
  }
}
</style>
