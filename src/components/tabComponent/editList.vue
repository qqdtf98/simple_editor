<template>
  <div id="editlist">
    <div class="undo list-tab">Undo</div>
    <div class="redo list-tab">Redo</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
#editlist {
  // border: 1px solid black;
  color: #fff;
  box-shadow: 1px 0.5px 0.5px #000000;
  background-color: #1a1a24;
  .undo,
  .redo {
    margin-top: 0.15rem;
    margin-bottom: 0.15rem;
    width: 8rem;
    font-size: 0.9rem;
    text-align: left;
    padding-left: 0.5rem;
  }
}
</style>
