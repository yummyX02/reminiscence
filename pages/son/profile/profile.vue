<template>
  <view>
    <view class="top">
      <uni-section class="mb-10" title="用户名" sub-title="编辑">
        <template v-slot:left>
          <text>编辑</text>
        </template>
      </uni-section>
      <uni-section class="mb-11" title="绑定" @click="gotoBind()">
        <template v-slot:right>
          <uni-icons type="forward" size="20"></uni-icons>
        </template>
      </uni-section>
    </view>
    <view class="middle">
      <view class="star">
        ————————<uni-rate v-model="rateValue" @change="onChange" />————————
      </view>
    </view>
    <view class="foot">
      <uni-section class="mb-12" title="纪念日">
        <template v-slot:right>
          <uni-icons @click="addDay()" type="plusempty" size="20"></uni-icons>
        </template>
      </uni-section>
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
    return {};
  },
  methods: {
    addDay() {
      console.log("我去加纪念日啦~");
      uni.navigateTo({
        url: "/pages/son/addDay/addDay",
      });
    },
    gotoBind(){
      console.log("我去绑定关系啦~");
      uni.navigateTo({
        url:"/pages/son/bind/bind",
      })
    }
  },
};
</script>

<style lang="scss">
.star {
  display: flex;
  padding-bottom: 20px;
  padding-top: 30px;
}

</style>
