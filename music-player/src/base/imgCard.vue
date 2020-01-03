<template>
  <div class="img-card" @click="searchRank(rank)" :style="{width, marginTop:top}">
    <span class="tag" v-if="playCount" >
      <i class="card cardbofang"></i>
      {{playCount | setPlayCount}}
    </span>
    <span class="swiper-tag" v-if="swiper">
      <i class="card cardbofang1"></i>
    </span>
    <span class="fine-tag" v-if="fine">
      <i class="card cardhuangguan"></i>
    </span>
    <span class="time-tag" v-if="updateTime">
      {{ updateTime }}
    </span>
    <div class="img-con" :style="{width, paddingBottom: width}">
      <img v-lazy="imgUrl" class="image">
      <!-- 跳转到专辑详情页 -->
      <!-- <router-link class="cover"  @click="toAlbum(albumId)" :to="'/albumPage/'+albumId"></router-link>-->
    </div>
      <div class="dec">
        {{ dec }}
      </div>
  </div>
</template>

<script>
export default {
  name: 'ImgCard',
  props: {
    playCount: {
      type: Number
    },
    updateTime: {
      type: String
    },
    imgUrl: {
      type: String
    },
    dec: {
      type: String
    },
    width: {
      type: String,
      default: '2.1rem'
    },
    top: {
      type: String,
      default: '0.3rem'
    },
    // 如果是轮播图，则显示大播放按钮
    swiper: {
      type: Boolean,
      default: false
    },
    fine: {
      type: Boolean,
      default: false
    },
    albumId: {
      type: Number
    },
    rank: {
      type: String
    }
  },
  methods: {
    /**
     * 给图片卡片注册点击事件
     *
     * 当没有rank时，查看是否有albumId，如果有跳转歌单页面
     * 如果有rank时说明是排行榜页面，跳转到排行榜页面
     */
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
  },
  filters: {
    setPlayCount (val) {
      if (!val) {
        return ''
      }
      if (val > 100000000) {
        val = ((val / 100000000).toFixed(1)) + '亿'
      } else if (val > 10000) {
        val = Math.floor(val / 10000) + '万'
      }
      return val
    }
  }
}
</script>

<style lang='less' scoped>
@import url('//at.alicdn.com/t/font_1396631_tp8pq8axas.css');
@import url('~@/assets/styles/global.less');
.img-card{
  position: relative;
  background-color: #fff;
  .time-tag{
    position: absolute;
    bottom: 0.54rem;
    left: 3px;
    font-size: 12px;
    color: #fff;
  }
  .tag{
    position: absolute;
    top: 0.11rem;
    right: 0.11rem;
    font-size: 0.2rem;
    color: #fff;
    .cardbofang {
      font-size: 0.18rem;
    }
  }
  .swiper-tag{
    position: absolute;
    bottom: 1rem;
    right: 0.11rem;
    .cardbofang1{
      font-size: 1rem;
      color: #fff;
      opacity: 0.6;
    }
  }
  .fine-tag{
    position: absolute;
    transform: rotate(-45deg);
    top: 0;
    left: 0;
    .cardhuangguan{
      color: #f39c12;
      font-size: 0.5rem;
    }
  }
  .img-con{
    height: 0;
    background-color: #aaa;
    border-radius: 0.2rem;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .dec{
    margin-top: 0.2rem;
    font-size: 0.23rem;
    line-height: 0.3rem;
    letter-spacing: 1px;
    .twoLinesEllipsis()
  }
}
</style>
