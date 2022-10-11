<template>
  <view class="father">
    <view class="title">
      <div class="text">
        <uni-section
          title="发件箱"
          titleFontSize="16px"
          id="title"
        ></uni-section>
      </div>
      <div class="icon">
        <uni-icons
          type="search"
          size="30"
          @click="inputDialogToggle"
        ></uni-icons>
        <view>
          <!-- 提示窗示例 -->
          <uni-popup ref="inputDialog" type="dialog">
            <uni-popup-dialog
              ref="inputClose"
              mode="input"
              title="请输入查询的姓名"
              placeholder="请输入内容"
              @confirm="dialogInputConfirm"
            ></uni-popup-dialog>
          </uni-popup>
        </view>
        <uni-icons type="plus" size="30" @click="gotoAdd()"></uni-icons>
      </div>
    </view>
    <div class="msgInfo">
      <uni-list>
        <uni-list-item
          class="listItem"
          v-for="(item, i) in msgList"
          :key="i"
          :title="item.name"
          :note="item.note"
          clickable
          @click="
            gotoMsgDetail();
            setIndex(i);
          "
          link
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
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      index: "",
      no: "",
      msgList: [],
      extraIcon1: "static/bofang.png",
    };
  },
  onLoad() {
    const data = {
      userId: uni.getStorageSync("userId"),
    };
    uni.$http
      .get("/child/outbox/all", data)
      .then((res) => {
        console.log("我获取发件列表啦~");
        console.log(res);
        if (res.data.code === "00000") {
          this.msgList = res.data.data;
          uni.setStorageSync("myId", res.data.data);
          console.log("发件箱的数组是:", uni.getStorageSync("myId"));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // const i = this.index;
    // uni.setStorageSync("myparentId", res.data.data[i].parentId);
    // uni.setStorageSync("myscheduleBoxId", res.data.data[i].scheduleBoxId);
    // console.log(uni.getStorageSync("myparentId"));
    // console.log(uni.getStorageSync("myscheduleBoxId"));
  },
  methods: {
    // function find(){
    //   var arr = [];
    // for (var i = 0; i < list.length; i++) {
    //   if (list[i].indexOf(keyWord) >= 0) {
    //     arr.push(list[i]);
    //   }
    // }
    // return arr;
    // }
    // 打开搜索框
    inputDialogToggle() {
      this.$refs.inputDialog.open();
    },
    dialogInputConfirm(val) {
      uni.showLoading({
        title: "正在搜索...",
      });

      setTimeout(() => {
        uni.hideLoading();
        console.log(val);
        this.value = val;
        // 关闭窗口后，恢复默认内容
        this.$refs.inputDialog.close();
      }, 3000);
    },
    gotoAdd() {
      console.log("我去新增发件啦~");
      uni.navigateTo({
        url: "/pages/son/addMsg/addMsg",
      });
    },
    // 点击列表进行储存索引数据
    setIndex(i) {
      console.log("这是第几个：", i);
      uni.setStorageSync("index",i);
    },
    gotoMsgDetail() {
      console.log("我去发件详情啦~");
      uni.navigateTo({
        url: "/pages/son/msgDetail/msgDetail",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
.title {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.icon {
  position: fixed;
  right: 5px;
  display: flex;
  align-self: flex-end;
  top: 30px;
}
.msgInfo {
  margin-top: 25px;
}
// 深度
/deep/ .uni-section {
  background: transparent; /*完全透明*/
}
/deep/ .uni-list {
  background: transparent; /*完全透明*/
}
/deep/ .uni-list-item {
  background: transparent; /*完全透明*/
}
</style>
