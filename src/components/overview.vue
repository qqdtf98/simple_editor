<template>
    <div class="over">overview.vue</div>
</template>
<script>
export default {
  props: ['getDocument'],

  data () {
    return {

    }
  },

  created () {

  },

  methods: {
    printHomeDocument () {
      console.log(this.getDocument)
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
          console.log(child[i].tagName)
          console.log('')
          // console.log(child[i].className)
          /// console.log(child[i].id)
          this.findChildren(child[i])
        }
      }
    },
    findChildren (child) {
      // if(typeof(child.children)!=='undefined'){
      var childOFchil = child.children
      if (childOFchil.length !== 0) {
        // console.log(childOFchil)
        for (var i = 0; i < childOFchil.length; i++) {
          // console.log(child[i])
          // console.log("후")
          // console.log("")
          console.log(childOFchil[i].tagName)
          console.log('')
          // this.childOFchil.push(childOFchil[i].tagName)
          this.findChildren(childOFchil[i])
        }
      } else {
        // console.log(this.childOFchil)
        // this.childOFchil = []
        console.log('자식끝')
      }
    }

  }
}
</script>
<style lang="scss">
.over {
    color:#fff;
}
</style>
