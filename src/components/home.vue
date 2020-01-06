<template>
<div id="dashboard">
        <div class="dashboard" @click="onmouseClick" @mousemove="onmouseMove">
            <div class="dashboard-wrapper">
                <div class="text-wrapper">
                    <div class="dashboard-text">
                        Dashboard
                    </div>
                    <button class="generate">Generate Report</button>
                </div>
                <div class="component-wrapper">
                    <div class="earning-box">
                        <div class="earningm-wrapper">
                            <span class="earningm">
                                EARNINGS(MONTHLY)
                            </span>

                            <button @click="editClick" v-bind:style="buttonObject" class="button1">a</button>
                        </div>
                        <div class="earninga-wrapper">
                            <span class="earninga">
                                EARNINGS(ANNUAL)
                            </span>
                            <button @click="editClick" v-bind:style="buttonObject" class="button2">a</button>
                        </div>
                    </div>
                    <div class="task-box">
                        <div class="tasks-wrapper">
                            <span class="tasks">
                                TASKS
                            </span>
                            <button @click="editClick" v-bind:style="buttonObject" class="button3">a</button>
                        </div>
                        <div class="pending-wrapper">
                            <span class="pending">
                                PENDING REQUESTS 
                            </span>
                            <button @click="editClick" v-bind:style="buttonObject" class="button4">a</button>
                        </div>
                    </div>

                </div>
                <div class="img-wrapper">
                  <img class="img1" src="../assets/logo.png" />
                  <img class="img2" src="../assets/logo.png" />
                  <img class="img3" src="../assets/logo.png" />
                </div>
            </div>
            <div class="selector-box">
                <div v-if="onelementSelected" class="tagname"></div>
                <div class="compo-border"></div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            compo: null, 
            borderstyle: null,
            onelementSelected: false,
            buttonObject:{
                width:'24px',
                height:'24px',
                padding:'4px 4px 4px 4px',
                margin: '4px 4px 4px 4px',
                
            },
            componentSoure:{
                x:228,
                y:500,
                width:960,
                height:614
            }
        }
    },
    created(){
        
        // eventBus.$on('userChangeSource',data=>{
        //     // this.componentSoure.x=data.x
        //     // this.componentSoure.y=data.y
        //     this.buttonObject.width=data.width+'px'
        //     this.buttonObject.height=data.height+'px'
        // })
    },
    methods: {
        onmouseMove(e) {
            if (this.compo === null) {
                if(e.target.className != "tagname"){
                this.onelementSelected = true
                this.compo = e
                    .target
                    .getBoundingClientRect()
                let tag = document.querySelector('.tagname')
                
                // tag.textContent = e.target.tagName
                // tag.style.left = this.compo.left + 'px'
                // tag.style.top = this.compo.top + 'px'
                // let bord = document.querySelector('.compo-border')
                // bord.style.border = "1px solid #3e8ce4"
                // bord.style.left = this.compo.left + 'px'
                // bord.style.top = this.compo.top + 'px'
                // bord.style.width = this.compo.width + 'px'
                // bord.style.height = this.compo.height + 'px'
                
            
            }
            } else {
                if (this.compo != e.target) {
                    if(e.target.className != "tagname"){
                    this.compo = e
                        .target
                        .getBoundingClientRect()
                    let tag = document.querySelector('.tagname')
                    
                    tag.textContent = e.target.tagName
                    tag.style.left = this.compo.left + 'px'
                    
                    tag.style.top = this.compo.top - tag
                        .getBoundingClientRect()
                        .height + 'px'
                    let bord = document.querySelector('.compo-border')
                    bord.style.border = "1px solid #3e8ce4"
                    bord.style.left = this.compo.left + 'px'
                    bord.style.top = this.compo.top + 'px'
                    bord.style.width = this.compo.width + 'px'
                    bord.style.height = this.compo.height + 'px'
                    }
                }
            }
        },
        onmouseLeave(e) {
            e.target.style.border = "none"
        },
        onmouseClick(e) {
            // console.log(e.target)
            this.$emit('componentSelected', e.target)
        },
        editClick(e){
            this.$emit("child")
            this.componentSoure.x=e.x
            this.componentSoure.y=e.y
            this.componentSoure.width=e.target.getBoundingClientRect().width
            this.componentSoure.height=e.target.getBoundingClientRect().height
            // console.log(this.componentSoure)
            // eventBus.$emit("userClickEdited",this.componentSoure)
        }
    }
}
</script>

<style lang="scss">
 #dashboard {
  display: flex;
  align-items: center;
  width: 100%;
  
  .dashboard{
    width: 100%;
    border: 1px solid black;
    max-height: 40rem;
    .dashboard-wrapper{
      max-height: 100%;
    .text-wrapper {
      display: flex;
      flex-direction: row;
      margin: 0.5rem;
      .generate {
        background-color: #8b8bcc;
        border-radius: 0.4rem;
        }
    }
    .component-wrapper {
      padding: 0.5rem;
      .earning-box {
        display: flex;
        flex-direction: row;
        margin-bottom: 1rem;
        }
        .earningm-wrapper {
          border: 1px solid #d95353;
          box-shadow: 1px 0.5px 0.5px #c0c0c0;
          width: 20rem;
          display: flex;
          flex-direction: row;
          padding: 0.5rem;
          border-radius: 0.4rem;
          margin-right: 1rem;
          align-items: center;
          .earningm {
            color: #d95353;
          }
        }
        .earninga-wrapper {
          border: 1px solid #1cc88a;
          width: 20rem;
          display: flex;
          flex-direction: row;
          padding: 0.5rem;
          border-radius: 0.4rem;
          box-shadow: 1px 0.5px 0.5px #c0c0c0;
          .earninga {
            color: #1cc88a;
          }
        }
      }
      .task-box {
        display: flex;
        flex-direction: row;
        .tasks-wrapper {
          border: 1px solid #36b9cc;
          box-shadow: 1px 0.5px 0.5px #c0c0c0;
          width: 20rem;
          display: flex;
          flex-direction: row;
          padding: 0.5rem;
          border-radius: 0.4rem;
          margin-right: 1rem;
          .tasks {
            color: #36b9cc;
          }
        }
        
        .pending-wrapper {
          border: 1px solid #f6c23e;
          width: 20rem;
          display: flex;
          flex-direction: row;
          padding: 0.5rem;
          box-shadow: 1px 0.5px 0.5px #c0c0c0;
          border-radius: 0.4rem;
          .pending {
            color: #f6c23e;
          }
        }
        .button1,
        .button2,
        .button3,
        .button4 {
          background-color: #afa7a7;
          margin-left: 1rem;
          border: none;
        }
      }
    
    
    .img-wrapper{
      display: flex;
      flex-direction: column;
      align-items: center;

      .img1, .img2, .img3{
        width: 10rem;
      }
    }
    }
  .selector-box {
    display: flex;
    flex-direction: column;
    .tagname {
      color: white;
      padding: 0.2rem;
      position: fixed;
      z-index: 10;
      background-color: #3e8ce4;
      border-radius: 0.4rem;
      font-size: 0.8rem;
    }
    .compo-border {
      position: fixed;
      z-index: -1;
    }
    
  }
  }
  
  
}
</style>
