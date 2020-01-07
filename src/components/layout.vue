<template>
  <div>
    <b-nav tabs fill>
      <b-nav-item active>Look & Feel </b-nav-item>
      <b-nav-item>options</b-nav-item>
      <b-nav-item>Animation</b-nav-item>
    </b-nav>
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
                            name="width-option"
                            value
                            title
                            placeholder="31.4375px"
							 @keyup.enter="submitWidth"
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
                            name="height-option"
                            value
                            title
                            placeholder="40px"
							@keyup.enter="submitHeight"
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
                            name="min-height-option"
                            value
                            title
                            placeholder="0"
							@keyup.enter="submitMargin"
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
                            name="max-height-option"
                            value
                            title
                            placeholder="0"
                            @keyup.enter="submitPadding"
							v-model="componentSorce.padding"
                          />
                          <span class="warning-badge" style="display: none;"></span>
                          <span class="addon increment-handle">
                            <i></i>
                          </span>
                        </div>
                      </label>
                    </div>
                    <!-- <button @click="changeSource" large color="primary">수정완료{{payload}}'</button> -->
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
					<b-button style="width:30px; height:30px":style="backgroundColor"variant=""></b-button>
					<input
					type
					name="width-option"
					value
					title
					placeholder="31.4375px"
						@keyup.enter="submitWidth"
					v-model="componentSorce.backgroundColor"
					/>
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
					<b-button style="width:30px; height:30px":style="fontColor"variant=""></b-button>
					<input
					type
					name="width-option"
					value
					title
					placeholder="31.4375px"
						@keyup.enter="submitWidth"
					v-model="fontColor.backgroundColor"
					/>
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
					name="height-option"
					value
					title
					placeholder="40px"
					@keyup.enter="submitHeight"
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
				v-model="opacityValue">
  			</range-slider>
			<input
				style="width:50px"
				v-model="opacityValue"
				placeholder="0"
			></input>
			</div>
			<div style="float:left">
			 Blur 
			 <range-slider
				class="slider"
				min="0"
				max="100"
				step="1"
				v-model="blurValue">
  			</range-slider>
			<input
				style="width:50px"
				placeholder="0px"
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
				v-model="brightnessValue">
  			</range-slider>
			<input
				style="width:50px"
				placeholder="0%"
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
				v-model="contrastValue">
  			</range-slider>
			  
			<input
				style="width:50px"
				placeholder="0%"
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
				v-model="grayscaleValue">
  			</range-slider>
			<input
				style="width:50px"
				placeholder="0%"
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
				v-model="hueValue">
  			</range-slider>
			<input
				style="width:50px"
				placeholder="0deg"
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
				v-model="invertValue">
  			</range-slider>
			<input
				style="width:50px"
				placeholder="100%"
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
				v-model="saturateValue">
  			</range-slider>
			<input
				style="width:50px"
				placeholder="0%"
				v-model="saturateValue"
			></input>
			</div>
			<div style="float:left">
			 Sepia 
			 <chrome-color v-model="color"></chrome-color>
			dsd
			 <range-slider
				class="slider"
				min="0"
				max="100"
				step="1"
				v-model="sepiaValue">
  			</range-slider>
			<input
				style="width:50px"
				placeholder="100%"
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
// you probably need to import built-in style
import 'vue-range-slider/dist/vue-range-slider.css'

export default {

  name: 'App',
  props:['payload'],
  data(){
    return{
		
	  opacityValue: 0,
	  blurValue:0,
	  brightnessValue:0, 
	  contrastValue:0,
	  grayscaleValue:0, 
	  hueValue:0, 
	  invertValue:0, 
	  saturateValue:0, 
	  sepiaValue:0, 
      isData:true,
	  backgroundColor:{
		  backgroundColor:'rgb(0,0,255)'
	  },
	  fontColor:{
		  backgroundColor:'rgb(0,0,255)'
	  },
      componentSorce:{
        x:228,
        y:500,
        width:960,
        height:614,
		padding:'0px',
        margin: '0px',
		backgroundColor:'',
		fontColor:'',
		fontSize:'',
	  },
	  selectionWidthSource:{
		payload:'',
		style:'width',
		value:''
	  },
	  selectionHeightSource:{
		payload:'',
		style:'height',
		value:''
	  },
	  selectionMarginSource:{
		payload:'',
		style:'margin',
		value:''
	  },
	  selectionPaddingSource:{
		payload:'',
		style:'padding',
		value:''
	  },

      mgTop:0,
      mgBottom:0,
      mgLeft:0,
      mgRight:0,
      pdTop:0,
      pdBottom:0,
      pdLeft:0,
      pdRight:0,
      compo: null,
      borderstyle: null,

	  //
	  color: '#ff00ff'
    }
  },
  components: {
    RangeSlider,

	  ChromeColor: VueColor.Chrome
 
  },
  created(){
	  //console.log(this.payload)
  },
 mounted() 
 { 
 },
  methods:{
	getData(payload){
		if(this.isData)
			this.isData = false
		console.log(payload)
		console.log(payload.screenX-payload.x)
		console.log(payload.screenY-payload.y)
		// console.log(screen.availWidth)
		// console.log(screen.availHeight)
		// console.log(payload.target.getBoundingClientRect())

		this.componentSorce.x=payload.x
		this.componentSorce.y=payload.y,

		this.componentSorce.margin=payload.target.style.margin
		this.componentSorce.padding=payload.target.style.padding,
		this.componentSorce.width=payload.target.getBoundingClientRect().width
		this.componentSorce.height=payload.target.getBoundingClientRect().height
		this.componentSorce.backgroundColor = getComputedStyle(payload.target).backgroundColor
		this.backgroundColor.backgroundColor = getComputedStyle(payload.target).backgroundColor
		this.fontColor.backgroundColor = getComputedStyle(payload.target).color
		this.componentSorce.fontSize = getComputedStyle(payload.target).fontSize

	},
    changeSource(){

	  //console.log(this.payload)
    //   eventBus.$emit("userChangeSource",this.componentSorce)
	},
	submitWidth(e){
		this.selectionWidthSource.payload=this.payload
		this.selectionWidthSource.value=this.componentSorce.width+'px'
		this.$emit('userSelected', this.selectionWidthSource)
	},
	submitHeight(e){
		this.selectionHeightSource.payload=this.payload
		this.selectionHeightSource.value=this.componentSorce.height+'px'
		this.$emit('userSelected', this.selectionHeightSource)
	},
	submitMargin(e){
		this.selectionMarginSource.payload=this.payload
		this.selectionMarginSource.value=this.componentSorce.magin+'px'
		this.$emit('userSelected', this.selectionMarginSource)
	},
	submitPadding(e){
		this.selectionPaddingSource.payload=this.payload
		this.selectionPaddingSource.value=this.componentSorce.padding+'px'
		this.$emit('userSelected', this.selectionPaddingSource)
	}
  }
};
</script>

<style>

.blue {
    padding: 5px;
    background-color: #283844;
    color: #64BFFF;
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
    box-shadow: 0 1px 0 #3B4144;
    padding-bottom: 8px;
    margin: 0 10px 10px;
}
.info-option .green {
    padding: 5px;
    background-color: #2D3F3A;
    color: #57D88B;
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
    box-shadow: 0 0 3px rgba(0,0,0,0.21) inset;
	user-select: none;
	

}

</style>
