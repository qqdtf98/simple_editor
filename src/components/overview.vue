<template>
  <div class="dashboard">
    <ul class="tree" @mousemove="onmouseMove">
      <li>
        <input class="checkbox" type="checkbox" id="root" />
        <label for="root">HTML</label>
        <ul>
          <li>
            <input class="checkbox" type="checkbox" id="node3" />
            <label for="node3">Body</label>
            <ul id="bodySource">
              <!-- <li id="aa">
                <input class="checkbox" type="checkbox" id="node4" />
                <label for="node4">DIV</label>
                <ul id="aaa"></ul>
              </li>
              <li id="aaa">
                <input class="checkbox" type="checkbox" id="node5" />
                <label for="node5">DIVV</label>
                <ul id="aaaa"></ul>
              </li>-->
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
      friendNum: 0

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

      var child = this.getDocument.children
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

          console.log(this.friendNum)

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

          this.childNum += 1

          var newDIV = document.createElement('ul')
          // newDIV.innerHTML = child[i].tagName;
          newDIV.setAttribute('id', this.childNum)
          obj.appendChild(newDIV)

          // console.log(child[i].tagName)

          obj = document.getElementById(this.childNum)

          // console.log(obj)
          this.findChildren(child[i], obj)
        }
      }
    },
    findChildren (child, obj) {
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
            var obj = document.getElementById(this.childNum)
            var newDIV = document.createElement('input')
            // newDIV.innerHTML = child[i].tagName;
            newDIV.setAttribute('class', 'checkbox')
            newDIV.setAttribute('type', 'checkbox')
            newDIV.setAttribute('id', this.friendNum)

            // newDIV.style.backgroundColor="yellow";
            obj.appendChild(newDIV)

            var newDIV = document.createElement('label')
            newDIV.setAttribute('for', this.friendNum)
            newDIV.setAttribute('id', this.friendNum)
            newDIV.innerHTML = childOFchil[i].tagName
            // newDIV.style.backgroundColor="yellow";
            obj.appendChild(newDIV)

            this.childNum += 1
            var newDIV = document.createElement('ul')
            // newDIV.innerHTML = child[i].tagName;
            newDIV.setAttribute('id', this.childNum)
            // newDIV.style.backgroundColor="yellow";
            obj.appendChild(newDIV)

            obj = document.getElementById(this.childNum)
            this.findChildren(childOFchil[i], obj)
          }
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
.dashboard {
  overflow: auto;
  padding-right:200px;

}
.tree label:before{
  content:"열:"
}
.tree, .tree ul{
  color:#e7e4e4;
  list-style:none;

}
.tree .checkbox{
  display: none;

}
.tree .checkbox:checked~ul{
  display: none;
  color:red;
}
.tree .checkbox:checked+label:before{
  content:"닫:"
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
