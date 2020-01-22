<template>
  <div id="studio">
    <div class="studio-text-box">
      <span class="studio-text">Studio</span>
     <img class="close-btn" src="../assets/close.svg" />

    </div>
    <div class="tag-studio">
      <div class="search">
        <input
          @input="onSearchElement"
          class="search-input"
          type="text"
          placeholder="Search components"
        />
        <img class="search-icon" src="../assets/search.svg" />
      </div>
      <div @mousedown="addElement" @mouseover="mouseOver" class="tag-box">
        <div class="tag-list-box">
          <span class="tag-list">UI</span>
          <div class="nested">
            <div class="tag-list-box">
              <span class="tag-list ui">Articles</span>
              <div class="nested">
                <div>Article Clean</div>
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
          <span class="tag-list">Text</span>
          <div class="nested">
            <div>Heading</div>
            <div>Paragraph</div>
            <div>Alert</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Image</span>
          <div class="nested">
            <div>Image</div>
            <div>Icon</div>
            <div>Carousel</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Controls</span>
          <div class="nested">
            <div>Button</div>
            <div>Split Button</div>
            <div>Button Group</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Grid</span>
          <div class="nested">
            <div>Row</div>
            <div>Column</div>
            <div>Column Helper</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Containers</span>
          <div class="nested">
            <div>Container</div>
            <div>Tabs</div>
            <div>Accordion</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Cards</span>
          <div class="nested">
            <div>Card</div>
            <div>Panel</div>
            <div>Thumbnail</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Pages</span>
          <div class="nested">
            <div>Navbar</div>
            <div>Nav</div>
            <div>Header</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Pagination</span>
          <div class="nested">
            <div>Pagination</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Table</span>
          <div class="nested">
            <div>Table</div>
            <div>Table Row</div>
            <div>Table Cell</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Form</span>
          <div class="nested">
            <div>Form</div>
            <div>Form Group</div>
            <div>Field Label</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Social</span>
          <div class="nested">
            <div>Facebook Like Button</div>
            <div>Facebook Post Embed</div>
            <div>Twitter Follow Button</div>
          </div>
        </div>
        <div class="tag-list-box">
          <span class="tag-list">Misc</span>
          <div class="nested">
            <div>Chart</div>
            <div>Map</div>
            <div>Video</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tagTarget: null,
      addComponetUserPick: null
    }
  },
  mounted () {
    var toggler = document.getElementsByClassName('tag-list')
    var i
    var j
    var k

    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener('click', function () {
        let nest = this.parentElement.querySelector('.nested')
        nest.style.transition = 'all 300ms ease'
        this.parentElement.querySelector('.nested').classList.toggle('active')
        this.classList.toggle('caret-down')
        if (nest.children[0].className !== 'tag-list-box') {
          for (j = 0; j < nest.children.length; j++) {
            // wa
            nest.children[j].classList.add('template')
          }
        } else {
          for (k = 0; k < nest.children[0].children[1].children.length; k++) {
            nest.children[0].children[1].children[k].classList.add('ui-tag')
            nest.children[1].children[1].children[k].classList.add('ui-tag')
            nest.children[2].children[1].children[k].classList.add('ui-tag')
          }
        }
      })
    }
  },
  methods: {
    mouseOver (e) {
      if (e.target.className === 'template') {
        this.$emit('tag-select', e)
      } else if (e.target.className === 'ui-tag template') {
        this.$emit('ui-select', e)
      } else {
        this.$emit('desc-close')
      }
    },
    addElement (e) {
      if (
        e.target.className === 'template' ||
        e.target.className === 'ui-tag template'
      ) {
        // console.log(e.target)
        // this.$emit('addelement', e)

        // e.target이 사용자가 선택한 템플릿
        // target 정보를 가지고 DB에서 불러온다.
        var docFrag = document.createDocumentFragment()
        docFrag.appendChild(document.createElement('div'))

        docFrag.querySelector('div').innerHTML =
        `<button class="2 dsadsadsa"
        type="button"
        >도움말</button>`

        this.addComponetUserPick = docFrag.firstChild

        /// ///////////통신///////////////////////
        var oScript = document.createElement('style')
        oScript.type = 'text/css'
        oScript.innerHTML = `
      .dsadsadsa{
        color: #fff; 
        background:blue;
        font-size:2em; 
        border-radius:0.5em;
        padding:5px 20px;
      }
      `
        document.getElementsByTagName('head')[0].appendChild(oScript)
        /// ///////////통신///////////////////////
        this.$emit('userSelectedTagComponent', e, this.addComponetUserPick)
      }
    },
    onSearchElement (e) {
      
      let tagBox = document.querySelector('.tag-box')
      let list = document.querySelectorAll('.tag-list')
      let name = document.querySelectorAll('.nested')

      let i
      let j
      for (i = 0; i < list.length; i++) {
        list[i].style.display = 'none'
      }
      for (i = 0; i < name.length; i++) {
        for (j = 0; j < name[i].children.length; j++) {
          name[i].children[j].style.display = 'none'
        }
      }

      let filterList = document.getElementsByClassName('filter')
      let leng = filterList.length
      for (i = 0; i < leng; i++) {
        let filter = filterList[filterList.length - 1]
        tagBox.removeChild(filter)
      }
      this.$nextTick(() => {
        if (e.target.value === '') {
          let i
          let j
          for (i = 0; i < list.length; i++) {
            list[i].style.display = 'block'
          }
          for (i = 0; i < name.length; i++) {
            for (j = 0; j < name[i].children.length; j++) {
              name[i].children[j].style.display = 'block'
            }
          }
        } else {
          for (i = 0; i < name.length; i++) {
            if (name[i].children[0].className !== 'tag-list-box') {
              // if (name[i].children[0].className === 'template') {
              //   break
              // }
              for (j = 0; j < name[i].children.length; j++) {
                if (
                  name[i].children[j].innerHTML
                    .toUpperCase()
                    .indexOf(e.target.value.toUpperCase()) === -1
                ) {
                } else {
                  var divTag = document.createElement('div')
                  var node = document.createTextNode(name[i].children[j].innerHTML)
                  divTag.appendChild(node)
                  tagBox.appendChild(divTag)
                  divTag.classList.add('filter')
                }
              }
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
#studio {
  // overflow:hidden;
  .studio-text-box {
    height: 7%;
    justify-content: center;
    position: relative;
    .studio-text {
      padding: 0.2rem;
      color: #ffffff;
      font-size: 1.4rem;
      position: absolute;
      left: 0.4rem;
    }
    .close-btn{
      width: 1.1rem;
      right: 0.4rem;
      top: 0.4rem;
      position: absolute;
    }
  }
  .tag-studio {
    height: 93%;
    // display: flex;
    // flex-direction: column;
    padding: 0.4rem;
    overflow: auto;
    .tag-studio::-webkit-scrollbar {
      width: 5px;
    }
    .search {
      background-color: #41474c;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      height: 2rem;
      .search-input {
        background: none;
        font-size: 0.8rem;
        height: 1.3rem;
        width: 85%;
        position: absolute;
        left: 10px;
        border: none;
        color: #e6e4e4;
      }
      .search-icon {
        width: 5.5%;
        position: absolute;
        right: 8px;
      }
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
  }
}
</style>
