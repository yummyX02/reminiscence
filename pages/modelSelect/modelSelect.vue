<template>
  <view>
    <div class="big">
      <div class="title">选择模式</div>
      <div class="model">
        <div class="young" @click="youngModel">
          <div class="youngIn">
            <div class="topTitle">子女模式</div>
            <div class="bottomTitle">帮助长辈添加注意事项</div>
          </div>
        </div>
        <div class="old" @click="oldModel">
          <div class="oldIn">
            <div class="topTitle">老人模式</div>
            <div class="bottomTitle">提醒待做事项</div>
          </div>
        </div>
      </div>
      <div class="select">
        <uni-data-checkbox
          :multiple="true"
          v-model="limitValue"
          :localdata="range"
        ></uni-data-checkbox>
      </div>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      limitValue: 0,
      range: [
        {
          value: 0,
          text: "  下次自动选择相同模式",
        },
      ],
    };
  },
  methods: {
    youngModel() {
      console.log("youngModel");
    },
    oldModel() {
      console.log("oldModel");
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/old/home/home",
        });
      }, 0);
    },
  },
};
</script>

<style lang="less" scoped>
.big {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .title {
    font-size: 2.2em;
  }
  .model {
    width: 85%;
    height: 60%;
    .young {
      width: 100%;
      height: 43%;
      background-image: url("https://gitee.com/cccat-best/picgo/raw/master/picgo-picture/youngModel.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      border-radius: 10px;
      margin-bottom: 25px;
      color: #52976f;
      position: relative;
      .youngIn {
        position: absolute;
        top: 15%;
        left: 10%;
      }
    }
    .old {
      width: 100%;
      height: 43%;
      background-image: url("https://gitee.com/cccat-best/picgo/raw/master/picgo-picture/oldModel.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      border-radius: 10px;
      color: #5976ba;
      position: relative;
      .oldIn {
        position: absolute;
        top: 15%;
        left: 10%;
      }
    }
    .topTitle {
      font-size: 1.5em;
      font-weight: 600;
    }
    .bottomTitle {
      font-size: 0.9em;
      padding-top: 10px;
      padding-left: 10px;
    }
  }
  .select {
    padding-bottom: 25%;
  }
}
</style>
