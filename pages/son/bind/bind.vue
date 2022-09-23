<template>
  <view>
    <div class="scan">
      <div class="text">
        <div id="Id">用户名</div>
        <div id="smalll">编辑</div>
      </div>
      <div class="picture">
        <image id="icon" src="../../../static/scan.png"></image>
      </div>
      <div class="tips">扫一扫长辈的二维码，绑定我的拾忆</div>
    </div>
    <view class="bindList">
      <div id="list">绑定列表</div>
      <div class="list1">
        <div class="left">
          <div class="person">妈妈</div>
          <div class="bianji">编辑</div>
        </div>
        <div class="jiebang">解绑</div>
      </div>
      <div class="list1">
        <div class="left">
          <div class="person">妈妈</div>
          <div class="bianji">编辑</div>
        </div>
        <div class="jiebang">解绑</div>
      </div>
    </view>
  </view>
</template>

<script>
import uniDataPickerview from "../../../uni_modules/uni-data-picker/components/uni-data-pickerview/uni-data-pickerview.vue";
export default {
  components: { uniDataPickerview },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.scan {
  margin: 45px;
  width: 280px;
  height: 300px;
  background-color: aquamarine;
  border: 1px solid black;
  border-radius: 20px;
  .text {
    display: flex;
    padding: 5px;
    align-items: center;
  }
  .picture {
    display: flex;
    justify-content: center;
  }
  .tips {
    padding: 15px;
    font-size: 15px;
    color: #d0c8c8;
  }
  #Id {
    font-size: 25px;
  }
  #smalll {
    background-color: #98ca5a;
    color: #fff;
    font-size: 12px;
    border-radius: 5px;
    width: 40px;
    height: 20px;
    text-align: center;
    justify-content: center;
  }
  #icon {
    width: 180px;
    height: 180px;
  }
}
.bindList {
  #list {
    font-size: 25px;
  }
  .list1 {
    display: flex;
    justify-content: space-between;
  }
  .left {
    display: flex;
  }
}
</style>
