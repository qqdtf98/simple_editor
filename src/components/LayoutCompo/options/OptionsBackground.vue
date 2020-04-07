<template>
  <div id="options-background">
    <div class="bg-color-wrapper">
      <div class="bg-color-box">
        <div class="bg-color-text">Background Color</div>
        <div
          class="bg-color-before"
          :style="
            `background-color: ${$store.state.styleData.styleData.backgroundColor};`
          "
        ></div>
      </div>

      <div class="bg-color-list">
        <button
          name="backgroundColor"
          @click="submitNewStyle"
          class="color-none"
        />
        <button
          v-for="i in 14"
          id="color-button"
          :key="`color-picker-${i}`"
          name="backgroundColor"
          class="color-choose"
          @click="submitNewStyle"
          :class="'color' + i"
        />
        <button @click="activateChromePicker" class="chrome-picker" />
      </div>
      <chrome-color
        class="chrome"
        v-show="isChromePicker"
        :value="background.backgroundColor"
        v-model="background.backgroundColor"
        @input="backgroundColorChanged"
      ></chrome-color>
    </div>
    <div class="bg-img-wrapper">
      <div class="bg-img-text">Background Image</div>
      <button class="bg-img-input">Pick</button>
    </div>
  </div>
</template>

<script>
import ClickIndicator from '../../../modules/click-indicator'
import { Chrome } from 'vue-color'

export default {
  components: { ChromeColor: VueColor.Chrome },
  data() {
    return {
      isChromePicker: false,
      background: {
        backgroundColor: '#fff'
      }
    }
  },
  methods: {
    backgroundColorChanged(color) {
      let changedData
      ClickIndicator.instances.forEach(instance => {
        changedData = {
          payload: instance.target,
          style: 'backgroundColor',
          value: color.hex
        }
      })
      this.$store.commit('setChangedData', changedData)
    },
    activateChromePicker() {
      if (this.isChromePicker) {
        this.isChromePicker = false
      } else {
        this.isChromePicker = true
      }
    },
    submitNewStyle(e) {
      let changedData
      if (e.target.className === 'color-none') {
        ClickIndicator.instances.forEach(instance => {
          changedData = {
            payload: instance.target,
            style: e.target.name,
            value: 'transparent'
          }
        })
      } else {
        ClickIndicator.instances.forEach(instance => {
          changedData = {
            payload: instance.target,
            style: e.target.name,
            value: getComputedStyle(e.target).backgroundColor
          }
        })
      }
      this.$store.commit('setChangedData', changedData)
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/globalstyle';

#options-background {
  display: flex;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .bg-color-wrapper {
    width: 80%;
    .bg-color-box {
      display: flex;
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      justify-content: center;
      flex-direction: row;
      align-items: center;
      .bg-color-text {
        margin-top: 0.4rem;
        margin-bottom: 0.4rem;
        color: #868686;
      }
      .bg-color-before {
        width: 3.5rem;
        border-radius: 0.3rem;
        height: 2rem;
      }
    }

    .bg-color-list {
      margin-top: 0.4rem;
      margin-bottom: 0.4rem;
      align-items: center;
      justify-content: center;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;
      .color-choose,
      .chrome-picker,
      .color-none {
        width: 100%;
        height: 2rem;
        display: inline-block;
        border-radius: 0.3rem;
        border: none;
        transition: box-shadow 200ms ease;

        &:hover {
          box-shadow: 0 0 0 0.2rem #40b3ff;
        }
        &::before {
          content: '';
          display: block;
          padding-top: 100%;
        }
      }
    }
  }
  .bg-img-wrapper {
    width: 80%;
    display: flex;
    flex-direction: row;
    .bg-img-text {
      margin-top: 0.4rem;
      margin-bottom: 0.4rem;
      color: #868686;
    }
    .bg-img-input {
    }
  }
}
</style>
