<template>
  <view>
    <div class="big">
      <div class="block">
        <div class="littleTitle">收件箱</div>
        <div class="inbox" @click="inbox">
          <img
            src="https://gitee.com/cccat-best/picgo/raw/master/picgo-picture/xinfeng.png"
            alt=""
            style="
              display: block;
              width: 40%;
              height: 80%;
              margin-top: 3%;
              margin-left: 5px;
            "
          />
          <div class="inboxRight">查看收件信息</div>
        </div>
      </div>
      <div class="block" style="position: relative">
        <div class="littleTitle">备忘录</div>
        <img
          src="https://gitee.com/cccat-best/picgo/raw/master/picgo-picture/bi.png"
          alt=""
          style="
            display: block;
            width: 40px;
            height: 40px;
            position: absolute;
            left: 6%;
            top: 20%;
          "
        />
        <div class="memo" @click="memo">
          <div class="memoText">日常备忘录</div>
        </div>
      </div>
      <div class="block" style="position: relative">
        <div class="littleTitle">绑定</div>
        <img
          src="https://gitee.com/cccat-best/picgo/raw/master/picgo-picture/shezhi.png"
          alt=""
          style="
            display: block;
            width: 70px;
            height: 70px;
            position: absolute;
            right: 4%;
            bottom: -15%;
          "
        />
        <img
          src="https://gitee.com/cccat-best/picgo/raw/master/picgo-picture/shezhi.png"
          alt=""
          style="
            display: block;
            width: 40px;
            height: 40px;
            position: absolute;
            right: -5%;
            bottom: 2%;
          "
        />
        <div class="bind" @click="bind">
          <div class="bindText">绑定账号</div>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    inbox() {
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/old/inbox/inbox",
        });
      }, 0);
    },
    memo() {
      console.log("memo");
    },
    bind() {
      console.log("bind");
    },
  },
};
</script>

<style lang="scss" scoped>
.big {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .block {
    height: 28%;
    width: 85%;
    margin-bottom: 6%;
    .littleTitle {
      width: 100%;
      height: 25%;
      padding-left: 10px;
      border-left: 2px solid #c4c7c7;
      margin-bottom: 4%;
      font-size: 1.7em;
      font-weight: 320;
      display: flex;
      align-items: center;
    }
    .inbox {
      height: 70%;
      width: 100%;
      background-color: #ece5e1;
      border-radius: 20px;
      display: flex;
      justify-content: space-around;
      box-shadow: 1px 5px 2px 1px rgba(0, 0, 0, 0.2);
      .inboxRight {
        display: flex;
        align-items: center;
        font-size: 1.4em;
        margin-right: 7px;
      }
    }
    .memo {
      height: 70%;
      width: 100%;
      background-color: #dddfdf;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.9em;
      box-shadow: 1px 5px 2px 1px rgba(0, 0, 0, 0.2);
    }
    .bind {
      height: 70%;
      width: 100%;
      background-color: #ffeae1;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.9em;
      box-shadow: 1px 5px 2px 1px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
