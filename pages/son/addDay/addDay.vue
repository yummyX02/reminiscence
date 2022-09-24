<template>
  <view>
    <view class="date">
      <text>日期</text>
      <view class="tag1">
        <uni-tag :circle="true" text="2021" type="default" size="mini" />
        <uni-tag :circle="true" text="11" type="default" size="mini" />
        <uni-tag :circle="true" text="23" type="default" size="mini" />
      </view>
    </view>
    <view class="event">
      <text>事件</text>
    </view>
    <view class="choice">
      <checkbox-group>
        <label>
          <checkbox
            value="cb"
            checked="true"
            color="#FFCC33"
            style="transform: scale(0.7)"
          />正数计数
        </label>
        <label>
          <checkbox
            value="cb"
            color="#FFCC33"
            style="transform: scale(0.7)"
          />倒数计数
        </label>
      </checkbox-group>
    </view>
    <view class="time">
      <text>提醒时间</text>
      <uni-tag :circle="true" text="当天" type="default" />
      <uni-tag :circle="true" text="1天前" type="default" />
      <uni-tag :circle="true" text="1周前" type="default" />
    </view>
    <view class="foot">
      
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
.date{
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid yellow;
}
</style>
