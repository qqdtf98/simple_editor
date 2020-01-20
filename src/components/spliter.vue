<template>
  <div  id="spliter">
    <!-- <div class="top-bord"></div> -->
    <div class="select">
      <!-- <div class="left-bord"></div> -->
      <div class="split">
        <div class="div1">
          <div class="div2"></div>
        </div>
        <div class="div3">
          <div class="div4"></div>
        </div>
        <div class="div1">
          <div class="div2"></div>
        </div>
          <div class="earningm-wrapper">
            <div class="earningm-box">
              <span class="earningm">EARNINGS(MONTHLY)</span>
              <span class="dol1">$40000</span>
            </div>
            <button class="button1"></button>
          </div>
      </div>
      <!-- <div @mousedown="widthDecrease" class="right-bord"></div> -->
    </div>

    <!-- <div class="bottom-bord"></div> -->
  </div>
</template>
<script>
// export default {
//   mounted () {
//     document.addEventListener('mousemove', (e) => {
//       if (this.borderClicked) {
//         this.elem.style.width = parseInt(this.elemWidth) - (this.initialX - e.clientX) + 'px'
//       }
//     })
//     document.addEventListener('mouseup', e => {
//       this.borderClicked = false
//     })
//   },
//   data () {
//     return {
//       borderClicked: false,
//       elemWidth: '',
//       elem: null,
//       initialX: '',
//       initialY: '',
//       initialLeft: ''
//     }
//   },
//   methods: {
//     widthDecrease (e) {
//       this.borderClicked = true
//       let right = document.querySelector('.right-bord')
//       right.style.backgroundColor = '#34d6c1'
//       let select = document.querySelector('.select')
//       this.elem = select
//       this.elemWidth = getComputedStyle(this.elem).width
//       this.initialX = e.clientX
//       this.initialLeft = getComputedStyle(this.elem).left
//     //   console.log(this.initialLeft)
//     }
//   }
// }
</script>
<style lang="scss">
#spliter {
  width: 40rem;
  height: 30rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .top-bord {
    height: 1rem;
    width: 32rem;
    background-color: #b72bc4;
  }
  .bottom-bord {
    height: 1rem;
    width: 32rem;
    background-color: #b72bc4;
  }
  .select {
      display: flex;
      flex-wrap:wrap;
    .left-bord{
      width: 1rem;
      height: 20rem;
      background-color: #b72bc4;
    }
    .split {
      width: 30rem;
      height: 20rem;
      border: 1px solid black;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .div1 {
        width: 10rem;
        height: 5rem;
        background-color: #ee6d6d;
        display: flex;
        align-items: center;
        justify-content: center;
        .div2 {
          width: 3rem;
          height: 3rem;
          background-color: #eeeb46;
        }
      }
      .div3 {
        width: 7rem;
        height: 8rem;
        background-color: #e78543;
        display: flex;
        align-items: center;
        justify-content: center;
        .div4 {
          width: 4rem;
          height: 4rem;
          background-color: #eeeb46;
        }
      }
      .earningm-wrapper {
        border: 2px solid #d95353;
        box-shadow: 1px 0.5px 0.5px #c0c0c0;
        width: 50rem;
        display: flex;
        height: 5rem;
        flex-direction: row;
        flex-wrap:wrap;
        padding: 0.5rem;
        border-radius: 0.4rem;
        margin-right: 1rem;
        align-items: center;
        position: relative;
        background-color: #fff;
        .earningm-box{
          width: 10rem;
          height: 3rem;
          .earningm {
            // width: 10rem;
          color: #d95353;
          font-size: 0.75rem;
          font-weight: bold;
          text-align: left;
        }
        .dol1 {
          width: 8rem;
          text-align: left;
          font-size: 1.2rem;
        }
        }
        .button1{
          width: 3rem;
          height: 3rem;
        }

      }

    }
     .right-bord {
      width: 1rem;
      height: 20rem;
      background-color: #b72bc4;
    }
  }

}
</style>
