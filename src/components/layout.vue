<template>
  <div>
    <b-nav tabs fill>
      <b-nav-item active>Look & Feel</b-nav-item>
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
            <v-app>
              <div class="layout">
                <div class="content">
                  <div class="info-option">
                    <div class="margin">
                      <div class="box-row blue">
                        <span class="margin-top" title="Margin Top">{{mgTop}}</span>
                      </div>
                      <div class="box-row middle">
                        <div class="box-col blue">
                          <span class="margin-left" title="Margin Left">{{mgLeft}}</span>
                        </div>
                        <div class="box-col padding">
                          <div class="box-row green">
                            <span class="padding-top" title="Padding Top">{{pdTop}}</span>
                          </div>
                          <div class="box-row middle">
                            <div class="box-col green">
                              <span class="padding-left" title="Padding Left">{{pdLeft}}</span>
                            </div>
                            <div class="box-col middle empty"></div>
                            <div class="box-col green">
                              <span class="padding-right" title="Padding Right">{{pdRight}}</span>
                            </div>
                          </div>
                          <div class="box-row green">
                            <span class="padding-bottom" title="Padding Bottom">{{pdBottom}}</span>
                          </div>
                        </div>
                        <div class="box-col blue">
                          <span class="margin-right" title="Margin Right">{{mgRight}}</span>
                        </div>
                      </div>
                      <div class="box-row blue">
                        <span class="margin-bottom" title="Margin Bottom">{{mgBottom}}</span>
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
                          x
                          <i class="caret" style="display: inline-block;"></i>
                        </span>
                        <div class="control">
                          <input
                            type
                            name="width-option"
                            value
                            title
                            placeholder="31.4375px"
                            v-model="componentSorce.x"
                          />
                          <span class="warning-badge" style="display: none;"></span>
                          <span class="addon increment-handle"></span>
                        </div>
                      </label>
                      <label class="option-content">
                        <span title>
                          y
                          <i class="caret" style="display: inline-block;"></i>
                        </span>
                        <div class="control">
                          <input
                            type="text"
                            name="height-option"
                            value
                            title
                            placeholder="40px"
                            v-model="componentSorce.y"
                          />
                          <span class="warning-badge" style="display: none;"></span>
                          <span class="addon increment-handle">
                            <i></i>
                          </span>
                        </div>
                      </label>
                      <label class="option-content">
                        <span title>
                          Width
                          <i class="caret" style="display: none;"></i>
                        </span>
                        <div class="control">
                          <input
                            type="text"
                            name="min-height-option
											"
                            value
                            title
                            placeholder="none"
                            v-model="componentSorce.width"
                          />
                          <span class="warning-badge" style="display: none;"></span>
                          <span class="addon increment-handle">
                            <i></i>
                          </span>
                        </div>
                      </label>
                      <label class="option-content">
                        <span title>
                          Height
                          <i class="caret" style="display: none;"></i>
                        </span>
                        <div class="control">
                          <input
                            type="text"
                            name="max-height-option"
                            value
                            title
                            placeholder="none"
                            @keyup.enter="submit"
                            v-model="componentSorce.height"
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
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel"></b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block href="#" v-b-toggle.accordion-3 variant="info">Font</b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel"></b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block href="#" v-b-toggle.accordion-3 variant="info">Filters</b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel"></b-collapse>
      </b-card>
    </div>
  </div>
</template>



<script>
// import {eventBus} from "./main"
export default {
  name: 'App',
  props:['payload'],
  data(){
    return{
      isData:true,
      componentSorce:{
        x:228,
        y:500,
        width:960,
        height:614,
	  },
	  selectionSource:{
		  payload:'',
		  x:'',
		  //x:this.componentSorce.x,
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
      borderstyle: null
    }
  },
  created(){
    
  },
  methods:{
    changeSource(){

	  console.log(this.payload)
    //   eventBus.$emit("userChangeSource",this.componentSorce)
	},
	submit(e){
		// alert("제출")
		// console.log(this.payload)
		this.selectionSource.payload=this.payload
		this.selectionSource.x=this.componentSorce.x
		this.$emit('userSelectedWidth', this.selectionSource)
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
.info-option .box-row {
    display: flex;
    flex-direction: column;
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
}
</style>