<template>
    <div id="overview">
    <div class="studio-text-box">
      <span class="studio-text">overview</span>
    </div>
    <div class="tag-studio">
      <div class="search">search</div>
      <div class="tag-box">
        <div class="tag-list-box">
          <span class="tag-list">HTML</span>
          <div class="nested">
            <div class="tag-list-box">
              <span class="tag-list ui" id="bodySource">Body</span>
              <div class="nested">
                <div class="template">Article Clean</div>
                <div>Article Dual Column</div>
                <div>Article List</div>
              </div>
            </div>
            <div class="tag-list-box">
              <span class="tag-list ui">Features</span>
              <div class="nested">
                <div>Features Blue</div>
                <div>Features Boxed</div>
                <div>Features Clean</div>
              </div>
            </div>
            <div class="tag-list-box">
              <span class="tag-list ui">Footers</span>
              <div class="nested">
                <div>Footer Basic</div>
                <div>Footer Clean</div>
                <div>Footer Dark</div>
              </div>
            </div>
          </div>
        </div>
        <div class="tag-list-box">
            <div id="mount">ssss</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  props: ['getDocument'],

  data () {
    return {
      tags: []
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

      // console.log()
      var child = this.getDocument.children
      // console.log(child)
      for (var i = 0; i < child.length; i++) {
        // console.log(child[i])
        if (typeof (child[i].children) !== 'undefined') {
          // console.log("전")

          var obj = document.getElementById('bodySource')
          var newDIV = document.createElement('span')
          newDIV.innerHTML = child[i].tagName
          newDIV.setAttribute('class', 'tag-list ui')
          // newDIV.style.backgroundColor="yellow";

          obj.appendChild(newDIV)

          // console.log(child[i].tagName)
          // console.log('')
          // console.log(child[i].className)
          /// console.log(child[i].id)
          //   const Hello = {
          //           props: ['text'],
          //           template:  ` <span class="tag-list"><div id="mount"> {{text}} </div></span>`,
          //       };
          //       //alert("1")
          //       const HelloCtor = Vue.extend(Hello);
          //       const vm = new HelloCtor({
          //       propsData: {
          //           text: child[i]

          //       }
          //       }).$mount('#mount');
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
      //             props: ['text'],
      //             template: ' <span class="tag-list">{{text}}<div id="mount"> </div></span>',
      //         };
      // //alert("1")
      // const HelloCtor = Vue.extend(Hello);
      // const vm = new HelloCtor({
      // propsData: {
      //     text: child.tagName

      // }
      // }).$mount('#mount');
      // 넣기
      if (typeof (child.children) !== 'undefined') {
        var childOFchil = child.children
        if (childOFchil.length !== 0) {
          // console.log(childOFchil)
          for (var i = 0; i < childOFchil.length; i++) {
            // 자기 동료에 넣기
            // console.log(childOFchil[i].tagName)
            // console.log('')
            // this.childOFchil.push(childOFchil[i].tagName)
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

            // newDIV.style.backgroundColor="yellow";

            var newDIV = document.createElement('div')
            newDIV.innerHTML = childOFchil[i].tagName
            newDIV.setAttribute('class', 'tag-list ui')
            obj.appendChild(newDIV)

            this.findChildren(childOFchil[i], obj)
          }
        }
      } else {
        // console.log(this.childOFchil)
        // this.childOFchil = []
        // console.log('자식끝')
      }
    }
  }
}
</script>
<style lang="scss">
#overview {
  .studio-text-box {
    height: 5%;
    justify-content: left;
    justify-items: left;
    .studio-text {
      background-color: #41474c;
      padding: 0.2rem;
      color: #fff;
    }
  }
  .tag-studio {
    border: 3px solid #49b6a7;
    height: 95%;
    // display: flex;
    // flex-direction: column;
    overflow: auto;
    .tag-studio::-webkit-scrollbar{
        width: 5px;
    }
    .search {
      background-color: #41474c;
      color: #fff;
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
        }

        /* Create the tag-list/arrow with a unicode, and style it */
        .tag-list::before {
          content: "\25B6";
          color: #e7e4e4;
          display: inline-block;
          margin-right: 6px;
        }

        /* Rotate the tag-list/arrow icon when clicked on (using JavaScript) */
        .tag-list-down::before {
          transform: rotate(90deg);
        }
        .nested {
          display: none;
        }

        /* Show the nested list when the user clicks on the tag-list/arrow (with JavaScript) */
        .active {
          display: block;
        }
        .template {
          margin-left: 2rem;
          color: #e7e4e4;
        }
        .template::before {
          content: "\2B1A";
          margin-right: 0.2rem;
        }
        .ui {
          margin-left: 1.2rem;
        }
      }
    }
  }
}
</style>
