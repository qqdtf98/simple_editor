<template>
  <div id="sitemap">
    <div class="sitemap-text-box">
      <span class="sitemap-text">Sitemap</span>
      <img @click="closeSitemap" class="close-btn" src="../assets/close.svg" />
    </div>
    <div @mousedown="refineSitemap" class="title-map">
      <div :key="title.index" class="titles" v-for="title in titles">
        {{ title.text }}
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: [],
    };
  },
  methods: {
    refineSitemap(e) {
        this.$emit('copy-title',e)
    },
    closeSitemap() {
      this.$emit("close-sitemap");
    },
    loadSitemap(titles) {
      console.log(titles);
      this.titles = titles;
    }
  }
};
</script>

<style lang="scss">
#sitemap {
  .sitemap-text-box {
    height: 7%;
    justify-content: center;
    position: relative;
    .sitemap-text {
      padding: 0.2rem;
      color: #ffffff;
      font-size: 1.4rem;
      position: absolute;
      left: 0.4rem;
    }
    .close-btn {
      width: 1.1rem;
      right: 0.4rem;
      top: 0.4rem;
      cursor: pointer;
      position: absolute;
    }
  }
  .title-map {
    color: #e7e4e4;
    margin-left: 0.4rem;
    align-items: left;
    .titles {
      text-align: left;
      height: 1.5rem;
      &:hover {
        background-color: #505557;
        cursor: pointer;
      }
    }
  }
  
}
</style>
