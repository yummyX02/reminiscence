<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
    // #ifdef APP-PLUS
    let that = this;
    that.requestAndroidPermission("android.permission.READ_CALENDAR"); // 读取日历
    that.requestAndroidPermission("android.permission.WRITE_CALENDAR"); // 写入日历
    // #endif
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods: {
    // 网址的代码 copy
    async requestAndroidPermission(permisionID) {
      var result = await permision.requestAndroidPermission(permisionID);
      var strStatus;
      if (result == 1) {
        strStatus = "已获得授权";
      } else if (result == 0) {
        strStatus = "未获得授权";
      } else {
        strStatus = "被永久拒绝权限";
      }
      // uni.showModal({
      //     content: permisionID + strStatus,
      //     showCancel: false
      // });
    },
  },
};
</script>

<style>
/*每个页面公共css */
</style>
