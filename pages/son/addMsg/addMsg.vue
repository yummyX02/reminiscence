<template>
  <view class="father">
    <div class="person">
      <uni-data-select
        v-model="nameListValue"
        :localdata="range"
        @change="parentChange"
        :clear="false"
        placeholder="请选择收件人"
      >
      </uni-data-select>
    </div>
    <uni-popup ref="colckDialog" type="dialog">
      <view class="popup-date">
        <span style="margin-bottom: 20px; font-size: 1.1em">设置日程提醒</span>
        <uni-datetime-picker
          returnType="timestamp"
          v-model="clockDate"
          @change="changeLog($event)"
        />
      </view>
    </uni-popup>
    <uni-popup ref="voiceList" type="dialog">
      <view class="popup-date">
        <span style="margin-bottom: 20px; font-size: 1.1em">请选择语音包</span>
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
    <uni-popup ref="popup" type="dialog">
      <view class="popup-content">
        <uni-icons type="mic-filled" size="30"></uni-icons>
        <text class="text">录音中...</text>
      </view>
    </uni-popup>
    <!-- 具体信息 -->
    <div class="info">
      <div class="longAn">选择语音包或长按录音</div>
      <view class="top">
        <input
          class="ipt2"
          type="text"
          v-model="data"
          placeholder="请输入发件主题"
        />
      </view>
      <div class="bottom">
        <div class="voiceList bottomChild" @click="getVoiceList">
          <image id="icon" src="../../../static/voicelist.png"></image>
        </div>
        <div
          class="luyin bottomChild"
          @longtap="saysay"
          @touchend="saydone"
          style="margin-left: 11px"
        >
          <image id="icon" src="../../../static/huatong-2.png"></image>
        </div>
        <div
          class="alerk bottomChild"
          @click="setcolckPop"
          style="margin-left: 6px; margin-bottom: 3px"
        >
          <image id="icon" src="../../../static/clerk.png"></image>
        </div>
      </div>
    </div>
    <!-- 具体信息add -->
    <div class="info" v-if="pdAdd()">
      <div class="longAn">选择语音包或长按录音</div>
      <view class="top">
        <input
          class="ipt2"
          type="text"
          v-model="data"
          placeholder="请输入发件主题"
        />
      </view>
      <div class="bottom">
        <div class="voiceList bottomChild" @click="getVoiceList">
          <image id="icon" src="../../../static/voicelist.png"></image>
        </div>
        <div class="luyin bottomChild" @longtap="saysay" @touchend="saydone">
          <image id="icon" src="../../../static/huatong-2.png"></image>
        </div>
        <div class="alerk bottomChild" @click="setcolckPop">
          <image id="icon" src="../../../static/clerk.png"></image>
        </div>
      </div>
    </div>
    <div class="addIcon">
      <image id="addmsg" src="../../../static/add.png" @click="add"></image>
    </div>
    <div class="lastBottom">
      <view class="perText" style="margin-right: 20px" @click="playVoice">
        <div class="preText bot">
          <uni-icons type="sound-filled" size="30"></uni-icons>
          预听语音
        </div>
      </view>
      <view class="send" @click="send">
        <div class="send bot">
          <uni-icons type="paperplane-filled" size="30"></uni-icons>
          一键发送
        </div>
      </view>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      yesAdd: false,
      voiceSec: "",
      voiceList: [],
      parentId: 0,
      type: "center",
      person: "静待",
      nameListValue: "",
      range: [],
      voicePath: "",
      voiceLength: 0,
      recorderManager: {},
      innerAudioContext: {},
      clockDate: "",
      timestamp: 0,
      title: "",
      data: "",
      videoId: 0,
      yesVideo: false,
      getLength: {
        startTimestamp: 0,
        endTimestamp: 0,
      },
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
      self.getLength.endTimestamp = Date.now();
      self.voicePath = res.tempFilePath;
      self.voiceLength = parseInt(
        (self.getLength.endTimestamp - self.getLength.startTimestamp) / 1000 + 1
      );
    });
    const data = { userId: uni.getStorageSync("userId") * 1 };
    uni.$http.get("/child/voice-packet/all-parent", data).then((res) => {
      console.log(res);
      if (res.data.code === "00000") {
        console.log("获取parentList成功啦~", res.data.data);
        this.range = res.data.data;
        console.log(this.range);
      }
    });
  },
  methods: {
    startRecord() {
      console.log("开始录音");
      this.getLength.startTimestamp = Date.now();
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
    showCard() {
      console.log("展示收件人列表");
    },
    parentChange(e) {
      console.log("parentList框的数据是:", e);
      if (e) {
        this.parentId = e;
      }
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
      if (this.data == "") {
        uni.showToast({
          icon: "none",
          title: "请先填写发件主题",
        });
      } else {
        this.toggle("center");
        this.yesVideo = true;
        this.startRecord();
      }
    },
    saydone() {
      console.log("saydone");
      setTimeout(() => {
        if (this.yesVideo) {
          this.endRecord();
          this.$refs.popup.close();
          console.log(this.voiceLength);
          if (this.voiceLength < 1) {
            uni.showToast({
              icon: "error",
              title: "录音时间太短",
            });
          } else {
            uni.uploadFile({
              url: "https://43.142.146.75:38080/child/voice-packet/submit", //仅为示例，非真实的接口地址
              filePath: this.voicePath,
              name: "file",
              formData: {
                userId: uni.getStorageSync("userId") * 1,
                data: this.data,
                length: this.voiceLength,
              },
              header: {
                "content-type": "multipart/form-data",
                Authorization: uni.getStorageSync("token"),
              },
              success: (uploadFileRes) => {
                console.log("addMsg", JSON.parse(uploadFileRes.data));
                let data = JSON.parse(uploadFileRes.data);
                if (data.code == "00000") {
                  console.log("录音上传成功");
                  this.videoId = data.data.videoId;
                  setTimeout(() => {
                    this.$refs.colckDialog.open();
                  }, 800);
                }
              },
            });
          }
        } else {
          uni.showToast({
            icon: "none",
            title: "长按进行录音",
          });
        }
      }, 1000);
    },
    changeLog(e) {
      console.log("change事件:", e);
      this.timestamp = e;
      setTimeout(() => {
        this.$refs.colckDialog.close();
      }, 800);
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
        setTimeout(() => {
          this.$refs.colckDialog.open();
        }, 1100);
      }
    },
    colckDialogClose() {
      this.$refs.colckDialog.close();
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
      // this.voiceList = [
      //   {
      //     text: "备忘录schedule",
      //     value: "3",
      //     voicePath: "https://qiniu.tzih.work/1664596860.wav",
      //   },
      //   {
      //     text: "反馈video",
      //     value: "4",
      //     voicePath: "https://qiniu.tzih.work/1664596860.wav",
      //   },
      // ];
    },
    add() {
      console.log("add");
      this.yesAdd = true;
    },
    pdAdd() {
      return this.yesAdd;
    },
    send() {
      if (this.parentId == 0) {
        uni.showToast({
          icon: "error",
          title: "请选择收件人",
        });
      } else if (this.videoId == 0) {
        uni.showToast({
          icon: "error",
          title: "请选择语音包或长按录音",
        });
      } else if (this.timestamp == 0) {
        uni.showToast({
          icon: "error",
          title: "请设置提醒时间",
        });
      } else {
        const data = {
          userId: uni.getStorageSync("userId"),
          parentId: this.parentId,
          boxTime: this.timestamp / 1000,
          videoScheduleParamList: [
            {
              videoId: this.videoId,
              data: this.data,
              time: this.timestamp / 1000,
            },
          ],
        };
        uni.$http.post("/child/outbox/creat-out-box", data).then((res) => {
          console.log("新建发件", res);
          if (res.data.code === "00000") {
            console.log("新建发件成功");
            uni.showToast({
              icon: "success",
              title: "发送成功",
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/son/message/message",
              });
            }, 2500);
          }
        });
      }
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
  // opacity: 0.8;
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
  justify-content: center;
  height: 40px;
  margin: 30px 20px;
  background-color: #fff;
  border-radius: 20px;
  padding: 8px;
  padding-left: 15px;
  box-shadow: 5px 5px 5px #c1c1c1;
  font-size: 20px;
  align-items: center;
  /deep/ .uni-select__input-box {
    height: 37px;
    width: 270px;
  }
  /deep/ .uni-select__input-placeholder {
    color: #999999;
    font-size: 17px;
  }
}
/deep/ .uni-select__input-box {
  height: 37px;
  width: 230px;
}
/deep/ .uni-select__input-placeholder {
  color: #999999;
  font-size: 15px;
}
.popup-content {
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  height: 90px;
  width: 120px;
  background-color: #fff;
  font-size: 1.4em;
}
.info {
  height: 28vh;
  margin: 20px 20px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #c1c1c1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  #icon {
    width: 40px;
    height: 40px;
    padding: 5px;
  }
  .longAn {
    font-size: 1.2em;
    margin-top: 10px;
  }
  .top {
    // padding: 10px;
    // height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .ipt2 {
      text-align: center;
      border: 2px solid #c1c1c1;
      border-radius: 10px;
      height: 40px;
      width: 250px;
      color: #9d9d9d;
    }
  }
  .bottom {
    box-sizing: border-box;
    width: 100%;
    padding-right: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
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
.addIcon {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#sendIcon {
  width: 100px;
  height: 100px;
}
.lastBottom {
  position: absolute;
  bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .bot {
    font-size: 1.2em;
    width: 150px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 5px 5px 5px #c1c1c1;
  }
}
#addmsg {
  width: 50px;
  height: 50px;
}
</style>
