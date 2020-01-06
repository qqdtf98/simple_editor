<template>
  <v-app>
  <div class = "layout" v-if="isEdited">
		<div class = "content">
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
					<span class="size x"><i>X</i><b>&nbsp {{componentSorce.x}}</b></span>
					<span class="size y"><i>Y</i><b>&nbsp {{componentSorce.y}}</b></span>
					<span class="size width"><i>W</i><b>&nbsp {{componentSorce.width}}</b></span>
					<span class="size height"><i>H</i><b>&nbsp {{componentSorce.height}}</b></span>
				</div>
        <div class = "option textboxoption has-addon collapsed">
			<label class="option-content">
				<span title="">x
					<i class="caret" style="display: inline-block;"></i>
				</span>
				<div class="control">
					<input type="text" name="width-option" value="" title="" placeholder="31.4375px" v-model="componentSorce.x">
					<span class="warning-badge" style="display: none;"></span>
					<span class="addon increment-handle"></span>
				</div>
			</label>
			<label class="option-content">
				<span title="">y
					<i class="caret" style="display: inline-block;"></i>
				</span>
				<div class="control">
					<input type="text" name="height-option" value="" title="" placeholder="40px" v-model="componentSorce.y">
					<span class="warning-badge" style="display: none;"></span>
					<span class="addon increment-handle">
						<i></i>
					</span>
				</div>
			</label>
			<label class="option-content">
				<span title="">Width
					<i class="caret" style="display: none;">
					</i>
				</span>
				<div class="control">
					<input type="text" name="min-height-option" value="" title="" placeholder="none" v-model="componentSorce.width">
					<span class="warning-badge" style="display: none;">
					</span>
					<span class="addon increment-handle">
						<i></i>
					</span>
				</div>
			</label>
			<label class="option-content">
				<span title="">Height 
					<i class="caret" style="display: none;"></i>
				</span><div class="control">
					<input type="text" name="max-height-option" value="" title="" placeholder="none" v-model="componentSorce.height">
					<span class="warning-badge" style="display: none;"></span>
					<span class="addon increment-handle">
						<i></i>
					</span>
				</div>
			</label>
		</div>
	<v-btn  @click="changeSource" large color="primary">수정완료</v-btn>
			</div>
		</div>
	</div>
     <v-row align="center">
      <v-col class="text-center" cols="12" sm="4">
        <div class="my-2">
          <v-btn small>Normal</v-btn>
        </div>
        <div class="my-2">
          <v-btn small color="primary">Primary</v-btn>
        </div>
        <div class="my-2">
          <v-btn small color="error">Error</v-btn>
        </div>
        <div class="my-2">
          <v-btn small disabled>Disabled </v-btn>
        </div>
      </v-col>
      <v-col class="text-center" cols="12" sm="4">
        <div class="my-2">
          <v-btn>Normal</v-btn>
        </div>
        <div class="my-2">
          <v-btn color="primary">Primary</v-btn>
        </div>
        <div class="my-2">
          <v-btn color="error">Error</v-btn>
        </div>
        <div class="my-2">
          <v-btn disabled>Disabled</v-btn>
        </div>
      </v-col>
      <v-col class="text-center" cols="12" sm="4">
        <div class="my-2">
          <v-btn large>Normal</v-btn>
        </div>
        <div class="my-2">
          <v-btn large color="primary">Primary</v-btn>
        </div>
        <div class="my-2">
          <v-btn large color="error">Error</v-btn>
        </div>
        <div class="my-2">
          <v-btn large disabled>Disabled</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import {eventBus} from "./main"
export default {
  name: 'App',
  props:["isEdited"],
  data(){
    return{
      isData:true,
      componentSorce:{
        x:228,
        y:500,
        width:960,
        height:614,
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
    eventBus.$on('userClickEdited',data=>{
      this.componentSorce.x=data.x,
      this.componentSorce.y=data.y,
      this.componentSorce.width=data.width,
      this.componentSorce.height=data.height
    })
  },
  methods:{
    changeSource(){
      console.log(this.componentSorce)
      eventBus.$emit("userChangeSource",this.componentSorce)
    }
  }
};
</script>
