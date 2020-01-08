<template>
  <div>
    <b-nav tabs fill>
      <b-nav-item active>Look & Feel </b-nav-item>
      <b-nav-item>options</b-nav-item>
      <b-nav-item>Animation</b-nav-item>
    </b-nav>
    <div v-if="isData" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block href="#" v-b-toggle.accordion-1 variant="info">Layout</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div class="info-option">
              <div class="margin">
                <div class="box-row blue">
                  <span class="margin-top" title="Margin Top">0</span>
                  </div>
					<div class="box-row middle">
						<div class="box-col blue">
							<span class="margin-left" title="Margin Left">0</span>
						</div>
						<div class="box-col padding">
							<div class="box-row green">
								<span class="padding-top" title="Padding Top">0</span>
							</div>
							<div class="box-row middle">
								<div class="box-col green">
									<span class="padding-left" title="Padding Left">0</span>
								</div>
								<div class="box-col middle empty"></div>
								<div class="box-col green">
									<span class="padding-right" title="Padding Right">0</span>
								</div>
							</div>
							<div class="box-row green">
								<span class="padding-bottom" title="Padding Bottom">0</span>
							</div>
						</div>
						<div class="box-col blue">
							<span class="margin-right" title="Margin Right">0</span>
						</div>
					</div>
					<div class="box-row blue">
						<span class="margin-bottom" title="Margin Bottom">0</span>
					</div>
				</div>
			<div class="dimensions">
				<span class="size x">
				<i>X</i>
				<b>{{componentSorce.x}}</b>
				</span>
				<span class="size y">
				<i>Y</i>
				<b>{{componentSorce.y}}</b>
				</span>
				<span class="size width">
				<i>W</i>
				<b>{{componentSorce.width}}</b>
				</span>
				<span class="size height">
				<i>H</i>
				<b>{{componentSorce.height}}</b>
				</span>
			</div>
			<div class="option textboxoption has-addon collapsed">
				<label class="option-content">
				<span title>
					Width
					<i class="caret" style="display: inline-block;"></i>
				</span>
				<div class="control">
					<input
					type
					name="width"
					value
					title
					placeholder="31.4375px"
					@keyup.enter="submitSourceWithPX"
					v-model="componentSorce.width"
					/>
					<span class="warning-badge" style="display: none;"></span>
					<span class="addon increment-handle"></span>
				</div>
				</label>
				<label class="option-content">
				<span title>
					Height
					<i class="caret" style="display: inline-block;"></i>
				</span>
				<div class="control">
					<input
					type="text"
					name="height"
					value
					title
					placeholder="40px"
					@keyup.enter="submitSourceWithPX"
					v-model="componentSorce.height"
					/>
					<span class="warning-badge" style="display: none;"></span>
					<span class="addon increment-handle">
					<i></i>
					</span>
				</div>
				</label>
				<label class="option-content">
				<span title>
					Margin
					<i class="caret" style="display: none;"></i>
				</span>
				<div class="control">
					<input
					type="text"
					name="margin"
					value
					title
					placeholder="0"
					@keyup.enter="submitSourceWithPX"
					v-model="componentSorce.margin"
					/>
					<span class="warning-badge" style="display: none;"></span>
					<span class="addon increment-handle">
					<i></i>
					</span>
				</div>
				</label>
				<label class="option-content">
				<span title>
					Padding
					<i class="caret" style="display: none;"></i>
				</span>
				<div class="control">
					<input
					type="text"
					name="padding"
					value
					title
					placeholder="0"
					@keyup.enter="submitSourceWithPX"
					v-model="componentSorce.padding"
					/>
					<span class="warning-badge" style="display: none;"></span>
					<span class="addon increment-handle">
					<i></i>
					</span>
				</div>
				</label>
			</div>
			</div>
            </v-app>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block href="#" v-b-toggle.accordion-2 variant="info">Background</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
			<div class="option textboxoption has-addon collapsed">
				<label class="option-content">
				<span title>
					BackgroundColor
					<i class="caret" style="display: inline-block;"></i>
				</span>
				<div class="control">
					<b-button  @click = "colorBackgroundpicker" style="width:30px; height:30px" :style="backgroundColor"variant="free"></b-button>
					<input
					type
					name="backgroundColor"
					value
					title
					placeholder=""
					@keyup.enter="submitSourceOriginal"
					v-model="backgroundColor.backgroundColor.hex"
					/>
					<chrome-color
					class="chrome"
					v-if="isBackgroundPicker"
					:value="backgroundColor.backgroundColor"
					v-model="backgroundColor.backgroundColor"
					@input="updateBackgroundValue"
					></chrome-color>
					<span class="warning-badge" style="display: none;"></span>
					<span class="addon increment-handle"></span>
				</div>
				</label>
			</div>
		</b-collapse>
      </b-card>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block href="#" v-b-toggle.accordion-3 variant="info">Font</b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
			<div class="option textboxoption has-addon collapsed">
				<label class="option-content">
				<span title>
					Color
					<i class="caret" style="display: inline-block;"></i>
				</span>
				<div class="control">
					<b-button  @click = "colorFontpicker"  style="width:30px; height:30px":style="fontColor"variant="free"></b-button>
					<input
					type
					name="color"
					title
					placeholder=""
					@keyup.enter="submitSourceOriginal"
					v-model= "fontColor.background"
					/>
					<chrome-color
					class="chrome"
					v-if="isFontPicker"
					:value="fontColor.backgroundColor"
					v-model="fontColor.backgroundColor"
					@input="updateFontValue"
					></chrome-color>
					<span class="warning-badge" style="display: none;"></span>
					<span class="addon increment-handle"></span>
				</div>
				</label>
				<label class="option-content">
				<span title>
					Font Size
					<i class="caret" style="display: inline-block;"></i>
				</span>
				<div class="control">
					<input
					type="text"
					name="fontSize"
					title
					placeholder="40px"
					@keyup.enter="submitSourceWithPX"
					v-model="componentSorce.fontSize"
					/>
					<span class="warning-badge" style="display: none;"></span>
					<span class="addon increment-handle">
					<i></i>
					</span>
				</div>
				</label>
			</div>
		</b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block href="#" v-b-toggle.accordion-4 variant="info">Filters</b-button>
        </b-card-header>

		 <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
			<div style="float:left">
			Opacity
			<range-slider
				class="slider"
				min="0"
				max="1"
				step="0.01"
				name="Opacity"
				submitSorce.style="Opacity"
				@input = "submitOpacity"
				v-model="opacityValue">
			</range-slider>
			<input
				style="width:50px"
				v-model="opacityValue"
				placeholder="0"
				name="Opacity"
				@keyup.enter="submitOpacity"
			></input>
			</div>

			<div style="float:left">
			Blur
			<range-slider
				class="slider"
				min="0"
				max="100"
				step="1"
				name="Blur"
				submitSorce.style="Blur"
				@input = "submitBlur"
				v-model="blurValue">
			</range-slider>
			<input
				style="width:50px"
				placeholder="0px"
				name="Blur"
				@keyup.enter="submitBlur"
				v-model="blurValue"
			></input>
			</div>

			<div style="float:left">
			Brightness
			<range-slider
				class="slider"
				min="0"
				max="100"
				step="1"
				name="Brightness"
				submitSorce.style="Brightness"
				@input = "submitBrightness"
				v-model="brightnessValue">
			</range-slider>
			<input
				style="width:50px"
				placeholder="0%"
				name="Brightness"
				@keyup.enter="submitBrightness"
				v-model="brightnessValue"
			></input>
			</div>
			<div style="float:left">
			Contrast
			<range-slider
				class="slider"
				min="0"
				max="200"
				step="1"
				name="Contrast"
				submitSorce.style="Contrast"
				@input = "submitContrast"
				v-model="contrastValue">
			</range-slider>
			<input
				style="width:50px"
				placeholder="0%"
				name="Contrast"
				@keyup.enter="submitContrast"
				v-model="contrastValue"
			></input>
			</div>
			<div style="float:left">
			Grayscale
			<range-slider
				class="slider"
				min="0"
				max="100"
				step="1"
				name="Grayscale"
				submitSorce.style="Grayscale"
				@input = "submitGrayscale"
				v-model="grayscaleValue">
			</range-slider>
			<input
				style="width:50px"
				placeholder="0%"
				name="Grayscale"
				@keyup.enter="submitGrayscale"
				v-model="grayscaleValue"
			></input>
			</div>
			<div style="float:left">
			Hue
			<range-slider
				class="slider"
				min="0"
				max="360"
				step="3"
				name="Hue"
				submitSorce.style="Hue"
				@input = "submitHue"
				v-model="hueValue">
			</range-slider>
			<input
				style="width:50px"
				placeholder="0deg"
				name="Hue"
				@keyup.enter="submitHue"
				v-model="hueValue"
			></input>
			</div>
			<div style="float:left">
			Invert
			<range-slider
				class="slider"
				min="0"
				max="100"
				step="1"
				name="Invert"
				submitSorce.style="Invert"
				@input = "submitInvert"
				v-model="invertValue">
			</range-slider>
			<input
				style="width:50px"
				placeholder="100%"
				name="Invert"
				@keyup.enter="submitInvert"
				v-model="invertValue"
			></input>
			</div>
			<div style="float:left">
			Saturate
			<range-slider
				class="slider"
				min="0"
				max="200"
				step="1"
				name="Saturate"
				submitSorce.style="Saturate"
				@input = "submitSaturate"
				v-model="saturateValue">
			</range-slider>
			<input
				style="width:50px"
				placeholder="0%"
				name="Saturate"
				@keyup.enter="submitSaturate"
				v-model="saturateValue"
			></input>
			</div>
			<div style="float:left">
			Sepia
			<range-slider
				class="slider"
				min="0"
				max="100"
				step="1"
				name="Sepia"
				submitSorce.style="Sepia"
				@input = "submitSepia"
				v-model="sepiaValue">
			</range-slider>
			<input
				style="width:50px"
				placeholder="0%"
				name="Sepia"
				@keyup.enter="submitSepia"
				v-model="sepiaValue"
			></input>
			</div>

        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import RangeSlider from 'vue-range-slider'
import { Chrome } from 'vue-color'
import { mapGetters, mapMutations } from 'vuex'
// you probably need to import built-in style
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
  name: 'App',
  props: ['payload'],
  data () {
    return {
      opacityValue: '',
      blurValue: '',
      brightnessValue: '',
      contrastValue: '',
      grayscaleValue: '',
      hueValue: '',
      invertValue: '',
      saturateValue: '',
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
        value: ''
      },
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

      mgTop: 0,
      mgBottom: 0,
      mgLeft: 0,
      mgRight: 0,
      pdTop: 0,
      pdBottom: 0,
      pdLeft: 0,
      pdRight: 0,
      compo: null,
      borderstyle: null
    }
  },
  components: {
    RangeSlider,
    ChromeColor: VueColor.Chrome
  },
  created () {
    // console.log(this.payload)
  },
  mounted () {},
  methods: {
    getData (payload, homeLayoutLocation) {
      if (!this.isData) {
        this.isData = true
      }
      this.componentSorce.x = Math.floor(payload.x - homeLayoutLocation.x)
      this.componentSorce.y = Math.floor(payload.y - homeLayoutLocation.y)

      this.componentSorce.width = Math.floor(
        payload.target.getBoundingClientRect().width
      )
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
      console.log(this.opacity)
    },
    colorBackgroundpicker () {
      this.isBackgroundPicker = true
    },
    colorFontpicker () {
      this.isFontPicker = true
    },
    updateBackgroundValue (colorData) {
      this.backgroundColor.background = colorData.hex
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'background'
      this.submitSorce.value = colorData.hex
      this.$emit('userSelected', this.submitSorce)
    },
    updateFontValue (colorData) {
      this.fontColor.background = colorData.hex
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'color'
      this.submitSorce.value = colorData.hex
      this.$emit('userSelected', this.submitSorce)
    },
    submitSourceWithPX (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = e.target.name
      this.submitSorce.value = e.target.value + 'px'
      this.$emit('userSelected', this.submitSorce)
    },
    submitSourceOriginal (e) {
      // console.log(e.target)
      if (e.target.name == 'backgroundColor') {
        this.isBackgroundPicker = false
      }
      if (e.target.name == 'color') {
        this.isFontPicker = false
      }
      this.submitSorce.payload = this.payload
      if (typeof e.target !== 'undefined') {
        this.submitSorce.style = e.target.name
        this.submitSorce.value = e.target.value
      } else {
        // onsole.log(this.submitSorce)
        this.submitSorce.value = e
      }
      this.$emit('userSelected', this.submitSorce)
    },
    submitOpacity (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'opacity'
      this.submitSorce.value = e
      this.$emit('userSelected', this.submitSorce)
    },
    submitBlur (e) {
      console.log('dsadsa')
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      this.submitSorce.value = 'blur(' + e + 'px)'
      this.$emit('userSelected', this.submitSorce)
    },
    submitBrightness (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      this.submitSorce.value = 'brightness(' + e + '%)'
      this.$emit('userSelected', this.submitSorce)
    },
    submitContrast (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      this.submitSorce.value = 'contrast(' + e + '%)'
      this.$emit('userSelected', this.submitSorce)
    },
    submitGrayscale (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      this.submitSorce.value = 'grayscale(' + e + '%)'
      this.$emit('userSelected', this.submitSorce)
    },
    submitHue (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      this.submitSorce.value = 'hue(' + e + 'deg)'
      this.$emit('userSelected', this.submitSorce)
    },
    submitInvert (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      this.submitSorce.value = 'invert(' + e + '%)'
      this.$emit('userSelected', this.submitSorce)
    },
    submitSaturate (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      this.submitSorce.value = 'saturate(' + e + '%)'
      this.$emit('userSelected', this.submitSorce)
    },
    submitSepia (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      this.submitSorce.value = 'sepia(' + e + '%)'
      this.$emit('userSelected', this.submitSorce)
    }
  }
}
</script>

<style>
.blue {
  padding: 5px;
  background-color: #283844;
  color: #64bfff;
  line-height: 1;
}
.info-option .box-row {
  display: flex;
  flex-direction: column;
}
.info-option {
  font-size: 12px;
  line-height: 1.5;
  text-transform: uppercase;
  text-align: center;
  border-bottom: 1px solid #242729;
  box-shadow: 0 1px 0 #3b4144;
  padding-bottom: 8px;
  margin: 0 10px 10px;
}
.info-option .green {
  padding: 5px;
  background-color: #2d3f3a;
  color: #57d88b;
  line-height: 1;
}

.info-option .middle {
  display: flex;
  flex-direction: row;
}
.info-option .box-col {
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.info-option .empty {
  flex-grow: 1;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.21) inset;
  user-select: none;
}
</style>
