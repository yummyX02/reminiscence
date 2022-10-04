<template>
  <view>
    <view class="card">
      <uni-card :title="cardInfo.name">
        <uni-list>
          <uni-list-item
            v-for="(item, i) in cardInfo.VoiceRecordingResult"
            :key="i"
            :title="item.data"
            :note="item.times"
          >
            <template slot="footer">
              <image
                style="width: 30px; heght: 30px"
                src="https://gitee.com/cccat-best/picgo/raw/master/picgo-picture/bofang.png"
                mode="widthFix"
              ></image>
            </template>
          </uni-list-item>
        </uni-list>
      </uni-card>
    </view>
    <view class="response">
      <text>反馈:</text>
      <view class="yuyin">
        <image
          class="yuyinIcon"
          src="https://gitee.com/cccat-best/picgo/raw/master/picgo-picture/bofang.png"
        ></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cardInfo: {
        name: "妈妈",
        VoiceRecordingResult: [
          {
            data: "吃药",
            times: "8:00",
            state: "true",
          },
        ],
      },
    };
  },
  onload() {
    let data = {
      parentId: "",
      chilId: "",
      scheduleBoxId: "",
    };
    uni.$http
      .get("/child/outbox/details", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {},
};
</script>

<style lang="scss">
.response {
  width: 2000rpx;
  height: 30px;
}
.yuyinIcon {
  width: 30px;
  height: 30px;
}
.yuyin {
  border-radius: 10px;
  background-color: bisque;
}
</style>
