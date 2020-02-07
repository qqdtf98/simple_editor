<template>
  <div id="savelist">
    <div class="save list-tab">Save</div>
    <div class="save-as list-tab">Save As</div>
    <div class="save-all list-tab">Save All</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
#savelist {
  // border: 1px solid black;
  color: #fff;
  box-shadow: 1px 0.5px 0.5px #000000;
  background-color: #1a1a24;
  .save,
  .save-as,
  .save-all {
    margin-top: 0.15rem;
    cursor: default;
    margin-bottom: 0.15rem;
    width: 8rem;
    font-size: 0.9rem;
    padding-left: 0.5rem;
    text-align: left;
  }
}
</style>
