<template>
  <view class="father">
    <uni-card class="person">
      <text>收件人</text>
      <view class="foot">
        <input class="ipt" type="text" placeholder="请输入收件人"/>
        <uni-icons type="plusempty" size="30"></uni-icons>
      </view>
    </uni-card>
    <!-- 具体信息 -->
    <uni-card>
      <view class="top">
        <input class="ipt2" type="text" placeholder="请输入内容" />
        <view class="bottom">
          <uni-icons type="notification" size="30"></uni-icons
          ><uni-icons type="mic" size="30"></uni-icons>
        </view>
      </view>
    </uni-card>
    <view class="send">
      <image id="sendIcon" src="../../../static/fasong-3.png"></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
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
  justify-content: space-between;
}
.person {
  display: flex;
  flex-direction: row;
  height: 150px;
}
.ipt {
  // background-color: aquamarine;
}
.ipt2 {
  height: 150px;
}
.bottom {
  height: 300px;
  margin-top: 20px;
  position: fixed;
  right: 0;
  display: flex;
  align-self: flex-end;
}
.send {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -5px;
}
#sendIcon {
  width: 100px;
  height: 100px;
}
</style>
