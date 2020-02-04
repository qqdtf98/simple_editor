<template>
  <div>
    <div class="studio-text-box"> 
        <span class="studio-text">Layout</span>
        <img @click="closeLayout" src="../assets/images/close.svg" class="close-btn">
	</div>
	<br>
	<!-- Nav tabs -->
	<!-- <img @click="closeOverview" class="close-btn" src="../assets/images/close.svg" /> -->
	<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" @click="chageTab">
		<li class="nav-item">
			<a class="nav-link " v-bind:class="{ active:tabStep===1 }" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="false">Look & Feel</a>
		</li>
		<li class="nav-item">
			<a class="nav-link " v-bind:class="{ active:tabStep===2 }" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Options</a>
		</li>
		<li class="nav-item">
			<a class="nav-link" v-bind:class="{ active:tabStep===3 }" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Animation</a>
		</li>
	</ul>

	<div class="tab-pane" v-bind:class="{ active:tabStep===1 }" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
		<div class="addButtonTree">
		</div>
		
		<div id="accordion" role="tablist">
			<div class="card">
				<div class="card-header" role="tab" id="headingOne">
					<h5 class="mb-0">
						<a class="title" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
							layout
						</a>
					</h5>
				</div>
				<div id="collapseOne" class="collapse" v-bind:class="{ show:layoutTab===1 }" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
					<div class="card-body">
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
								<span class="margin-top" title="Margin Top">0</span>
							</div>
						</div>

						<div class="dimensions">
							<span class="size x"><i>X</i><b>177</b></span>
							<span class="size y"><i>Y</i><b>68</b></span>
							<span class="size width"><i>W</i><b>0</b></span>
							<span class="size height"><i>H</i><b>0</b></span>
						</div>

						<div class="row">
							<a>
								Width
							</a>
							<input
								type
								name="width"
								value
								title
								placeholder="31.4375px"
								@keyup.enter="submitSourceWithPX"
								v-model="componentSorce.width"
							/>
							<span class="addon increment-handle"><i class="fa fa-chevron-up"></i></span>
							<span class="addon increment-handle"><i class="fa fa-chevron-down"></i></span>

						</div>
						
					</div>
				</div>
			</div>

			<div class="card">
				<div class="card-header" role="tab" id="headingOne">
					<h5 class="mb-0">
						<a class="title" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
							background
						</a>
					</h5>
				</div>
				<div id="collapseOne" class="collapse" v-bind:class="{ show:layoutTab===0 }" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
					<div class="card-body">
						...............................................................................#1
					</div>
				</div>
			</div>

			<div class="card">
				<div class="card-header" role="tab" id="headingOne">
					<h5 class="mb-0">
						<a class="title" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
							font
						</a>
					</h5>
				</div>
				<div id="collapseOne" class="collapse" v-bind:class="{ show:layoutTab===0 }" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
					<div class="card-body">
						...............................................................................#1
					</div>
				</div>
			</div>

			<div class="card">
				<div class="card-header" role="tab" id="headingOne">
					<h5 class="mb-0">
						<a class="title" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
							filter
						</a>
					</h5>
				</div>
				<div id="collapseOne" class="collapse" v-bind:class="{ show:layoutTab===0 }" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
					<div class="card-body">
						...............................................................................#1
					</div>
				</div>
			</div>
		</div>
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
  props: ['payload','loadData'],
  data () {
    return {
	  options: {
        //Monaco Editor Options
      },
	  layoutTab:1,

	  imageSizeSelected: 'none',
      imageSize: [
        { value: 'none', text: 'None' },
        { value: 'auto', text: 'Auto' },
        { value: 'length', text: 'Length' },
        { value: 'cover', text: 'Cover' },
		{ value: 'contain', text: 'Contain'},
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
		change:'',
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
	  onSepia: false,

	  parentDom: [],
	  selectedFile: null,
	  domWithTree: [],
	  backgroundImage: '',
	//   kindOfLoadDate:0,
	  test:'as',
	  // on : true,
      //   widthFontActive:{
      // 	color:'blue',
      // 	fontWeight:'bold',

      //   },
    }
  },
  components: {
    RangeSlider,
    ChromeColor: VueColor.Chrome,
	
  },

  created () {
	//   console.log("s")
	//   console.log(this.loadData)
	//   console.log("s")
  },
  computed:{
	  testMessage: function (){
		  this.test = document.getElementById("newLoaderHtml").innerHTML
		  return this.test
	  }
  },
  methods: {
    chageTab (e) {
      if (e.toElement.text == 'Look & Feel') {
        this.tabStep = 1
      } else if (e.toElement.text == 'Options') {
        this.tabStep = 2
      } else if (e.toElement.text == 'Animation') {
        this.tabStep = 3
      }
    },
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
      this.onSepia = false,
	  this.selected = 'none'

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
      //   console.log(padding)
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
	  this.submitSorce.change = 1,
      this.$emit('userSelected', this.submitSorce)
    },
    updateFontValue (colorData) {
    	this.fontColor.background = colorData.hex
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'color'
      this.submitSorce.value = colorData.hex
      this.onColor = true,
	  this.submitSorce.change = 1,
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
	  this.submitSorce.change = 1,
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
	  this.submitSorce.change = 1,
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
	  this.submitSorce.change = 1,
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
	  this.submitSorce.change = 1,
      this.$emit('userSelected', this.submitSorce)
    },
    submitBrightness (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      if (typeof (e.target) === 'undefined') { this.submitSorce.value = 'brightness(' + e + '%)' } else { this.submitSorce.value = 'brightness(' + e.target.value.replace(/%/gi, '') + '%)' }
      this.onBrightness = true
	  this.submitSorce.change = 1,
      this.$emit('userSelected', this.submitSorce)
    },
    submitContrast (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      if (typeof (e.target) === 'undefined') { this.submitSorce.value = 'contrast(' + e + '%)' } else { this.submitSorce.value = 'contrast(' + e.target.value.replace(/%/gi, '') + '%)' }
      this.onContrast = true
	  this.submitSorce.change = 1,
      this.$emit('userSelected', this.submitSorce)
    },
    submitGrayscale (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      if (typeof (e.target) === 'undefined') { this.submitSorce.value = 'grayscale(' + e + '%)' } else { this.submitSorce.value = 'grayscale(' + e.target.value.replace(/%/gi, '') + '%)' }
      this.onGrayscale = true
	  this.submitSorce.change = 1,
      this.$emit('userSelected', this.submitSorce)
    },
    submitHue (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      if (typeof (e.target) === 'undefined') { this.submitSorce.value = 'hue(' + e + 'deg)' } else { this.submitSorce.value = 'hue(' + e.target.value.replace(/deg/gi, '') + 'deg)' }
      this.onHue = true
	  this.submitSorce.change = 1,
      this.$emit('userSelected', this.submitSorce)
    },
    submitInvert (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      if (typeof (e.target) === 'undefined') { this.submitSorce.value = 'invert(' + e + '%)' } else { this.submitSorce.value = 'invert(' + e.target.value.replace(/%/gi, '') + '%)' }
      this.onInvert = true
	  this.submitSorce.change = 1,
      this.$emit('userSelected', this.submitSorce)
    },
    submitSaturate (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      if (typeof (e.target) === 'undefined') { this.submitSorce.value = 'saturate(' + e + '%)' } else { this.submitSorce.value = 'saturate(' + e.target.value.replace(/%/gi, '') + '%)' }
      this.onSaturate = true
	  this.submitSorce.change = 1,
      this.$emit('userSelected', this.submitSorce)
    },
    submitSepia (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'filter'
      if (typeof (e.target) === 'undefined') { this.submitSorce.value = 'sepia(' + e + '%)' } else { this.submitSorce.value = 'sepia(' + e.target.value.replace(/%/gi, '') + '%)' }
      this.onSepia = true
	  this.submitSorce.change = 1,
      this.$emit('userSelected', this.submitSorce)
    },
    submitChangeAlign (e) {
	if(e.target.getAttribute('name')==null){
		if ((e.target.parentElement.getAttribute('name')) === 'left') {
			this.submitSorce.value = 'left'
		} else if ((e.target.parentElement.getAttribute('name')) === 'right') {
			this.submitSorce.value = 'right'
		} else if ((e.target.parentElement.getAttribute('name')) === 'no') {
			this.submitSorce.value = 'left'
		} else if ((e.target.parentElement.getAttribute('name')) === 'center') {
			this.submitSorce.value = 'center'
		}
	}
	else{
		this.submitSorce.value = e.target.getAttribute('name')
	}
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'text-align'
	  this.submitSorce.change = 1,
      this.$emit('userSelected', this.submitSorce)
    },
    submitChangeTextTransform (e) {
      // console.log(e)
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'text-transform'
      this.submitSorce.value = e
	  this.submitSorce.change = 1,
      this.$emit('userSelected', this.submitSorce)
    },
    submitChangeTextFontFamily (e) {
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'font-family'
      this.submitSorce.value = e
	  this.submitSorce.change = 1,
      this.$emit('userSelected', this.submitSorce)
    },
    submitChangeTextFontStyle (e) {
      // console.log(e)
      if (e == 'underline') {
        // console.log("s")
        this.submitSorce.payload = this.payload
        this.submitSorce.style = 'text-decoration'
        this.submitSorce.value = e
	    this.submitSorce.change = 1,
        this.$emit('userSelected', this.submitSorce)
      } else {
        this.submitSorce.payload = this.payload
        this.submitSorce.style = 'font-style'
        this.submitSorce.value = e
    	this.submitSorce.change = 1,
        this.$emit('userSelected', this.submitSorce)
      }
    },
    submitChangeTextFontWeight (e) {
      if (e.isTrusted) {
        this.submitSorce.payload = this.payload
        this.submitSorce.style = 'font-weight'
        this.submitSorce.value = e.target.value
		this.submitSorce.change = 1,
        this.$emit('userSelected', this.submitSorce)
      } else {
        this.submitSorce.payload = this.payload
        this.submitSorce.style = 'font-weight'
        this.submitSorce.value = e
    	this.submitSorce.change = 1,
		this.$emit('userSelected', this.submitSorce)
      }
    },
    submitChangeBorder (e) {
      // console.log("dasd")
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'border'
      this.submitSorce.value = 'solid'
      // console.log(this.submitSorce)
      this.submitSorce.change = 1,
	  this.$emit('userSelectBorder', this.submitSorce)
    },
	submitChangeBorderWidth(e){
	  this.submitSorce.payload = this.payload
      this.submitSorce.style = 'border'
      this.submitSorce.value = e
      // console.log(this.submitSorce)
	  this.submitSorce.change = 1,
	  this.$emit('userSelectBorder', this.submitSorce)
	},
	submitChangeBorderStyle(e){
	  this.submitSorce.payload = this.payload
      this.submitSorce.style = 'border'
      this.submitSorce.value = e
	  this.submitSorce.change = 1,
      // console.log(this.submitSorce)
      this.$emit('userSelectBorder', this.submitSorce)
	},
	submitChangeFloat(e){
		if(e.target.getAttribute('name')==null){
			if ((e.target.parentElement.getAttribute('name')) === 'left') {
				this.submitSorce.value = 'left'
			} else if ((e.target.parentElement.getAttribute('name')) === 'right') {
				this.submitSorce.value = 'right'
			} else if ((e.target.parentElement.getAttribute('name')) === 'no') {
				this.submitSorce.value = 'left'
			} else if ((e.target.parentElement.getAttribute('name')) === 'center') {
				this.submitSorce.value = 'center'
			}
			}
		else{
			this.submitSorce.value = e.target.getAttribute('name')
		}

	  this.submitSorce.payload = this.payload
      this.submitSorce.style = 'float'
      // console.log(this.submitSorce)
	  this.submitSorce.change = 1,
      this.$emit('userSelected', this.submitSorce)
	},
    makeTreeParent (payload) {
      var obj = document.getElementById('inParentTreeOption')
      $(obj).empty()

      var newDIV = document.createElement('button')
      newDIV.innerHTML = 'HTML'
      obj.appendChild(newDIV)

      var newDIV = document.createElement('button')
      newDIV.innerHTML = 'Body'
      obj.appendChild(newDIV)

		var a=0;
		var print=[]
		for(var i=0;i<this.parentDom.length;i++){
			if(payload==this.domWithTree[i]){
				a=i
				break
			}
		}
		
		// console.log(a)
		print.push(a)

		// console.log(this.parentDom)

		while(true){
			if(this.parentDom[a]!='-1'){
	
              	a = this.parentDom[a]
				
				print.push(a)
            }
            else{
              	break;
            }
		}
		for(var i=print.length-1;i>=0;i--){
			var obj = document.getElementById('inParentTreeOption')
			var newDIV = document.createElement('button')
			newDIV.setAttribute('id', print[i])
			newDIV.innerHTML = document.querySelector(`label[for="${print[i]}"]`).innerHTML
			obj.appendChild(newDIV)
		}
	},
	
	
	onFileSelected(e){
		var file = e.target;
		var fileList = file.files ;

		// 읽기
		var reader = new FileReader();
		reader.readAsDataURL(fileList [0]);
		// console.log(reader)
		var submit = this.submitSorce
		var data = this.payload
		//로드 한 후
		var vm =this;
		reader.onload = function() {
			submit.payload =data
			submit.style = 'background-image'
			submit.value = 'url(' + reader.result+ ')';
			submit.change = 1,
			vm.$emit('userSelected', submit)
		};
	},
	submitChangeImageSize(e){
		console.log(e)
		this.submitSorce.payload = this.payload
		this.submitSorce.style = 'background-size'
		this.submitSorce.value = e
		// console.log(this.submitSorce)
		this.submitSorce.change = 1,
		this.$emit('userSelected', this.submitSorce)
	},
	onUpload(){
		/// 서버에 저장
	},
	domTrackingWithTree(e){
		// console.log(this.domWithTree[e.target.id])
		if(e.target.innerText!=='HTML'&&e.target.innerText!=='Body')
			this.$emit('selectDomElemented', this.domWithTree[e.target.id])
	},
	inputFile(e){
		console.log(e)
		var file = document.querySelector('#getfile');
		file.onchange = function () { 
			var fileList = file.files ;
			
			// 읽기
			var reader = new FileReader();
			reader.readAsText(fileList [0]);

			//로드 한 후
			reader.onload = function  () {
				document.querySelector('#preview').textContent = reader.result ;
			}; 
		}; 
	},
	loadDataSetting(data){
		// console.log("dsda")
		// console.log(data[0])
	},
	changeProperty(e){
		// console.log(this.loadData[0])
		// console.log(document.getElementById("newLoaderHtml"))
		if(e.target.getAttribute('name')=='html'){
			this.kindOfLoadDate=1
			
		}
		else if(e.target.getAttribute('name')=='css'){
			this.kindOfLoadDate=2
		}
		else if(e.target.getAttribute('name')=='js'){
			this.kindOfLoadDate=3
		}
		this.chageContent()
		
	},
	chageContent(){
		if(this.kindOfLoadDate==1){
			// document.querySelector('#preview').textContent = this.loadData[0]
			 this.test = document.getElementById("newLoaderHtml").innerHTML
		}
		else if(this.kindOfLoadDate==2){
			document.querySelector('#preview2').textContent = this.loadData[1]
		}
		else if(this.kindOfLoadDate==3){
			document.querySelector('#preview3').textContent = this.loadData[2]
		}
	},
	closeLayout(){
		$(document.getElementById("codeBtnLayout")).trigger('click')
	},
	test(e){
		console.log(e)
		console.log("adsaD")
	}

  }
}
</script>

<style lang="scss">
// @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
input{
	background-color: #A4A4A4;
	border-style: solid;
	border-width: 0.5px;
	border-color: #A4A4A4;
	width:50%
}
.close-btn{
      width: 1.1rem;
	  /* position: fixed; */
	  right: 4%;
	  cursor:pointer;
    }

.dsadsadsad{
	color: white !important;
}
.nav {
	font-weight:bold;
	font-size:14px;
}
.nav-tabs {
    border-bottom:1px solid #242729;
}
.nav-link{
	color:#868e96;
}
.nav-link.active{
	background: linear-gradient(#3b4144, #32373a);
	border-style:none;
}
.nav-tabs .nav-link.active {
    color: #fff;
}

.card {
  margin-bottom: 10px;
  color:black;
  width: 100%;
  background: #35373a;
  border-bottom: 1px solid #242729;
  box-shadow: 0 1px 0 #34373a;
  padding-bottom: 8px;
    /* padding-top: 1px; */
 margin: 0 15px 10px 0px;
}
.card-header h5{
	text-align:left;
}
.card-header .title {
	color:white;
	font-weight:bold;
	font-size:15px
}
[data-toggle="collapse"]:after {
display: inline-block;
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  content: "\f054";
  transform: rotate(90deg) ;
  transition: all linear 0.25s;
  float: right;
  }   
[data-toggle="collapse"].collapsed:after {
  transform: rotate(0deg) ;
}
.card-body{
	width:100%;
}
.margin{
	width:100%;
}
.blue{
	padding:2px;
	background-color: #2e3743 !important;
	color: #64BFFF;
	line-height: 1;
	/*
	border-style: solid;
	border-width: 0.5px;
	border-color: #64BFFF;
	*/
}
.green{
	padding:2px;
	background-color: #333f3a !important;
	color: #86cf89;
	line-height: 1;
	/* 
	border-style: solid;
	border-width: 0.5px;
	border-color: #86cf89;
	*/
}

.middle {
	width:100%;
    display: flex;
    flex-direction: row;

}
.empty{
	flex-grow: 1;
	width:100%;
    box-shadow: 0 0 3px rgba(0,0,0,0.21) inset;
}
.box-col {
	width:100%;
    justify-content: center; 
    display: flex; 
    flex-direction: column;
}
.box-row{
	.blue{
		width:14%
	}
	.box-col{
		.middle{
			.green{
				width:14%
			}
		}
	}

}


/*
.nav {
	font-weight:bold;
	font-size:15px;
	
}
.nav-link{
	color:#dee2e6;
}
.active{
	background: linear-gradient(#3b4144, #32373a);
	color:#fff;
}
*/    
</style>
