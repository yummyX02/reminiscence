<template>
  <view>
    <div class="big">
      <image class="start" src="/static/start.jpg"></image>
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
      uni.reLaunch({
        url: "/pages/login/login",
      });
    }, 3000);
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
