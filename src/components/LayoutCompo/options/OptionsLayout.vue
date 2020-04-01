<template>
  <div id="options-layout">
    <div class="margin-wrapper">
      <div class="margin-left">0</div>
      <div class="margin-right">0</div>
      <div class="margin-top">0</div>
      <div class="margin-bottom">0</div>
      <div class="padding-wrapper">
        <div class="padding-left">0</div>
        <div class="padding-right">0</div>
        <div class="padding-top">0</div>
        <div class="padding-bottom">0</div>
        <div class="empty-box"></div>
      </div>
    </div>
    <div class="dimension-wrapper">
      <div class="position-wrapper">
        <div class="x-position">X</div>
        <div class="x-position-value">123</div>
        <div class="y-position">Y</div>
        <div class="y-position-value">123</div>
      </div>
      <div class="size-wrapper">
        <div class="width-text">W</div>
        <div class="width-value">123</div>
        <div class="height-text">H</div>
        <div class="height-value">123</div>
      </div>
    </div>
    <div class="input-wrapper">
      <div class="width-box">
        <div class="width-input">Width</div>
        <input class="width-input-value" />
      </div>
      <div class="height-box">
        <div class="height-input">Height</div>
        <input class="height-input-value" />
      </div>
      <div class="margin-box">
        <div class="margin-input">Margin</div>
        <input class="margin-input-value" />
      </div>
      <div class="padding-box">
        <div class="padding-input">Padding</div>
        <input class="padding-input-value" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#options-layout {
  width: 100%;
  display: flex;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .margin-wrapper {
    background-color: #2e3743;
    width: 75%;
    height: 7rem;
    display: flex;
    margin-top: 0.3rem;
    border: 2px solid #4f4f86;
    justify-content: center;
    align-items: center;
    position: relative;
    .margin-left,
    .margin-right,
    .margin-top,
    .margin-bottom {
      color: #53bfff;
      position: absolute;
    }
    .margin-right {
      right: 0.2rem;
      top: 50%;
      transform: translateY(-50%);
    }
    .margin-left {
      left: 0.2rem;
      top: 50%;
      transform: translateY(-50%);
    }
    .margin-top {
      top: 0.2rem;
      left: 50%;
      transform: translateX(-50%);
    }
    .margin-bottom {
      bottom: 0.2rem;
      left: 50%;
      transform: translateX(-50%);
    }
    .padding-wrapper {
      background-color: #333f3a;
      width: 75%;
      height: 4rem;
      display: flex;
      border: 2px solid #2f6534;
      justify-content: center;
      align-items: center;
      position: relative;
      .padding-left,
      .padding-right,
      .padding-top,
      .padding-bottom {
        color: #81c882;
        position: absolute;
      }
      .padding-right {
        right: 0.2rem;
        top: 50%;
        transform: translateY(-50%);
      }
      .padding-left {
        left: 0.2rem;
        top: 50%;
        transform: translateY(-50%);
      }
      .padding-top {
        top: 0.2rem;
        left: 50%;
        transform: translateX(-50%);
      }
      .padding-bottom {
        bottom: 0.2rem;
        left: 50%;
        transform: translateX(-50%);
      }
      .empty-box {
        width: 75%;
        background-color: #292931;
        height: 1.5rem;
      }
    }
  }
  .dimension-wrapper {
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
    width: 75%;
    .position-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.5rem;
      .x-position,
      .y-position {
        color: white;
        height: 1.2rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
      }
      .x-position-value,
      .y-position-value {
        font-weight: bold;
        height: 1.2rem;
        margin-right: 0.5rem;
      }
    }
    .size-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .width-text,
      .height-text {
        color: white;
        height: 1.2rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
      }
      .width-value,
      .height-value {
        font-weight: bold;
        height: 1.2rem;
        margin-right: 0.5rem;
      }
    }
  }
  .input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    .width-box,
    .height-box,
    .margin-box,
    .padding-box {
      display: flex;
      align-items: center;
      justify-content: center;
      display: flex;
      width: 80%;
      flex-direction: row;
      height: 2rem;
      position: relative;
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      .width-input,
      .height-input,
      .margin-input,
      .padding-input {
        color: #868686;
        text-align: center;
        width: 30%;
        position: absolute;
        left: 0;
      }
      .width-input-value,
      .height-input-value,
      .margin-input-value,
      .padding-input-value {
        width: 40%;
        position: absolute;
        background: none;
        right: 0;
        border: none;
        border-bottom: 1px solid #768ea7;
      }
    }
  }
}
</style>
