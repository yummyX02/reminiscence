<template>
  <view>
    <div class="big">
      <div class="title">
        <div class="back" @click="back">
          <uni-icons type="back" size="45" color="#99979b"></uni-icons
          ><span style="font-size: 1.4em">返回</span>
        </div>
      </div>
      <div class="noTitle">
        <div class="ma">
          <div class="maTitle">
            {{ userName }}
            <uni-tag
              @click="changeUserName"
              text="编辑"
              class="userTag"
              size="small"
              inverted="true"
              type="success"
              :circle="true"
              cal
            ></uni-tag>
            <uni-popup ref="userPopup" type="dialog">
              <uni-popup-dialog
                ref="inputClose"
                mode="input"
                title="编辑用户名"
                value=""
                placeholder="请输入用户名"
                @confirm="dialogInputConfirm1"
              ></uni-popup-dialog>
            </uni-popup>
          </div>
          <div class="erweima">
            <img :src="erweima" alt="" style="height: 100%; width: 100%" />
          </div>
          <div class="maBot">扫一扫上面的二维码，绑定我的拾忆</div>
        </div>
        <div class="list">
          绑定列表
          <div class="listDet">
            <uni-popup ref="childPopup" type="dialog">
              <uni-popup-dialog
                ref="inputClose2"
                mode="input"
                title="编辑备注"
                value=""
                placeholder="请输入备注"
                @confirm="dialogInputConfirm2"
              ></uni-popup-dialog>
            </uni-popup>
            <div class="item" v-for="(item, index) in childList" :key="index">
              {{ item.name }}
              <uni-tag
                @click="changeChildName"
                text="编辑"
                class="litTag"
                size="small"
                inverted="true"
                type="warning"
                -
                :circle="true"
                cal
              ></uni-tag>
              <span class="rightTag">解绑</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      childList: [],
      erweima: "",
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
    changeChildName() {
      console.log("changeChildName");
      this.$refs.childPopup.open();
    },
    changeUserName() {
      console.log("changeUserName123");
      this.$refs.userPopup.open();
    },
    dialogInputConfirm1(val) {
      this.userName = val;
      const data = {
        userId: uni.getStorageSync("userId"),
        name: this.userName,
      };
      uni.$http
        .post("/parent/binding/change-name", data)
        .then((res) => {
          console.log(res);
          this.$refs.userPopup.close();
          if (res.statusCode == 200) {
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
          } else {
            console.log("修改用户名失败!=200");
            uni.showToast({
              title: "修改用户名失败",
              icon: "error",
              duration: 3000,
            });
          }
        })
        .catch((err) => {
          console.log(err, "请求发送加载失败");
          this.$refs.userPopup.close();
          uni.showToast({
            title: "修改用户名失败",
            icon: "error",
            duration: 3000,
          });
        });
    },
    dialogInputConfirm2(val) {
      console.log(val);
      // const data = {
      //   changerId: uni.getStorageSync("userId"),
      //   beChangerId: 1,
      //   name: val,
      // };
      // uni.$http
      //   .post("/parent/binding/change-child-name", data)
      //   .then((res) => {
      //     console.log(res);
      //     this.$refs.childPopup.close();
      //     if (res.statusCode == 200) {
      //       if (res.data.code == "00000") {
      //         console.log("修改备注成功");
      //         uni.showToast({
      //           title: "修改备注成功",
      //           icon: "none",
      //           duration: 3000,
      //         });
      //       } else {
      //         console.log("修改备注失败==200");
      //         uni.showToast({
      //           title: "修改备注失败",
      //           icon: "error",
      //           duration: 3000,
      //         });
      //       }
      //     } else {
      //       console.log("修改备注失败!=200");
      //       uni.showToast({
      //         title: "修改备注失败",
      //         icon: "error",
      //         duration: 3000,
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err, "请求发送加载失败");
      //     this.$refs.childPopup.close();
      //     uni.showToast({
      //       title: "修改备注失败",
      //       icon: "error",
      //       duration: 3000,
      //     });
      //   });
    },
  },
  onLoad() {
    const data0 = {
      parentId: uni.getStorageSync("userId"),
    };
    uni.$http
      .get("/parent/binding/all", data0)
      .then((res) => {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.code == "00000") {
            console.log("老人绑定列表加载成功");
            this.childList = res.data.data;
          } else {
            console.log("老人绑定列表加载失败==200");
          }
        } else {
          console.log("老人绑定列表加载失败!=200");
        }
      })
      .catch((err) => {
        console.log(err, "请求发送加载失败");
      });
    const data2 = {
      userId: uni.getStorageSync("userId"),
    };
    uni.$http
      .post("/parent/binding/creat-qrcode", data2)
      .then((res) => {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.code == "00000") {
            console.log("获取绑定二维码成功");
            this.erweima = res.data.message;
          } else {
            console.log("获取绑定二维码失败==200");
          }
        } else {
          console.log("获取绑定二维码失败!=200");
        }
      })
      .catch((err) => {
        console.log(err, "请求发送加载失败");
      });
    const data3 = {
      userId: uni.getStorageSync("userId"),
      Authorization: uni.getStorageSync("token"),
    };
    uni.$http
      .get("/parent/binding/get-name", data3)
      .then((res) => {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.code == "00000") {
            console.log("获取用户名成功");
            this.userName = res.data.data.name;
          } else {
            console.log("获取用户名失败==200");
          }
        } else {
          console.log("获取用户名失败!=200");
        }
      })
      .catch((err) => {
        console.log(err, "请求发送失败");
      });
  },
};
</script>

<style lang="scss" scoped>
.big {
  height: 100vh;
  width: 100vw;
  overflow: scroll;
  background-color: #f1f1f4;
  background-size: 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  .title {
    width: 100%;
    margin-bottom: 30px;
    .back {
      display: flex;
      align-items: center;
    }
  }
  .noTitle {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .ma {
      width: 75%;
      height: 300px;
      background-color: white;
      border-radius: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 20px;
      .maTitle {
        width: 100%;
        padding-left: 45px;
        font-size: 1.6em;
        position: relative;
        .userTag {
          margin-left: 8px;
          position: absolute;
          top: -5px;
        }
        .userPopup {
          text-align: center;
          background-color: #fff;
          padding: 60rpx;
          border-radius: 10rpx;
          font-size: 45rpx;
          .txt {
            margin-bottom: 20px;
          }
        }
      }
      .erweima {
        height: 180px;
        width: 180px;
        // border: 1px solid pink;
        // margin-bottom: 15px;
      }
      .maBot {
        color: #d0c8c8;
        font-size: 0.8em;
      }
    }
    .list {
      width: 93%;
      font-size: 1.8em;
      font-weight: 350;
      .listDet {
        display: flex;
        flex-direction: column;
        align-items: center;
        .item {
          width: 90%;
          margin-top: 15px;
          font-size: 0.9em;
          font-weight: 300;
          border-bottom: 2px solid #d0c8c8;
          position: relative;
          .litTag {
            margin-left: 5px;
            position: absolute;
            top: -10px;
          }
          .rightTag {
            position: absolute;
            color: white;
            padding: 2px 8px;
            background-color: #99ca5a;
            border-radius: 8px;
            font-size: 0.8em;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
