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
        <div class="item">
          <div class="itemLeft">8:00</div>
          <div class="itemRight">
            <div class="name">女儿</div>
            <div class="content">记得吃药，多喝水，早点睡觉，多穿衣服。</div>
          </div>
        </div>
        <div class="item">
          <div class="itemLeft">9:00</div>
          <div class="itemRight">
            <div class="name">儿子</div>
            <div class="content">记得吃药，多喝水，早点睡觉，多穿衣服。</div>
          </div>
        </div>
        <div class="item">
          <div class="itemLeft">10:00</div>
          <div class="itemRight"></div>
        </div>
        <div class="item">
          <div class="itemLeft">11:30</div>
          <div class="itemRight"></div>
        </div>
        <div class="item">
          <div class="itemLeft"></div>
          <div class="itemRight"></div>
        </div>
        <div class="item">
          <div class="itemLeft"></div>
          <div class="itemRight"></div>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      month: "",
      date: null,
      ymd: "",
    };
  },
  methods: {
    back() {
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/old/home/home",
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
      console.log(e);
      this.date = e.date;
      this.ymd = e.fulldate;
      this.month = this.pdMonth(e.month * 1);
    },
  },
  onLoad() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
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
  .title {
    width: 100%;
    height: 23vh;
    margin-bottom: 20px;
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
