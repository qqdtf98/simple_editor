<template>
  <div id="filelist">
    <div class="new-file">New File</div>
    <div class="new-project">New Project</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
#filelist {
  border: 1px solid black;
  .new-file,
  .new-project {
    width: 8rem;
    font-size: 0.9rem;
    text-align: left;
    padding-left: 0.2rem;
    background-color: red;
  }
}
</style>
