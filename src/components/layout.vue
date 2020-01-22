<template>

  <div>
	<!-- Nav tabs -->
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
	<div class="tab-content" id="pills-tabContent">
		<div class="no-text" v-if="!isData">No components selected</div>
  <div v-if="isData"  class="tab-pane " v-bind:class="{ active:tabStep===1 }" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

	<!-- Look % Feel-->
	<div>
		<div role="tablist">
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
				<div>
				 image
					<input style="display:none"type="file" @change="onFileSelected" id="getfile"ref="fileInput">
					<button @click="$refs.fileInput.click()">Pick File</button>
					<button @click="onUpload">Save</button>
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
				<div class="row">
					<div class="col md-4" :class="{fontActive:onOpacity}" style="float:left">
					Opacity
					</div>
					<div class="col md-4">
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
					</div>
					<div class="col md-4">
						<input
							style="width:50px"
							v-model="opacityValue"
							placeholder="0"
							name="Opacity"
							@keyup.enter="submitOpacity"
						></input>
					</div>
				</div>

				<div class="row">
					<div class="col md-4"  :class="{fontActive:onBlur}" style="float:left">
						Blur
					</div>
					<div class="col md-4">
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
					</div>
					<div class="col md-4">
						<input
							style="width:50px"
							placeholder="0px"
							name="Blur"
							@keyup.enter="submitBlur"
							v-model="blurValue"
						></input>
					</div>
				</div>
				<div class="row">
					<div class="col md-4":class="{fontActive:onBrightness}" style="float:left">
						Brightness
					</div>
					<div class="col md-4">
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
					</div>
					<div class="col md-4">
						<input
							style="width:50px"
							placeholder="0%"
							name="Brightness"
							@keyup.enter="submitBrightness"
							v-model="brightnessValue"
						></input>
					</div>
				</div>

				<div class="row">

					<div class="col md-4" :class="{fontActive:onContrast}" style="float:left">
						Contrast
					</div>
					<div class="col md-4">
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
					</div>
					<div class="col md-4">
						<input
							style="width:50px"
							placeholder="0%"
							name="Contrast"
							@keyup.enter="submitContrast"
							v-model="contrastValue"
						></input>
					</div>
				</div>
				<div class="row">
					<div class="col md-4":class="{fontActive:onGrayscale}" style="float:left">
						Grayscale
					</div>
					<div class="col md-4">
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
					</div>
					<div class="col md-4">
						<input
							style="width:50px"
							placeholder="0%"
							name="Grayscale"
							@keyup.enter="submitGrayscale"
							v-model="grayscaleValue"
						></input>
					</div>
				</div>
				<div class="row">
					<div class="col md-4":class="{fontActive:onHue}" style="float:left">
						Hue
					</div>
					<div class="col md-4">
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
					</div>
					<div class="col md-4">
						<input
							style="width:50px"
							placeholder="0deg"
							name="Hue"
							@keyup.enter="submitHue"
							v-model="hueValue"
						></input>
					</div>
				</div>
				<div class="row">
					<div class="col md-4":class="{fontActive:onInvert}" style="float:left">
						Invert
					</div>
					<div class="col md-4">
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
					</div>
					<div class="col md-4">
						<input
							style="width:50px"
							placeholder="100%"
							name="Invert"
							@keyup.enter="submitInvert"
							v-model="invertValue"
						></input>
					</div>
				</div>
				<div class="row">
					<div class="col md-4":class="{fontActive:onSaturate}" style="float:left">
						Saturate
					</div>
					<div class="col md-4">
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
					</div>
					<div class="col md-4">
						<input
						style="width:50px"
						placeholder="0%"
						name="Saturate"
						@keyup.enter="submitSaturate"
						v-model="saturateValue"
						></input>
					</div>
				</div>
				<div class="row">
					<div class="col md-4" :class="{fontActive:onSepia}" style="float:left">
						Sepia
					</div>
				<div class="col md-4">
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
				</div>
				<div class="col md-4">
				<input
					style="width:50px"
					placeholder="0%"
					name="Sepia"
					@keyup.enter="submitSepia"
					v-model="sepiaValue"
				></input>
				</div>
				</div>

			</b-collapse>
		</b-card>
		</div>
	</div>
</div>

  <!-- Options v-if="isData" -->
  <div v-if="isData" class="tab-pane "  v-bind:class="{ active:tabStep===2}"id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
	<div  role="tablist">
	<div>
		<div  role="tablist">
		<b-card no-body class="mb-1" >
			<b-card-header header-tag="header" class="p-1" role="tab">
			<div class="parentTreeOption" id="inParentTreeOption" @click="domTrackingWithTree">
				<button>HTML</button><button>Body</button>

			</div>
			<b-button block href="#" v-b-toggle.accordion-1 variant="info">Text Option</b-button>
			</b-card-header>
			<b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
				<div class="row">
					<span class="col-md-4" style>Alignment</span>
					<div class="col-md-7">
					<button  @click="submitChangeAlign" name="right" type="button" class=" col-md-0.8 aling-button" aria-label="Left Align">
						<i class="fas fa-align-right"></i>
					</button>
					<button @click="submitChangeAlign" name="center" type="button" class=" col-md-0.8 aling-button" aria-label="Left Align">
						<i class="fas fa-align-center"></i>
					</button>
					<button @click="submitChangeAlign" name="left"type="button" class="col-md-0.8 aling-button" aria-label="Left Align">
						<i class="fas fa-align-left"></i>
					</button>
					<button @click="submitChangeAlign" name="left" type="button" class="col-md-0.8 aling-button" aria-label="Left Align">
						<i class="fas fa-align-justify"></i>
					</button>
					<button @click="submitChangeAlign" name="no"  type="button" class="col-md-0.8 aling-button" aria-label="Left Align">
						<i class="fas fa-times"></i>
					</button>
					</div>
				</div>
				<div class="row">
					<span class="col-md-5">Transformantion</span>
					<div class="col-md-7">
					<b-form-select class=" btn btn-info btn-sm dropdown-toggle" v-model="transformantionSelected" :options="transformantion" @change="submitChangeTextTransform"></b-form-select>
					</div>
				</div>

				<div class="row">
					<span class="col-md-5">Font-family</span>
					<div class="col-md-7">
					<b-form-select class=" btn btn-info btn-sm dropdown-toggle" v-model="fontFamilySelected" :options="fontFamily" @change="submitChangeTextFontFamily"></b-form-select>
					</div>
				</div>

				<div class="row">
					<span class="col-md-5">Font-style</span>
					<div class="col-md-7">
					<b-form-select class=" btn btn-info btn-sm dropdown-toggle" v-model="fontStyleSelected" :options="fontStyle" @change="submitChangeTextFontStyle"></b-form-select>
					</div>
				</div>

				<div class="row">
					<span class="col-md-5">Font-weight</span>
					<div class="col-md-7">
					<b-form-select class=" btn btn-info btn-sm dropdown-toggle" v-model="fontWeightSelected" :options="fontWeight" @change="submitChangeTextFontWeight"></b-form-select>
					<input @change="submitChangeTextFontWeight" v-if="fontWeightSelected=='number'"></input>
					</div>
				</div>

			</b-collapse>
		</b-card>

		<b-card no-body class="mb-1">
			<b-card-header header-tag="header" class="p-1" role="tab">
			<b-button block href="#" v-b-toggle.accordion-2 variant="info">Border</b-button>
			</b-card-header>
			<b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
				<div class="option textboxoption has-addon collapsed">
					<div class="row">>
						<span class="col-md-5">
							Border
						</span>
						<span class="col-md-6 custom-switch">
							<input v-model="border" @change="submitChangeBorder" type="checkbox" class="custom-control-input" id="customSwitches">
							<label class="custom-control-label" for="customSwitches" ></label>
						</span>
					</div>
					<div class="row">
						<span class="col-md-5">border-width</span>
						<div class="col-md-7">
						<b-form-select class=" btn btn-info btn-sm dropdown-toggle" v-model="borderWidthSelected" :options="borderWidth" @change="submitChangeBorderWidth"></b-form-select>
						</div>
					</div>
					<div class="row">
						<span class="col-md-5">border-style</span>
						<div class="col-md-7">
						<b-form-select class=" btn btn-info btn-sm dropdown-toggle" v-model="borderStyleSelected" :options="borderStyle" @change="submitChangeBorderStyle"></b-form-select>
						</div>
					</div>
				</div>
			</b-collapse>
		</b-card>
		<b-card no-body class="mb-1">
			<b-card-header header-tag="header" class="p-1" role="tab">
			<b-button block href="#" v-b-toggle.accordion-3 variant="info">Flex box</b-button>
			</b-card-header>
			<b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
				<div class="row">
					<span class="col-md-4" style>Float</span>
					<div class="col-md-7">
					<button  @click="submitChangeAlign" name="right" type="button" class=" col-md-0.8 aling-button" aria-label="Left Align">
						<i @click="submitChangeAlign($event)" class="fas fa-align-right" ></i>
					</button>
					<button @click="submitChangeAlign" name="center" type="button" class=" col-md-0.8 aling-button" aria-label="Left Align">
						<i class="fas fa-align-center"></i>
					</button>
					<button @click="submitChangeAlign" name="left"type="button" class="col-md-0.8 aling-button" aria-label="Left Align">
						<i class="fas fa-align-left"></i>
					</button>
					<button @click="submitChangeAlign" name="no"  type="button" class="col-md-0.8 aling-button" aria-label="Left Align">
						<i class="fas fa-times"></i>
					</button>
					</div>
				</div>
			</b-collapse>
		</b-card>

		<b-card no-body class="mb-1">
			<b-card-header header-tag="header" class="p-1" role="tab">
			<b-button block href="#" v-b-toggle.accordion-4 variant="info">Display</b-button>
			</b-card-header>

			<b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">

				<div class="row">
					<span class="col-md-4" >Float</span>
					<div class="col-md-7">
					<button  @click ="submitChangeFloat" name="right" type="button" class=" col-md-0.8 aling-button" aria-label="Left Align">
						<i  @click ="submitChangeFloat" name="right"  class="fas fa-align-right"></i>
					</button>
					<button @click ="submitChangeFloat" name="center" type="button" class=" col-md-0.8 aling-button" aria-label="Left Align">
						<i class="fas fa-align-center"></i>
					</button>
					<button @click ="submitChangeFloat" name="left"type="button" class="col-md-0.8 aling-button" aria-label="Left Align">
						<i class="fas fa-align-left"></i>
					</button>
					<button @click ="submitChangeFloat" name="no"  type="button" class="col-md-0.8 aling-button" aria-label="Left Align">
						<i class="fas fa-times"></i>
					</button>
					</div>
				</div>

			</b-collapse>
		</b-card>
		</div>
	</div>
	</div>
  </div>
  <div v-if="isData" class="tab-pane "  v-bind:class="{ active:tabStep===3 }"id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">준비중입니다</div>
</div>
	<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" @click="chageTab">
		<li class="nav-item">
			<a class="nav-link active" v-bind:class="{ active:tabStep===4 }" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="false">Design</a>
		</li>
	</ul>
	<div class="tab-pane  active"  v-bind:class="{ active:tabStep===3 }"id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
      <div class="tag-box">

        <div class="tag-list-box">
          <span class="tag-list">Pages</span>
          <div class="nested">
            <div name = "html" @click="changeProperty">index.html</div>
          </div>
        </div>
		
        
        <div class="tag-list-box">
          <span class="tag-list">Style</span>
          <div class="nested">
            <div name = "css" @click="changeProperty">index.css</div>
          </div>
        </div>

        <div class="tag-list-box">
          <span class="tag-list">JavaScript</span>
          <div class="nested">
            <div name = "js" @click="changeProperty">index.js</div>
          </div>
        </div>

      </div>
	  <div v-if="kindOfLoadDate==1">
	  	<pre>{{testMessage}}</pre>
	  </div>
	  <div v-if="kindOfLoadDate==2">
		<pre v-bind:value="this.loadData[1]" id="preview2">불러올 데이터가 없습니다.</pre>
	  </div>
	  <div v-if="kindOfLoadDate==3">
		<textarea style="word-break:break-all"  class ="showJS" v-bind:value="this.loadData[2]" id="preview3"></textarea>
		<input  type="submit"  value="Apply" @change="inputFile" id="getfile" accept="text/*">
	  </div>
	</div>
  </div>
  <!--

  -->
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
	  kindOfLoadDate:0,
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
    ChromeColor: VueColor.Chrome
  },

  created () {
	//   console.log("s")
	  console.log(this.loadData)
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
    //   console.log(e)
	// console.log("드갔다")
      this.submitSorce.payload = this.payload
      this.submitSorce.style = 'text-align'
      if ((e.target.name) === 'left') {
        this.submitSorce.value = 'left'
      } else if ((e.target.name) === 'right') {
        this.submitSorce.value = 'right'
      } else if ((e.target.name) === 'no') {
        this.submitSorce.value = 'left'
      } else if ((e.target.name) === 'center') {
        this.submitSorce.value = 'center'
      }
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
	  console.log(e.target.name)

	  this.submitSorce.payload = this.payload
      this.submitSorce.style = 'float'
      this.submitSorce.value = e
      // console.log(this.submitSorce)
	  this.submitSorce.change = 1,
      this.$emit('userSelectBorder', this.submitSorce)
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
		// console.log(e.target.value)
		// this.selectedFile = e.target.files[0]
		// console.log(this.selectedFile)

		// reader.readAsDataURL(input.files[0]);
		// console.log(input.files[0])
		// console.log(reader.readAsDataURL(input.files[0]))
		
		var file = document.querySelector('#getfile');
		// console.log(this.payload.className)

		file.onchange = function () {
			var fileList = file.files ;

			// 읽기
			var reader = new FileReader();
			reader.readAsDataURL(fileList [0]);

			//로드 한 후
			reader.onload = function  () {
				console.log("fss")
				console.log(reader.result)
				// console.log(document.querySelector('.button1').background-image)
				$(document.querySelector('.button2')).attr( 'src', reader.result);
				// this.submitSorce.payload = this.payload
				// 	this.submitSorce.style = 'background-size'
				// 	this.submitSorce.value = '100%'
				// 	this.submitSorce.change = 1,
				// 	this.$emit('userSelected', this.submitSorce)
				// document.querySelector('button1').backgroundImage = reader.result;
				// this.submitSorce.value = reader.result
			};
		};

		// this.submitSorce.payload = this.payload
		// this.submitSorce.style = 'background-image'
		// // this.submitSorce.value = reader.readAsDataURL(input.files[0])
		// this.$emit('userSelected', this.submitSorce)

		this.submitSorce.payload = this.payload
		this.submitSorce.style = 'background-size'
		this.submitSorce.value = '100%'
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
			 console.log(this.test)
			
		}
		else if(this.kindOfLoadDate==2){
			document.querySelector('#preview2').textContent = this.loadData[1]
			this.test = 'dd'
		}
		else if(this.kindOfLoadDate==3){
			document.querySelector('#preview3').textContent = this.loadData[2]
		}
	}
  }
}
</script>

<style lang="scss">
.dsadsadsad{
	color: white !important;
}
.no-text{
	margin-top: 0.5rem;
	color: #fff;
}
.blue {
  padding: 5px;
  background-color: #283844;
  color: #64bfff;
  line-height: 1;
}
.col{
	color:black;
	padding: 0.4rem;
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
 .aling-button{
	float:right;
	margin:0.1rem;
}
.custom-control-label{
	float:right;
	margin:0.1rem;
}
.parentTreeOption{
	overflow:auto;
}
    .tag-box {
      // overflow:scroll;
      align-items: left;
      justify-content: left;
      .tag-list-box {
        // float: left;
        text-align: left;
        margin: 0.1rem;
        .tag-list {
          margin-left: 0.4rem;
          color: #e7e4e4;
          cursor: pointer;
          user-select: none; /* Prevent text selection */
          //   float: left;
          transition: all 300ms ease;
        }

        /* Create the tag-list/arrow with a unicode, and style it */
        .tag-list::before {
          content: "\25B6";
          color: #e7e4e4;
          display: inline-block;
          margin-right: 6px;
        }

        /* Rotate the tag-list/arrow icon when clicked on (using JavaScript) */
        .tag-list-down::before {
          transform: rotate(90deg);
        }
        .nested {
          display: none;
        }

        /* Show the nested list when the user clicks on the tag-list/arrow (with JavaScript) */
        .active {
          display: block;
        }
        .template {
          margin-left: 2rem;
          color: #e7e4e4;
          &:hover {
            background-color: #414649;
            cursor: default;
          }
        }
        .template::before {
          content: "\2B1A";
          margin-right: 0.2rem;
        }
        .ui {
          margin-left: 1.2rem;
        }
      }
      .filter{
        color:white;
        text-align: left;
        margin-left: 1rem;

      }
    }
pre, .showJS {
	text-align:left;
	width:100%;
	height:500px;
    padding: 1em;
    background: rgb(240, 240, 240);
    color: rgb(0, 0, 0);
    border-radius: .5em;
	overflow:scroll;
}
</style>
