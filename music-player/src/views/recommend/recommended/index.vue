<template>
 <div class="pd23">
   <div v-show="!load">
      <el-carousel class="swiper" type="card" height="4.12rem" :autoplay="false" indicator-position="none">
        <el-carousel-item v-for="(item, index) in swiper" :key="index">
          <ImgCard :playCount="item.playCount" :imgUrl="item.coverImgUrl" :albumId="item.id"
          :dec="item.name" width="3.35rem" top="" :swiper="true"
          ></ImgCard>
        </el-carousel-item>
      </el-carousel>
      <div class="img-col">
      <ImgCard v-for="(item, index) in list" :key="index" :playCount="item.playCount"
      :imgUrl="item.coverImgUrl" :dec="item.name" :albumId="item.id"
      ></ImgCard>
      </div>
  </div>
  <PageLoading v-show="load"></PageLoading>
 </div>
</template>

<script>
import api from '@/api'
import ImgCard from '@/base/imgCard'
import PageLoading from '@/base/pageLoading'
export default {
  name: '',
  data () {
    return {
      swiper: [],
      list: [],
      load: true
    }
  },
  components: {
    ImgCard,
    PageLoading
  },
  created () {
    this.getListInfo()
  },
  methods: {
    getListInfo () {
      api.recSongListFn(33).then(res => {
        const data = res.data
        if (data.code === 200) {
          if (this.swiper.length === 0) {
            this.swiper = data.playlists.splice(0, 3)
          }
          this.list = data.playlists
          this.load = false
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~@/assets/styles/global.less');
.swiper{
  margin: 0.3rem 0;
}
.img-col{
  .flex-between();
  flex-wrap: wrap;
}
el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}
.el-carousel__item:nth-child(2n) {
  /*background-color: #99a9bf;*/
}
.el-carousel__item:nth-child(2n+1) {
  /*background-color: #d3dce6;*/
}
</style>
