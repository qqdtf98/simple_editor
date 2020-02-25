<template>
  <div class="container">
    <vue-custom-scrollbar class="overview-scroll-area">
      <div class="overview-box">
        <ul class="acol">
          <li>
            <input class="checkbox" type="checkbox" id="root" />
            <label for="root">HTML</label>
            <ul
                  id="bodySource"
                  @mousemove="onmouseMove"
                  @click="clickLabelEvent"
                  style="text-indent:10px"
                ></ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'

export default {
  components: { vueCustomScrollbar },
  props: ['getDocument'],

  data() {
    return {
      tags: [],
      dom: [],
      childNum: 10000,
      friendNum: 0,
      isActiveLabel: [],
      myParent: [],
      overviewMove: false,
      isStickOverview: false,
      xInter: 0,
      yInter: 0,
      intent: 10,
      moveTarget: null,
      loadId: ''
    }
  },
  methods: {
    setId(id) {
      this.loadId = id
      this.printHomeDocument()
    },
    printHomeDocument() {
      // var child = document.getElementById(this.loadId).children
      var child = $('iframe').get(0).contentWindow.document.body
      console.log(child)

      // console.log(child)

      // child = child[0djjdjfs]
      // console.log(child.children)
      // console.log(child[1].children)

      // console.log("전")
      // var idOjb = "aa"
      // 자식
      var obj = document.getElementById('bodySource')
      $(obj).empty()
      this.childNum = 10000
      this.friendNum = 0
      this.intent = 10
      var newDIV = document.createElement('li')
      // newDIV.innerHTML = child[i].tagName;
      newDIV.setAttribute('id', this.childNum)

      // newDIV.style.backgroundColor="yellow";
      obj.appendChild(newDIV)
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
      newDIV.innerHTML = child.tagName + ' '
      obj.appendChild(newDIV)

      var newDIV2 = document.createElement('a')
      if (typeof child.className != 'undefined')
        newDIV2.innerHTML = ' .' + child.className
      if (typeof $(child).attr('id') != 'undefined')
        newDIV2.innerHTML += '  #' + $(child).attr('id')
      obj.appendChild(newDIV2)

      // var newDIV2 = document.createElement('a')
      // newDIV2.innerHTML = ' .' + child.className + '  #' + $(child).attr('id')
      // obj.appendChild(newDIV)

      this.dom.push(child)
      this.isActiveLabel.push(true)

      this.childNum += 1

      var newDIV = document.createElement('ul')
      // newDIV.innerHTML = child[i].tagName;
      var intent = 20
      newDIV.setAttribute('style', 'text-indent:' + intent + 'px')
      newDIV.setAttribute('id', this.childNum)
      obj.appendChild(newDIV)

      // console.log(child[i].tagName)

      var newParentObj = document.getElementById(this.childNum)
      // console.log(obj)
      this.myParent.push(-1)

      this.findChildren(child, newParentObj, 0,intent)
    },
    findChildren(child, obj, myParent,intent) {
      if (typeof child.children !== 'undefined') {
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

            newParentObj.appendChild(newDIV)

            var newDIV = document.createElement('label')
            newDIV.setAttribute('for', this.friendNum)
            newDIV.setAttribute('id', this.friendNum)
            newDIV.innerHTML = childOFchil[i].tagName
            newParentObj.appendChild(newDIV)

            var newDIV2 = document.createElement('a')

            if (childOFchil[i].className != '')
              newDIV2.innerHTML = ' .' + childOFchil[i].className
            // console.log($(childOFchil[i]).attr('id'))
            if (typeof $(childOFchil[i]).attr('id') != 'undefined')
              newDIV2.innerHTML += '  #' + $(childOFchil[i]).attr('id')
            newParentObj.appendChild(newDIV2)

            this.childNum += 1

            var newDIV = document.createElement('ul')
            // newDIV.innerHTML = child[i].tagName;
            newDIV.setAttribute('id', this.childNum)
            newDIV.setAttribute('style', 'text-indent:' + intent + 'px')
            // newDIV.style.backgroundColor="yellow";
            newParentObj.appendChild(newDIV)
            this.myParent.push(myParent)

            var newOriginalParentObj = document.getElementById(this.childNum)
            this.findChildren(
              childOFchil[i],
              newOriginalParentObj,
              this.friendNum,
              intent+10
            )
          }
        }
      }
    },
    domSelection(payload) {
      console.log(this.dom.length)
      for (var i = 0; i < this.dom.length; i++) {
        // console.log(this.isActiveLabel)

        if (this.isActiveLabel[i]) $(`label[for="${i}"]`).trigger('click')
      }

      // console.log(this.isActiveLabel)
      // console.log(this.dom.length)

      // for (var i = 0; i < this.myParent.length; i++) {
      //   console.log(i+"번째")
      //   console.log(this.myParent[i])
      // }
      console.log(payload)
      for (var i = 0; i < this.dom.length; i++) {
        if (payload === this.dom[i]) {
          // console.log(i)
          var a = i
          // console.log(this.myParent)

          while (true) {
            if (this.myParent[a] != '-1') {
              // console.log("메롱")
              // console.log(document.querySelector(`label[for="${this.myParent[a]}"]`))
              if (this.isActiveLabel[this.myParent[a]] == false) {
                $(
                  document.querySelector(`label[for="${this.myParent[a]}"]`)
                ).trigger('click')
              }
              a = this.myParent[a]
            } else {
              if (this.isActiveLabel[0] == false) {
                $(document.querySelector(`label[for="${0}}"]`)).trigger('click')
                break
              }
              break
            }
          }

          document.querySelector(`label[for="${i}"]`).scrollIntoView()
          document.querySelector(`label[for="${i}"]`).style['color'] = '#3bc0f7'
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
          obj.style['color'] = ''
        }
      }
      // for (var i = 0; i < this.dom.length; i++) {
      //         if (payload === this.dom[i]) {
      //           this.myParent.push(i)
      //           break;
      //         }
      //     }

      this.$emit('inParentTreeOption', this.myParent)
      // this.$emit('inEventDomTree',this.dom)
      // console.log(this.dom)
      this.$emit('domWithTree', this.dom)
    },
    clickLabelEvent(e) {
      if (e.target.tagName == 'LABEL') {
        // console.log(e.target.id)
        if (this.isActiveLabel[e.target.id]) {
          this.isActiveLabel[e.target.id] = false
        } else {
          this.isActiveLabel[e.target.id] = true
        }
      }
    },
    onmouseMove(e) {
      if (e.target.tagName === 'LABEL') {
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
  padding: 0.4rem;
  text-align: left;
  width: 100%;
  /* height: 30px; */
  display: inline-block;
  white-space: nowrap;
  overflow: auto;
  // overflow: scroll;
}
.overview-text {
  font-size: 1.4rem;
  color: #fff;
}
.close-btn {
  width: 1.1rem;
  right: 0.4rem;
  top: 0.4rem;
  cursor: pointer;
  position: absolute;
}
.acol {
  margin: 0px 2px 0px 0px;
}

.acol {
  padding: 0.4rem;
  a {
    font-size: 13px;
    margin: 0px 15px 0px 0px;
  }
}
.acol label:before {
  content: '\f107 ';
  // content: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>');
  font-family: FontAwesome;
  // font-family: "fontello";
}
.acol,
.acol ul {
  color: #e7e4e4;
  list-style: none;
}
.acol .checkbox {
  display: none;
}
.acol .checkbox:checked ~ ul {
  display: none;
  color: red;
}
.acol .checkbox:checked + label:before {
  content: '\f105 ';
  // content: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>');
  font-family: FontAwesome;
}
.overview-text-box {
  width: 100%;
  height: 7%;
  background-color: #292931;
  justify-content: center;
  cursor: move;
  position: relative;
  .overview-text {
    padding: 0.2rem;
    color: #ffffff;
    font-size: 1.4rem;
    cursor: default;
    position: absolute;
    left: 0.4rem;
  }
}
.overview-scroll-area {
  width: 100%;
  background-color: #292931;
  height: 100%;
  .overview-box {
    width: 100%;
    height: 100%;
    // display: flex;
    // flex-direction: column;
    // padding: 0.4rem;
  }
}
</style>
