<template>
  <view>
    <image class="start" src="/static/start.jpg"></image>
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
      uni.reLaunch({
        url: "/pages/login/login",
      });
    }, 3000);
  },
};
</script>

<style scoped>
.start {
  height: 100vh;
  width: 100vw;
}
</style>
