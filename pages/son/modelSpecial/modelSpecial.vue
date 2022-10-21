<template>
  <view class="father">
    <view class="img">
      <image id="imge" src="../../../static/shouyinji-2.png"></image>
    </view>
    <view class="remind">
      <input id="ipt" type="text" :value="value" placeholder="请输入提醒内容" />
      <text id="txt">最多八个字</text>
    </view>
    <view class="bottom">
      <div class="left">
        <image id="icon" src="../../../static/bofang-2.png"></image>
        <div class="text">试听</div>
      </div>
      <div class="middle" @longtap="saysay" @touchend="saydone">
        <image
          v-if="isShow"
          id="icon1"
          src="../../../static/luzhi.png"
          @click="change()"
        ></image>
        <image
          v-else
          id="icon1"
          src="../../../static/tubiaozhizuo-.png"
          @click="gotoFinish()"
        ></image>
        <div class="text" v-if="isShow">点击开始</div>
        <div class="text" v-else @click="gotoFinish()">点击结束</div>
      </div>
      <div class="right" @click="gotoSelect()">
        <image id="icon" src="../../../static/24gl-nextCircle.png"></image>
        <div class="text">完成</div>
      </div>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      isShow: true,
    };
  },
  onLoad() {
    this.recorderManager = uni.getRecorderManager();
    this.innerAudioContext = uni.createInnerAudioContext();
    this.innerAudioContext.autoplay = true;
    console.log("uni.getRecorderManager()", uni.getRecorderManager());
    let self = this;
    this.recorderManager.onStop(function (res) {
      console.log("recorder stop" + JSON.stringify(res));
      self.voicePath = res.tempFilePath;
      self.voiceLength = res.duration;
    });
  },
  methods: {
    change() {
      this.isShow = !this.isShow;
      this.saysay();
      this.startRecord();
    },
    gotoSelect() {
      console.log("输入的value值是:",this.value);
      // 提交语音包接口
      const data = {
        userId: uni.getStorageSync("userId"),
        data: "111",
      };
      uni.$http
        .post("/submit/child/voice-packet/submit", data)
        .then((res) => {
          console.log(res);
          if (res.data.code === "00000") {
            console.log("我去语音包界面啦~");
            uni.redirectTo({
              url: "/pages/son/selectPkg/selectPkg",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    gotoFinish() {
      this.saydone();
      this.endRecord();
      uni.showToast({
        title: "录制结束",
        icon: "success",
        duration: 2000,
      });
      this.isShow = !this.isShow;
    },
    // 录音部分
    saysay() {
      console.log("saysay");
      this.startRecord();
    },
    saydone() {
      console.log("saydone");
      this.endRecord();
    },
    startRecord() {
      console.log("开始录音");
      this.recorderManager.start({
        sampleRate: 16000, //采样率，App、小程序
        //encodeBitRate:96000,//仅小程序支持编码码率
        numberOfChannels: 1,
        format: "wav", //格式 aac/mp3/wav/PCM，App默认值为mp3，小程序默认值aac
      });
    },
    endRecord() {
      console.log("录音结束");
      this.recorderManager.stop();
      console.log(this.recorderManager);
    },
    playVoice() {
      console.log("播放录音");
      console.log("this.voicePath", this.voicePath);
      if (this.voicePath) {
        this.innerAudioContext.src = this.voicePath;
        this.innerAudioContext.play();
      }
    },
  },
};
</script>

<style lang="scss" scpoed>
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
    margin-top: 5px;
    font-size: 15px;
  }
}
.bottom {
  margin-top: 80px;
  display: flex;
  #icon {
    width: 60px;
    height: 60px;
    padding: 18px;
  }
  #icon1 {
    width: 110px;
    height: 110px;
  }
}
.left,
.middle,
.right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    margin-top: 15px;
  }
}
</style>
