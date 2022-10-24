<template>
  <view class="father">
    <div class="box">
      <div class="scan">
      <div class="text">
        <div id="Id">{{ id }}</div>
        <div id="smalll" @click="inputDialogToggle()">编辑</div>
        <!-- 编辑姓名的输入框 -->
        <!-- <view class="rename"> -->
        <uni-popup ref="userPopup" type="dialog">
          <uni-popup-dialog
            mode="input"
            title="输入新的姓名"
            placeholder="请输入新的姓名"
            @confirm="dialogInputConfirm"
          ></uni-popup-dialog>
        </uni-popup>
        <!-- </view> -->
      </div>
      <div class="picture">
        <image
          id="icon"
          @click="scanCode()"
          src="../../../static/scan.png"
        ></image>
      </div>
      <div class="tips">扫一扫长辈的二维码，绑定我的拾忆</div>
    </div>
    </div>
    <view class="bindList">
      <div id="list">绑定列表</div>
      <div class="list1" v-for="(item, i) in bindList" :key="i">
        <div class="left">
          <div class="person">{{ item.name }}</div>
          <div class="bianji" @click="inputDialogToggle1(item)">编辑</div>
          <!-- 编辑姓名的输入框 -->
          <!-- <view class="rename"> -->
          <uni-popup :ref="'inputBind' + item.userId" type="dialog">
            <uni-popup-dialog
              mode="input"
              title="输入新的姓名"
              placeholder="请输入新的姓名"
              @confirm="dialogInputConfirm1"
            ></uni-popup-dialog>
          </uni-popup>
          <!-- </view> -->
        </div>
        <div class="jiebang" @click="unBind(item)">解绑</div>
      </div>
    </view>
  </view>
</template>

<script>
import uniDataPickerview from "../../../uni_modules/uni-data-picker/components/uni-data-pickerview/uni-data-pickerview.vue";
export default {
  components: { uniDataPickerview },
  data() {
    return {
      id: "静待",
      value: "",
      bindList: [],
      changeParentNameItem: [],
    };
  },
  onLoad() {
    const data = {
      userId: uni.getStorageSync("userId"),
    };
    // 获取用户姓名
    uni.$http
      .get("/child/homepage/get-name", data)
      .then((res) => {
        console.log(res);
        if (res.data.code === "00000") {
          console.log("res的返回姓名是：", res.data.data.name);
          this.id = res.data.data.name;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    uni.$http
      .get("/child/homepage/all", data)
      .then((res) => {
        console.log("获取用户绑定列表:", res);
        console.log("绑定列表有：", res.data.data);
        console.log("父母Id：", res.data.data[0].userId);
        if (res.data.code === "00000") {
          this.bindList = res.data.data;
          uni.setStorageSync("beChangeId", res.data.data[0].userId);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    scanCode() {
      uni.scanCode({
        success: function (res) {
          console.log("扫码内容:", res.result);
          const data = {
            userId: uni.getStorageSync("userId"),
            key: res.result,
          };
          // 发送绑定请求
          uni.$http
            .post("/child/homepage/binding", data)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },
    unBind() {
      const data = {
        parentId: uni.getStorageSync("beChangeId"),
        childId: uni.getStorageSync("userId"),
      };

      uni.$http
        .post("/child/homepage/unbinding", data)
        .then((res) => {
          console.log(res);
          if (res.data.code === "00000") {
            uni.showToast({
              title: "解绑成功",
              icon: "success",
              duration: 3000,
            });
            const data = {
              userId: uni.getStorageSync("userId"),
            };
            uni.$http
              .get("/child/homepage/all", data)
              .then((res) => {
                console.log("获取用户绑定列表:", res);
                console.log("绑定列表有：", res.data.data);
                if (res.data.code === "00000") {
                  this.bindList = res.data.data;
                  uni.setStorageSync("beChangeId", res.data.data);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    inputDialogToggle() {
      this.$refs.userPopup.open();
    },
    inputDialogToggle1(item) {
      this.changeParentNameItem = item;
      console.log("this.changeParentNameItem =", this.changeParentNameItem);
      this.$refs[`inputBind${item.userId}`][0].open();
    },
    dialogInputConfirm(val) {
      console.log("点击确认后的input框的内容", val);
      this.id = val;
      this.value = val;
      console.log("我要开始发送改名请求啦~");
      console.log("this.id = ", this.id);
      if (this.value === "") {
        uni.showToast({
          title: "姓名不能为空",
          icon: "error",
          duration: 3000,
        });
      } else {
        const data1 = {
          userId: uni.getStorageSync("userId"),
          name: this.value,
        };
        uni.$http
          .post("/child/homepage/change-user-name", data1)
          .then((res) => {
            if (res.data.code == "00000") {
              console.log("修改用户名成功");
              uni.showToast({
                title: "修改备注成功",
                icon: "none",
                duration: 3000,
              });
            } else {
              console.log("修改备注失败==200");
              uni.showToast({
                title: "修改备注失败",
                icon: "error",
                duration: 3000,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 已绑定人的修改姓名
    dialogInputConfirm1(val) {
      console.log("点击确认后的input框的内容", val);
      this.value = val;
      console.log("我要开始发送改名请求啦~");
      console.log("this.id = ", this.id);
      if (this.value === "") {
        uni.showToast({
          title: "姓名不能为空",
          icon: "error",
          duration: 3000,
        });
      } else {
        const data1 = {
          changerId: uni.getStorageSync("userId"),
          beChangerId: uni.getStorageSync("beChangeId"),
          name: this.value,
        };
        uni.$http
          .post("/child/homepage/change-parent-name", data1)
          .then((res) => {
            if (res.data.code == "00000") {
              console.log("修改备注成功");
              uni.showToast({
                title: "修改备注成功",
                icon: "none",
                duration: 3000,
              });
              console.log("开始更新绑定列表");
              const data = {
                userId: uni.getStorageSync("userId"),
              };
              uni.$http
                .get("/child/homepage/all", data)
                .then((res) => {
                  console.log("获取用户绑定列表:", res);
                  console.log("绑定列表有：", res.data.data);
                  if (res.data.code === "00000") {
                    this.bindList = res.data.data;
                    uni.setStorageSync("beChangeId", res.data.data);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              console.log("修改备注失败==200");
              uni.showToast({
                title: "修改备注失败",
                icon: "error",
                duration: 3000,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style lang="scss">
.box{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45px;
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
  opacity: 0.7;
}
.scan {
  // margin: 45px;
  width: 280px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  .text {
    display: flex;
    padding: 5px;
    align-items: center;
  }
  .picture {
    display: flex;
    justify-content: center;
  }
  .tips {
    padding: 15px;
    font-size: 15px;
    color: #d0c8c8;
  }
  #Id {
    font-size: 25px;
    margin-right: 5px;
    padding: 4px;
  }
  #smalll {
    background-color: #98ca5a;
    color: #fff;
    font-size: 12px;
    border-radius: 5px;
    width: 40px;
    height: 20px;
    text-align: center;
    justify-content: center;
  }
  #icon {
    width: 180px;
    height: 180px;
  }
}
.bindList {
  #list {
    font-size: 25px;
    padding: 10px;
  }
  .list1 {
    height: 40px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    font-size: 18px;
    background-color: rgba(255, 255, 255, 0.4);
    border-bottom: 1px solid #f5f4f5;
    .jiebang {
      margin-left: 3px;
      background-color: #98ca5a;
      color: #ffff;
      font-size: 15px;
      border-radius: 5px;
      width: 35px;
      height: 22px;
      text-align: center;
      justify-content: center;
    }
  }
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bianji {
    margin-left: 3px;
    background-color: #ccd2c5;
    color: black;
    font-size: 11px;
    border-radius: 5px;
    width: 30px;
    height: 16px;
    text-align: center;
    justify-content: center;
  }
}
</style>
