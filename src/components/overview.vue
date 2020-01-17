<template>
  <div class="container">
    <ul class="acol" >
      <li>
        <input class="checkbox" type="checkbox" id="root" />
        <label for="root">HTML</label>
        <ul>
          <li>
            <input class="checkbox" type="checkbox" id="node3" />
            <label for="node3">Body</label>
            <ul id="bodySource" @mousemove="onmouseMove" @click="clickLabelEvent">
              
              <!--

              <li id="aa">
                <input class="checkbox" type="checkbox" id="node4" />
                <label for="node4">DIV</label>
                <ul id="aaa">
                  <li id="aa">
                    <input class="checkbox" type="checkbox" id="node4" />
                    <label for="node4">DIV</label>
                    <ul id="aaa"></ul>
                  </li>
                </ul>
              </li>

              <li id="aaa">
                <input class="checkbox" type="checkbox" id="node5" />
                <label for="node5">DIVV</label>
                <ul id="aaaa"></ul>
              </li>

              -->
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['getDocument'],

  data () {
    return {
      tags: [],
      dom: [],
      childNum: 10000,
      friendNum: 0,
      isActiveLabel: [],
      myParent:[]

    }
  },

  created () {

  },

  methods: {
    printHomeDocument () {
      // console.log(this.getDocument)
      // console.log(document.body.children)
      // console.log(document.body.children[0].firstElementChild )
      // console.log(document.body.children[0].children )
      // console.log(document.body.children[0].children[1].children )
      // console.log(document.body.children[0].children[1].firstElementChild.children )
      // console.log(document.body.children[0].children[1].firstElementChild.firstElementChild )
      // console.log(document.body.children[0].children[1].lastElementChild  )
      // var anchor = document.querySelector('body')
      // console.log(Object.keys(anchor))
      // console.log(document.getElementById('dashboard'))

      // var child = this.getDocument.children

      //새로 들어온 것



      
      var child = document.getElementById('newLoaderHtml').children
      console.log(child)
      console.log(child.length)
      // console.log(child)
      for (var i = 0; i < child.length; i++) {
        // console.log(child[i])
        if (typeof (child[i].children) !== 'undefined') {
          // console.log("전")
          // var idOjb = "aa"

          // 자식
          var obj = document.getElementById('bodySource')
          var newDIV = document.createElement('li')
          // newDIV.innerHTML = child[i].tagName;
          newDIV.setAttribute('id', this.childNum)

          // newDIV.style.backgroundColor="yellow";
          obj.appendChild(newDIV)

          // console.log(this.friendNum)

          var obj = document.getElementById(this.childNum)


          var newDIV = document.createElement('input')
          // newDIV.innerHTML = child[i].tagName;
          newDIV.setAttribute('class', 'checkbox')
          newDIV.setAttribute('type', 'checkbox')
          // var nodeId = "node4"
          newDIV.setAttribute('id', this.friendNum)
          // newDIV.style.backgroundColor="yellow";
          obj.appendChild(newDIV)

          var newDIV = document.createElement('label')
          newDIV.setAttribute('for', this.friendNum)
          newDIV.setAttribute('id', this.friendNum)
          newDIV.innerHTML = child[i].tagName
          obj.appendChild(newDIV)

          // console.log(child[i])
          // console.log("여기입니다")
          this.dom.push(child[i])
          this.isActiveLabel.push(true)

          this.childNum += 1

          var newDIV = document.createElement('ul')
          // newDIV.innerHTML = child[i].tagName;
          newDIV.setAttribute('id', this.childNum)
          obj.appendChild(newDIV)

          // console.log(child[i].tagName)

          var newParentObj = document.getElementById(this.childNum)
          // console.log(obj)
         console.log(newParentObj)

          this.myParent.push(-1)
          this.findChildren(child[i], newParentObj,0)


          


         

        }
      } 
    },
    findChildren (child, obj,myParent) {
      // console.log("몇번")
      // console.log(child)
      // console.log(obj)
      // Vue.component('simple-counter', {
      //     template: '<span class="tag-list">sssss</span>',
      //     // 데이터는 기술적으로 함수이므로 Vue는 따지지 않지만
      //     // 각 컴포넌트 인스턴스에 대해 같은 객체 참조를 반환합니다.
      //     data: function () {
      //         return data
      //     }
      // })
      // Vue.component('Hello',{
      //             props: ['text'],
      //             template: `<span class="tag-list">{{text}}</span>`,

      //         })
      // const Hello = {
      //     props: ['text'],
      //     template:  `<span class="tag-list">{{text}} </div></span>
      //                 <div id="mount"> `,
      // };
      // //alert("1")
      // const HelloCtor = Vue.extend(Hello);
      // const vm = new HelloCtor({
      // propsData: {
      //     text: childOFchil[i].tagName
      // }
      // }).$mount('#mount');

      if (typeof (child.children) !== 'undefined') {
        var childOFchil = child.children
        if (childOFchil.length !== 0) {
          // console.log(childOFchil)
          for (var i = 0; i < childOFchil.length; i++) {
            // 자기 동료에 넣기
            // console.log(childOFchil[i])
            this.dom.push(childOFchil[i])
            this.isActiveLabel.push(true)
            // console.log('')
            // this.childOFchil.push(childOFchil[i].tagName)

            // console.log("1번째")
            // console.log(obj)
            this.childNum += 1
            var newDIV = document.createElement('li')
            // newDIV.innerHTML = child[i].tagName;
            // idOjb+="a"
            newDIV.setAttribute('id', this.childNum)
            // newDIV.style.backgroundColor="yellow";
            // obj.appendChild(newDIV);
            obj.appendChild(newDIV)

            this.friendNum += 1

            // var obbj = document.getElementById(idOjb)
            var newParentObj = document.getElementById(this.childNum)
            var newDIV = document.createElement('input')
            // newDIV.innerHTML = child[i].tagName;
            newDIV.setAttribute('class', 'checkbox')
            newDIV.setAttribute('type', 'checkbox')
            newDIV.setAttribute('style', '')
            newDIV.setAttribute('id', this.friendNum)

            // newDIV.style.backgroundColor="yellow";
            newParentObj.appendChild(newDIV)


            var newDIV = document.createElement('label')
            newDIV.setAttribute('for', this.friendNum)
            newDIV.setAttribute('id', this.friendNum)
            newDIV.innerHTML = childOFchil[i].tagName
            // newDIV.style.backgroundColor="yellow";
            newParentObj.appendChild(newDIV)

            this.childNum += 1

            var newDIV = document.createElement('ul')
            // newDIV.innerHTML = child[i].tagName;
            newDIV.setAttribute('id', this.childNum)
            // newDIV.style.backgroundColor="yellow";
            newParentObj.appendChild(newDIV)
            this.myParent.push(myParent)
            
            var newOriginalParentObj = document.getElementById(this.childNum)
            this.findChildren(childOFchil[i], newOriginalParentObj,this.friendNum)
          }
          
           
        }
      }
    },
    domSelection (payload) {
      // console.log(this.dom.length)
      // console.log(payload)
      // console.log(this.dom.length)
      console.log(payload)
      for (var i = 0; i < this.dom.length; i++) {
        if (this.isActiveLabel[i]) {
          this.isActiveLabel[i] = false
          $(`label[for="${i}"]`).trigger('click')
        }
      }
      
      // console.log(this.dom.length)

      // for (var i = 0; i < this.myParent.length; i++) {
      //   console.log(i+"번째")
      //   console.log(this.myParent[i])
      // }

      for (var i = 0; i < this.dom.length; i++) {
        if (payload === this.dom[i]) {
          // console.log(i)
          var a = i
          console.log(this.myParent)

          while(true){
            
            if(this.myParent[a]!='-1'){
              // console.log("메롱")
              // console.log(document.querySelector(`label[for="${this.myParent[a]}"]`))
              if (this.isActiveLabel[this.myParent[a]] == true) {
                  this.isActiveLabel[i] = false
                  $(document.querySelector(`label[for="${this.myParent[a]}"]`)).trigger('click')
                  
              }
              a = this.myParent[a]
            }
            else{
              this.isActiveLabel[0] = true
              $(document.querySelector(`label[for="${0}}"]`)).trigger('click')
              break;
            }
          }
          document.querySelector(`label[for="${i}"]`).scrollIntoView()
          document.querySelector(`label[for="${i}"]`).style["backgroundColor"] = "blue";
          // console.log(this.myParent[i])
          // console.log(document.querySelector(`label[for="${i}"]`))
          // console.log(document.querySelector(`label[for="${i}"]`).parentElement)
          // console.log(document.querySelector(`label[for="${i}"]`).parentElement.parentElement)

          // while(true){

          // }
          /*
          var obj = document.querySelector(`label[for="${i}"]`)
          console.log(obj)
          // console.log(payload)
          // payload.style["color"] = "blue";

          // obj.style['backgroundColor'] = 'blue'
          // console.log(getComputedStyle(payload).color)
          // console.log(obj.parentElement.querySelector(`label`))
          // console.log(newObj.parentElement.querySelector(`label`).id)
          while (1) {
            var newObj = obj
            console.log(newObj)
            console.log(newObj.parentElement.querySelector(`label`))
            if(newObj.parentElement.querySelector(`label`).id!="0"){
              if(newObj.parentElement.querySelector(`label`).id!=obj.parentElement.querySelector(`label`).id){
                obj = newObj.parentElement
                console.log(newObj.parentElement.querySelector(`label`).id)
              } else {
                obj = newObj.parentElement
              }
            } else {
              console.log('끝')
              break
            }
          }
          // console.log(obj)
          // console.log(obj.parentElement.parentElement.querySelector(`label`))
          obj.scrollIntoView()
          // console.log(obj.parent)

          */
          
          // console.log('찾았다')
        } else {
          var obj = document.querySelector(`label[for="${i}"]`)
          obj.style['backgroundColor'] = ''
        }
      }
      // for (var i = 0; i < this.dom.length; i++) {
      //         if (payload === this.dom[i]) {
      //           this.myParent.push(i)
      //           break;
      //         }
      //     }

        this.$emit('inParentTreeOption',this.myParent)
        // console.log(this.dom)
        // this.$emit('domWithTree',this.dom)

        

    },
    clickLabelEvent (e) {
      if (e.target.tagName == 'LABEL') {
        // console.log(e.target.id)
        if (this.isActiveLabel[e.target.id]) { 
          this.isActiveLabel[e.target.id] = false 
        }
        else{
          this.isActiveLabel[e.target.id] = true
        }
      }
    },
    onmouseMove (e) {
      if (e.target.tagName === 'LABEL') {
        // console.log(e.target)
        // console.log(e.target.tagName)
        // console.log(e.target.id)
        // console.log(this.dom[e.target.id])
        // console.log(this.numberinDom[2])
        // console.log(this.dom[e.target.id])
        // console.log(e.target.id)
        // console.log(this.dom)
        this.$emit('selectDomElement', this.dom[e.target.id])
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  justify-content: left;
  justify-items: left;
  padding: 0.2rem;
  text-align:left;
  overflow:auto;
}
li{
  // float:left;
}
.acol{
  padding: 0.4rem;
}
.acol label:before{
  content:'\f107';
  font-family:FontAwesome;
  // font-family: "fontello";
}
.acol, .acol ul{
  color:#e7e4e4;
  list-style:none;

}
.acol .checkbox{
  display: none;

}
.acol .checkbox:checked~ul{
  display: none;
  color:red;
}
.acol .checkbox:checked+label:before{
  content:'\f105';
  font-family: FontAwesome;
}
// #overview {
//   .studio-text-box {
//     height: 5%;
//     justify-content: left;
//     justify-items: left;
//     .studio-text {
//       background-color: #41474c;
//       padding: 0.2rem;
//       color: #fff;
//     }
//   }
//   .tag-studio {
//     border: 3px solid #49b6a7;
//     height: 95%;
//     // display: flex;
//     // flex-direction: column;
//     overflow: auto;
//     .tag-studio::-webkit-scrollbar{
//         width: 5px;
//     }
//     .search {
//       background-color: #41474c;
//       color: #fff;
//     }
//     .tag-box {
//       // overflow:scroll;
//       align-items: left;
//       justify-content: left;
//       .tag-list-box {
//         // float: left;
//         text-align: left;
//         margin: 0.1rem;
//         .tag-list {
//           margin-left: 0.4rem;
//           color: #e7e4e4;
//           cursor: pointer;
//           user-select: none; /* Prevent text selection */
//           //   float: left;
//         }

//         /* Create the tag-list/arrow with a unicode, and style it */
//         .tag-list::before {
//           content: "\25B6";
//           color: #e7e4e4;
//           display: inline-block;
//           margin-right: 6px;
//         }

//         /* Rotate the tag-list/arrow icon when clicked on (using JavaScript) */
//         .tag-list-down::before {
//           transform: rotate(90deg);
//         }
//         .nested {
//           display: none;
//         }

//         /* Show the nested list when the user clicks on the tag-list/arrow (with JavaScript) */
//         .active {
//           display: block;
//         }
//         .template {
//           margin-left: 2rem;
//           color: #e7e4e4;
//         }
//         .template::before {
//           content: "\2B1A";
//           margin-right: 0.2rem;
//         }
//         .ui {
//           margin-left: 1.2rem;
//         }
//       }
//     }
//   }
// }
</style>
