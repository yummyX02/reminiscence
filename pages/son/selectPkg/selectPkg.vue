<template>
  <view class="father">
    <view class="top">
      <view class="classical" @click="toggle('center')">
        <div class="top">经典模式</div>
        <div class="bottom">只需下载语音包，即可快速生成语音</div>
      </view>
      <uni-popup ref="voiceList" type="dialog">
        <view class="popup-date">
          <span style="margin-bottom: 20px; font-size: 1.1em"
            >请选择语音包</span
          >
          <uni-data-select
            v-model="voiceSec"
            :localdata="voiceList"
            @change="voiceChange"
            :clear="false"
            placeholder="请选择语音包"
          >
          </uni-data-select>
        </view>
      </uni-popup>
      <view class="special" @click="gotoSpecial()">
        <div class="top">定制模式</div>
        <div class="bottom">录入专属语句，快速生成语音包</div>
      </view>
    </view>
    <view class="foot">
      <view class="star">
        <div class="len"></div>
        <uni-rate v-model="rateValue" @change="onChange" />
        <div class="len"></div>
      </view>
      <text class="txt">已有语音包</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      voicePath: "",
      data: "",
      voiceSec: "",
      voiceList: "",
      rateValue: 5,
      // 滚动条
      scrollTop: 0,
      old: {
        scrollTop: 0,
      },
      type: "center",
      videoList: [],
    };
  },
  methods: {
    gotoSpecial() {
      uni.navigateTo({
        url: "/pages/son/modelSpecial/modelSpecial",
      });
    },
    change(e) {
      console.log("当前模式：" + e.type + ",状态：" + e.show);
    },
    toggle(type) {
      this.type = type;
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.voiceList.open(type);
      // 获取语音包列表
      const data = {
        userId: uni.getStorageSync("userId"),
      };
      uni.$http
        .get("/child/outbox/all-video-packet", data)
        .then((res) => {
          console.log("获取语音包列表啦~", res);
          if (res.data.code === "00000") {
            console.log("获取所有语音包成功");
            this.voiceList = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    download() {
      uni.showToast({
        title: "下载成功",
        icon: "success",
        duration: 2000,
      });
    },
    getVoiceList() {
      this.$refs.voiceList.open();
      const data1 = {
        userId: uni.getStorageSync("userId"),
      };
      uni.$http.get("/child/outbox/all-video", data1).then((res) => {
        console.log("这里是获取所有语音包", res);
        if (res.data.code === "00000") {
          console.log("获取所有语音包成功");
          this.voiceList = res.data.data;
        }
      });
    },
    voiceChange(e) {
      console.log("voiceList框的数据是:", e);
      if (e) {
        this.videoId = e;
        let newVoice = this.voiceList.find((item) => item.value == e);
        this.data = newVoice.text;
        this.voicePath = newVoice.voicePath;
        console.log(newVoice);
        setTimeout(() => {
          this.$refs.voiceList.close();
        }, 800);
      }
    },
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
  flex-direction: column;
  text-align: center;
}
.star {
  display: flex;
  padding-bottom: 20px;
  padding-top: 30px;
  justify-content: center;
  align-items: center;
  .len {
    width: 50%;
    height: 1px;
    border-top: solid #acc0d8 1px;
  }
}
.txt {
  font-size: 20px;
}
.special {
  padding: 5px 18px;
  width: 82vw;
  height: 10vh;
  margin-left: 15px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  box-shadow: 10px 5px 5px #c1c1c1;
  text-align: center;
  vertical-align: middle;
  margin-top: 20px;
  .top {
    font-size: 22px;
  }
  .bottom {
    font-size: 12px;
  }
}
.classical {
  margin-top: 20px;
  padding: 5px 18px;
  width: 82vw;
  height: 10vh;
  margin-left: 15px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  box-shadow: 10px 5px 5px #c1c1c1;
  text-align: center;
  vertical-align: middle;
  .top {
    font-size: 22px;
  }
  .bottom {
    font-size: 12px;
  }
}
.infoBox {
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
  justify-content: center;
  height: 50px;
  width: 240px;
  background-color: #fff;
  .list {
    height: 50px;
    display: flex;
    flex-direction: column;
  }
}
// 滚动条
.scroll-Y {
  height: 500rpx;
}
uni-list-item {
  font-size: 20px;
}
// 语音包
.popup-date {
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  height: 70px;
  width: 240px;
  background-color: #fff;
}
</style>
