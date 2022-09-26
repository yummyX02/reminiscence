<template>
  <view class="father">
    <view class="top">
      <!-- 用户名部分 -->
      <view class="id">
        <div class="id_left">
          <div class="id_text">{{id}}</div>
          <div class="id_right">编辑</div>
        </div>
      </view>
      <!-- 绑定部分 -->
      <view class="bind">
        <div class="bind_left">
          <div class="bind_text">绑定</div>
        </div>
        <div class="bind_right">
          <uni-icons type="forward" size="30" @click="gotoBind()"></uni-icons>
        </div>
      </view>
    </view>
    <view class="middle">
      <view class="star">
        ————————<uni-rate v-model="rateValue" @change="onChange" />————————
      </view>
    </view>
    <view class="foot">
      <view class="memory">
        <div class="left">纪念日</div>
        <div class="right">
          <uni-icons @click="addDay()" type="plusempty" size="20"></uni-icons>
        </div>
      </view>
      <view class="card">
        <uni-card title="妈妈生日" extra="2022.11.23">
          <text class="uni-body"
            >这是一个基础卡片示例，此示例展示了一个标题加标题额外信息的标准卡片。</text
          >
        </uni-card>
        <uni-card title="爸爸生日" extra="2022.11.25">
          <text class="uni-body"
            >这是一个基础卡片示例，此示例展示了一个标题加标题额外信息的标准卡片。</text
          >
        </uni-card>
        <uni-card title="结婚纪念日" extra="2022.11.23">
          <text class="uni-body"
            >这是一个基础卡片示例，此示例展示了一个标题加标题额外信息的标准卡片。</text
          >
        </uni-card>
        <uni-card title="破壳日" extra="2022.12.25">
          <text class="uni-body"
            >这是一个基础卡片示例，此示例展示了一个标题加标题额外信息的标准卡片。</text
          >
        </uni-card>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      id:"静待",
    };
  },
  methods: {
    addDay() {
      console.log("我去加纪念日啦~");
      uni.navigateTo({
        url: "/pages/son/addDay/addDay",
      });
    },
    gotoBind() {
      console.log("我去绑定关系啦~");
      uni.navigateTo({
        url: "/pages/son/bind/bind",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.star {
  display: flex;
  padding-bottom: 20px;
  padding-top: 30px;
}
.memory {
  padding-left: 18px;
  padding-right: 18px;
  display: flex;
  justify-content: space-between;
}
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
.top {
  display: flex;
  flex-direction: column;
}
.bind {
  margin-top: 15px;
  display: flex;
  border-bottom: 1px solid #e3e3e3;
  justify-content: space-between;
  padding: 5px 18px;
  background-color: rgba(255, 255, 255,0.3);
  .bind_text {
    font-size: 16px;
  }
}
.id {
  margin-top: 30px;
  display: flex;
  border-bottom: 1px solid #e3e3e3;
  background-color: rgba(255, 255, 255,0.3);

  .id_text {
    font-size: 20px;
    padding-right: 3px;
  }
  .id_left {
    display: flex;
    padding: 5px 18px;
    align-items: center;
  }
  .id_right {
    font-size: 12px;
    padding-left: 2px;
    background-color: #93dd28;
    color: #ffff;
    width: 32px;
    height: 18px;
    text-align: center;
    border-radius: 8px;
  }
}
/deep/ .uni-card{
  background-color: rgba(255, 255, 255,0.7);

}
</style>
