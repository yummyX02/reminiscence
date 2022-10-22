<template>
  <view class="father">
    <div class="navigate">
      <div class="fanhui">
        <!-- <uni-icons type="back" size="30" @click="fanhui()"></uni-icons> -->
      </div>
      <div class="fasong" @click="send()">
        <image id="sendIcon" src="../../../static/fasong-3.png"></image>
      </div>
    </div>
    <view class="date">
      <text>日期</text>
      <view class="tag1">
        <uni-tag :circle="true" :text.sync="a" type="default" size="default" />
        <uni-tag :circle="true" :text.sync="b" type="default" size="default" />
        <uni-tag :circle="true" :text.sync="c" type="default" size="default" />
      </view>
    </view>
    <view class="event">
      <text class="text">事件</text>
      <uni-easyinput
        v-model="value"
        :styles="styles"
        :placeholderStyle="placeholderStyle"
        placeholder="请输入待做事件"
      ></uni-easyinput>
    </view>
    <view class="choice">
      <checkbox-group class="select">
        <label>
          <checkbox
            value="cb"
            checked="true"
            color="#FFCC33"
            style="transform: scale(0.7)"
          />正数计数
        </label>
        <label>
          <checkbox
            value="cb"
            color="#FFCC33"
            style="transform: scale(0.7)"
          />倒数计数
        </label>
      </checkbox-group>
    </view>
    <view class="time">
      <text>提醒时间</text>
      <div class="Tag">
        <div class="today tag" @click="toDay()" tabindex="1">当天</div>
        <div class="preDay tag" @click="changeDay()" tabindex="2">一天前</div>
        <div class="preWeek tag" @click="changeWeek()" tabindex="3">一周前</div>
      </div>
    </view>
    <view class="foot">
      <view>
        <view class="uni-padding-wrap" @click="toggle('bottom')">
          <uni-section
            :title="'时间：' + datetimesingle"
            type="line"
          ></uni-section>
        </view>
        <!-- 时间选择部分 -->
        <uni-popup ref="popup" background-color="#fff" @change="change">
          <view class="example-body">
            <uni-datetime-picker
              type="datetime"
              v-model="datetimesingle"
              @change="changeLog"
            />
          </view>
        </uni-popup>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data: function () {
    const date = new Date();
    const years = [];
    const year = date.getFullYear();
    const months = [];
    const month = date.getMonth() + 1;
    const days = [];
    const day = date.getDate();
    const a = [2];
    a[1] = "上午";
    a[2] = "下午";
    for (let i = 1; i <= 2; i++) {
      years.push(a[i]);
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    for (let i = 0; i <= 59; i++) {
      days.push(i);
    }
    return {
      title: "picker-view",
      years,
      year,
      months,
      month,
      days,
      day,
      value: [9999, month - 1, day - 1],
      visible: true,
      indicatorStyle: `height: 50px;`,
      date: "",
      objDate: [],
      // tag的数据
      a: "",
      b: "",
      c: "",
      // 弹窗
      type: "center",
      datetimesingle: "",
      // 纪念日事件
      value: "",
      placeholderStyle: "color:#717172;font-size:14px",
      styles: {
        borderColor: "#2979FF",
        border: "none",
      },
    };
  },
  onLoad() {
    var year = new Date().getFullYear(); //年
    if (year < 1900) year = year + 1900;
    var month = new Date().getMonth() + 1; //月
    if (month < 10) month = "0" + month;
    var day = new Date().getDate(); //日
    if (day < 10) day = "0" + day;
    var str = year + "-" + month + "-" + day;
    console.log(str);
    this.date = str;
    this.objDate = str.split("-");
    console.log(this.objDate);
    this.a = this.objDate[0];
    this.b = this.objDate[1];
    this.c = this.objDate[2];
    console.log(this.a);
  },
  methods: {
    bindChange: function (e) {
      const val = e.detail.value;
      this.year = this.years[val[0]];
      this.month = this.months[val[1]];
      this.day = this.days[val[2]];
    },
    toDay() {
      console.log("选择当天啦~");
      console.log(this.day);
    },
    changeDay() {
      console.log("天数减一啦");
      this.day -= 1;
      console.log(this.day);
    },
    changeWeek() {
      console.log("一周前提醒啦~");
      this.day -= 7;
      console.log(this.day);
    },
    // 输入纪念日事件
    // input(e) {
    //   console.log("纪念日事件是：", e);
    // },
    // 调用选择日期的弹窗
    change(e) {
      console.log("当前模式：" + e.type + ",状态：" + e.show);
    },
    changeLog(e) {
      console.log("change事件:", e);
      // 时间戳转换
      var time = new Date(e.replace(/-/g, "/"));
      this.date = Date.parse(time) / 1000;
      console.log(this.date);
    },
    toggle(type) {
      this.type = type;
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup.open(type);
    },
    // 导航部分
    fanhui() {
      console.log("我返回个人主页啦");
      uni.switchTab({
        url: "/pages/son/profile/profile",
      });
    },
    send() {
      console.log("我发送事件啦~");
      const data = {
        childId: uni.getStorageSync("userId"),
        parentId: 5,
        data: this.value,
        time: this.date,
      };
      uni.$http
        .post("/child/homepage/set-anniversary", data)
        .then((res) => {
          console.log("这是发送新建纪念日请求", res);
          if (res.data.code === "00000") {
            uni.showToast({
              title: "新建纪念日成功",
              icon: "success",
              duration: 2000,
            });
            uni.switchTab({
              url: "/pages/son/profile/profile",
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
  opacity: 0.7;
}
.date {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ffff;
  margin-top: 20px;
  padding: 5px 18px;
  font-size: 20px;
}
.event {
  font-size: 20px;
  padding: 5px 18px;
  border-bottom: 1px solid #ffff;
  margin-top: 15px;
  display: flex;
  align-items: center;
  .text {
    margin-right: 12px;
  }
}
.time {
  padding: 5px 18px;
  border-bottom: 1px solid #ffff;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.select {
  display: flex;
  justify-content: space-between;
  padding: 5px 18px;
  border-bottom: 1px solid #ffff;
  margin-top: 15px;
}
// 级联选择器
.picker-view {
  width: 750rpx;
  height: 600rpx;
  margin-top: 20rpx;
}
.item {
  height: 50px;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.uni-title {
  padding: 5px 18px;
}
// 时间标签
.Tag {
  display: flex;
}
.tag {
  background-color: gray;
  color: #ffffff;
  border-radius: 10px;
  margin-left: 5px;
  width: 55px;
  text-align: center;
}
.tag:focus {
  background-color: #2979ff;
}
.navigate {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#sendIcon {
  width: 50px;
  height: 50px;
}
</style>
