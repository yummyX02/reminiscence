<template>
  <view>
    <button @click="demo()">test</button>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    demo() {
      const data = { phone: "18792881535" };
      uni.$http.post("/login/phone-get-sms", data).then((res) => {
        console.log("发送成功啦");
      }).then((err)=>{
        console.log("我调用失败啦");
      })
    },
  },
};
</script>

<style lang="scss">
</style>
