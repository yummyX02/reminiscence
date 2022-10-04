<template>
  <view>
    <div class="big">
      <div class="title">
        <div class="titleTop">
          <div class="leftTop">
            <div class="back" @click="back">
              <uni-icons type="back" size="45" color="#99979b"></uni-icons
              ><span style="font-size: 1.4em">返回</span>
            </div>
            <div class="ymd">{{ ymd }}</div>
          </div>
          <uni-calendar ref="calendar" :insert="false" @confirm="confirm" />
          <div class="calendar" @click="open">
            <div class="calTop">{{ month }}</div>
            <div class="calBottom">{{ date }}</div>
          </div>
        </div>
      </div>
      <div class="list">
        <div
          class="item"
          v-for="(item, index) in oldList"
          :key="index"
          @click="letter(item)"
        >
          <div class="itemLeft">{{ item.timeList[0] }}</div>
          <div class="itemRight">
            <div class="name">{{ item.name }}</div>
            <div class="content">{{ item.data }}</div>
          </div>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
import letter from "../../../unpackage/dist/dev/mp-weixin/pages/old/letter/letter";

export default {
  data() {
    return {
      month: "",
      date: null,
      ymd: "",
      timestamp: 0,
      oldList: [],
    };
  },
  methods: {
    back() {
      setTimeout(() => {
        uni.redirectTo({
          url: "/pages/old/home/home",
        });
      }, 0);
    },
    letter(item) {
      uni.setStorageSync("oldDetailScheduleBoxId", item.scheduleBoxId);
      uni.setStorageSync("oldDetailChildId", item.userId);
      let hour = item.timeList[0];
      let detailTime = this.ymd + " " + hour + ":00";
      let date = new Date(detailTime);
      let oldDetailTimestamp = date.getTime() / 1000;
      uni.setStorageSync("oldDetailTimestamp", oldDetailTimestamp);
      setTimeout(() => {
        uni.navigateTo({
          url: "/pages/old/letter/letter",
        });
      }, 0);
    },
    pdMonth(e) {
      switch (e) {
        case 1:
          return "一月";
          break;
        case 2:
          return "二月";
          break;
        case 3:
          return "三月";
          break;
        case 4:
          return "四月";
          break;
        case 5:
          return "五月";
          break;
        case 6:
          return "六月";
          break;
        case 7:
          return "七月";
          break;
        case 8:
          return "八月";
          break;
        case 9:
          return "九月";
          break;
        case 10:
          return "十月";
          break;
        case 11:
          return "十一月";
          break;
        case 12:
          return "十二月";
          break;
        default:
          uni.showToast({
            title: "请重新选择日期",
            icon: "none",
            duration: 3000,
          });
          break;
      }
    },
    open() {
      this.$refs.calendar.open();
    },
    confirm(e) {
      this.date = e.date;
      this.ymd = e.fulldate;
      this.timestamp =
        new Date(new Date(e.fulldate).toDateString()).getTime() / 1000;
      this.month = this.pdMonth(e.month * 1);
      const data = {
        userId: uni.getStorageSync("userId"),
        time: this.timestamp,
      };
      console.log(data);
      uni.$http
        .get("/parent/inbox/all", data)
        .then((res) => {
          console.log(res);
          if (res.statusCode == 200) {
            if (res.data.code == "00000") {
              console.log("老人主页加载成功");
              this.oldList = res.data.data;
              console.log("1", this.oldList);
            } else {
              console.log("老人主页加载失败==200");
            }
          } else {
            console.log("老人主页加载失败!=200");
          }
        })
        .catch((err) => {
          console.log(err, "请求发送加载失败");
        });
    },
  },
  onLoad() {
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    this.month = this.pdMonth(month * 1);
    this.date = strDate;
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    this.ymd = currentdate;
    this.timestamp = new Date(date.toLocaleDateString()).getTime() / 1000;
    console.log(this.timestamp);
    const data = {
      userId: uni.getStorageSync("userId"),
      time: this.timestamp,
    };
    console.log(data);
    uni.$http
      .get("/parent/inbox/all", data)
      .then((res) => {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.code == "00000") {
            console.log("老人主页加载成功");
            this.oldList = res.data.data;
          } else {
            console.log("老人主页加载失败==200");
          }
        } else {
          console.log("老人主页加载失败!=200");
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
  padding-bottom: 20px;
  .title {
    width: 100%;
    margin-bottom: 25px;
    .titleTop {
      // position: relative;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .back {
        display: flex;
        align-items: center;
      }
      .ymd {
        font-size: 1.8em;
        font-weight: 500;
        padding-left: 35px;
        padding-top: 20px;
        color: #484646;
      }
      .calendar {
        margin-top: 30px;
        margin-right: 30px;
        border: solid black 2px;
        border-radius: 4px;
        height: 60px;
        width: 75px;
        // position: absolute;
        // right: 7%;
        // top: 7vh;
        padding: 0;
        box-shadow: 3px 4px rgba(144, 164, 174, 0.7);
        .calTop {
          height: 34%;
          width: 100%;
          background: #dc7676;
          color: #fff;
          padding: 0;
          margin: 0;
          border: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.8em;
        }
        .calBottom {
          height: 64%;
          width: 100%;
          color: #595858;
          background: linear-gradient(to bottom, #eeeff1 50%, #fff 50%);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.7em;
          font-weight: 600;
        }
      }
    }
  }
  .list {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .item {
      height: 110px;
      width: 85%;
      background-color: rgba(229, 222, 218, 0.7);
      border-radius: 20px;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 1px 4px 3px 1px rgba(0, 0, 0, 0.2);
      .itemLeft {
        height: 85%;
        width: 30%;
        border-right: #8f8d8c solid 2px;
        font-size: 1.9em;
        color: #999696;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .itemRight {
        height: 85%;
        width: 70%;
        padding-left: 15px;
        .name {
          height: 50%;
          width: 100%;
          font-size: 1.9em;
          padding-top: 10px;
        }
        .content {
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
