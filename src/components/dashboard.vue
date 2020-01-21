<template>
  <div class="dashboard">
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
            <!-- <button class="button1"></button> -->
          </div>
          <div class="earninga-wrapper">
            <div class="earninga-box">
              <span class="earninga abcd">EARNINGS(ANNUAL)</span>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.dashboard {
  background-color: #f6f8fb;
  width: 100%;
  border: 1px solid black;
  height: 80%;
  max-height: 40rem;
//   overflow: auto;
  display: inline-block;
  .dashboard-wrapper {
    // overflow: hidden;
    height: 100%;
    .text-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      margin: 0.5rem;
      position: relative;
      .dashboard-text {
        color: #5a5c69;
        font-size: 2.5rem;
      }
      .generate {
        background-color: #8b8bcc;
        position: absolute;
        border-radius: 0.4rem;
        padding: 0.3rem;
        right: 10px;
      }
    }
    .component-wrapper {
      padding: 0.5rem;
      .earning-box {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 1rem;
        align-items: center;
        justify-content: center;

      .earningm-wrapper {
        border: 2px solid #d95353;
        box-shadow: 1px 0.5px 0.5px #c0c0c0;
        width: 20rem;
        display: flex;
        height: 5rem;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0.5rem;
        border-radius: 0.4rem;
        margin-right: 1rem;
        align-items: center;
        // position: relative;
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
      .earninga-wrapper {
        border: 2px solid #1cc88a;
        display: flex;
        flex-direction: row;
        background-color: #fff;
        height: 5rem;
        padding: 0.5rem;
        border-radius: 0.4rem;
        box-shadow: 1px 0.5px 0.5px #c0c0c0;
        width: 50%;
        position: relative;
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
      .button1,
      .button2 {
        position: absolute;
        background-color: #dddfeb;
        background-image: linear-gradient(to bottom, #dddfeb, #cfd2e2);
        margin-left: 1rem;
        border-radius: 0.84rem;
        border: none;
        height: 3.8rem;
        width: 3.8rem;
        right: 10px;
      }

      .earningm-box,
      .earninga-box {
        display: flex;
        flex-direction: column;
        margin-left: 0.5rem;
      }
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
          position: relative;
          margin-right: 1rem;
          .tasks {
            color: #36b9cc;
            font-size: 0.75rem;
            font-weight: bold;
          }
          .task {
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
          position: relative;
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
        .button3,
        .button4 {
          position: absolute;
          background-color: #dddfeb;
          background-image: linear-gradient(to bottom, #dddfeb, #cfd2e2);
          margin-left: 1rem;
          border-radius: 0.84rem;
          border: none;
          height: 3.8rem;
          width: 3.8rem;
          right: 10px;
        }

        .pending-box,
        .task-box {
          display: flex;
          flex-direction: column;
          margin-left: 0.5rem;
        }
      }
    }

    .img-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;

      .img1,
      .img2,
      .img3 {
        width: 10rem;
      }
    }
  }
}
</style>
