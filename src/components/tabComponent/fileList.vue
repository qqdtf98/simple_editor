<template>
  <div id="filelist">
    <div @click="addpage" class="new-file list-tab">New Page</div>
    <div @click="addProject" class="new-project list-tab">New Project</div>
  </div>
</template>

<script>
export default {
  methods: {
    addProject() {
      this.$emit('addproject')
    },
    addpage() {
      this.$emit('newpage')
    }
  }
}
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
    cursor: default;
    margin-bottom: 0.15rem;
    width: 8rem;
    font-size: 0.9rem;
    text-align: left;
    padding-left: 0.5rem;
    &:hover {
      background-color: #39394e;
    }
  }
}
</style>
