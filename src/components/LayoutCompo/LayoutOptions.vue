<template>
  <div id="layout-options">
    <div class="layout-list-box">
      <div class="layout-list">layout</div>
      <div class="nested ">
        <OptionsLayout />
      </div>
    </div>
    <div class="layout-list-box">
      <div class="layout-list">background</div>
      <div class="nested ">
        <OptionsBackground />
      </div>
    </div>
    <div class="layout-list-box">
      <div class="layout-list">font</div>
      <div class="nested ">
        <OptionsFont />
      </div>
    </div>
    <div class="layout-list-box">
      <div class="layout-list">filter</div>
      <div class="nested ">
        <OptionsFilter />
      </div>
    </div>
  </div>
</template>
<script>
import OptionsLayout from './options/OptionsLayout'
import OptionsBackground from './options/OptionsBackground'
import OptionsFont from './options/OptionsFont'
import OptionsFilter from './options/OptionsFilter'

export default {
  components: { OptionsLayout, OptionsBackground, OptionsFont, OptionsFilter },
  mounted() {
    let toggler = document.getElementsByClassName('layout-list')
    let i
    let j
    let k
    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener('click', function() {
        let nest = this.parentElement.querySelector('.nested')
        nest.style.transition = 'all 300ms ease'
        this.parentElement.querySelector('.nested').classList.toggle('active')
        this.classList.toggle('caret-down')
        for (j = 0; j < nest.children.length; j++) {
          nest.children[j].classList.add('template')
        }
      })
    }
  }
}
</script>
<style lang="scss">
#layout-options {
  .layout-list-box {
    text-align: left;
    // margin: 0.3rem;
    border-top: 1px solid #333538;
    border-bottom: 1px solid #333538;
    padding: 0.5rem;
    .layout-list {
      margin-left: 0.4rem;
      color: #e7e4e4;
      cursor: pointer;
      user-select: none; /* Prevent text selection */
      transition: all 300ms ease;
    }
    .layout-list::before {
      content: '\FF1E';
      color: #e7e4e4;
      display: inline-block;
      margin-right: 6px;
    }
    .layout-list-down::before {
      transform: rotate(90deg);
    }
    .nested {
      display: none;
    }
    .active {
      display: flex;
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
    .template {
      color: #e7e4e4;
    }
    .template::before {
      margin-right: 0.2rem;
    }
  }
}
</style>
