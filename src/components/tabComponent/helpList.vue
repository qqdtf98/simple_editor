<template>
  <div id="helpList">
    <div class="font list-tab">Font</div>
    <div class="viewport-size list-tab">Viewport Size</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
#helpList {
  // border: 1px solid black;
  color: #fff;
  box-shadow: 1px 0.5px 0.5px #000000;
  background-color: #1a1a24;
  .font,
  .viewport-size {
    margin-top: 0.15rem;
    margin-bottom: 0.15rem;
    width: 8rem;
    cursor: default;
    font-size: 0.9rem;
    text-align: left;
    padding-left: 0.5rem;
    &:hover {
      background-color: #39394e;
    }
  }
}
</style>
