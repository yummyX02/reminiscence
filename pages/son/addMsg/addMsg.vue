<template>
  <view>
    <uni-card class="person">
      <text>收件人</text>
      <view class="foot">
        <input class="ipt" type="text" />
        <uni-icons type="plusempty" size="30"></uni-icons>
      </view>
    </uni-card>
    <!-- 具体信息 -->
    <uni-card>
      <view class="top">
        <input class="ipt2" type="text" placeholder="请输入内容" />
      </view>
      <view class="bottom">
        <uni-icons type="notification" size="30"></uni-icons
        ><uni-icons type="mic" size="30"></uni-icons>
      </view>
    </uni-card>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
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
  background-color: aquamarine;
}
.ipt2{
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
</style>
