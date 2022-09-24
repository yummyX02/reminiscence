<template>
  <view>
    <view class="top">
      <uni-card title="经典模式" >
        <text class="uni-body"
          >只需下载语音包，即可快速生成语音</text
        >
      </uni-card>
      <uni-card title="定制模式">
        <text class="uni-body"
          >录入专属语句，快速生成语音包</text
        >
      </uni-card>
    </view>
    <view class="foot">
      <view class="star">
      ————————<uni-rate v-model="rateValue" @change="onChange" />————————
        
      </view>
      <text>已有语音包</text>
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

<style lang="scss">
.foot {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.star{
  display: flex;
  padding-bottom: 20px;
  padding-top: 30px;
}
</style>
