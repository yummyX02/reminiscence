<template>
  <view class="father">
    <div class="card">
      <div class="top">{{ cardInfo.name }}</div>
      <div class="events">
        <div
          class="list"
          v-for="(index, i) in cardInfo.VoiceRecordingResult"
          :key="i"
        >
          <div class="left">
            <image
              id="icon"
              src="../../../static/duigou.png"
              v-if="index.state"
            ></image>
            <text>{{ index.data }}</text>
            <image id="icon" src="../../../static/jibao.png"></image>
          </div>
          <div class="right">
            {{ index.times }}
          </div>
        </div>
      </div>
      <div class="radio">
        <image id="png" src="../../../static/bofang.png"></image>
      </div>
    </div>
    <view class="response">
      <text>反馈:</text>
      <view class="yuyin" @tap="playVoice">
        <div class="left">
          <image class="yuyinIcon" src="../../../static/bofang.png"></image>
        </div>
        <div class="right">
          <text>{{ length }}s</text>
        </div>
      </view>
    </view>
  </view>
</template>

<script>
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();

innerAudioContext.autoplay = true;
export default {
  data() {
    return {
      length: "",
      cardInfo: {
        name: "妈妈",
        VoiceRecordingResult: [
          {
            data: "吃药",
            videoUrl: "",
            times: "8:00",
            state: "true",
          },
        ],
        voiceUrl: "https://qiniu.tzih.work/1664596860.wav",
      },
    };
  },
  onLoad() {
    const arr = uni.getStorageSync("myId");
    const i = uni.getStorageSync("index");
    const parentId = arr[i].parentId;
    const scheduleBoxId = arr[i].scheduleBoxId;
    const childId = uni.getStorageSync("userId");
    console.log("parentId是：", parentId);

    let data = {
      parentId,
      childId,
      scheduleBoxId,
    };
    uni.$http
      .get("/child/outbox/details", data)
      .then((res) => {
        console.log(res);
        if (res.data.code === "00000") {
          this.cardInfo.name = res.data.data.name;
          if (res.data.data.feedBackResultList.length) {
            this.length = res.data.data.feedBackResultList[0].length;
            this.voiceUrl = res.data.data.feedBackResultList[0].videoUrl;
          }
          this.cardInfo.VoiceRecordingResult = res.data.data.voiceRecordingList;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // 播放语音
    let self = this;
    recorderManager.onStop(function (res) {
      console.log("recorder stop" + JSON.stringify(res));
      self.voicePath = res.tempFilePath;
    });
  },
  methods: {
    playVoice() {
      console.log("播放录音");

      if (this.voicePath) {
        innerAudioContext.src = this.voicePath;
        innerAudioContext.play();
      }
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
}
.response {
  padding: 5px 22px;
  width: 80vw;
  height: 30vh;
  margin-top: 50px;
  margin-left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
}
.yuyinIcon {
  width: 30px;
  height: 30px;
}
.yuyin {
  display: flex;
  border-radius: 20px;
  background-color: #e8e3e1;
  margin-top: 8px;
  padding: 2px 8px;
  justify-content: space-between;
  align-items: center;
  height: 45px;
}
.card {
  padding: 10px;
  width: 80vw;
  height: 40vh;
  margin-top: 30px;
  margin-left: 50%;
  transform: translateX(-50%);
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 5px 5px 5px #c1c1c1;
  .events {
    margin-top: 8px;
    .left {
      display: flex;
      justify-content: space-around;
      #icon {
        padding: 0 3px;
      }
    }
  }
}
.top {
  font-size: 22px;
}
.list {
  display: flex;
  justify-content: space-between;
  padding: 5px 18px;
  #icon {
    width: 20px;
    height: 20px;
  }
}
.radio {
  position: absolute;
  bottom: 5px;
  right: 5px;
  #png {
    width: 40px;
    height: 40px;
  }
}
</style>