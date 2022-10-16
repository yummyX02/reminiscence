<template>
  <view class="father">
    <div class="person" @click="change(e)">
      <!-- <div class="text">
        <text>{{ person }}</text>
      </div> -->
      <!-- <view class="foot">
        <uni-icons type="plusempty" size="30" @click="showCard()"></uni-icons>
      </view> -->
      <uni-data-select
        v-model="value"
        :localdata="range"
        @change="change"
        :clear="false"
      >
      </uni-data-select>
      <uni-icons type="plusempty" size="30" @click="showCard()"></uni-icons>
    </div>
    <!-- 具体信息 -->
    <div class="info">
      <view class="top">
        <input
          class="ipt2"
          type="text"
          v-model="data"
          placeholder="请输入内容"
        />
      </view>
      <div class="bottom">
        <div class="alerk" @click="setcolckPop">
          <image id="icon" src="../../../static/clerk.png"></image>
          <uni-popup ref="colckDialog" type="dialog">
            <view class="popup-date">
              <uni-datetime-picker
                returnType="timestamp"
                v-model="clockDate"
                @change="changeLog($event)"
              />
            </view>
          </uni-popup>
        </div>
        <div class="luyin" @longtap="saysay" @touchend="saydone">
          <image id="icon" src="../../../static/huatong-2.png"></image>
          <uni-popup ref="popup" type="dialog">
            <view class="popup-content">
              <uni-icons type="mic-filled" size="30"></uni-icons>
              <text class="text">录音中...</text>
            </view>
          </uni-popup>
        </div>
      </div>
      
    </div>
    <div class="usless">
        <image id="addmsg" src="../../../static/xinjian01.png"></image>
      </div>
    <view class="perText">
      <div class="preText">预听语音</div>
    </view>
    <view class="send" @click="send()">
      <image id="sendIcon" src="../../../static/fasong-3.png"></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      type: "center",
      person: "静待",
      value: "",
      range: [
      ],
      voicePath: "",
      voiceLength: 0,
      recorderManager: {},
      innerAudioContext: {},
      clockDate: "",
      timestamp: "",
      title: "",
      data: "",
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
    const data1 = {
      userId: uni.getStorageSync("userId"),
    };
    uni.$http.get("/child/outbox/all-video-packet", data1).then((res) => {
      console.log("这里是获取所有语音包", res);
      if (res.data.code === "00000") {
        uni.setStorageSync("videoId", res.data.videoId);
      }
    });
  },
  methods: {
    showCard() {
      console.log("展示收件人列表");
    },
    change(e) {
      console.log("e:", e);
      console.log("input框的数据是：", this.data);
      uni.$http.get("/child/voice-packet/all-parent").then((res) => {
        console.log(res);
        if (res.data.code === "00000") {
          console.log("请求成功啦~", res.data.data);
          this.range = res.data.data;
          console.log(this.range);
        }
      });
    },
    toggle(type) {
      this.type = type;
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup.open(type);
    },
    setcolckPop() {
      this.$refs.colckDialog.open();
    },
    // 录音部分
    saysay() {
      console.log("saysay");
      this.toggle("center");
      this.startRecord();
    },
    saydone() {
      console.log("saydone");
      this.endRecord();
      this.$refs.popup.close();
      setTimeout(() => {
        this.$refs.inputDialogText.open();
      }, 1000);
    },
    changeLog(e) {
      console.log("change事件:", e);
      this.timestamp = e;
      setTimeout(() => {
        this.$refs.colckDialog.close();
      }, 800);
      setTimeout(() => {
        this.addSchedule();
      }, 1000);
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
    send() {
      const data = {
        userId: uni.getStorageSync("userId"),
        parentId: 5,
        boxTime: this.timestamp / 1000,
        videoScheduleParamList: [
          {
            videoId: 3,
            data: this.data,
            time: this.timestamp / 1000,
          },  
        ],
      };
      uni.$http
        .post("/child/outbox/creat-out-box", data)
        .then((res) => {
          console.log(res);
          if(res.data.code === "00000"){
             uni.showToast({
                title: "发件成功",
                icon: "success",
                duration: 3000,
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.clock {
  width: 90%;
  height: 15vh;
  border-radius: 20px;
  background-color: rgba(233, 202, 192, 0.7);
  box-shadow: 1px 4px 3px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  .clockText {
    font-size: 2em;
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
}
.alerk {
  display: flex;
}
.father {
  overflow: hidden;
  position: relative;
  height: 100vh;
  background-color: wheat;
  opacity: 0.8;
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
  justify-content: space-between;
  height: 40px;
  margin: 30px 20px;
  background-color: #fff;
  border-radius: 20px;
  padding: 8px;
  box-shadow: 5px 5px 5px #c1c1c1;
  font-size: 20px;
  align-items: center;
}
.info {
  height: 30vh;
  margin: 50px 20px;
  background-color: #fff;
  border-radius: 20px;
  padding: 8px;
  box-shadow: 5px 5px 5px #c1c1c1;
  position: relative;
  #icon {
    width: 40px;
    height: 40px;
    padding: 5px;
  }
  .top {
    padding: 10px;
  }
  .bottom {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: flex;
  }
}
.send {
  width: 100px;
  height: 100px;
  // 垂直水平居中代码
  // position: absolute;
  // left: 50%;
  // top: 50%;
  // margin-left: -50px;
  // margin-top: -5px;
  position: absolute;
  right: 10px;
  bottom: 10px;
}
#sendIcon {
  width: 100px;
  height: 100px;
}
.perText {
  position: absolute;
  left: 50%;
  margin-left: -50px;
  bottom: 30px;
  box-shadow: 5px 5px 5px #c1c1c1;
  border-radius: 10px;
  .preText {
    font-size: 18px;
    width: 100px;
    height: 40px;
    // 控制文本垂直居中
    line-height: 40px;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    vertical-align: middle;
  }
}
#addmsg {
  width: 50px;
  height: 50px;
  margin-left: 50%;
  left: -25px;
  // background-color: #fff;
}
</style>
