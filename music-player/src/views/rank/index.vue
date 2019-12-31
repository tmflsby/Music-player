<!-- 排行榜页面 -->
<template>
  <div class="wrapper pd23">
    <GeneralNav>
      <span class="text">排行榜</span>
    </GeneralNav>
    <div class="title">官方榜</div>
    <RankCard v-for="(item, index) in officialRankList" :key="index" :imgUrl="item.coverImgUrl"
    :tracks="item.tracks" :updateTime="item.updateFrequency" :albumId="item.id"
    ></RankCard>
    <div class="title">推荐榜</div>
    <div class="img-col">
      <ImgCard v-for="(item, index) in recommendedRankList" :key="index" :imgUrl="item.coverImgUrl"
      :dec="item.name" :albumId="item.id" :updateTime="item.updateFrequency"
      ></ImgCard>
    </div>
    <div class="title">更多榜单</div>
    <div class="img-col">
      <ImgCard v-for="(item, index) in moreRankList" :key="index" :imgUrl="item.coverImgUrl"
      :dec="item.name" :albumId="item.id" :updateTime="item.updateFrequency"
      ></ImgCard>
    </div>
  </div>
</template>

<script>
import GeneralNav from '@/base/generalNav'
import RankCard from '@/base/rankCard'
import ImgCard from '@/base/imgCard'
import api from '@/api'
export default {
  name: 'Rank',
  components: {
    GeneralNav,
    RankCard,
    ImgCard
  },
  data () {
    return {
      officialRankList: [],
      recommendedRankList: [],
      moreRankList: []
    }
  },
  created () {
    this.getRankInfo()
  },
  methods: {
    getRankInfo () {
      api.topListFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            this.officialRankList = data.list.slice(0, 4)
            this.recommendedRankList = data.list.slice(4, 10)
            this.moreRankList = data.list.slice(10)
          }
        })
    }
  }
}
</script>

<style lang='less' scoped>
  @import url('~@/assets/styles/global.less');
  .wrapper{
    .text{
      font-size: 0.4rem;
      vertical-align: 5px;
    }
    .title{
      font-weight: 700;
      height: 1rem;
      line-height: 1rem;
    }
    .img-col{
      .flex-between();
      flex-wrap: wrap;
    }
  }
</style>
