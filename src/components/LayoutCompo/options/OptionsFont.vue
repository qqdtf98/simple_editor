<template>
  <div id="options-font">
    <div class="font-property-wrapper">
      <div class="font-align-wrapper">
        <img
          class="font-align-left"
          src="../../../assets/images/left-align.svg"
        />
        <img
          class="font-align-center"
          src="../../../assets/images/center-align.svg"
        />
        <img
          class="font-align-right"
          src="../../../assets/images/right-align.svg"
        />
      </div>
      <div class="font-style-wrapper">
        <img
          class="font-weight-property"
          src="../../../assets/images/thick.svg"
        />
        <img
          class="font-line-property"
          src="../../../assets/images/line-font.svg"
        />
        <img
          class="font-italic-property"
          src="../../../assets/images/italic.svg"
        />
        <img
          class="font-case-property"
          src="../../../assets/images/bigAndSmall.svg"
        />
      </div>
    </div>
    <div class="font-attribute-wrapper">
      <div class="font-family-wrapper">
        <div class="font-family-text">Font Family</div>
        <div class="font-family-select">select</div>
      </div>
      <div class="font-size-wrapper">
        <div class="font-size-text">Font Size</div>
        <input
          name="fontSize"
          class="font-size-input"
          @keyup.enter="submitFontSize"
          :placeholder="$store.state.styleData.styleData.fontSize"
        />
      </div>
    </div>
    <div class="font-color-wrapper">
      <div class="font-color-text">Font color</div>
      <div class="font-color-list">
        <button name="fontColor" @click="submitFontColor" class="color-none" />
        <button
          @click="submitFontColor"
          v-for="i in 14"
          id="color-button"
          :key="`color-picker-${i}`"
          class="color-choose"
          name="fontColor"
          :class="'color' + i"
        />
        <button @click="activateChromePicker" class="chrome-picker" />
      </div>
    </div>
    <chrome-color
      class="chrome"
      v-show="isChromePicker"
      :value="font.fontColor"
      v-model="font.fontColor"
      @input="fontColorChanged"
    ></chrome-color>
  </div>
</template>

<script>
import ClickIndicator from '../../../modules/click-indicator'
import { Chrome } from 'vue-color'

export default {
  components: {
    ChromeColor: VueColor.Chrome
  },
  data() {
    return {
      isChromePicker: false,
      font: {
        fontColor: '#fff'
      }
    }
  },
  methods: {
    activateChromePicker() {
      if (this.isChromePicker) {
        this.isChromePicker = false
      } else {
        this.isChromePicker = true
      }
    },
    submitFontSize(e) {
      let changedData
      ClickIndicator.instances.forEach(instance => {
        changedData = {
          payload: instance.target,
          style: e.target.name,
          value: e.target.value
        }
      })
      this.$store.commit('setChangedData', changedData)
    },
    fontColorChanged(color) {
      let changedData
      ClickIndicator.instances.forEach(instance => {
        changedData = {
          payload: instance.target,
          style: 'fontColor',
          value: color.hex
        }
      })
      this.$store.commit('setChangedData', changedData)
    },
    submitFontColor() {
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

#options-font {
  display: flex;
  margin-top: 0.3rem;
  width: 100%;
  margin-bottom: 0.3rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .font-property-wrapper {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .font-align-wrapper {
      width: 80%;
      height: 3rem;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .font-align-left,
      .font-align-center,
      .font-align-right {
        position: absolute;
        width: 1.7rem;
        height: 1.7rem;
      }
      .font-align-left {
        left: 0;
      }
      .font-align-right {
        right: 0;
      }
    }
    .font-style-wrapper {
      width: 100%;
      height: 3rem;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      align-items: center;
      justify-content: center;
      .font-weight-property,
      .font-line-property,
      .font-italic-property,
      .font-case-property {
        width: 1.7rem;
        height: 1.7rem;
      }
    }
  }
  .font-attribute-wrapper {
    width: 80%;
    .font-family-wrapper {
      height: 2rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      position: relative;
      .font-family-text {
        position: absolute;
        color: #868686;
        width: 6rem;
        text-align: center;
        left: 0;
      }
      .font-family-select {
        position: absolute;
        right: 0;
      }
    }
    .font-size-wrapper {
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      height: 2rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: relative;
      .font-size-text {
        color: #868686;
        width: 6rem;
        text-align: center;
        position: absolute;
        left: 0;
      }
      .font-size-input {
        position: absolute;
        right: 0;
        width: 40%;
        background: none;
        border: none;
        border-bottom: 1px solid #768ea7;
      }
    }
  }
  .font-color-wrapper {
    width: 80%;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    .font-color-text {
      color: #868686;
    }
    .font-color-list {
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
}
</style>
