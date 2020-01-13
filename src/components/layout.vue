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
						<span class="margin-top" title="Margin Top">{{margin[0].value}}</span>
					</div>
					<div class="box-row middle">
						<div class="box-col blue">
							<span class="margin-left" title="Margin Left">{{margin[3].value}}</span>
						</div>
						<div class="box-col padding">
							<div class="box-row green">
								<span class="padding-top" title="Padding Top">{{padding[0]}}</span>
							</div>
							<div class="box-row middle">
								<div class="box-col green">
									<span class="padding-left" title="Padding Left">{{padding[3]}}</span>
								</div>
								<div class="box-col middle empty"></div>
								<div class="box-col green">
									<span class="padding-right" title="Padding Right">{{padding[1]}}</span>
								</div>
							</div>
							<div class="box-row green">
								<span class="padding-bottom" title="Padding Bottom">{{padding[2]}}</span>
							</div>
						</div>
						<div class="box-col blue">
							<span class="margin-right" title="Margin Right">{{margin[1].value}}</span>
						</div>
					</div>
					<div class="box-row blue">
						<span class="margin-bottom" title="Margin Bottom">{{margin[2].value}}</span>
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
				<span :class="{fontActive:onWidth}"title>
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
				<span :class="{fontActive:onHeight}"title>
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
				<span :class="{fontActive:onMargin}"title>
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
				<span :class="{fontActive:onPadding}"title>
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
				<span :class="{fontActive:onBackgroundColor}"title>
					BackgroundColor
					<i class="caret" style="display: inline-block;"></i>
				</span>
				<div class="control">
					<b-button  @click = "colorBackgroundpicker" @keyup.enter="submitSourceOriginal" style="width:30px; height:30px" :style="backgroundColor"variant="free"></b-button>
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
				<span :class="{fontActive:onColor}" title>
					Color
					<i class="caret" style="display: inline-block;"></i>
				</span>
				<div class="control">
					<b-button  @click = "colorFontpicker" @keyup.enter="submitSourceOriginal" style="width:30px; height:30px":style="fontColor"variant="free"></b-button>
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
				<span :class="{fontActive:onFontSize}" title>
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
			<div :class="{fontActive:onOpacity}" style="float:left">
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

			<div :class="{fontActive:onBlur}" style="float:left">
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

			<div :class="{fontActive:onBrightness}" style="float:left">
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
			<div :class="{fontActive:onContrast}" style="float:left">
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
			<div :class="{fontActive:onGrayscale}" style="float:left">
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
			<div :class="{fontActive:onHue}" style="float:left">
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
			<div :class="{fontActive:onInvert}" style="float:left">
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
			<div :class="{fontActive:onSaturate}" style="float:left">
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
			<div :class="{fontActive:onSepia}" style="float:left">
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

	  padding: [0, 0, 0, 0],

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
	  onSepia: false

	  // on : true,
      //   widthFontActive:{
      // 	color:'blue',
      // 	fontWeight:'bold',

      //   },
    }
  },
  components: {
    RangeSlider,
    ChromeColor: VueColor.Chrome
  },
  created () {

	  // console.log(this.payload)
  },

  methods: {
    getData (payload, homeLayoutLocation) {
      this.onWidth = false
      this.onHeight = false
      this.onMargin = false
      this.onPadding = false
      this.onBackgroundColor = false,
      this.onColor = false,
      this.onFontSize = false,
      this.onOpacity = false,
      this.onBlur = false,
      this.onBrightness = false,
      this.onContrast = false,
      this.onGrayscale = false,
      this.onHue = false,
      this.onInvert = false,
      this.onSaturate = false,
      this.onSepia = false

      if (!this.isData) { this.isData = true }
      this.componentSorce.x = Math.floor(payload.x - homeLayoutLocation.x)
      this.componentSorce.y = Math.floor(payload.y - homeLayoutLocation.y),

      // console.log(getComputedStyle(payload.target))
      // console.log(getComputedStyle(payload.target).filter)
      // console.log(getComputedStyle(payload.target).brightness)
      // console.log(getComputedStyle(payload.target).contrast)
      // console.log(getComputedStyle(payload.target).grayscale)
      // console.log(getComputedStyle(payload.target).hue)
      // console.log(getComputedStyle(payload.target).invert)
      // console.log(getComputedStyle(payload.target).saturate)
      // console.log(getComputedStyle(payload.target).sepia )

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
      // console.log(this.opacity)

      var margin = getComputedStyle(payload.target).margin.replace(/px/gi, '').split(' ')
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
      var padding = getComputedStyle(payload.target).padding.replace(/px/gi, '').split(' ')
<<<<<<< HEAD
      //console.log(padding)
      //console.log(this.margin[0])
=======
      //   console.log(padding)
      //   console.log(this.margin[0])
>>>>>>> 804fae7641b06a9a76b07e5e66b21f016300da1f
      if (padding.length !== 1) {
        for (var i = 0; i < padding.length; i++) {
          this.padding[i] = padding[i]
        }
      } else {
        for (var i = 0; i < 4; i++) {
          this.padding[i] = padding[0]
        }
      }
      // console.log(margin)
      // console.log(this.margin[3])
    },
    colorBackgroundpicker () {
      // if(this.isBackgroundPicker==true)
      // 	this.isBackgroundPicker=false
      // else
      this.isBackgroundPicker = true

      // if(this.isBackgroundPicker==true)
      // 	this.isBackgroundPicker=false
      // else
      // 	this.isBackgroundPicker=true
      // console.log("sdas")
    },
    colorFontpicker () {
      this.isFontPicker = true
    },
    updateBackgroundValue (colorData) {
    	this.backgroundColor.background = colorData.hex
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'background'
      this.submitSorce.value = colorData.hex
      this.onBackgroundColor = true
      this.$emit('userSelected', this.submitSorce)
    },
    updateFontValue (colorData) {
    	this.fontColor.background = colorData.hex
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'color'
      this.submitSorce.value = colorData.hex
      this.onColor = true
      this.$emit('userSelected', this.submitSorce)
    },
    submitSourceWithPX (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = e.target.name

      // this.submitSorce.value=e.target.value+'px'
      // console.log(e.target.value)
      if (e.target.value !== 'auto') {
        var words = ((e.target.value).replace(/px/gi, '').split(' '))
        // console.log(words)
        for (var i = 0; i < words.length; i++) {
          // console.log(words[i])
          // words[i].replace('',' ');
          // console.log(words[i])
          if (i == 0) { this.submitSorce.value = words[i] + 'px ' } else { this.submitSorce.value += words[i] + 'px ' }
        }
      } else {
        this.submitSorce.value = 'auto'
        // console.log('갱')
      }
      if (e.target.name == 'width') { this.onWidth = true } else if (e.target.name == 'height') { this.onHeight = true } else if (e.target.name == 'margin') {
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
          for (var i = 0; i < 4; i++) {
            this.margin[i].value = margin[0]
          }
        }
      } else if (e.target.name == 'padding') {
        this.onPadding = true
        var padding = e.target.value.replace(/px/gi, '').split(' ')
        // console.log(margin)
        // console.log(this.margin[0])
        if (padding.length !== 1) {
          for (var i = 0; i < padding.length; i++) {
            this.padding[i] = padding[i]
          }
          for (var i = padding.length; i < 4; i++) {
            this.padding[i] = 0
          }
        } else {
          for (var i = 0; i < 4; i++) {
            this.padding[i] = padding[0]
          }
        }
      } else if (e.target.name == 'width') { this.onWidth = true } else if (e.target.name == 'fontSize') { this.onFontSize = true }

      this.$emit('userSelected', this.submitSorce)
    },
    submitSourceOriginal (e) {
      // console.log(e.target)
      // console.log("sd")
      // console.log(e.target.name)
      this.isBackgroundPicker = false
      this.isFontPicker = false
      if (e.target.name == 'backgroundColor') { this.backgroundColor.backgroundColor = e.target.value } else if (e.target.name == 'color') { this.fontColor.backgroundColor = e.target.value }
      this.submitSorce.payload = this.payload
      if (typeof (e.target) !== 'undefined') {
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
      if (typeof (e.target) !== 'undefined') {
        this.submitSorce.value = e.target.value
        // this.submitSorce.value=e
      } else { this.submitSorce.value = e }
      this.onOpacity = true
      this.$emit('userSelected', this.submitSorce)
    },
    submitBlur (e) {
      // console.log("dsadsa")
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      if (typeof (e.target) === 'undefined') { this.submitSorce.value = 'blur(' + e + 'px)' } else {
        this.submitSorce.value = 'blur(' + e.target.value.replace(/px/gi, '') + 'px)'
      }
      this.onBlur = true
      this.$emit('userSelected', this.submitSorce)
    },
    submitBrightness (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      if (typeof (e.target) === 'undefined') { this.submitSorce.value = 'brightness(' + e + '%)' } else { this.submitSorce.value = 'brightness(' + e.target.value.replace(/%/gi, '') + '%)' }
      this.onBrightness = true
      this.$emit('userSelected', this.submitSorce)
    },
    submitContrast (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      if (typeof (e.target) === 'undefined') { this.submitSorce.value = 'contrast(' + e + '%)' } else { this.submitSorce.value = 'contrast(' + e.target.value.replace(/%/gi, '') + '%)' }
      this.onContrast = true
      this.$emit('userSelected', this.submitSorce)
    },
    submitGrayscale (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      if (typeof (e.target) === 'undefined') { this.submitSorce.value = 'grayscale(' + e + '%)' } else { this.submitSorce.value = 'grayscale(' + e.target.value.replace(/%/gi, '') + '%)' }
      this.onGrayscale = true
      this.$emit('userSelected', this.submitSorce)
    },
    submitHue (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      if (typeof (e.target) === 'undefined') { this.submitSorce.value = 'hue(' + e + 'deg)' } else { this.submitSorce.value = 'hue(' + e.target.value.replace(/deg/gi, '') + 'deg)' }
      this.onHue = true
      this.$emit('userSelected', this.submitSorce)
    },
    submitInvert (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      if (typeof (e.target) === 'undefined') { this.submitSorce.value = 'invert(' + e + '%)' } else { this.submitSorce.value = 'invert(' + e.target.value.replace(/%/gi, '') + '%)' }
      this.onInvert = true
      this.$emit('userSelected', this.submitSorce)
    },
    submitSaturate (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      if (typeof (e.target) === 'undefined') { this.submitSorce.value = 'saturate(' + e + '%)' } else { this.submitSorce.value = 'saturate(' + e.target.value.replace(/%/gi, '') + '%)' }
      this.onSaturate = true
      this.$emit('userSelected', this.submitSorce)
    },
    submitSepia (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      if (typeof (e.target) === 'undefined') { this.submitSorce.value = 'sepia(' + e + '%)' } else { this.submitSorce.value = 'sepia(' + e.target.value.replace(/%/gi, '') + '%)' }
      this.onSepia = true
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
  width: 80%;
}
.info-option .empty {
    flex-grow: 1;
	flex-direction: column;
    box-shadow: 0 0 3px rgba(0,0,0,0.21) inset;
	user-select: none;
	justify-content: center;
    flex-direction: column;
	width: 70%;
    margin-right: 240px;
}

.info-option .padding {
    width:87%
}
.fontActive {
	color:blue;
	font-Weight:bold;
 }
</style>
