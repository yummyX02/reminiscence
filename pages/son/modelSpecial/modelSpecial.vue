<template>
  <view class="father">
    <view class="img">
      <image id="imge" src="../../../static/naozhong.png"></image>
    </view>
    <view class="remind">
      <input id="ipt" type="text" placeholder="请输入提醒内容">
      <text id="txt">最多八个字</text>
    </view>
    <view class="bottom">
      <image id="icon" src="../../../static/bofang.png"></image>
      <image id="icon1"  src="../../../static/yuyin.png"></image>
      <image id="icon"  src="../../../static/xinjian01.png"></image>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss" scpoed>
.father{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.img{
  margin-top: 30px;
}
#imge{
  width: 100px;
  height: 100px;
}
.remind{
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  #ipt{
    font-size: 22px;
    text-align: center;
    width: 70vw;
    height: 60px;
    border: none;
    border-bottom: 1px solid black;
  }
  #txt{
    margin-top: 5px;
    font-size: 15px;
  }
}
.bottom{
  margin-top: 80px;
  display: flex;
  #icon{
    width: 100px;
    height: 100px;
  padding: 12px;
  }
  #icon1{
    width: 120px;
    height: 120px;
  }
}
</style>
