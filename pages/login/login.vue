<template>
  <view>
    <div class="big">
      <div class="bigTitle">
        <div class="title">欢迎来到拾忆</div>
        <div class="titleBelow">用拾忆·爱老人</div>
      </div>
      <div class="mid">
        <div class="form">
          <div class="input">
            <span class="icon phone"></span>
            <input
              v-model="phone"
              type="text"
              placeholder="请输入手机号"
              style="height: 100%"
            />
          </div>
          <div class="input" style="display: flex">
            <span class="icon check"></span>
            <input
              v-model="checkMa"
              type="text"
              placeholder="请输入验证码"
              style="height: 100%; width: 50%; overflow: hidden"
            />
            <button class="checkBtn" @click="getMa">获取验证码</button>
          </div>
          <button class="button" @click="login">登录</button>
        </div>
      </div>
      <div class="bottom">
        <div class="bottomText">
          <uni-data-checkbox
            :multiple="true"
            v-model="limitValue"
            :localdata="range"
          ></uni-data-checkbox>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      checkMa: "",
      limitValue: 0,
      range: [
        {
          value: 0,
          text: "  已同意用户协议和隐私政策",
        },
      ],
    };
  },
  methods: {
    getMa() {
      let phoneReg = /^1[3456789]\d{9}$/;
      if (!phoneReg.test(this.phone)) {
        uni.showToast({
          title: "请输入正确的手机号码",
          icon: "none",
          duration: 3000,
        });
      } else {
        const data = { phone: this.phone };
        uni.$http
          .post("/login/phone-get-sms", data)
          .then((res) => {
            if (res.statusCode == 200) {
              if (res.data.code == "00000") {
                uni.showToast({
                  title: "验证码已发送",
                  icon: "none",
                  duration: 3000,
                });
              } else {
                uni.showToast({
                  title: "获取验证码失败",
                  icon: "error",
                  duration: 3000,
                });
              }
            } else {
              uni.showToast({
                title: "获取验证码失败",
                icon: "error",
                duration: 3000,
              });
            }
          })
          .catch((err) => {
            uni.showToast({
              title: "获取验证码失败",
              icon: "error",
              duration: 3000,
            });
          });
      }
    },
    login() {
      if (this.limitValue.length != 1) {
        uni.showToast({
          title: "请先同意隐私政策",
          icon: "none",
          duration: 3000,
        });
      } else {
        if (this.phone == "") {
          uni.showToast({
            title: "手机号码为空",
            icon: "none",
            duration: 3000,
          });
        } else {
          if (this.checkMa == "") {
            uni.showToast({
              title: "验证码为空",
              icon: "none",
              duration: 3000,
            });
          } else {
            const data = {
              phone: this.phone,
              verificationCode: this.checkMa,
            };
            uni.$http
              .post("/login/phone-verification-sms", data)
              .then((res) => {
                console.log(res);
                if (res.statusCode == 200) {
                  if (res.data.code == "00000") {
                    uni.setStorageSync("userId", res.data.data.userId);
                    uni.setStorageSync("token", res.data.data.token);
                    setTimeout(() => {
                      uni.reLaunch({
                        url: "/pages/modelSelect/modelSelect",
                      });
                    }, 0);
                  } else {
                    uni.showToast({
                      title: res.data.message,
                      icon: "none",
                      duration: 3000,
                    });
                  }
                } else {
                  uni.showToast({
                    title: "登录失败",
                    icon: "error",
                    duration: 3000,
                  });
                }
              })
              .catch((err) => {
                uni.showToast({
                  title: "登录失败",
                  icon: "error",
                  duration: 3000,
                });
              });
          }
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.big {
  overflow: hidden;
  position: relative;
  height: 100vh;
  background-image: linear-gradient(
      rgba(171, 211, 218, 0.7),
      rgba(234, 217, 178, 0.7)
    ),
    url("../../static/login.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  .bigTitle {
    padding-top: 20px;
    padding-left: 20px;
    .title {
      padding-bottom: 5px;
      font-weight: 520;
      font-size: 25px;
    }
    .titleBelow {
      padding-left: 5px;
    }
  }
  .mid {
    margin-top: 15%;
    height: 45%;
    width: 85%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0); /*移动自身的一半*/
    .form {
      background-color: rgba(255, 255, 255, 0.2);
      height: 100%;
      width: 100%;
      transform-style: preserve-3d;
      border-radius: 30px;
      backdrop-filter: blur(3px);
      border-left: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid rgba(255, 255, 255, 0.3);
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
      backface-visibility: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .input {
        width: 80%;
        height: 18%;
        margin-bottom: 20px;
        border: none;
        border-radius: 16px;
        padding-left: 10px;
        background-color: transparent;
        border-left: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid rgba(255, 255, 255, 0.3);
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
        color: slategrey;
        font-size: 0.9rem;
        opacity: 0.8;
        display: flex;
        align-items: center;
        .icon {
          height: 50%;
          width: 12%;
          margin-right: 10px;
        }
        .phone {
          background: url("../../static/yonghu.png") no-repeat;
          background-size: 100% 100%;
        }
        .check {
          background: url("../../static/yanzhengma-2.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .input:focus,
      .input:hover {
        border: none;
        background-color: rgba(255, 255, 255, 0.1);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        border-right: 2px solid rgba(255, 255, 255, 0.3);
        border-bottom: 2px solid rgba(255, 255, 255, 0.3);
        box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.2);
      }
      .checkBtn {
        background-color: rgba(255, 255, 255, 0.3);
        height: 65%;
        width: 45%;
        padding: 0;
        font-size: 0.8rem;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .button {
        border: none;
        width: 60%;
        height: 100rpx;
        margin-bottom: 20px;
        border-radius: 16px;
        padding-left: 10px;
        background-color: rgba(255, 255, 255, 0.5);
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
        color: black;
        font-size: 1.2rem;
        opacity: 0.8;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .button:active {
        border: none;
        background-color: rgba(255, 255, 255, 0.4);
        border-right: 2px solid rgba(255, 255, 255, 0.3);
        border-bottom: 2px solid rgba(255, 255, 255, 0.3);
        box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.2);
      }
    }
  }
  .bottom {
    width: 100%;
    height: 150px;
    border-radius: 75px;
    background-color: #f7f0df;
    position: absolute;
    bottom: -75px;
    display: flex;
    justify-content: center;
    .bottomText {
      margin-top: 27px;
      width: auto;
    }
  }
}
</style>
