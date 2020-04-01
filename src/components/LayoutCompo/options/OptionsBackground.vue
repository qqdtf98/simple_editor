<template>
  <div id="options-background">
    <div class="bg-color-wrapper">
      <div class="bg-color-text">Background Color</div>
      <div class="bg-color-list">
        <button class="color-none" />
        <button
          v-for="i in 14"
          id="color-button"
          :key="`color-picker-${i}`"
          class="color-choose"
          :class="'color' + i"
        />
        <button class="chrome-picker" />
      </div>
    </div>
    <div class="bg-img-wrapper">
      <div class="bg-img-text">Background Image</div>
      <button class="bg-img-input">Pick</button>
    </div>
  </div>
</template>

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
    .bg-color-text {
      margin-top: 0.4rem;
      margin-bottom: 0.4rem;
      color: #868686;
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
