<template>
  <div id="layout">
    <div @mousedown="movelayout" class="layout-text-box">
      <div @mousedown.stop class="layout-text">
        Layout
      </div>
      <div @mousedown.stop class="manual">
        <a style="font-size:12px">manual</a>
        <switches
          class="toggleSwitch"
          theme="bootstrap"
          color="info"
          v-model="enabled"
        />
      </div>
    </div>
    <vue-custom-scrollbar class="right-scroll-area">
      <div class="layout-box">
        <ul
          class="nav nav-tabs mb-3"
          id="pills-tab"
          role="tablist"
          @click="chageTab"
        >
          <li class="nav-item">
            <a
              class="nav-link "
              v-bind:class="{ active: tabStep === 1 }"
              id="pills-home-tab"
              data-toggle="pill"
              href="#pills-home"
              role="tab"
              aria-controls="pills-home"
              aria-selected="false"
              >Options</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link "
              v-bind:class="{ active: tabStep === 2 }"
              id="pills-profile-tab"
              data-toggle="pill"
              href="#pills-profile"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
              >Animation</a
            >
          </li>
        </ul>
        <!--options-->
        <div
          @mouseover="mouseOver"
          v-show="tabStep === 1"
          class="tab-pane"
          v-bind:class="{ active: tabStep === 1 }"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div class="addButtonTree"></div>

          <div id="accordion" role="tablist">
            <div class="card">
              <div
                class="card-header"
                @click="clickLayoutTab"
                role="tab"
                id="headingOne"
              >
                <h5 class="mb-0">
                  <a
                    class="title"
                    data-toggle="collapse"
                    href="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    layout
                  </a>
                </h5>
              </div>
              <div
                id="collapseOne"
                class="collapse"
                v-bind:class="{ show: layoutTab === 1 }"
                role="tabpanel"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <div class="margin">
                    <div class="box-row blue">
                      <a class="margin-top" title="Margin Top">{{
                        margin[0].value
                      }}</a>
                    </div>
                    <div class="box-row middle">
                      <div class="box-col blue">
                        <a class="margin-left" title="Margin Left">{{
                          margin[3].value
                        }}</a>
                      </div>
                      <div class="box-col padding">
                        <div class="box-row green">
                          <a class="padding-top" title="Padding Top">{{
                            padding[0]
                          }}</a>
                        </div>
                        <div class="box-row middle">
                          <div class="box-col green">
                            <a class="padding-left" title="Padding Left">{{
                              padding[3]
                            }}</a>
                          </div>
                          <div class="box-col middle empty"></div>
                          <div class="box-col green">
                            <a class="padding-right" title="Padding Right">{{
                              padding[1]
                            }}</a>
                          </div>
                        </div>
                        <div class="box-row green">
                          <a class="padding-bottom" title="Padding Bottom">{{
                            padding[2]
                          }}</a>
                        </div>
                      </div>
                      <div class="box-col blue">
                        <a class="margin-right" title="Margin Right">{{
                          margin[1].value
                        }}</a>
                      </div>
                    </div>
                    <div class="box-row blue">
                      <a class="margin-top" title="Margin Top">{{
                        margin[2].value
                      }}</a>
                    </div>
                  </div>

                  <div class="row dimensions">
                    <a class="size x"
                      ><i>X</i><b>{{ componentSorce.x }}</b></a
                    >
                    <a class="size y"
                      ><i>Y</i><b>{{ componentSorce.y }}</b></a
                    >
                    <a class="size width"
                      ><i>W</i><b>{{ componentSorce.width }}</b></a
                    >
                    <a class="size height"
                      ><i>H</i><b>{{ componentSorce.height }}</b></a
                    >
                  </div>
                  <br />
                  <!--글자-->
                  <div class="row">
                    <span class="property">
                      Width
                    </span>
                    <input
                      class="propertyChange "
                      type
                      name="width"
                      value
                      title
                      placeholder="31.4375px"
                      @keyup.enter="submitSource"
                      v-model="componentSorce.width"
                    />
                  </div>
                  <br />
                  <div class="row">
                    <span class="property">
                      Height
                    </span>
                    <input
                      class="propertyChange"
                      type="text"
                      name="height"
                      value
                      title
                      placeholder="40px"
                      @keyup.enter="submitSource"
                      v-model="componentSorce.height"
                    />
                  </div>
                  <br />
                  <div class="row">
                    <span class="property">
                      Margin
                    </span>
                    <input
                      class="propertyChange small"
                      type="text"
                      name="margin"
                      value
                      title
                      placeholder="0"
                      @keyup.enter="submitSource"
                      v-model="componentSorce.margin"
                    />
                  </div>
                  <br />
                  <div class="row">
                    <span class="property ">
                      Padding
                    </span>
                    <input
                      class="propertyChange small"
                      type="text"
                      name="padding"
                      value
                      title
                      placeholder="0"
                      @keyup.enter="submitSource"
                      v-model="componentSorce.padding"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div
                class="card-header"
                @click="clickBackgroundTab"
                role="tab"
                id="headingOne"
              >
                <h5 class="mb-0">
                  <a
                    class="title"
                    data-toggle="collapse"
                    href="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    background
                  </a>
                </h5>
              </div>
              <div
                id="collapseOne"
                class="collapse"
                v-bind:class="{ show: backgroundTab === 1 }"
                role="tabpanel"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <div class="row">
                    <span class="property backgruond" id="bgSpan">
                      Background Color
                    </span>
                    <b-button
                      class="backgroundColorPicker"
                      @keyup.enter="submitSourceOriginal"
                      :style="backgroundColor"
                      variant="free"
                    ></b-button>
                  </div>
                  <div class="row" id="buttonRow">
                    <!--<img @click="closeLayout" src="../assets/ban.svg" class="layoutBanBtn">-->

                    <b-button
                      @click="backgroundBtn"
                      name="none"
                      class="backgroundFixColor ban"
                      style="background-color:#fffeec background:src(http://cdn.zetawiki.com/png/slash.png)"
                    >
                    </b-button>
                    <b-button
                      @click="backgroundBtn"
                      name="#e6696e"
                      class="backgroundFixColor"
                      style="background-image: linear-gradient(to bottom, #e6696e, #e67a7d); !important"
                    ></b-button>
                    <b-button
                      @click="backgroundBtn"
                      name="#9177c0"
                      class="backgroundFixColor"
                      style="background-image: linear-gradient(to bottom, #9177c0, #8268b4); !important"
                    ></b-button>
                    <b-button
                      @click="backgroundBtn"
                      name="#dd8042"
                      class="backgroundFixColor"
                      style="background-image: linear-gradient(to bottom, #dd8042, #dc8d5e); !important"
                    ></b-button>
                    <b-button
                      @click="backgroundBtn"
                      name="#d69d2f"
                      class="backgroundFixColor"
                      style="background-image: linear-gradient(to bottom, #d69d2f, #cd8e27); !important"
                    ></b-button>
                  </div>

                  <div class="row" id="buttonRow">
                    <b-button
                      @click="backgroundBtn"
                      name="#6ca64e"
                      class="backgroundFixColor"
                      style="background-image: linear-gradient(to bottom, #6ca64e, #5f9943); !important"
                    ></b-button>
                    <b-button
                      @click="backgroundBtn"
                      name="#5ba68f"
                      class="backgroundFixColor"
                      style="background-image: linear-gradient(to bottom, #5ba68f, #4b977f); !important"
                    ></b-button>
                    <b-button
                      @click="backgroundBtn"
                      name="#629eb1"
                      class="backgroundFixColor"
                      style="background-image: linear-gradient(to bottom, #629eb1, #5490a3); !important"
                    ></b-button>
                    <b-button
                      @click="backgroundBtn"
                      name="#87919d"
                      class="backgroundFixColor"
                      style="background-image: linear-gradient(to bottom, #87919d, #7a8490); !important"
                    ></b-button>
                    <b-button
                      class="backgroundFixColor Picker"
                      style="background-image: conic-gradient(
                      #ff4141,
                      #ffff51,
                      #55fc55,
                      #5555ff,
                      #ff5959); !important"
                      @click="colorBackgroundpicker"
                      @keypress.enter="submitSourceOriginal"
                    ></b-button>
                  </div>
                  <div @mouseup="updateBackgroundValueWithUndo">
                    <chrome-color
                      class="chrome"
                      v-show="isBackgroundPicker"
                      :value="backgroundColor.backgroundColor"
                      v-model="backgroundColor.backgroundColor"
                      @input="updateBackgroundValue"
                    ></chrome-color>
                  </div>
                  <br />
                  <div class="row">
                    <span class="property backgruond" title>
                      Background Image
                    </span>
                    <input
                      style="display:none"
                      type="file"
                      @change="onFileSelected"
                      id="getfile"
                      ref="fileInput"
                    />
                    <button
                      class="pickPicture"
                      @click="$refs.fileInput.click()"
                    >
                      Pick
                    </button>
                  </div>

                  <div v-show="imageLoder" class="row" >
                    <span class="property backgruond" title>
                      Background Size
                    </span>
                    <b-form-select
                      class=" btn btn-info btn-sm dropdown-toggle"
                      id="dropBGSize"
                      v-model="imageSizeSelected"
                      :options="imageSize"
                      @change="submitChangeImageSize"
                    ></b-form-select>
                    <!--<button @click="onUpload">Save</button>-->
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div
                class="card-header"
                @click="clickFontTab"
                role="tab"
                id="headingOne"
              >
                <h5 class="mb-0">
                  <a
                    class="title"
                    data-toggle="collapse"
                    href="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    font
                  </a>
                </h5>
              </div>
              <div
                id="collapseOne"
                class="collapse"
                v-bind:class="{ show: fontTab === 1 }"
                role="tabpanel"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <div class="row font">
                    <img
                      @mousedown.stop
                      class="left AlignBtn"
                      src="../assets/images/left-align.svg"
                    />
                    <img
                      @mousedown.stop
                      class="center AlignBtn"
                      src="../assets/images/center-align.svg"
                    />
                    <img
                      @mousedown.stop
                      class="right AlignBtn"
                      src="../assets/images/left-align.svg"
                    />
                    <a class="linkA"> Link </a>
                  </div>

                  <div class="row font">
                    <img
                      @mousedown.stop
                      class="thick"
                      src="../assets/images/thick.svg"
                    />
                    <img
                      @mousedown.stop
                      class="line-font"
                      src="../assets/images/line-font.svg"
                    />
                    <img
                      @mousedown.stop
                      class="italic"
                      src="../assets/images/italic.svg"
                    />
                    <img
                      @mousedown.stop
                      class="bigAndSmall"
                      src="../assets/images/bigAndSmall.svg"
                    />
                  </div>

                  <div class="row">
                    <span class="property">
                      Style
                    </span>
                    <b-form-select
                      class="btn btn-info btn-sm dropdown-toggle"
                      id="dropdown-toggle"
                      v-model="borderWidthSelected"
                      :options="borderWidth"
                      @change="submitChangeBorderWidth"
                    ></b-form-select>
                  </div>
                  <br />
                  <div class="row">
                    <span class="property">
                      Font
                    </span>
                    <b-form-select
                      class="btn btn-info btn-sm dropdown-toggle"
                      id="dropdown-toggle"
                      v-model="borderWidthSelected"
                      :options="borderWidth"
                      @change="submitChangeBorderWidth"
                    ></b-form-select>
                  </div>
                  <br />
                  <div class="row">
                    <span class="property">
                      Size
                    </span>
                    <input
                      class="propertyChange fontSize"
                      type
                      name="width"
                      value
                      title
                      placeholder="31.4375px"
                      @keyup.enter="submitSourceWithPX"
                      v-model="componentSorce.width"
                    />
                  </div>
                  <br />
                  <div class="row">
                    <span class="property backgruond" id="bgSpan">
                      Font Color
                    </span>
                    <b-button
                      class="backgroundColorPicker"
                      @click="colorBackgroundpicker"
                      @keyup.enter="submitSourceOriginal"
                      :style="backgroundColor"
                      variant="free"
                    ></b-button>
                  </div>

                  <div class="row" id="buttonRow">
                    <!--<img @click="closeLayout" src="../assets/ban.svg" class="layoutBanBtn">-->
                    <b-button
                      class="backgroundFixColor ban"
                      style="background-color:#fffeec background:src(http://cdn.zetawiki.com/png/slash.png)"
                    >
                    </b-button>
                    <b-button
                      class="backgroundFixColor"
                      style="background-image: linear-gradient(to bottom, #e6696e, #e67a7d); !important"
                    ></b-button>
                    <b-button
                      class="backgroundFixColor"
                      style="background-image: linear-gradient(to bottom, #9177c0, #8268b4); !important"
                    ></b-button>
                    <b-button
                      class="backgroundFixColor"
                      style="background-image: linear-gradient(to bottom, #dd8042, #dc8d5e); !important"
                    ></b-button>
                    <b-button
                      class="backgroundFixColor"
                      style="background-image: linear-gradient(to bottom, #d69d2f, #cd8e27); !important"
                    ></b-button>
                  </div>

                  <div class="row" id="buttonRow">
                    <b-button
                      class="backgroundFixColor"
                      style="background-image: linear-gradient(to bottom, #6ca64e, #5f9943); !important"
                    ></b-button>
                    <b-button
                      class="backgroundFixColor"
                      style="background-image: linear-gradient(to bottom, #5ba68f, #4b977f); !important"
                    ></b-button>
                    <b-button
                      class="backgroundFixColor"
                      style="background-image: linear-gradient(to bottom, #629eb1, #5490a3); !important"
                    ></b-button>
                    <b-button
                      class="backgroundFixColor"
                      style="background-image: linear-gradient(to bottom, #87919d, #7a8490); !important"
                    ></b-button>
                    <b-button
                      class="backgroundFixColor Picker"
                      style="background-image: conic-gradient(
                      #ff4141,
                      #ffff51,
                      #55fc55,
                      #5555ff,
                      #ff5959); !important"
                    ></b-button>
                  </div>
                </div>
              </div>
            </div>

            <!--
          <div class="card">
            <div
              class="card-header"
              @click="clickFilterTab"
              role="tab"
              id="headingOne"
            >
              <h5 class="mb-0">
                <a
                  class="title"
                  data-toggle="collapse"
                  href="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  filter
                </a>
              </h5>
            </div>
            <div
              id="collapseOne"
              class="collapse"
              v-bind:class="{ show: filterTab === 1 }"
              role="tabpanel"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div class="card-body">
                <div class="row filter">
                  <span
                    class="filterSpan"
                    :class="{ fontActive: onOpacity }"
                    style="float:left"

                  >
                    filter
                  </a>
                </h5>
              </div>
              <div
                id="collapseOne"
                class="collapse"
                v-bind:class="{ show: filterTab === 1 }"
                role="tabpanel"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <div class="row filter">
                    <span
                      class="filterSpan"
                      :class="{ fontActive: onOpacity }"
                      style="float:left"
                    >
                      Opacity
                    </span>
                    <range-slider
                      class="slider"
                      min="0"
                      max="1"
                      step="0.01"
                      name="Opacity"
                      submitSorce.style="Opacity"
                      @input="submitOpacity"
                      v-model="opacityValue"
                    />
                    <input
                      class="filterInput"
                      style="width:50px"
                      v-model="opacityValue"
                      placeholder="0"
                      name="Opacity"
                      @keyup.enter="submitOpacity"
                    />
                  </div>

                  <div class="row filter">
                    <span
                      class="filterSpan"
                      :class="{ fontActive: onBlur }"
                      style="float:left"
                    >
                      Blur
                    </span>
                    <range-slider
                      class="slider"
                      min="0"
                      max="100"
                      step="1"
                      name="Blur"
                      submitSorce.style="Blur"
                      @input="submitBlur"
                      v-model="blurValue"
                    />
                    <input
                      class="filterInput"
                      style="width:50px"
                      placeholder="0px"
                      name="Blur"
                      @keyup.enter="submitBlur"
                      v-model="blurValue"
                    />
                  </div>
                  <div class="row filter">
                    <span
                      class="filterSpan"
                      :class="{ fontActive: onBrightness }"
                      style="float:left"
                    >
                      Brightness
                    </span>
                    <range-slider
                      class="slider"
                      min="0"
                      max="100"
                      step="1"
                      name="Brightness"
                      submitSorce.style="Brightness"
                      @input="submitBrightness"
                      v-model="brightnessValue"
                    />
                    <input
                      class="filterInput"
                      style="width:50px"
                      placeholder="0%"
                      name="Brightness"
                      @keyup.enter="submitBrightness"
                      v-model="brightnessValue"
                    />
                  </div>

                  <div class="row filter">
                    <span
                      class="filterSpan"
                      :class="{ fontActive: onContrast }"
                      style="float:left"
                    >
                      Contrast
                    </span>
                    <range-slider
                      class="slider"
                      min="0"
                      max="200"
                      step="1"
                      name="Contrast"
                      submitSorce.style="Contrast"
                      @input="submitContrast"
                      v-model="contrastValue"
                    />
                    <input
                      class="filterInput"
                      style="width:50px"
                      placeholder="0%"
                      name="Contrast"
                      @keyup.enter="submitContrast"
                      v-model="contrastValue"
                    />
                  </div>
                  <div class="row filter">
                    <span
                      class="filterSpan"
                      :class="{ fontActive: onGrayscale }"
                      style="float:left"
                    >
                      Grayscale
                    </span>
                    <range-slider
                      class="slider"
                      min="0"
                      max="100"
                      step="1"
                      name="Grayscale"
                      submitSorce.style="Grayscale"
                      @input="submitGrayscale"
                      v-model="grayscaleValue"
                    />
                    <input
                      class="filterInput"
                      style="width:50px"
                      placeholder="0%"
                      name="Grayscale"
                      @keyup.enter="submitGrayscale"
                      v-model="grayscaleValue"
                    />
                  </div>
                  <div class="row filter">
                    <span
                      class="filterSpan"
                      :class="{ fontActive: onHue }"
                      style="float:left"
                    >
                      Hue
                    </span>
                    <range-slider
                      class="slider"
                      min="0"
                      max="360"
                      step="3"
                      name="Hue"
                      submitSorce.style="Hue"
                      @input="submitHue"
                      v-model="hueValue"
                    />
                    <input
                      class="filterInput"
                      style="width:50px"
                      placeholder="0deg"
                      name="Hue"
                      @keyup.enter="submitHue"
                      v-model="hueValue"
                    />
                  </div>
                  <div class="row filter">
                    <span
                      class="filterSpan"
                      :class="{ fontActive: onInvert }"
                      style="float:left"
                    >
                      Invert
                    </span>
                    <range-slider
                      class="slider"
                      min="0"
                      max="100"
                      step="1"
                      name="Invert"
                      submitSorce.style="Invert"
                      @input="submitInvert"
                      v-model="invertValue"
                    />
                    <input
                      class="filterInput"
                      style="width:50px"
                      placeholder="100%"
                      name="Invert"
                      @keyup.enter="submitInvert"
                      v-model="invertValue"
                    />
                  </div>
                  <div class="row filter">
                    <span
                      class="filterSpan"
                      :class="{ fontActive: onSaturate }"
                      style="float:left"
                    >
                      Saturate
                    </span>
                    <range-slider
                      class="slider"
                      min="0"
                      max="200"
                      step="1"
                      name="Saturate"
                      submitSorce.style="Saturate"
                      @input="submitSaturate"
                      v-model="saturateValue"
                    />
                    <input
                      class="filterInput"
                      style="width:50px"
                      placeholder="0%"
                      name="Saturate"
                      @keyup.enter="submitSaturate"
                      v-model="saturateValue"
                    />
                  </div>
                  <div class="row filter">
                    <span
                      class="filterSpan"
                      :class="{ fontActive: onSepia }"
                      style="float:left"
                    >
                      Sepia
                    </span>
                    <range-slider
                      class="slider"
                      min="0"
                      max="100"
                      step="1"
                      name="Sepia"
                      submitSorce.style="Sepia"
                      @input="submitSepia"
                      v-model="sepiaValue"
                    />
                    <input
                      class="filterInput"
                      style="width:50px"
                      placeholder="0%"
                      name="Sepia"
                      @keyup.enter="submitSepia"
                      v-model="sepiaValue"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          --></div>
        </div>

        <!--Animation-->
        <div
          @mouseover="mouseOver"
          v-show="tabStep === 2"
          class="tab-pane"
          v-bind:class="{ active: tabStep === 2 }"
          id="pills-animation"
          role="tabpane2"
          aria-labelledby="pills-animation-tab"
        >
          <div id="accordion" role="tablist">
            <div class="card">
              <div
                class="card-header"
                @click="clickAnimationTab"
                role="tab"
                id="headingOne"
              >
                <h5 class="mb-0">
                  <a
                    class="title"
                    data-toggle="collapse"
                    href="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Animation
                  </a>
                </h5>
              </div>
              <div
                id="collapseOne"
                class="collapse"
                v-bind:class="{ show: AnimationTab === 1 }"
                role="tabpanel"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div class="row animation">
                  <span class="aniText">
                    Animation
                  </span>
                  <b-form-select
                    class=" btn btn-info btn-sm dropdownAnimation"
                    v-model="imageSizeSelected"
                    :options="animationStyle"
                    @change="submitChangeImageSize"
                  ></b-form-select>
                </div>

                <div>
                  <div class="row animation">
                    <span class="aniText">
                      Time
                    </span>
                    <input
                      class="propertyChange aniTimeChange"
                      type
                      name="width"
                      value
                      title
                      placeholder="31.4375px"
                      v-model="componentSorce.width"
                    />
                  </div>

                  <div class="row animation">
                    <span class="aniText">
                      Delay
                    </span>
                    <input
                      class="propertyChange aniTimeChange"
                      type
                      name="width"
                      value
                      title
                      placeholder="31.4375px"
                      v-model="componentSorce.width"
                    />
                  </div>

                  <div class="row animation">
                    <span class="aniText">
                      Repeat
                    </span>
                    <b-form-select
                      class=" btn btn-info btn-sm dropdownAnimation"
                      v-model="imageSizeSelected"
                      :options="repeatTime"
                      @change="submitChangeImageSize"
                    ></b-form-select>
                  </div>

                  <div class="row animation">
                    <span class="aniText">
                      Function
                    </span>
                    <b-form-select
                      class="btn btn-info btn-sm dropdownAnimation"
                      v-model="imageSizeSelected"
                      :options="timingFunction"
                      @change="submitChangeImageSize"
                    ></b-form-select>
                  </div>

                  <div class="row animation">
                    <span class="aniText">
                      Direction
                    </span>
                    <b-form-select
                      class=" btn btn-info btn-sm dropdownAnimation"
                      v-model="imageSizeSelected"
                      :options="direction"
                      @change="submitChangeImageSize"
                    ></b-form-select>
                  </div>

                  <b-button
                    class="deleteAM"
                    id="deleteAM"
                    @click="testAnimation"
                  ></b-button>

                  <b-button
                    class="testApplyAM"
                    id="ApplyAM"
                    @click="testAnimation"
                  ></b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import RangeSlider from 'vue-range-slider'
import { Chrome } from 'vue-color'
import { mapGetters, mapMutations } from 'vuex'
import Switches from 'vue-switches'
import 'vue-range-slider/dist/vue-range-slider.css'
import vueCustomScrollbar from 'vue-custom-scrollbar'
// import MonacoEditor from 'vue-m-monaco-editor'
import MonacoEditor from 'monaco-editor-vue'

export default {
  name: 'App',
  props: ['loadData'],
  components: {
    RangeSlider,
    ChromeColor: VueColor.Chrome,
    Switches,
    vueCustomScrollbar,
    MonacoEditor
  },
  data() {
    return {
      payload: '',
      clickBackground: false,
      imageLoder:false,
      //selction 된 component 속성
      componentSorce: {
        x: 228,
        y: 500,
        width: 960,
        height: 614,
        padding: '0px',
        margin: '0px',
        backgroundColor: '',
        fontColor: '',
        fontSize: ''
      },
      code: '<MonacoEditor l',
      //margin 값
      margin: [
        {
          value: 0
        },
        {
          value: 0
        },
        {
          value: 0
        },
        {
          value: 0
        }
      ],
      //paddoing 값
      padding: [0, 0, 0, 0],
      options: {
        //Monaco Editor Options
      },
      //Tab value
      layoutTab: 0,
      backgroundTab: 0,
      fontTab: 0,
      filterTab: 0,
      AnimationTab: 0,
      //Animation
      enabled: false,
      animationStyle: [
        { text: 'none' },
        { text: 'bounce' },
        { text: 'fadeIn' },
        { text: 'moveRight' },
        { text: 'slidein' },
        { text: 'rotate' },
        { text: 'custom' }
      ],
      timingFunction: [
        { text: 'ease' },
        { text: 'ease-in' },
        { text: 'ease-out' },
        { text: 'ease-in-out' },
        { text: 'linear' }
      ],
      direction: [
        { text: 'nomal' },
        { text: 'alternate' },
        { text: 'reverse' },
        { name: 'alterne-reverse', text: 'alt-reverse' }
      ],
      repeatTime: [{ text: 'custom' }, { text: 'infinite' }],
      imageSizeSelected: 'none',
      imageSize: [
        { value: 'none', text: 'None' },
        { value: 'auto', text: 'Auto' },
        { value: 'length', text: 'Length' },
        { value: 'cover', text: 'Cover' },
        { value: 'contain', text: 'Contain' },
        { value: 'initial', text: 'Initial' }
      ],
      transformantionSelected: 'none',
      transformantion: [
        { value: 'none', text: 'None' },
        { value: 'lowercase ', text: 'Lowercase' },
        { value: 'uppercase ', text: 'Uppercase' },
        { value: 'capitalize ', text: 'Capitalize' }
      ],
      fontFamilySelected: 'none',
      fontFamily: [
        { value: 'none', text: 'None' },
        { value: 'geogia', text: 'Geogia' },
        { value: 'serif ', text: 'Serif' },
        { value: 'sans-serif ', text: 'Sans-serif' },
        { value: 'monospace ', text: 'Monospace' },
        { value: 'cursive ', text: 'Cursive' },
        { value: 'fantasy ', text: 'Fantasy' }
      ],
      fontStyleSelected: 'none',
      fontStyle: [
        { value: 'none', text: 'None' },
        { value: 'initial  ', text: 'Initial  ' },
        { value: 'italic ', text: 'Italic' },
        { value: 'oblique ', text: 'Oblique' },
        { value: 'underline', text: 'Underline' }
      ],
      fontWeightSelected: 'none',
      fontWeight: [
        { value: 'none', text: 'None' },
        { value: 'lighter', text: 'Lighter' },
        { value: 'bold', text: 'Bold' },
        { value: 'number', text: 'Number' }
      ],
      borderStyleSelected: 'none',
      borderStyle: [
        { value: 'none', text: 'None' },
        { value: 'solid', text: 'Solid' },
        { value: 'dotted', text: 'Dotted' },
        { value: 'dashed', text: 'Dashed' },
        { value: 'double', text: 'Double' }
      ],
      borderWidthSelected: 'none',
      borderWidth: [
        { value: 'none', text: 'None' },
        { value: 'medium', text: 'Medium' },
        { value: 'thick', text: 'Thick' },
        { value: 'thin', text: 'Thin' },
        { value: 'length', text: 'Length' }
      ],
      border: 'false',
      tabStep: 1,
      opacityValue: '',
      blurValue: '',
      brightnessValue: 100 + '%',
      contrastValue: 100 + '%',
      grayscaleValue: '',
      hueValue: '',
      invertValue: '',
      saturateValue: 100 + '%',
      sepiaValue: '',
      isData: false,
      isBackgroundPicker: false,
      isFontPicker: false,
      backgroundColor: {
        backgroundColor: ''
      },
      fontColor: {
        backgroundColor: ''
      },
      submitSorce: {
        payload: '',
        style: '',
        value: '',
        change: ''
      },
      compo: null,
      borderstyle: null,
      onWidth: false,
      onHeight: false,
      onMargin: false,
      onPadding: false,
      onBackgroundColor: false,
      onColor: false,
      onFontSize: false,
      onOpacity: false,
      onBlur: false,
      onBrightness: false,
      onContrast: false,
      onGrayscale: false,
      onHue: false,
      onInvert: false,
      onSaturate: false,
      onSepia: false,
      parentDom: [],
      selectedFile: null,
      domWithTree: [],
      backgroundImage: '',
      //   kindOfLoadDate:0,
      test: 'as',
      xInter: null,
      yInter: null,
      layoutMove: false,
      moveTarget: null,
      isSticky: false,
      treeSticky: true
    }
  },
  mounted() {
    document.addEventListener('mousemove', e => {
      if (this.layoutMove) {
        this.moveTarget.style.width = '-webkit-calc(100% - 83.5%)'
        this.moveTarget.style.height = '30rem'
        // this.moveTarget.style.right= e.clientX - this.xInter + "px";
        this.moveTarget.style.right =
          window.innerWidth -
          e.clientX -
          (parseInt(getComputedStyle(this.moveTarget).width) - this.xInter) +
          'px'
        this.moveTarget.style.top = e.clientY - this.yInter + 'px'
        let rightBorder = document.querySelector('.right-panel-border')
        // console.log(parseInt(getComputedStyle(this.moveTarget).right))
        if (parseInt(getComputedStyle(this.moveTarget).right) < 30) {
          // console.log('1')
          rightBorder.style.opacity = '1'
          rightBorder.style.backgroundImage =
            'linear-gradient(to right, #00000000, #68869250)'
          // rightBorder.style.backgroundColor = "#3a3a50"
          this.isSticky = true
        } else {
          // console.log('0')
          rightBorder.style.opacity = '0'
          // rightBorder.style.backgroundColor = "#292931";
          this.isSticky = false
        }
      }
    })
    document.addEventListener('mouseup', () => {
      if (this.layoutMove) {
        let rightBorder = document.querySelector('.right-panel-border')
        let rightTopPanel = document.querySelector('.right-top-panel')
        let rightBottomPanel = document.querySelector('.right-bottom-panel')
        // rightBorder.style.backgroundColor = "#292931";
        if (this.isSticky) {
          console.log('0')
          rightBorder.style.opacity = '0'
          this.moveTarget.style.width = '-webkit-calc(100% - 83.5%)'
          this.moveTarget.style.right = '0'
          this.moveTarget.style.top = '3.5%'
          this.moveTarget.style.height = '30rem'
          rightTopPanel.style.height = '30rem'
          rightBottomPanel.style.height = '25rem'
          let rightPanel = document.querySelector('.right-panel')
          let centerPanel = document.querySelector('.center-panel')
          rightPanel.style.width = '16.5%'
          centerPanel.style.width = '80%'
          this.$emit('stick', 0)
        } else {
          if (this.treeSticky === false) {
            console.log('2')
            let rightPanel = document.querySelector('.right-panel')
            let centerPanel = document.querySelector('.center-panel')
            rightPanel.style.width = '0'
            centerPanel.style.width = '96.5%'
          } else {
            console.log('3')
            let rightPanel = document.querySelector('.right-panel')
            let centerPanel = document.querySelector('.center-panel')
            rightPanel.style.width = '16.5%'
            centerPanel.style.width = '80%'
          }
          this.$emit('stick', 1)
        }
        this.layoutMove = false
      }
    })
  },
  created() {},
  computed: {
    testMessage: function() {
      this.test = document.getElementById('newLoaderHtml').innerHTML
      return this.test
    }
  },
  methods: {
    //탭 변경하는 함수
    chageTab(e) {
      if (e.toElement.text == 'Options') {
        this.tabStep = 1
      } else if (e.toElement.text == 'Animation') {
        this.tabStep = 2
      }
    },
    getData(payload, homeLayoutLocation) {
      //데이터 초기화
      this.onWidth = false
      this.onHeight = false
      this.onMargin = false
      this.onPadding = false
      ;(this.onBackgroundColor = false),
        (this.onColor = false),
        (this.onFontSize = false),
        (this.onOpacity = false),
        (this.onBlur = false),
        (this.onBrightness = false),
        (this.onContrast = false),
        (this.onGrayscale = false),
        (this.onHue = false),
        (this.onInvert = false),
        (this.onSaturate = false),
        (this.onSepia = false),
        (this.selected = 'none')
      if (!this.isData) {
        this.isData = true
      }

      this.payload = payload.target
      // console.log(this.payload)
      // margin데이터 넣기
      var margin = getComputedStyle(payload.target)
        .margin.replace(/px/gi, '')
        .split(' ')
      // console.log(margin)
      // console.log(this.margin[0])
      if (margin.length !== 1) {
        for (var i = 0; i < margin.length; i++) {
          this.margin[i].value = margin[i]
        }
      } else {
        for (var i = 0; i < 4; i++) {
          this.margin[i].value = margin[0]
        }
      }
      // padding데이터 넣기
      var padding = getComputedStyle(payload.target)
        .padding.replace(/px/gi, '')
        .split(' ')
      //   console.log(padding)o8
      //   console.log(this.margin[0])
      if (padding.length !== 1) {
        for (var i = 0; i < padding.length; i++) {
          this.padding[i] = padding[i]
        }
      } else {
        for (var i = 0; i < 4; i++) {
          this.padding[i] = padding[0]
        }
      }
      //사용자가 사용하는 화면에 맞춘 좌표
      this.componentSorce.x = Math.floor(payload.x - homeLayoutLocation.x)
      ;(this.componentSorce.y = Math.floor(payload.y - homeLayoutLocation.y)),
        (this.componentSorce.width = Math.floor(
          payload.target.getBoundingClientRect().width
        ))
      this.componentSorce.height = Math.floor(
        payload.target.getBoundingClientRect().height
      )
      this.componentSorce.margin = getComputedStyle(payload.target).margin
      this.componentSorce.padding = getComputedStyle(payload.target).padding
      this.componentSorce.backgroundColor = getComputedStyle(
        payload.target
      ).backgroundColor
      this.backgroundColor.backgroundColor = getComputedStyle(
        payload.target
      ).backgroundColor
      this.fontColor.backgroundColor = getComputedStyle(payload.target).color
      this.componentSorce.fontSize = getComputedStyle(
        payload.target
      ).fontSize.replace('px', '')
      this.opacityValue = getComputedStyle(payload.target).opacity
      // console.log(this.opacity)
      // console.log(margin)
      // console.log(this.margin[3])
    },
    colorBackgroundpicker() {
      if (this.isBackgroundPicker == true) this.isBackgroundPicker = false
      else this.isBackgroundPicker = true
      // if(this.isBackgroundPicker==true)
      //    this.isBackgroundPicker=false
      // else
      //    this.isBackgroundPicker=true
      // console.log("sdas")
      console.log('s')
    },
    colorFontpicker() {
      this.isFontPicker = true
    },

    updateFontValue(colorData) {
      this.fontColor.background = colorData.hex
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'color'
      this.submitSorce.value = colorData.hex
      ;(this.onColor = true),
        (this.submitSorce.change = 1),
        this.$emit('userSelected', this.submitSorce)
    },
    //보내기
    submitSource(e) {
      console.log(this.payload)
      this.submitSorce.payload = this.payload
      this.submitSorce.style = e.target.name

      if (e.target.name == 'width') {
        this.onWidth = true
        this.submitSorce.value = e.target.value + 'px'
      } else if (e.target.name == 'height') {
        this.onHeight = true
        this.submitSorce.value = e.target.value + 'px'
      } else if (e.target.name == 'margin') {
        this.onMargin = true

        var margin = e.target.value.replace(/px/gi, '').split(' ')
        var value = ''
        // console.log(margin)
        // console.log(this.margin[0])
        if (margin.length !== 1) {
          for (var i = 0; i < margin.length; i++) {
            this.margin[i].value = margin[i]
            value += margin[i] + 'px '
          }
          for (var i = margin.length; i < 4; i++) {
            this.margin[i].value = 0
            if (typeof margin[i] == 'undefined') {
              value += 0 + 'px '
            } else {
              value += margin[i] + 'px '
            }
          }
        } else {
          for (var i = 0; i < 4; i++) {
            this.margin[i].value = margin[0]
            value += margin[0] + 'px '
          }
        }
        this.submitSorce.value = value
      } else if (e.target.name == 'padding') {
        this.onPadding = true
        var padding = e.target.value.replace(/px/gi, '').split(' ')
        var value = ''

        if (padding.length !== 1) {
          for (var i = 0; i < padding.length; i++) {
            this.padding[i] = padding[i]
            value += padding[i] + 'px '
          }
          for (var i = padding.length; i < 4; i++) {
            this.padding[i] = 0
            if (typeof padding[i] == 'undefined') {
              value += 0 + 'px '
            } else {
              value += padding[i] + 'px '
            }
          }
        } else {
          for (var i = 0; i < 4; i++) {
            this.padding[i] = padding[0]
            value += padding[0] + 'px '
          }
        }
        this.submitSorce.value = value
      }
      this.submitSorce.change = 1
      console.log(this.submitSorce)
      this.$emit('userSelectedWidth', this.submitSorce)
    },
    updateBackgroundValue(colorData) {
      if(!this.clickBackground){
        this.submitSorce.change = 1
        this.clickBackground=true
      }
      else{
        this.submitSorce.change = 0
      }
      this.backgroundColor.background = colorData.hex
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'background'
      this.submitSorce.value = colorData.hex
      this.onBackgroundColor = true
      
      this.$emit('userSelectedWidth', this.submitSorce)
    },
    updateBackgroundValueWithUndo(e) {
      if (this.clickBackground) {
        var sub = {
          payload: '',
          style: '',
          value: '',
          change: ''
        }
        sub.payload = this.submitSorce.payload
        sub.style = this.submitSorce.style
        sub.value = this.submitSorce.value
        sub.change = 1

        this.$emit('userSelectedWidth', sub)
      }
    },
    backgroundBtn(e){
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'background'
      this.submitSorce.value = e.target.name
      this.submitSorce.change = 1
      this.$emit('userSelectedWidth', this.submitSorce)
    },
    onFileSelected(e) {
      var file = e.target
      var fileList = file.files
      // 읽기
      var reader = new FileReader()
      reader.readAsDataURL(fileList[0])
      // console.log(reader)
      var submit = this.submitSorce
      var data = this.payload
      //로드 한 후
      var vm = this
      reader.onload = function() {
        submit.payload = data
        submit.style = 'background-image'
        submit.value = 'url(' + reader.result + ')'
        submit.change = 1 
        vm.$emit('userSelectedWidth', submit)
      }
      this.imageLoder = true
    },
    submitChangeImageSize(e) {
      console.log(e)
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'background-size'
      this.submitSorce.value = e
      // console.log(this.submitSorce)
      this.submitSorce.change = 1
      this.$emit('userSelectedWidth', this.submitSorce)
    },
    

    testee(e) {
      console.log('s')
    },
    //엔터
    submitSourceOriginal(e) {
      // console.log(e.target)
      console.log('sd')
      // console.log(e.target.name)
      this.isBackgroundPicker = false
      this.isFontPicker = false
      if (e.target.name == 'backgroundColor') {
        this.backgroundColor.backgroundColor = e.target.value
      } else if (e.target.name == 'color') {
        this.fontColor.backgroundColor = e.target.value
      }
      this.submitSorce.payload = this.payload
      if (typeof e.target !== 'undefined') {
        this.submitSorce.style = e.target.name
        this.submitSorce.value = e.target.value
      } else {
        // onsole.log(this.submitSorce)
        this.submitSorce.value = e
      }
      this.submitSorce.change = 1
      this.$emit('userSelected', this.submitSorce)
    },

    submitSourceWithPX(e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = e.target.name
      // this.submitSorce.value=e.target.value+'px'
      // console.log(e.target.value)
      if (e.target.value !== 'auto') {
        var words = e.target.value.replace(/px/gi, '').split(' ')
        // console.log(words)
        for (var i = 0; i < words.length; i++) {
          // console.log(words[i])
          // words[i].replace('',' ');
          // console.log(words[i])
          if (i == 0) {
            this.submitSorce.value = words[i] + 'px '
          } else {
            this.submitSorce.value += words[i] + 'px '
          }
        }
      } else {
        this.submitSorce.value = 'auto'
        // console.log('갱')
      }
      if (e.target.name == 'width') {
        this.onWidth = true
      } else if (e.target.name == 'height') {
        this.onHeight = true
      } else if (e.target.name == 'margin') {
        this.onMargin = true
        var margin = e.target.value.replace(/px/gi, '').split(' ')
        // console.log(margin)
        // console.log(this.margin[0])
        if (margin.length !== 1) {
          for (var i = 0; i < margin.length; i++) {
            this.margin[i].value = margin[i]
          }
          for (var i = margin.length; i < 4; i++) {
            this.margin[i].value = 0
          }
        } else {
          // console.log('0')
          rightBorder.style.opacity = '0'
          // rightBorder.style.backgroundColor = "#292931";
          this.isSticky = false
        }
      }
    },
    treeStick(payload) {
      // console.log(payload + 'aaa')
      if (payload === 0) {
        this.treeSticky = true
      } else if (payload === 1) {
        this.treeSticky = false
      }
    },
    submitChangeBorder(e) {
      // console.log("dasd")
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'border'
      this.submitSorce.value = 'solid'
      // console.log(this.submitSorce)
      ;(this.submitSorce.change = 1),
        this.$emit('userSelectBorder', this.submitSorce)
    },
    submitChangeBorderWidth(e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'border'
      this.submitSorce.value = e
      // console.log(this.submitSorce)
      ;(this.submitSorce.change = 1),
        this.$emit('userSelectBorder', this.submitSorce)
    },
    submitChangeBorderStyle(e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'border'
      this.submitSorce.value = e
      ;(this.submitSorce.change = 1),
        // console.log(this.submitSorce)
        this.$emit('userSelectBorder', this.submitSorce)
    },
    submitChangeFloat(e) {
      if (e.target.getAttribute('name') == null) {
        if (e.target.parentElement.getAttribute('name') === 'left') {
          this.submitSorce.value = 'left'
        } else if (e.target.parentElement.getAttribute('name') === 'right') {
          this.submitSorce.value = 'right'
        } else if (e.target.parentElement.getAttribute('name') === 'no') {
          this.submitSorce.value = 'left'
        } else if (e.target.parentElement.getAttribute('name') === 'center') {
          this.submitSorce.value = 'center'
        }
      } else {
        this.submitSorce.value = e.target.getAttribute('name')
      }
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'float'
      // console.log(this.submitSorce)
      ;(this.submitSorce.change = 1),
        this.$emit('userSelected', this.submitSorce)
    },
    makeTreeParent(payload) {
      var obj = document.getElementById('inParentTreeOption')
      $(obj).empty()
      var newDIV = document.createElement('button')
      newDIV.innerHTML = 'HTML'
      obj.appendChild(newDIV)
      var newDIV = document.createElement('button')
      newDIV.innerHTML = 'Body'
      obj.appendChild(newDIV)
      var a = 0
      var print = []
      for (var i = 0; i < this.parentDom.length; i++) {
        if (payload == this.domWithTree[i]) {
          a = i
          break
        }
      }
      // console.log(a)
      print.push(a)
      // console.log(this.parentDom)
      while (true) {
        if (this.parentDom[a] != '-1') {
          a = this.parentDom[a]
          print.push(a)
        } else {
          break
        }
      }
      for (var i = print.length - 1; i >= 0; i--) {
        var obj = document.getElementById('inParentTreeOption')
        var newDIV = document.createElement('button')
        newDIV.setAttribute('id', print[i])
        newDIV.innerHTML = document.querySelector(
          `label[for="${print[i]}"]`
        ).innerHTML
        obj.appendChild(newDIV)
      }
    },
    
    
    onUpload() {
      /// 서버에 저장
    },
    domTrackingWithTree(e) {
      // console.log(this.domWithTree[e.target.id])
      if (e.target.innerText !== 'HTML' && e.target.innerText !== 'Body')
        this.$emit('selectDomElemented', this.domWithTree[e.target.id])
    },
    inputFile(e) {
      console.log(e)
      var file = document.querySelector('#getfile')
      file.onchange = function() {
        var fileList = file.files
        // 읽기
        var reader = new FileReader()
        reader.readAsText(fileList[0])
        //로드 한 후
        reader.onload = function() {
          document.querySelector('#preview').textContent = reader.result
        }
      }
    },
    loadDataSetting(data) {
      // console.log("dsda")
      // console.log(data[0])
    },
    changeProperty(e) {
      // console.log(this.loadData[0])
      // console.log(document.getElementById("newLoaderHtml"))
      if (e.target.getAttribute('name') == 'html') {
        this.kindOfLoadDate = 1
      } else if (e.target.getAttribute('name') == 'css') {
        this.kindOfLoadDate = 2
      } else if (e.target.getAttribute('name') == 'js') {
        this.kindOfLoadDate = 3
      }
      this.chageContent()
    },
    chageContent() {
      if (this.kindOfLoadDate == 1) {
        // document.querySelector('#preview').textContent = this.loadData[0]
        this.test = document.getElementById('newLoaderHtml').innerHTML
      } else if (this.kindOfLoadDate == 2) {
        document.querySelector('#preview2').textContent = this.loadData[1]
      } else if (this.kindOfLoadDate == 3) {
        document.querySelector('#preview3').textContent = this.loadData[2]
      }
    },
    closeLayout() {
      $(document.getElementById('codeBtnLayout')).trigger('click')
    },
    //레이아웃 Tab
    clickLayoutTab(e) {
      if (this.layoutTab == 1) {
        this.layoutTab = 0
      } else {
        this.layoutTab = 1
      }
    },
    clickBackgroundTab(e) {
      if (this.backgroundTab == 1) {
        this.backgroundTab = 0
      } else {
        this.backgroundTab = 1
      }
    },
    clickFontTab(e) {
      if (this.fontTab == 1) {
        this.fontTab = 0
      } else {
        this.fontTab = 1
      }
    },
    clickFilterTab(e) {
      if (this.filterTab == 1) {
        this.filterTab = 0
      } else {
        this.filterTab = 1
      }
    },
    clickAnimationTab(e) {
      if (this.AnimationTab == 1) {
        this.AnimationTab = 0
      } else {
        this.AnimationTab = 1
      }
    },
    movelayout(e) {
      // console.log(e.target.parentElement.parentElement)
      console.log(e.target.parentElement)
      e.target.parentElement.style.position = 'fixed'
      let initX = e.clientX
      let initY = e.clientY
      let initLeft = parseInt(getComputedStyle(e.target.parentElement).left)
      let initTop = parseInt(getComputedStyle(e.target.parentElement).top)
      this.xInter = initX - initLeft
      this.yInter = initY - initTop
      this.layoutMove = true
      this.moveTarget = e.target.parentElement
      this.moveTarget.style.height = '30rem'
    },
    closelayout() {
      this.$emit('close-layout')
    },
    //filter 변화 메소드
    submitOpacity(e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'opacity'
      if (typeof e.target !== 'undefined') {
        this.submitSorce.value = e.target.value
        // this.submitSorce.value=e
      } else {
        this.submitSorce.value = e
      }
      this.onOpacity = true
      ;(this.submitSorce.change = 1),
        this.$emit('userSelected', this.submitSorce)
    },
    //Animation 테스트
    testAnimation(e) {
      console.log(e)
      var oScript = document.createElement('style')
      oScript.type = 'text/css'
      oScript.innerHTML = `@keyframes a {
                0%   {background-color:red; width:200px; height:200px}
                25%  {background-color:yellow; left:200px; top:0px;}
                50%  {background-color:blue; left:200px; top:200px;}
                75%  {background-color:green; left:0px; top:200px;}
                100% {background-color:red; left:0px; top:0px;}
              }`
      console.log(oScript)
      document.getElementsByTagName('head')[0].appendChild(oScript)
    },
    //mouseover
    mouseOver(e) {
      // console.log(e.target.tagName)
      if (e.target.tagName == 'SPAN') {
        this.$emit('manualSelet', e.target.tagName)
      } else {
        this.$emit('manualSelet', e.target.tagName)
      }
    },
    onCodeChange(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss">
// @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
.studio-text {
  font-size: 1.4rem;
  color: white;
}
.close-btn {
  width: 1.1rem;
  /* position: fixed; */
  right: 4%;
  cursor: pointer;
  float: right;
}
.layout-box {
  // overflow: auto;
  width: 100%;
  height: 100%;
}
.right-scroll-area {
  height: 93%;
}
.dsadsadsad {
  color: white !important;
}
.nav {
  font-weight: bold;
  font-size: 14px;
}
.nav-tabs {
  border-bottom: 1px solid #242729;
}
.nav-link {
  color: #868e96;
}
.nav-link.active {
  background: linear-gradient(#3b4144, #32373a);
  border-style: none;
}
.nav-tabs .nav-link.active {
  color: #fff;
}
.card {
  margin-bottom: 10px;
  color: black;
  width: 100%;
  background: #35373a;
  border-bottom: 1px solid #242729;
  box-shadow: 0 1px 0 #34373a;
  padding-bottom: 8px;
  /* padding-top: 1px; */
  margin: 0 15px 10px 0px;
}
.card-header h5 {
  text-align: left;
}
.card-header .title {
  color: white;
  font-weight: bold;
  font-size: 15px;
}
[data-toggle='collapse']:after {
  display: inline-block;
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: '\f054';
  transform: rotate(90deg);
  transition: all linear 0.25s;
  float: right;
}
[data-toggle='collapse'].collapsed:after {
  transform: rotate(0deg);
}
.card-body {
  width: 100%;
}
.row {
  align-items: center;
}
//layout 속성
.margin {
  width: 100%;
  border: 3px solid #4f4f86;
  margin: 0px 0px 10px 0px;
}
.padding {
  border: 3px solid #2f6534;
}
.blue {
  padding: 2px;
  background-color: #2e3743 !important;
  color: #64bfff;
  line-height: 1;
}
.green {
  padding: 2px;
  background-color: #333f3a !important;
  color: #86cf89;
  line-height: 1;
}
.middle {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.empty {
  flex-grow: 1;
  width: 100%;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.21) inset;
}
.box-col {
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.box-row {
  .blue {
    width: 14%;
  }
  .box-col {
    .middle {
      .green {
        width: 14%;
      }
    }
  }
}
.dimensions {
  margin: -90px 0px 0px -10px;
}
.property {
  margin: 0px 0px 0px 10px;
  color: grey !important;
  width: 30%;
}
.propertyChange {
  background-color: #35373a;
  border-style: none;
  border-bottom: 0.5px solid #768ea7;
  width: 50%;
  float: right;
  margin: 0px 5px 0px 40px;
  text-align: right;
  padding: 0px 5px 0px 0px;
  color: #dedede;
}
.small {
  font-size: 13px;
}
.size {
  margin: 100px 0px 0px 0px;
  i {
    margin: 0px 10px 0px 10px;
    font-size: 14px;
    width: 5%;
  }
}
b {
  color: #b1aeae;
  width: 15%;
}
//background Layout 속성
#bgSpan {
  margin: 0px 0px 11px 20px;
  color: grey !important;
  float: left;
  width: 57%;
}
.backgroundLayout {
  display: table-cell;
}
// .AlignBtn {
//   width: 100px;
//   height:100px;
// }
.backgruond {
  float: left;
  width: 57%;
}
#buttonRow {
  align-items: center;
  -webkit-justify-content: center;
}
.backgroundColorPicker {
  vertical-align: middle;
  min-width: 20px !important;
  width: 50px !important;
  height: 30px !important;
  margin: 0 0 10px 13px;
  padding: 0 !important;
}
.backgroundFixColor {
  min-width: 20px !important;
  width: 50px !important;
  height: 30px !important;
  margin: 0 5px 10px 0px;
  padding: 0 !important;
}
.pickPicture {
  margin: 0px 0px 0px 6px;
  width: 30% !important;
  height: 30px !important;
  padding: 0 !important;
  color: white;
  background-color: #35373a !important;
  border: none;
  font-family: inherit;
}
.layoutBanBtn {
  width: 35px;
  height: 35px;
  margin: 2px 12px 12px 5px;
  fill: #fff;
}
.ban {
  background-color: #fff !important;
  background-image: url('../assets/images/diagonalLine.svg');
  background-size: 100% 100%;
  display: inline-block;
  border: 1px solid black;
}
#layout {
  color: #fff;
  background-color: #292931;
  .layout-text-box {
    // background-color: #2c?2c46;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    height: 7%;
    justify-content: center;
    cursor: move;
    position: relative;
    .layout-text {
      padding: 0.2rem;
      color: #dfdfdf;
      font-size: 1.3rem;
      cursor: default;
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
  .layout-box {
    height: 100%;
    // display: flex;
    // flex-direction: column;
    padding: 0.4rem;
    // overflow: auto;
  }
}
.Picker {
  background-image: conic-gradient(
    #ff4141,
    #ffff51,
    #55fc55,
    #5555ff,
    #ff5959
  ) !important;
}
#dropBGSize {
  width: 30% !important;
  background-color: #35373a !important;
  justify-content: center;
  vertical-align: middle;
}
//font 속성
.fontSize{
    margin: 0px 0px 0px 65px;
    width: 30%;
}
.row {
  .left {
    width: 40px !important;
  }
  .right {
    width: 40px !important;
    transform: rotate(180deg);
  }
  .linkA {
    font-size: 25px;
    color: blue !important;
    text-decoration: underline !important;
  }
  .thick {
    width: 40px !important;
  }
  .line-font {
    width: 53px !important;
  }
  .italic {
    width: 40px !important;
  }
  .bigAndSmall {
    width: 48px !important;
  }
}
.font {
  justify-content: space-around;
  align-items: center;
  margin: 0 0 10px 0;
}
#dropdown-toggle {
  width: 50% !important;
  background-color: #35373a !important;
  justify-content: center;
  vertical-align: middle;
}
//filter 속성
.filter {
  margin: 0px -6px 12px -15px;
}
.filterSpan {
  margin: 0px 0px 0px 0px;
  color: grey !important;
  width: 32%;
}
.range-slider-inner {
  width: 48%;
}
.filterInput {
  width: 16%;
  background-color: #35373a;
  border-style: none;
  border-bottom: 0.5px solid #768ea7;
  float: right;
  margin: 0 0px 0 0px;
  text-align: right;
  color: #dedede;
}
.range-slider-knob {
  width: 13px !important;
  height: 13px !important;
}
//Animation
.dropdownAnimation {
  margin: 0px -20px 0px 10px;
  width: 40% !important;
  background-color: #35373a !important;
  justify-content: center;
  vertical-align: middle;
}
.animation {
  margin: 15px 0px 0px 0px;
}
.aniText {
  color: grey !important;
  margin: 15px 10px 0px 13px;
  width: 40%;
}
.testApplyAM {
  animation: slidein 4s 1s infinite linear alternate;
  // animation-name: a;
  // animation-duration: 5s;
  // animation-timing-function: linear;
  // animation-delay: 2s;
  // animation-iteration-count: infinite;
  // animation-direction:  ;
}
.aniTimeChange {
  margin: 0px 0px 0px 40px;
}
.manual {
  margin: 0px 12px 0px 0px;
  position: absolute;
  right: 0;
}
.toggleSwitch {
  margin: 0px 10px 0px 0px !important;
  height: 10px !important;
}
.vue-switcher div:after {
  width: 16px !important;
  height: 16px !important;
}
.vue-switcher-theme--bootstrap.vue-switcher-color--info.vue-switcher--unchecked
  div:after {
  margin: 2.5px 0px -8px -15px;
}
.vue-switcher-theme--bootstrap.vue-switcher-color--info div:after {
  margin: 2.5px 0px -8px -15px;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes moveRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100px);
  }
}
@keyframes slidein {
  from {
    margin-left: 100%;
  }
  to {
    margin-left: 0%;
  }
}
@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
