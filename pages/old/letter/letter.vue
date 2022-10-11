<template>
  <view>
    <div class="big">
      <div class="title">
        <div class="back" @click="back">
          <uni-icons type="back" size="45" color="#99979b"></uni-icons
          ><span style="font-size: 1.4em">返回</span>
        </div>
      </div>
      <div class="top">
        <div class="name">{{ childName }}:</div>
        <div class="bofangAll" @click="allPlay">
          <img
            src="https://gitee.com/cccat-best/picgo/raw/master/picgo-picture/bofang.png"
            alt=""
            style="height: 60px; width: 60px"
          />
          <div class="bofangText">一键播放</div>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in itemDetail" :key="index">
          <div class="itemLeft">
            <div class="itemLeftTop">
              <img
                :src="
                  item.state == 0
                    ? 'https://gitee.com/cccat-best/picgo/raw/master/picgo-picture/weixuanzhongyuanquan-2.png'
                    : 'https://gitee.com/cccat-best/picgo/raw/master/picgo-picture/zuanshihua.png'
                "
                alt=""
                style="height: 30px; width: 30px"
                @click="confirmRead(item, index)"
              />
              <div class="circleRight">{{ item.data }}</div>
            </div>
            <div class="itemLeftBottom">时间 {{ item.times }}</div>
          </div>
          <uni-popup :ref="'setClockConfirm' + item.voiceId" type="dialog">
            <uni-popup-dialog
              type="info"
              cancelText="关闭"
              confirmText="确定"
              content="是否确认收到并设置日程"
              @confirm="setClockConfirm(item)"
            ></uni-popup-dialog>
          </uni-popup>
          <div class="itemRight">
            <img
              src="https://gitee.com/cccat-best/picgo/raw/master/picgo-picture/bofang.png"
              alt=""
              style="height: 50px; width: 50px"
              @click="itemPlay(item)"
            />
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottomBtn bottomLeft" @longtap="saysay" @touchend="saydone">
          按住说话
        </div>
        <!-- <div class="bottomBtn bottomRight" @click="resDone">确认收到</div> -->
      </div>
      <uni-popup ref="popup" type="dialog">
        <view class="popup-content">
          <uni-icons type="mic-filled" size="30"></uni-icons>
          <text class="text">录音中...</text>
        </view>
      </uni-popup>
    </div>
  </view>
</template>

<script>
import { addSchedule } from "@/uni_modules/vv-schedule";
export default {
  data() {
    return {
      childName: "",
      itemDetail: [],
      innerAudioContext: {},
      voicePath: "",
      voiceLength: 0,
      recorderManager: {},
      innerAudioContext: {},
      resDoneVoiceList: [],
      formData: {},
      getLength: {
        startTimestamp: 0,
        endTimestamp: 0,
      },
    };
  },

  methods: {
    back() {
      const pages = getCurrentPages();
      console.log(pages.length);
      setTimeout(() => {
        uni.navigateBack({ delta: 1 });
      }, 0);
    },
    confirmRead(item) {
      if (item.state == 0) {
        this.$refs[`setClockConfirm${item.voiceId}`][0].open();
      }
    },
    async addSchedule(title, timestamp) {
      await addSchedule({
        title: title,
        description: "",
        dtstart: timestamp,
        dtend: timestamp,
      });
      uni.showToast({ title: "设置日程成功" });
    },
    setClockConfirm(item) {
      if (item.state == 0) {
        let videoIds = [];
        videoIds.push(item.voiceId);
        const data = {
          userId: uni.getStorageSync("userId"),
          videoIds: videoIds,
        };
        console.log(data);
        uni.$http
          .post("/parent/inbox/confirm", data)
          .then((res) => {
            console.log(res);
            if (res.statusCode == 200) {
              if (res.data.code == "00000") {
                this.addSchedule(item.data, item.timeStamp * 1000);
                item.state = 1;
              } else {
                console.log("确认收到失败==200");
                uni.showToast({
                  icon: "error",
                  title: "设置日程失败",
                });
              }
            } else {
              console.log("确认收到失败!=200");
              uni.showToast({
                icon: "error",
                title: "设置日程失败",
              });
            }
          })
          .catch((err) => {
            console.log(err, "确认收到失败");
            uni.showToast({
              icon: "error",
              title: "设置日程失败",
            });
          });
      }
    },
    itemPlay(item) {
      console.log(item);
      console.log("this.voicePath", item.videoUrl);
      this.innerAudioContext.src = item.videoUrl;
      console.log(this.innerAudioContext);

      this.innerAudioContext.play();
    },
    playOnebyone(arr, j, t) {
      console.log(j);
      console.log("length:", t);
      if (j < t) {
        arr[j].play();
        arr[j].onEnded(() => {
          ++j;
          this.playOnebyone(arr, j, t);
        });
      } else {
        return;
      }
    },
    allPlay() {
      let voiceList = [];
      this.itemDetail.forEach((item) => {
        voiceList.push(item.videoUrl);
      });
      console.log(voiceList);
      let allVoiceList = [];
      for (let i = 0; i < this.itemDetail.length; ++i) {
        allVoiceList[i] = uni.createInnerAudioContext();
        allVoiceList[i].autoplay = true;
        allVoiceList[i].src = voiceList[i];
        console.log("voiceList", voiceList[i]);
        console.log("allVoiceList", allVoiceList[i]);
      }
      let j = 0;
      this.playOnebyone(allVoiceList, j, this.itemDetail.length);
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
    saysay() {
      console.log("saysay");
      this.toggle("center");
      this.startRecord();
    },
    saydone() {
      console.log("saydone");
      this.endRecord();
      this.$refs.popup.close();
    },
    resDone() {
      console.log("resDone");
    },
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

      if (self.voiceLength < 3) {
        console.log("<3");
        uni.showToast({
          icon: "error",
          title: "录音时间太短",
        });
      } else {
        self.formData = {
          length: self.voiceLength * 1,
          parentId: uni.getStorageSync("userId") * 1,
          childId: uni.getStorageSync("oldDetailChildId") * 1,
          scheduleBoxId: uni.getStorageSync("oldDetailScheduleBoxId") * 1,
        };
        uni.uploadFile({
          url: "https://43.142.146.75:38080/parent/inbox/feedback", //仅为示例，非真实的接口地址
          filePath: res.tempFilePath,
          name: "file",
          formData: self.formData,
          header: {
            "content-type": "multipart/form-data",
            Authorization: uni.getStorageSync("token"),
          },
          success: (res) => {
            console.log("formData", self.formData);
            console.log("fankuiSay", res);
            let data = JSON.parse(res.data);
            if (data.code == "00000") {
              uni.showToast({ title: "发送成功" });
            }
          },
        });
      }
    });
    const data = {
      scheduleBoxId: uni.getStorageSync("oldDetailScheduleBoxId"),
      parentId: uni.getStorageSync("userId"),
      childId: uni.getStorageSync("oldDetailChildId"),
      time: uni.getStorageSync("oldDetailTimestamp"),
    };
    uni.$http
      .get("/parent/inbox/details", data)
      .then((res) => {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.code == "00000") {
            console.log("收件详细加载成功");
            this.childName = res.data.data.name;
            this.itemDetail = res.data.data.voiceRecordingList;
          } else {
            console.log("收件详细加载失败==200");
          }
        } else {
          console.log("收件详细加载失败!=200");
        }
      })
      .catch((err) => {
        console.log(err, "请求发送加载失败");
      });
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
    margin-bottom: 10px;
    .back {
      display: flex;
      align-items: center;
    }
  }
  .top {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      font-size: 2.8em;
    }
    .bofangAll {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .list {
    width: 90%;
    .item {
      width: 100%;
      height: 90px;
      margin-top: 10px;
      border-bottom: 1px #b2afaf solid;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .itemLeft {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: baseline;
        .itemLeftTop {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 3px;
          .circleRight {
            font-size: 2em;
            margin-left: 10px;
          }
        }
        .itemLeftBottom {
          color: #999696;
          font-size: 1em;
          margin-right: 10px;
        }
      }
      .itemRight {
        margin-bottom: 5px;
      }
    }
  }
  .bottom {
    position: absolute;
    background-color: #fff;
    padding: 5px 10px 0 10px;
    height: 130px;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    .bottomBtn {
      height: 60px;
      width: 60%;
      font-size: 1.4em;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 15px;
      box-shadow: 1px 5px 2px 1px rgba(0, 0, 0, 0.2);
    }
    .bottomLeft {
      background-color: #f3eadc;
    }
    .bottomRight {
      background-color: #ede7e3;
    }
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
}
</style>
