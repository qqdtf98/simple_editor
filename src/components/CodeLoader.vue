<template>
    <div>
        <div class="studio-text-box"> 
          <span class="studio-text">FileList</span>
          <img @click="closeFileList" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0wIDNDMCAxLjM0MzE1IDEuMzQzMTUgMCAzIDBINDdDNDguNjU2OSAwIDUwIDEuMzQzMTUgNTAgM1Y0N0M1MCA0OC42NTY5IDQ4LjY1NjkgNTAgNDcgNTBIM0MxLjM0MzE1IDUwIDAgNDguNjU2OSAwIDQ3VjI1VjNaIiBmaWxsPSIjOTI5MTkxIi8+DQo8cmVjdCB4PSIzNC42NjAyIiB5PSIzOS4wNjk3IiB3aWR0aD0iMzMuOTk4NyIgaGVpZ2h0PSI1Ljg4MjM1IiByeD0iMi45NDExOCIgdHJhbnNmb3JtPSJyb3RhdGUoLTEzNSAzNC42NjAyIDM5LjA2OTcpIiBmaWxsPSJ3aGl0ZSIvPg0KPHJlY3QgeD0iMTAuNzU2IiB5PSIzNC44MjEyIiB3aWR0aD0iMzQiIGhlaWdodD0iNS44ODIzNSIgcng9IjIuOTQxMTgiIHRyYW5zZm9ybT0icm90YXRlKC00NSAxMC43NTYgMzQuODIxMikiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg==" class="close-btn">
        </div>
        <div class="file-box">
            <div class="file-list-box">
            <span class="file-list">Pages</span>
            <div class="nested-file" @click="setFileCodeLoder">
                <div name = "html" >index.html</div>
            </div>
            </div>
            <div class="file-list-box">
            <span class="file-list">Style</span>
            <div class="nested-file" @click="setFileCodeLoder">
                <div name = "css" >index.css</div>
            </div>
            </div>

            <div class="file-list-box">
            <span class="file-list">JavaScript</span>
            <div class="nested-file" @click="setFileCodeLoder">
                <div name = "js" >index.js</div>
            </div>
            </div>
        </div>
        <!--
        <div class="loadDataPanel">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" @click="chageTab">
                <li class="nav-item">
                    <a class="nav-link " name='html'  v-bind:class="{ active:tabStep===1 }" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="false">HTML</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " name='css'v-bind:class="{ active:tabStep===2 }" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">CSS</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" name='js' v-bind:class="{ active:tabStep===3 }" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">JavaScript</a>
                </li>
                <!--<img @click="closeCoderLoader" class="close-btn" src="../assets/close.svg" />
            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div v-if="isData"  class="tab-pane " v-bind:class="{ active:tabStep===1 }" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <div>
                        <pre>{{testMessage}}</pre>
                    </div>
                </div>
                <div v-show="isData" class="tab-pane "  v-bind:class="{ active:tabStep===2}"id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                    <div>
                        <pre v-bind:value="this.loaderData[1]" id="preview2">불러올 데이터가 없습니다.</pre>
                    </div>
                </div>
                <div v-show="isData" class="tab-pane "  v-bind:class="{ active:tabStep===3}"id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    <div>
                        <textarea class ="showJS" v-bind:value="this.loaderData[2]" id="preview3">dsdsadsadasdasdsa</textarea>
                        <input  style="float:left;" type="submit"  value="Apply" @change="inputFile" id="getfile" accept="text/*">
                    </div>
                </div>
            </div>
            -->
        </div>
         <!--
        <div v-if="kindOfLoadDate==1">
                <pre>{{testMessage}}</pre>
        </div>

        <div v-if="kindOfLoadDate==2">
        <pre v-bind:value="this.loadData[1]" id="preview2">불러올 데이터가 없습니다.</pre>
        </div>

        <div v-if="kindOfLoadDate==3">
            <textarea style="word-break:break-all"  class ="showJS" v-bind:value="this.loadData[2]" id="preview3"></textarea>
            <input  type="submit"  value="Apply" @change="inputFile" id="getfile" accept="text/*">
        </div>
        -->
    </div>
</template>
<script>
export default {
    name:'App',
    props:['loaderData'],
    data(){
        return{
            loadData:'',
            isData:true,
            kindOfLoadDate:0,
            tabStep:1,
        }
    },
    computed:{
	  testMessage: function (){
		  this.test = document.getElementById("newLoaderHtml").innerHTML
		  return this.test
	  }
    },
    methods:{
        chageTab (e) {
            console.log(e.target.name)
            if (e.target.getAttribute('name')=='html') {
                this.tabStep = 1
    			this.kindOfLoadDate=1
            } else if (e.target.getAttribute('name')=='css') {
                this.tabStep = 2
                this.kindOfLoadDate=2
            } else if (e.target.getAttribute('name')=='js') {
                this.tabStep = 3
                this.kindOfLoadDate=3
            }
            this.chageContent()
        },
        chageContent(){
            if(this.kindOfLoadDate==1){
                // document.querySelector('#preview').textContent = this.loadData[0]
                this.test = document.getElementById("newLoaderHtml").innerHTML
            }
            else if(this.kindOfLoadDate==2){
                document.querySelector('#preview2').textContent = this.loaderData[1]
            }
            else if(this.kindOfLoadDate==3){
                console.log(document.querySelector('#preview3'))
                document.querySelector('#preview3').innerHTML = this.loaderData[2]
            }
        },
        inputFile(e){
            var file = document.querySelector('#getfile');
            file.onchange = function () { 
                var fileList = file.files ;
                
                // 읽기
                var reader = new FileReader();
                reader.readAsText(fileList [0]);

                //로드 한 후
                reader.onload = function  () {
                    document.querySelector('#preview').textContent = reader.result ;
                }; 
            }; 
        },
        setFileCodeLoder(e){
             if (e.target.getAttribute('name')=='html') {
                this.$emit('setFile','html')
            } else if (e.target.getAttribute('name')=='css') {
                this.$emit('setFile','css')
            } else if (e.target.getAttribute('name')=='js') {
                this.$emit('setFile','js')
            }
        },
        closeFileList(e){
            $(document.getElementById("codeBtnFileList")).trigger('click')
	    },
    }
}
</script>
<style lang="scss">
    .bottom-panel{
        width:100%;
    }
    .fileTitle {
        font-size: 15px;
        color:white;
        font-weight: bold;
        padding: 7px 14px;
        vertical-align: bottom;
        display: inline-block;
        margin-right: 28%;
        margin-bottom: 0.2%;
        float: none;
        border: 2px solid black;
        background-color:#666666;
    
    }
    pre, .showJS {
        text-align:left;
        width:100%;
        height:100%;
        padding: 1em;
        background: rgb(240, 240, 240);
        color: rgb(0, 0, 0);
        border-radius: .5em;
        overflow:auto;
    }
    .file-box {
      // overflow:scroll;
      align-items: left;
      justify-content: left;
      .file-list-box {
        // float: left;
        text-align: left;
        margin: 0.1rem;
        .file-list {
          margin-left: 0.4rem;
          color: #e7e4e4;
          cursor: pointer;
          user-select: none; /* Prevent text selection */
          //   float: left;
          transition: all 300ms ease;
        }

        /* Create the tag-list/arrow with a unicode, and style it */
        .file-list::before {
          content: "\25B6";
          color: #e7e4e4;
          display: inline-block;
          margin-right: 6px;
        }

        /* Rotate the file-list/arrow icon when clicked on (using JavaScript) */
        .file-list-down::before {
          transform: rotate(90deg);
        }
        .nested-file {
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
          content: "\2B1A";
          margin-right: 0.2rem;
        }
        .ui {
          margin-left: 1.2rem;
        }
      }
      .filter{
        color:white;
        text-align: left;
        margin-left: 1rem;

      }
    }
    .loadDataPanel{
        width: 92%;
        z-index: 10000;
        position: fixed;
        bottom: 5%;
        height: 20rem;
        background-color: #23282b;
    }
</style>

