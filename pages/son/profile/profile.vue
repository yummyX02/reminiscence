<template>
  <view class="father">
    <view class="top">
      <!-- 用户名部分 -->
      <view class="id">
        <div class="id_left">
          <div class="id_text">{{ name }}</div>
          <div class="id_right" @click="inputDialogToggle()">编辑</div>
          <!-- 编辑姓名的输入框 -->
          <view class="rename">
            <uni-popup ref="inputDialog" type="dialog">
              <uni-popup-dialog
                ref="inputClose"
                mode="input"
                title="输入新的姓名"
                placeholder="请输入新的姓名"
                @confirm="dialogInputConfirm"
              ></uni-popup-dialog>
            </uni-popup>
          </view>
        </div>
      </view>
      <!-- 绑定部分 -->
      <view class="bind" @click="gotoBind()">
        <div class="bind_left">
          <div class="bind_text">绑定</div>
        </div>
        <div class="bind_right">
          <uni-icons type="forward" size="30"></uni-icons>
        </div>
      </view>
    </view>
    <view class="middle">
      <view class="star">
        <div class="len"></div>
        <uni-rate v-model="rateValue" />
        <div class="len"></div>
      </view>
    </view>
    <view class="foot">
      <view class="memory">
        <div class="left">纪念日</div>
        <div class="right">
          <uni-icons @click="addDay()" type="plusempty" size="20"></uni-icons>
        </div>
      </view>
      <div class="card">
        <!-- <scroll-view
          enable-flex="true"
          :scroll-top="scrollTop"
          scroll-y="true"
          class="scroll-Y"
        > -->
        <div
          class="infoBox"
          v-for="(item, index) in AnniversaryResult"
          :key="index"
        >
          <div class="top">{{ item.data }}</div>
          <div class="middle">{{ item.time }}</div>
          <div class="bottom">{{ item.day }}天后</div>
        </div>
        <!-- </scroll-view> -->
      </div>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      scrollTop: 10,
      name: "",
      // isShow:false,
      value: "",
      type: "",
      rateValue: 5,
      AnniversaryResult: [],
    };
  },
  onLoad() {
    // 获取用户姓名
    const data = {
      userId: uni.getStorageSync("userId"),
    };
    uni.$http
      .get("/child/homepage/get-name", data)
      .then((res) => {
        console.log(res);
        if (res.data.code === "00000") {
          console.log("res的返回姓名是：", res.data.data.name);
          this.name = res.data.data.name;
          this.value = this.name;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // 获取纪念日
    uni.$http
      .get("/child/homepage/all-anniversary", data)
      .then((res) => {
        console.log(res);
        console.log("纪念日列表是:", res.data.data);
        if (res.data.code === "00000") {
          this.AnniversaryResult = res.data.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    upper: function (e) {
      console.log(e);
    },
    lower: function (e) {
      console.log(e);
    },
    scroll: function (e) {
      console.log(e);
      this.old.scrollTop = e.detail.scrollTop;
    },
    addDay() {
      console.log("我去加纪念日啦~");
      uni.navigateTo({
        url: "/pages/son/addDay/addDay",
      });
    },
    gotoBind() {
      console.log("我去绑定关系啦~");
      uni.navigateTo({
        url: "/pages/son/bind/bind",
      });
    },
    inputDialogToggle() {
      this.$refs.inputDialog.open();
    },
    dialogInputConfirm(val) {
      console.log("点击确认后的input框的内容", val);
      this.value = val;
      this.name = val;
      console.log("我要开始发送改名请求啦~");
      const data = {
        userId: uni.getStorageSync("userId"),
        name: this.value,
      };
      console.log(this.value);
      if (this.value === "") {
        uni.showToast({
          title: "姓名不能为空",
          icon: "error",
          duration: 3000,
        });
      } else {
        uni.$http
          .post("/child/homepage/change-user-name", data)
          .then((res) => {
            if (res.data.code == "00000") {
              console.log("修改用户名成功");
              uni.showToast({
                title: "修改用户名成功",
                icon: "none",
                duration: 3000,
              });
            } else {
              console.log("修改用户名失败==200");
              uni.showToast({
                title: "修改用户名失败",
                icon: "error",
                duration: 3000,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setTimeout(() => {
        uni.hideLoading();
        console.log(val);
        // 关闭窗口后，恢复默认内容
        this.$refs.inputDialog.close();
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.star {
  display: flex;
  padding-bottom: 20px;
  padding-top: 30px;
  justify-content: center;
  align-items: center;
  .len {
    width: 50%;
    height: 1px;
    border-top: solid #acc0d8 1px;
  }
}
.memory {
  padding-left: 18px;
  padding-right: 18px;
  display: flex;
  justify-content: space-between;
}
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
.top {
  display: flex;
  flex-direction: column;
}
.bind {
  margin-top: 15px;
  display: flex;
  border-bottom: 1px solid #e3e3e3;
  justify-content: space-between;
  padding: 5px 18px;
  background-color: rgba(255, 255, 255, 0.3);
  .bind_text {
    font-size: 16px;
  }
}
.id {
  margin-top: 30px;
  display: flex;
  border-bottom: 1px solid #e3e3e3;
  background-color: rgba(255, 255, 255, 0.3);

  .id_text {
    font-size: 20px;
    padding-right: 3px;
  }
  .id_left {
    display: flex;
    padding: 5px 18px;
    align-items: center;
  }
  .id_right {
    font-size: 12px;
    padding-left: 2px;
    background-color: #93dd28;
    color: #ffff;
    width: 32px;
    height: 18px;
    text-align: center;
    border-radius: 8px;
  }
}
/deep/ .uni-card {
  background-color: rgba(255, 255, 255, 0.7);
}

.infoBox {
  width: 160px;
  height: 100px;
  background-color: #fff;
  padding-right: 10px;
  padding-left: 15px;
  border-radius: 20px;
  // padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .top {
    display: block;
    font-size: 18px;
    max-width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .middle {
    font-size: 12px;
    color: gray;
  }
  .bottom {
    font-size: 16px;
  }
  .middle {
    text-align: right;
  }
  .middle,
  .bottom {
    padding-top: 5px;
  }
}
// 卡片组件
.card {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  overflow: scroll;
}
.scroll-Y {
  height: 400px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}
</style>
