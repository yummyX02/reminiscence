<template>
  <view class="father">
    <view class="top">
      <view class="classical">
        <div class="top">经典模式</div>
        <div class="bottom">只需下载语音包，即可快速生成语音</div>
      </view>
      <view class="special" @click="gotoSpecial()">
        <div class="top">定制模式</div>
        <div class="bottom">录入专属语句，快速生成语音包</div>
      </view>
    </view>
    <view class="foot">
      <view class="star">
        ————————<uni-rate v-model="rateValue" @change="onChange" />————————
      </view>
      <text class="txt">已有语音包</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    gotoSpecial() {
      uni.navigateTo({
        url: "/pages/son/modelSpecial/modelSpecial",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.father {
  overflow: hidden;
  position: relative;
  height: 100vh;
  // background-color: wheat;
  background-image: linear-gradient(
      rgba(171, 211, 218, 0.7),
      rgba(234, 217, 178, 0.7)
    ),
    url("../../../static/login.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
}
.foot {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.star {
  display: flex;
  padding-bottom: 20px;
  padding-top: 30px;
}
.txt {
  font-size: 20px;
}
.special {
  padding: 5px 18px;
  width: 82vw;
  height: 10vh;
  margin-left: 15px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  box-shadow: 10px 5px 5px #c1c1c1;
  text-align: center;
  vertical-align: middle;
  margin-top: 20px;
  .top{
    font-size: 22px;
  }
  .bottom{
    font-size: 12px;
  }
}
.classical{
  margin-top: 20px;
   padding: 5px 18px;
  width: 82vw;
  height: 10vh;
  margin-left: 15px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  box-shadow: 10px 5px 5px #c1c1c1;
  text-align: center;
  vertical-align: middle;
  .top{
    font-size: 22px;
  }
  .bottom{
    font-size: 12px;
  }
}
</style>
