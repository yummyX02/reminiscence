<template>
  <view>
    <div class="big">
      <div class="title">
        <div class="back" @click="back">
          <uni-icons type="back" size="45" color="#99979b"></uni-icons
          ><span style="font-size: 1.4em">返回</span>
        </div>
      </div>
      <div class="noTitle">
        <div class="say">
          <img
            src="../../../static/huatong-2.png"
            style="height: 200px; width: 200px"
          />
          <div class="sayText">长按说出备忘事项</div>
        </div>
        <div class="clock">
          <img
            src="../../../static/naozhong.png"
            style="height: 70px; width: 70px"
          />
          <div class="clockText">闹钟设置</div>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    back() {
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/old/memo/memo",
        });
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.big {
  height: 100vh;
  width: 100vw;
  overflow: scroll;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    url("../../../static/login.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    width: 100%;
    margin-bottom: 30px;
    .back {
      display: flex;
      align-items: center;
    }
  }
  .noTitle {
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .say {
      width: 100%;
      height: 50vh;
      border-radius: 15px;
      background-color: rgba(240, 228, 228, 0.7);
      box-shadow: 1px 4px 3px 1px rgba(0, 0, 0, 0.2);
      margin-bottom: 7vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .sayText {
        color: #333333;
        font-size: 1.4em;
        font-weight: 600;
        padding-top: 10px;
        padding-bottom: 20px;
      }
    }
    .clock {
      width: 90%;
      height: 15vh;
      border-radius: 20px;
      background-color: rgba(233, 202, 192, 0.7);
      box-shadow: 1px 4px 3px 1px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      .clockText {
        font-size: 2em;
        margin-left: 20px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
