<template>
  <view>
    <div class="big">
      <div class="title">
        <div class="back" @click="back">
          <uni-icons type="back" size="45" color="#99979b"></uni-icons
          ><span style="font-size: 1.4em">返回</span>
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
    back() {
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/old/home/home",
        });
      }, 0);
    },
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
  .title {
    width: 100%;
    height: 23vh;
    margin-bottom: 20px;
    .back {
      display: flex;
      align-items: center;
    }
  }
}
</style>
