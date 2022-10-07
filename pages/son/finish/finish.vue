<template>
  <view class="father">
    <div class="top">恭喜完成录制</div>
    <view class="img">
      <image id="imge" src="../../../static/shouyinji-2.png"></image>
      <div class="text">不要忘记提交音频哦</div>
    </view>
    <div class="bottom" @click="gotoPkg()">点击提交音频</div>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    gotoPkg(){
      uni.navigateTo({
        url: "/pages/son/bianji/bianji",
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.father {
  background-color: #f9f9f9;
}
.top {
  font-size: 22px;
  text-align: center;
  margin-top: 30px;
}
#imge {
  width: 200px;
  height: 200px;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 50px;
  margin-bottom: 50px;
}
.text{
  text-align: center;
  font-size: 20px;
}
.bottom {
  font-size: 18px;
  width: 300px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background-color: #ffffff;
  margin-top: 180px;
  margin-left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
  box-shadow: 10px 5px 5px #c1c1c1;

}
</style>
