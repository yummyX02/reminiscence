<template>
  <view>
    <div class="big">
      <image class="start" src="../../static/start.jpg"></image>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  onReady() {
    setTimeout(() => {
      uni.$http
        .post("/login/phone-token")
        .then((res) => {
          console.log(res);
          if (res.statusCode == 200) {
            if (res.data.code == "00000") {
              console.log("token验证成功");
              uni.reLaunch({
                url: "/pages/modelSelect/modelSelect",
              });
            } else {
              console.log("token验证失败==200");
              uni.reLaunch({
                url: "/pages/login/login",
              });
            }
          } else {
            console.log("token验证失败!=200");
            uni.reLaunch({
              url: "/pages/login/login",
            });
          }
        })
        .catch((err) => {
          console.log(err, "发送请求失败");
          uni.reLaunch({
            url: "/pages/login/login",
          });
        });
    }, 2500);
  },
};
</script>

<style scoped>
.big {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.start {
  height: 100%;
  width: 100%;
}
</style>
