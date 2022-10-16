<template>
  <view class="father">
    <div class="scan">
      <div class="text">
        <div id="Id">{{ id }}</div>
        <div id="smalll">编辑</div>
      </div>
      <div class="picture">
        <image
          id="icon"
          @click="scanCode()"
          src="../../../static/scan.png"
        ></image>
      </div>
      <div class="tips">扫一扫长辈的二维码，绑定我的拾忆</div>
    </div>
    <view class="bindList">
      <div id="list">绑定列表</div>
      <div class="list1" v-for="(item, i) in bindList" :key="i">
        <div class="left">
          <div class="person">{{ item.person }}</div>
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
    return {
      id: "静待",
      bindList: [
        { person: "妈妈" },
        { person: "爸爸" },
        { person: "爷爷" },
        { person: "奶奶" },
      ],
    };
  },
  methods: {
    scanCode() {
      uni.scanCode({
        success: function (res) {
          console.log("扫码内容:", res.result);
        },
      });
    },
  },
};
</script>

<style lang="scss">
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
  opacity: 0.7;
}
.scan {
  margin: 45px;
  width: 280px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.9);
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
    margin-right: 5px;
    padding: 4px;
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
    padding: 10px;
  }
  .list1 {
    height: 40px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    font-size: 18px;
    background-color: rgba(255, 255, 255, 0.4);
    border-bottom: 1px solid #f5f4f5;
    .jiebang {
      margin-left: 3px;
      background-color: #98ca5a;
      color: #ffff;
      font-size: 15px;
      border-radius: 5px;
      width: 35px;
      height: 22px;
      text-align: center;
      justify-content: center;
    }
  }
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bianji {
    margin-left: 3px;
    background-color: #ccd2c5;
    color: black;
    font-size: 11px;
    border-radius: 5px;
    width: 30px;
    height: 16px;
    text-align: center;
    justify-content: center;
  }
}
</style>
