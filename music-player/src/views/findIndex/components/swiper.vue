<!-- find页面swiper轮播图组件 -->
<template>
  <div class="banner-container">
    <swiper :options="swiperOption" v-if="swiperList.length > 0">
      <!-- slides a标签跳转 url携带歌曲id信息 -->
      <swiper-slide v-for="item in swiperList" :key="item.bannerId">
        <router-link :to="'/song/?id='+ item.targetId">
          <img class="banner-img" :src="item.pic" alt />
          <span class="title" :style="{background:item.titleColor}">{{item.typeTitle}}</span>
        </router-link>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination" v-if="swiperList.length > 1"></div>
    </swiper>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'FindSwiper',
  data () {
    return {
      // 存放图片组信息
      swiperList: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        // 自动轮播
        loop: true,
        autoplay: {
          // 5000毫秒自动播放
          delay: 5000,
          // 用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。
          disableOnInteraction: false
        }
      }
    }
  },
  methods: {
    getFindInfo () {
      api.bannerSwiperFn().then(this.getFindInfoSuc).catch(err => console.log(err))
    },
    getFindInfoSuc (res) {
      if (res.status === 200 && res.statusText === 'OK') {
        res = res.data.banners
        this.swiperList = res
      }
    }
  },
  mounted () {
    this.getFindInfo()
  }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/styles/global.less");
.banner-container /deep/ .swiper-pagination-bullet-active {
  background: @bgcolor;
}
.swiper-container {
  border-radius: @imgBorderRadius;
}
.banner-container {
  box-sizing: border-box;
  overflow: hidden;
  padding: 0.2rem;
  width: 100%;
  height: 0;
  padding-bottom: 40%;
  .banner-img {
    width: 100%;
    height: 100%;
  }
  .title {
    position: absolute;
    right: 0;
    bottom: 0;
    color: #fff;
    font-size: smaller;
    padding: 3px 6px;
    opacity: 0.8;
    border-top-left-radius: @imgBorderRadius;
  }
}
</style>
