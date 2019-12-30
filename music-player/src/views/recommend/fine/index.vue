<template>
 <div class="pd23">
   <div v-show="!load">
    <div class="wrapper-top">
      <span class="title">全部</span>
      <span class="filter smallTag"><i class="recommend shaixuan"></i> 筛选</span>
    </div>
    <div class="img-col">
      <ImgCard v-for="(item, index) in list" :key="index" :playCount="item.playCount"
      :imgUrl="item.coverImgUrl" :dec="item.name" :fine="true"
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
  components: {
    ImgCard,
    PageLoading
  },
  data () {
    return {
      list: [],
      load: true
    }
  },
  created () {
    this.getFineList()
  },
  methods: {
    getFineList () {
      api.highqualityFn().then(res => {
        const data = res.data
        if (data.code === 200) {
          this.list = data.playlists
          this.load = false
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~@/assets/styles/global.less');
.wrapper-top{
  .flex-between();
  margin-top: 0.3rem;
  .shaixuan{
    font-size: 0.23rem;
  }
}
.img-col{
  .flex-between();
  flex-wrap: wrap;
}
</style>
