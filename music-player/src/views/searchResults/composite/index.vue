<!-- 综合页面 -->
<template>
  <div class="wrapper">
    <Song :songList="songList"></Song>
  </div>
</template>

<script>
import Song from './components/song'
import api from '@/api'
export default {
  name: '',
  props: {
    // 搜索关键字
    keywords: {
      type: String
    }
  },
  components: {
    Song
  },
  data () {
    return {
      // 这个搜索结果都包含哪些部分
      orderList: {},
      // 查看同名歌曲
      songList: {},
      // 查看全部歌单
      playListList: {},
      // 查看全部视频
      videoList: {},
      // 相关搜索
      sim_queryList: {},
      // 查看全部歌手
      artistList: {},
      // 查看全部专辑
      albumList: {},
      // 查看全部电台
      djRadioList: {},
      // 查看全部用户
      userList: {}
    }
  },
  watch: {
    keywords (val) {
      if (val) {
        this.searchShow(val)
      }
    }
  },
  created () {
    this.searchShow(this.keywords)
  },
  methods: {
    /**
     * 通过获取到的 动态的搜索关键字
     * 来获取数据，返回到页面
     */
    searchShow (key) {
      api.searchFn(key).then(res => {
        const data = res.data
        if (data.code === 200) {
          let { album, order, song, playList, video, artist, djRadio, user } = data.result
          let simQuery = data.result.sim_query
          this.orderList = order
          this.songList = song
          this.playListList = playList
          this.videoList = video
          this.sim_queryList = simQuery
          this.artistList = artist
          this.albumList = album
          this.djRadioList = djRadio
          this.userList = user
          this.$store.commit('SET_LOAD')
          console.log(this.songList)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import url('//at.alicdn.com/t/font_1380711_hgcpetr0qxo.css');
.wrapper{
  box-sizing: border-box;
  padding: 0 0.23rem;
}
</style>
