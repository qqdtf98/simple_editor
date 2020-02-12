<template>
    <div class="container">
        <ul class="tree">
            <label for="root">HTML </label>
            <input type="checkbox" id="root">
           
            <ul>
                <li>node1</li>
            </ul>
        </ul>
        <ul class="tree">
            <label for="root">HTML </label>
            <input type="checkbox" id="root">
           
            <ul>
                <li>node1</li>
            </ul>
        </ul>
        <ul class="tree">
            <label for="root">HTML </label>
            <input type="checkbox" id="root">
           
            <ul>
                <li>node1</li>
            </ul>
        </ul>
        <!--
        <div class="tag-box">
            <div class="tag-list-box">
            <span class="tag-list">Pages</span>
            <div class="nested" @click="setFileCodeLoder">
                <div name = "html" >index.html</div>
            </div>
            </div>
            <div class="tag-list-box">
            <span class="tag-list">Style</span>
            <div class="nested" @click="setFileCodeLoder">
                <div name = "css" >index.css</div>
            </div>
            </div>

            <div class="tag-list-box">
            <span class="tag-list">JavaScript</span>
            <div class="nested" @click="setFileCodeLoder">
                <div name = "js" >index.js</div>
            </div>
            </div>
        </div>
        -->
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
                <!--<img @click="closeCoderLoader" class="close-btn" src="../assets/images/close.svg" />
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
.tree{
    color:#fff
}
input[type="checkbox"]{
    // display:none;
}
input[type="checkbox"]:checked~ul{
    display:none;
}

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
          content: "\25B6";
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
