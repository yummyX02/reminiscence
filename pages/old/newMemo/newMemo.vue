<template>
  <view>
    <div class="big">
      <div class="title">
        <div class="back" @click="back">
          <uni-icons type="back" size="45" color="#99979b"></uni-icons
          ><span style="font-size: 1.4em">返回</span>
        </div>
      </div>
      <div class="noTitle">
        <div class="say" @longtap="saysay" @touchend="saydone">
          <img
            src="https://gitee.com/cccat-best/picgo/raw/master/picgo-picture/huatong-2.png"
            style="height: 200px; width: 200px"
          />
          <div class="sayText">长按说出备忘事项</div>
        </div>
        <uni-popup ref="popup" type="dialog">
          <view class="popup-content">
            <uni-icons type="mic-filled" size="30"></uni-icons>
            <text class="text">录音中...</text>
          </view>
        </uni-popup>
        <uni-popup ref="inputDialogText" type="dialog">
          <uni-popup-dialog
            ref="inputClose"
            mode="input"
            title="输入标题"
            value=""
            placeholder="请输入内容"
            @confirm="dialogInputText($event)"
          ></uni-popup-dialog>
        </uni-popup>
        <div class="clock" @click="setcolckPop">
          <img
            src="https://gitee.com/cccat-best/picgo/raw/master/picgo-picture/naozhong.png"
            style="height: 70px; width: 70px"
          />
          <div class="clockText">闹钟设置</div>
        </div>
        <uni-popup ref="colckDialog" type="dialog">
          <view class="popup-date">
            <span style="margin-bottom: 20px; font-size: 1.1em"
              >设置日程提醒</span
            >
            <uni-datetime-picker
              returnType="timestamp"
              v-model="clockDate"
              @change="changeLog($event)"
            />
          </view>
        </uni-popup>
      </div>
    </div>
  </view>
</template>

<script>
import { addSchedule } from "@/uni_modules/vv-schedule";
export default {
  data() {
    return {
      yesVideo: false,
      voicePath: "",
      voiceLength: 0,
      recorderManager: {},
      innerAudioContext: {},
      clockDate: "",
      timestamp: "",
      title: "",
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
  },
  methods: {
    async addSchedule() {
      if (!this.yesVideo) {
        uni.showToast({
          title: "请先录音",
        });
      } else {
        if (this.voiceLength < 2) {
          uni.showToast({
            icon: "error",
            title: "录音时间太短",
          });
        } else {
          await addSchedule({
            title: this.title,
            description: "",
            dtstart: this.timestamp,
            dtend: this.timestamp,
          });
          uni.uploadFile({
            url: "https://43.142.146.75:38080/parent/memorandum/newly-build", //仅为示例，非真实的接口地址
            filePath: this.voicePath,
            name: "file",
            formData: {
              length: this.voiceLength,
              userId: uni.getStorageSync("userId"),
              data: this.title,
              time: this.timestamp / 1000,
            },
            header: {
              "content-type": "multipart/form-data",
              Authorization: uni.getStorageSync("token"),
            },
            success: (uploadFileRes) => {
              console.log("newMemo", JSON.parse(uploadFileRes.data));
              let data = JSON.parse(uploadFileRes.data);
              if (data.code == "00000") {
                uni.showToast({ title: "日程添加成功" });
              }
            },
          });
        }
      }
    },
    toggle(type) {
      this.type = type;
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup.open(type);
    },
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

    back() {
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/old/memo/memo",
        });
      }, 0);
    },
    saysay() {
      console.log("saysay");
      this.toggle("center");
      this.startRecord();
      this.yesVideo = true;
    },
    saydone() {
      console.log("saydone");
      setTimeout(() => {
        if (this.yesVideo) {
          this.endRecord();
          this.$refs.popup.close();
          if (this.voiceLength < 2) {
            uni.showToast({
              icon: "error",
              title: "录音时间太短",
            });
          } else {
            this.$refs.inputDialogText.open();
          }
        } else {
          uni.showToast({
            icon: "none",
            title: "长按进行录音",
          });
        }
      }, 1000);
    },
    dialogInputText(e) {
      this.title = e;
      setTimeout(() => {
        this.setcolckPop();
      }, 1000);
    },
    setcolckPop() {
      this.$refs.colckDialog.open();
    },
  },
};
</script>

<style lang="scss" scoped>
.big {
  height: 100vh;
  width: 100vw;
  overflow: scroll;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    url("../../../static/login.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    width: 100%;
    margin-bottom: 30px;
    .back {
      display: flex;
      align-items: center;
    }
  }
  .noTitle {
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .popup {
      border-radius: 10rpx;
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
    .say {
      width: 100%;
      height: 50vh;
      border-radius: 15px;
      background-color: rgba(240, 228, 228, 0.7);
      box-shadow: 1px 4px 3px 1px rgba(0, 0, 0, 0.2);
      margin-bottom: 7vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .sayText {
        color: #333333;
        font-size: 1.4em;
        font-weight: 600;
        padding-top: 10px;
        padding-bottom: 20px;
      }
    }
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
  }
}
</style>
