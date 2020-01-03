<template>
  <div>
    <div class="list" @click="searchRank(rank)">
      <div class="img-info">
        <img :src="imgUrl" alt="">
        <span class="time">{{ updateTime }}</span>
      </div>
      <div class="list-con">
        <div class="info" v-for="(item, index) in tracks" :key="index">
          {{index + 1 + '.'}}<span>{{item.first}}</span> - <span>{{item.second}}</span>
        </div>
      </div>
    </div>
    <!-- 跳转到专辑详情页 -->
<!--     <router-link class="cover" @click="toAlbum(albumId)" :to="'/albumPage/'+albumId"></router-link>-->
  </div>
</template>

<script>
export default {
  name: 'rankCard',
  props: {
    imgUrl: {
      type: String
    },
    tracks: {
      type: Array
    },
    updateTime: {
      type: String
    },
    albumId: {
      type: Number
    },
    rank: {
      type: String
    }
  },
  methods: {
    searchRank (rank) {
      if (!rank) {
        if (this.albumId) {
          this.$router.push(`/albumPage/${this.albumId}`)
          return
        }
        return
      }
      switch (rank) {
        case '云音乐新歌榜':
          rank = 0
          break
        case '云音乐热歌榜':
          rank = 1
          break
        case '网易原创歌曲榜':
          rank = 2
          break
        case '云音乐飙升榜':
          rank = 3
          break
        case '云音乐说唱榜':
          rank = 23
          break
        case '云音乐ACG音乐榜':
          rank = 22
          break
        case 'KTV唛榜':
          rank = 7
          break
        case 'iTunes榜':
          rank = 8
          break
        case '日本Oricon周榜':
          rank = 10
          break
        case 'Hit FM Top榜':
          rank = 9
          break
        case '台湾Hito排行榜':
          rank = 20
          break
        case 'Beatport全球电子舞曲榜':
          rank = 21
          break
        case '法国 NRJ Vos Hits 周榜':
          rank = 20
          break
        case 'UK排行榜':
          rank = 5
          break
        case '美国Billboard周榜':
          rank = 6
          break
      }
      this.$emit('showRankPage', rank)
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('~@/assets/styles/global.less');
  .list{
    height: 2rem;
    display: flex;
    align-items: center;
    .img-info{
      position: relative;
      width: 1.7rem;
      height: 0;
      padding-bottom: 1.7rem;
      border-radius: 0.13rem;
      overflow: hidden;
      img{
        width: 1.7rem;
        height: 1.7rem;
      }
      .time{
        position: absolute;
        bottom: 3px;
        left: 3px;
        font-size: 12px;
        color: #fff;
      }
    }
    .list-con{
      margin-left: 0.2rem;
      .info{
        height: 0.5rem;
        line-height: 0.5rem;
        width: 4.5rem;
        .ellipsis();
      }
    }
  }
</style>
