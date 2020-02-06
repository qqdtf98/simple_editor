<template>
  <div id="filelist">
    <div class="new-file list-tab">New File</div>
    <div class="new-project list-tab">New Project</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
#filelist {
  // border: 1px solid black;
  color: #fff;
  box-shadow: 1px 0.5px 0.5px #000000;
  background-color: #1a1a24;
  .new-file,
  .new-project {
    margin-top: 0.15rem;
    margin-bottom: 0.15rem;
    width: 8rem;
    font-size: 0.9rem;
    text-align: left;
    padding-left: 0.5rem;
  }
}
</style>
