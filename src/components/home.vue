<template>
  <div id="dashboard">
    <div class="dashboard" @click="onmouseClick" @mousemove="onmouseMove">
      <div class="dashboard-wrapper">
        <div class="text-wrapper">
          <div class="dashboard-text">Dashboard</div>
          <button class="generate">Generate Report</button>
        </div>
        <div class="component-wrapper">
          <div class="earning-box">
            <div class="earningm-wrapper">
              <div class="earningm-box">
              <span class="earningm">EARNINGS(MONTHLY)</span>
              <span class="dol1">$40000</span>
              </div>
              <button class="button1"></button>
            </div>
            <div class="earninga-wrapper">
              <div class="earninga-box">
              <span class="earninga">EARNINGS(ANNUAL)</span>
              <span class="dol2">$215,000</span>
              </div>
              <button class="button2"></button>
            </div>
          </div>
          <div class="task-box">
            <div class="tasks-wrapper">
              <div class="task-box">
              <span class="tasks">TASKS</span>
              <span class="task">50%</span>
              </div>
              <button class="button3"></button>
            </div>
            <div class="pending-wrapper">
              <div class="pending-box">
              <span class="pending">PENDING REQUESTS</span>
              <span class="pend">18</span>
              </div>
              <button class="button4"></button>
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
      <img style="cursor:pointer" v-if="isContentMovable" src="../assets/move.svg" class="move-icon" />
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      compo: null,
      borderstyle: null,
      onelementSelected: false,
      target: '',
      style: '',
      value: '',
      isContentEditable: false,
      clickedBorder: '',
      clickedElement: null,
      clickedBorderRadius: '',
      isContentMovable: false,
      elem: null
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
            
          let border = document.querySelector('.compo-border')
          // border.style.zIndex = 3;
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
              let border = document.querySelector('.compo-border')
          // border.style.zIndex = 3;
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
      border.style.zIndex = -1;
  },
  onmouseLeave(e) {
      e.target.style.border = "none"
  },
  onmouseClick(e) {
      this.$emit('componentSelected', e)
    },
  // editClick(e) {
  //     this.$emit("child")
  //     this.componentSoure.x=e.x
  //     this.componentSoure.y=e.y
  //     this.componentSoure.width=e.target.getBoundingClientRect().width
  //     // this.componentSoure.height=e.target.getBoundingClientRect().height
  //     // console.log(this.componentSoure)
  //     // eventBus.$emit("userClickEdited",this.componentSoure)
      
  // },
  styleChanged(data) {
    this.target = data.payload.className
    this.style = data.style
    this.value = data.value
    let element = document.querySelector(`.${this.target}`)
    element.style[this.style] = this.value

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
    background-color: #f6f8fb;
    width: 100%;
    border: 1px solid black;
    height:80%;
    max-height: 40rem;
    overflow: scroll;
    .dashboard-wrapper{
      height: 100%;
    .text-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0.5rem;
      position: relative;
      .dashboard-text {
        color: #5a5c69;
        font-size: 2.5rem;
      }
      .generate {
        background-color: #8b8bcc;
        position: absolute;
        left: 49rem;
        border-radius: 0.4rem;
        padding: 0.3rem;
        }
    }
    .component-wrapper {
      padding: 0.5rem;
      .earning-box {
        display: flex;
        flex-direction: row;
        margin-bottom: 1rem;
        align-items: center;
        justify-content: center;
        }
        .earningm-wrapper {
          border: 2px solid #d95353;
          box-shadow: 1px 0.5px 0.5px #c0c0c0;
          width: 50%;
          display: flex;
          height: 5rem;
          flex-direction: row;
          padding: 0.5rem;
          border-radius: 0.4rem;
          margin-right: 1rem;
          align-items: center;
          position:relative;
          background-color: #fff;
          .earningm {
            color: #d95353;
            font-size: 0.75rem;
            font-weight: bold;
          }
          .dol1 {
            text-align: left;
            font-size: 1.2rem;
          }
          
        }
        .earninga-wrapper {
          border: 2px solid #1cc88a;
          display: flex;
          flex-direction: row;
          background-color: #fff;
          height: 5rem;
          padding: 0.5rem;
          border-radius: 0.4rem;
          box-shadow: 1px 0.5px 0.5px #c0c0c0;
          width:50%;
          position:relative;
          align-items: center;
          .earninga {
            color: #1cc88a;
            font-size: 0.75rem;
            font-weight: bold;
          }
          .dol2 {
            text-align: left;
            font-size: 1.2rem;
          }
        }
        .button1, .button2 {
          position: absolute;
          background-color: #dddfeb;
          background-image: linear-gradient(to bottom, #dddfeb, #cfd2e2);
          margin-left: 1rem;
          border-radius: 0.84rem;
          border: none;
          height: 3.8rem;
          width: 3.8rem;
          left: 22.5rem;
        }

        .earningm-box, .earninga-box{
            display: flex;
            flex-direction: column;
            margin-left: 0.5rem;
          }
          
      .task-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .tasks-wrapper {
          border: 2px solid #36b9cc;
          box-shadow: 1px 0.5px 0.5px #c0c0c0;
          height: 5rem;
          background-color: #fff;
          align-items: center;
          width: 50%;
          display: flex;
          flex-direction: row;
          padding: 0.5rem;
          border-radius: 0.4rem;
          position:relative;
          margin-right: 1rem;
          .tasks {
            color: #36b9cc;
            font-size: 0.75rem;
            font-weight: bold;
          }
          .task{
            text-align: left;
            font-size: 1.2rem;
          }
        }
        
        .pending-wrapper {
          border: 2px solid #f6c23e;
          width: 50%;
          display: flex;
          flex-direction: row;
          padding: 0.5rem;
          box-shadow: 1px 0.5px 0.5px #c0c0c0;
          height: 5rem;
          background-color: #fff;
          position:relative;
          align-items: center;
          border-radius: 0.4rem;
          .pending {
            color: #f6c23e;
            font-size: 0.75rem;
            font-weight: bold;
          }
          .pend {
            text-align: left;
            font-size: 1.2rem;
          }
        }
        .button3, .button4 {
          position: absolute;
          background-color: #dddfeb;
          background-image: linear-gradient(to bottom, #dddfeb, #cfd2e2);
          margin-left: 1rem;
          border-radius: 0.84rem;
          border: none;
          height: 3.8rem;
          width: 3.8rem;
          left: 22.5rem;
        }
      
      
    .pending-box, .task-box{
            display: flex;
            flex-direction: column;
            margin-left: 0.5rem;
          }
          }
      }
    
    
    .img-wrapper{
      display: flex;
      flex-direction: column;
      align-items: center;

      .img1, .img2, .img3 {
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
      z-index: 10;
      opacity:0;
    }
    
  }
  .move-icon{
    z-index:10;
    position: fixed;
    width: 0.9rem;
    height: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  }
  
  
}
</style>
