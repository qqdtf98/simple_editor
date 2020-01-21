<template>
<div></div>
</template>

<script>
export default{
  methods: {
    Stack () {
      let items = []

      this.push = function (element) {
        items.push(element)
        console.log('aaa')
        console.log(element)
        console.log('bb')
      }
      this.pop = function () {
        return items.pop()
      }
      this.peek = function () {
        return items[items.length - 1]
      }
      this.isEmpty = function () {
        return items.length === 0
      }
      this.size = function () {
        return items.length
      }
      this.clear = function () {
        items = []
      }
      this.print = function () {
        console.log(items.toString())
      }
    }
  }
}
</script>
