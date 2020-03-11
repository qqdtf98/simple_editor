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
            />
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
      var child = $('iframe').get(0).contentWindow.document.body

      var obj = document.getElementById('bodySource')
      $(obj).empty()
      this.childNum = 10000
      this.friendNum = 0
      this.intent = 10

      var newDIV = document.createElement('li')
      newDIV.setAttribute('id', this.childNum)
      obj.appendChild(newDIV)
      
      var obj = document.getElementById(this.childNum)
      var newDIV = document.createElement('input')
      newDIV.setAttribute('class', 'checkbox')
      newDIV.setAttribute('type', 'checkbox')
      newDIV.setAttribute('id', this.friendNum)
      obj.appendChild(newDIV)

      var newDIV = document.createElement('label')
      newDIV.setAttribute('for', this.friendNum)
      newDIV.setAttribute('id', this.friendNum)
      newDIV.innerHTML = child.tagName + ' '
      obj.appendChild(newDIV)

      // 클래스 네임. ID 값 넣는함수
      var newDIV2 = document.createElement('a')
      if (typeof child.className != 'undefined')
        newDIV2.innerHTML = ' .' + child.className
      if (typeof $(child).attr('id') != 'undefined')
        newDIV2.innerHTML += '  #' + $(child).attr('id')
      obj.appendChild(newDIV2)

      // 넣기
      this.dom.push(child)
      this.isActiveLabel.push(true)

      this.childNum += 1

      var newDIV = document.createElement('ul')
      var intent = 20
      newDIV.setAttribute('style', 'text-indent:' + intent + 'px')
      newDIV.setAttribute('id', this.childNum)
      obj.appendChild(newDIV)

      var newParentObj = document.getElementById(this.childNum)
      this.myParent.push(-1)

      this.findChildren(child, newParentObj, 0, intent)
    },
    findChildren(child, obj, myParent, intent) {
      //아무것도 없지 않을경우
      if (typeof child.children !== 'undefined') {
        intent += 10
        var childOFchild = child.children
        if (childOFchild.length !== 0) {
          for (var i = 0; i < childOFchild.length; i++) {
            this.dom.push(childOFchild[i])

            this.isActiveLabel.push(true)
            this.childNum += 1
            var newDIV = document.createElement('li')
            newDIV.setAttribute('id', this.childNum)
            obj.appendChild(newDIV)

            this.friendNum += 1

            var newParentObj = document.getElementById(this.childNum)
            var newDIV = document.createElement('input')
            newDIV.setAttribute('class', 'checkbox')
            newDIV.setAttribute('type', 'checkbox')
            newDIV.setAttribute('style', '')
            newDIV.setAttribute('id', this.friendNum)

            newParentObj.appendChild(newDIV)

            var newDIV = document.createElement('label')
            newDIV.setAttribute('for', this.friendNum)
            newDIV.setAttribute('id', this.friendNum)
            newDIV.innerHTML = childOFchild[i].tagName
            newParentObj.appendChild(newDIV)

            var newDIV2 = document.createElement('a')

            if (childOFchild[i].className != '')
              newDIV2.innerHTML = ' .' + childOFchild[i].className
            if (typeof $(childOFchild[i]).attr('id') != 'undefined')
              newDIV2.innerHTML += '  #' + $(childOFchild[i]).attr('id')
            newParentObj.appendChild(newDIV2)

            this.childNum += 1

            var newDIV = document.createElement('ul')
            newDIV.setAttribute('id', this.childNum)
            newDIV.setAttribute('style', 'text-indent:' + intent + 'px')
            newParentObj.appendChild(newDIV)
            this.myParent.push(myParent)

            var newOriginalParentObj = document.getElementById(this.childNum)
            this.findChildren(
              childOFchild[i],
              newOriginalParentObj,
              this.friendNum,
              intent
            )
          }
        }
      }
    },
    domSelection(payload) {
      for (var i = 0; i < this.dom.length; i++) {
        if (this.isActiveLabel[i]) $(`label[for="${i}"]`).trigger('click')
      }
      for (var i = 0; i < this.dom.length; i++) {
        if (payload === this.dom[i]) {
          var a = i
          while (true) {
            if (this.myParent[a] != '-1') {
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
        } else {
          var obj = document.querySelector(`label[for="${i}"]`)
          obj.style['color'] = ''
        }
      }
      this.$emit('inParentTreeOption', this.myParent)
      this.$emit('domWithTree', this.dom)
    },
    clickLabelEvent(e) {
      if (e.target.tagName == 'LABEL') {
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
