<template>
  <view class="father">
    <view class="date">
      <text>日期</text>
      <view class="tag1">
        <uni-tag :circle="true" :text.sync="a" type="default" size="default" />
        <uni-tag :circle="true" :text.sync="b" type="default" size="default" />
        <uni-tag :circle="true" :text.sync="c" type="default" size="default" />
      </view>
    </view>
    <view class="event">
      <text>事件</text>
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
      <div class="tag">
        <uni-tag :circle="true" text="当天" type="default" />
        <uni-tag
          :circle="true"
          @click="changeDay()"
          text="1天前"
          type="default"
        />
        <uni-tag
          :circle="true"
          @click="changeWeek()"
          text="1周前"
          type="default"
        />
      </div>
    </view>
    <view class="foot">
      <view>
        <view class="uni-padding-wrap">
          <view class="uni-title">日期：{{ date }}</view>
        </view>
        <picker-view
          v-if="visible"
          :indicator-style="indicatorStyle"
          :value="value"
          @change="bindChange"
          class="picker-view"
        >
          <picker-view-column>
            <view class="item" v-for="(item, index) in years" :key="index">{{
              item
            }}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(item, index) in months" :key="index"
              >{{ item }}时</view
            >
          </picker-view-column>
          <picker-view-column>
            <view class="item" v-for="(item, index) in days" :key="index"
              >{{ item }}分</view
            >
          </picker-view-column>
        </picker-view>
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
      a:'',
      b:'',
      c:'',
    };
  },
  onLoad() {
    var year = new Date().getFullYear(); //年
    if (year < 1900) year = year + 1900;
    var month = new Date().getMonth() + 1; //月
    if (month < 10) month = "0" + month;
    var day = new Date().getDate(); //日
    if (day < 10) day = "0" + day;
    var str = year + '-' + month + '-' + day;
    console.log(str);
    this.date = str;
    this.objDate = str.split('-');
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
    changeDay(){
      console.log("天数减一啦");
      this.day -= 1;
      console.log(this.day);
    },
changeWeek(){

}
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
</style>
