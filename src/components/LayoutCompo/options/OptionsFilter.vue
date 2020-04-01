<template>
  <div id="options-filter">
    <div v-for="(filter, i) in filters" :key="i" class="filter-wrapper">
      <div class="filter-text">{{ filter.name }}</div>
      <range-slider
        class="filter-slider"
        min="filter.min"
        max="filter.max"
        step="filter.step"
        name="filter.name"
        submitSorce.style="filter.name"
        @input="filter.onInput"
        v-model="filter.vModel"
      />
      <input class="filter-input" />
    </div>
  </div>
</template>

<script>
import RangeSlider from 'vue-range-slider'

export default {
  components: { RangeSlider },
  data() {
    return {
      filters: [
        {
          name: 'Opacity',
          min: 0,
          max: 1,
          step: 0.01,
          vModel: '',
          onInput: () => {}
        },
        {
          name: 'Blur',
          min: 0,
          max: 100,
          step: 1,
          vModel: '',
          onInput: () => {}
        },
        {
          name: 'Brightness',
          min: 0,
          max: 100,
          step: 1,
          vModel: '',
          onInput: () => {}
        },
        {
          name: 'Constrast',
          min: 0,
          max: 200,
          step: 1,
          vModel: '',
          onInput: () => {}
        },
        {
          name: 'Grayscale',
          min: 0,
          max: 100,
          step: 1,
          vModel: '',
          onInput: () => {}
        },
        {
          name: 'Hue',
          min: 0,
          max: 360,
          step: 3,
          vModel: '',
          onInput: () => {}
        },
        {
          name: 'Invert',
          min: 0,
          max: 100,
          step: 1,
          vModel: '',
          onInput: () => {}
        },
        {
          name: 'Saturate',
          min: 0,
          max: 200,
          step: 1,
          vModel: '',
          onInput: () => {}
        },
        {
          name: 'Sepia',
          min: 0,
          max: 100,
          step: 1,
          vModel: '',
          onInput: () => {}
        }
      ],
      submitSource: {
        payload: '',
        style: '',
        value: '',
        change: ''
      }
    }
  }
}
</script>

<style lang="scss">
#options-filter {
  display: flex;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .filter-wrapper {
    display: flex;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    width: 100%;
    .filter-text {
      font-size: 0.9rem;
      text-align: center;
      width: 7rem;
      margin-right: 0.5rem;
      color: #868686;
    }
    .filter-slider {
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(100% - 6rem);
      .range-slider-inner {
        width: 100%;
      }
      .range-slider-inner {
        width: 70%;
      }
      .range-slider-knob {
        width: 13px !important;
        height: 13px !important;
      }
    }
    .filter-input {
      background: none;
      border: none;
      border-bottom: 1px solid #768ea7;
      width: 3.5rem;
    }
  }
}
</style>
