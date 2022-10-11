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
        <div class="bottomBtn bottomLeft">按住说话</div>
        <div class="bottomBtn bottomRight">确认收到</div>
      </div>
    </div>
  </view>
</template>

<script>
import { sleep } from "../../../common/utils";
export default {
  data() {
    return {
      childName: "",
      itemDetail: [],
      innerAudioContext: {},
    };
  },
  onShow: function () {
    uni.hideHomeButton();
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
      item.state == 0 ? (item.state = 1) : (item.state = 0);
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
  },
  onLoad() {
    this.innerAudioContext = uni.createInnerAudioContext();
    this.innerAudioContext.autoplay = true;
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
      width: 38%;
      font-size: 1.4em;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 15px;
      box-shadow: 1px 5px 2px 1px rgba(0, 0, 0, 0.2);
    }
    .bottomLeft {
      background-color: #ede7e3;
    }
    .bottomRight {
      background-color: #f3e2c6;
    }
  }
}
</style>
