<template>
  <view class="father">
    <view class="title">
      <uni-section title="发件箱" titleFontSize="16px" id="title"></uni-section>
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
    <view class="msgInfo">
      <uni-list>
        <uni-list-item
          class="listItem"
          v-for="(item, i) in msgList"
          :key="i"
          :title="item.name"
          :note="item.note"
          @click="gotoMsgDetail()"
          link
        >
          <template slot="footer">
            <image
              style="width: 30px; heght: 30px"
              src="../../../static/bofang.png"
              mode="widthFix"
            ></image>
          </template>
        </uni-list-item>
      </uni-list>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      msgList: [
        {
          name: "妈妈",
          note: "吃药",
        },
        { name: "爸爸", note: "吃饭" },
        { name: "爷爷", note: "接娃" },
      ],
      extraIcon1: "static/bofang.png",
    };
  },
  onload() {
    let data = {
      userId: "",
      keyWord: "",
    };
    uni.$http
      .get("/child/outbox/all", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
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
}
.icon {
  position: fixed;
  right: 0;
  display: flex;
  align-self: flex-end;
}
// 深度
/deep/ .uni-section{
  background: transparent; /*完全透明*/
}
/deep/ .uni-list{
  background: transparent; /*完全透明*/
}
/deep/ .uni-list-item{
  background: transparent; /*完全透明*/
}
</style>
