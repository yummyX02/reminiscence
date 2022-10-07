<template>
  <view class="father">
    <div class="top">编辑</div>
    <view class="img">
      <image id="imge" src="../../../static/shouyinji-2.png"></image>
    </view>
    <view class="remind">
      <input id="ipt" type="text" placeholder="请输入提醒内容" />
      <text id="txt">最多八个字</text>
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
    gotoPkg() {
      console.log("我要跳转啦");
      uni.switchTab({
        url: "/pages/son/selectPkg/selectPkg",
        success(res){
          console.log(res);
        },
        fail(err){
          console.log(err);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.father {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.img {
  margin-top: 30px;
}
#imge {
  width: 100px;
  height: 100px;
}
.remind {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  #ipt {
    font-size: 22px;
    text-align: center;
    width: 70vw;
    height: 60px;
    border: none;
    border-bottom: 1px solid black;
  }
  #txt {
    margin-top: 20px;
    font-size: 15px;
  }
}
.bottom {
  font-size: 18px;
  width: 300px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background-color: #ffffff;
  margin-top: 180px;
  border-radius: 20px;
  box-shadow: 10px 5px 5px #c1c1c1;
}
</style>
