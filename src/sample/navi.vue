<template>
  <div class="profile">
    <div class="profile-container">
      <div class="profile-wrapper">
        <div class="img">
        </div>
        <div class="contents-wrapper">
          <div class="name-wrapper">
            <div class="name">
              이름
            </div>
            <div class="myname">
            </div>
          </div>
          <div class="email-wrapper">
            <div class="email">
              이메일
            </div>
            <div class="myemail">
            </div>
          </div>
          <div class="nickname-wrapper">
            <div class="nickname">
              닉네임
            </div>
            <div class="mynickname">
            </div>
          </div>
          <div class="nickname-edit-wrapper">
            <button class="nickname-edit-button">
              닉네임 수정
            </button>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

.profile {
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  // min-width: 40rem;

  .profile-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
    padding: 10rem 0;
    width: 80rem;
    flex-flow: row wrap;

    .img {
      width: 15rem;
      height: 15rem;
      border-radius: 50%;
      background-color: #ff455d;
      margin-right: 2rem;
      margin-left: 2rem;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;

      }
    }

    .contents-wrapper {
      padding-top: 4rem;
      padding-bottom: 1rem;
      margin-right: 2rem;
      margin-left: 2rem;
      .name-wrapper,
      .email-wrapper,
      .nickname-wrapper {
        padding-top: 1.2rem;
        display: flex;
        flex-direction: row;

        .name,
        .email,
        .nickname {
          color: #3a3a3a;
          border-top-left-radius: 0.7rem;
          border-bottom-left-radius: 0.7rem;
          padding-left: 0.8rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          background-color: #ececec;

          width: 5rem;
          padding-right: 1.5rem;
        }
        .myname,
        .myemail,
        .mynickname {
          color: #ff455d;
          background-color: #ececec;
          min-width: 15rem;

          border-top-right-radius: 0.7rem;
          border-bottom-right-radius: 0.7rem;
          padding-right: 0.8rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
      }
      .nickname-edit-wrapper {
        display: flex;
        justify-content: center;
        width: 100%;
        padding-top: 1rem;
        .nickname-edit-button {
          display: flex;
          flex-direction: row;
          border-radius: 1.5rem;
          border: solid #ff455d 1px;
          color: #ff455d;
          padding-bottom: 0.1rem;
          padding: 0.3rem;
          padding-right: 0.5rem;
          padding-left: 0.5rem;
          margin-top: 0.1rem;
          font-size: 0.8rem;
          transition: background 200ms ease, color 200ms ease;
          &:hover {
            background-color: #ff455d;
            color: #fff;
          }
        }
      }
    }
  }

  .category-btn {
    position: fixed;
    background-color: white;
    opacity: 0.8;
    width: 3.2rem;
    height: 3.2rem;
    left: 1rem;
    bottom: 1rem;
    border-radius: 50%;
    box-shadow: 0 0.5rem 2rem rgba(#000, 0.3);
    display: flex;
    justify-content: center;

    .category-link {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 3;
    }

    .category-icon {
      width: 50%;
      height: 50%;
    }
  }
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(#000, 0.7);
    }

    .input-box {
      background-color: #fff;
      padding: 1rem;
      z-index: 1;
      border-radius: r(3);
      height: 4rem;

      .input {
        height: 100%;
        font-size: 100%;
      }
    }
  }
}
</style>
