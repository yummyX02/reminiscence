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
        <div class="newAdd" @click="newMemo">新建备忘录</div>
        <div class="list">
          <div class="item" v-for="(item, index) in memoList" :key="index">
            <div class="itemTop">
              <img
                src="https://gitee.com/cccat-best/picgo/raw/master/picgo-picture/bofang.png"
                style="height: 50px; width: 50px"
              />
              <div class="iconRight">
                <div class="rightTitle">{{ item.data }}</div>
                <div class="rightLength">{{ item.length }}</div>
              </div>
            </div>
            <div class="itemBottom">{{ item.time }}</div>
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
      memoList: [],
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
    newMemo() {
      setTimeout(() => {
        uni.redirectTo({
          url: "/pages/old/newMemo/newMemo",
        });
      }, 0);
    },
  },
  onLoad() {
    const data = {
      userId: uni.getStorageSync("userId"),
      time: this.timestamp,
    };
    uni.$http
      .get("/parent/memorandum/all", data)
      .then((res) => {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.code == "00000") {
            console.log("老人备忘录加载成功");
            this.memoList = res.data.data;
          } else {
            console.log("老人备忘录加载失败==200");
          }
        } else {
          console.log("老人备忘录加载失败!=200");
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
  align-items: center;
  .title {
    width: 100%;
    margin-bottom: 30px;
    .back {
      display: flex;
      align-items: center;
    }
  }
  .noTitle {
    width: 85%;
    .newAdd {
      width: 100%;
      height: 120px;
      background-color: rgba(221, 223, 223, 0.7);
      border-radius: 20px;
      margin-bottom: 30px;
      box-shadow: 1px 4px 3px 1px rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.8em;
      font-weight: 300;
    }
    .list {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .item {
        box-sizing: border-box;
        width: 46%;
        height: 110px;
        background-color: rgba(221, 223, 223, 0.7);
        border-radius: 20px;
        margin-bottom: 20px;
        padding-left: 8px;
        padding-right: 8px;
        box-shadow: 1px 4px 3px 1px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 0.9em;
        color: #989696;
        .itemTop {
          margin-top: 10px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          .iconRight {
            margin-left: 5px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            .rightTitle {
              font-size: 1.4em;
              font-weight: 549;
              color: black;
              max-width: 80px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-bottom: 5px;
            }
          }
        }
        .itemBottom {
          margin-top: 10px;
          width: 100%;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
