<!-- 综合页面 -->
<template>
  <div class="wrapper pd23">
    <div v-show="!load">
      <div v-if="!info">
        <Song :songList="songList" :keyword="keywords" v-if="orderList.includes('song')"></Song>
        <PlayList :playList="playListList" :keyword="keywords" v-if="orderList.includes('playList')"></PlayList>
        <Video :videoList="videoList" :keyword="keywords" v-if="orderList.includes('video')"></Video>
        <SimQuery :simQuery="sim_queryList" :keyword="keywords" v-if="orderList.includes('sim_query')"></SimQuery>
        <Artist :artist="artistList" :keyword="keywords" v-if="orderList.includes('artist')"></Artist>
        <Album :album="albumList" :keyword="keywords" v-if="orderList.includes('album')"></Album>
        <DjRadio :djRadio="djRadioList" :keyword="keywords" v-if="orderList.includes('djRadio')"></DjRadio>
        <User :user="userList" :keyword="keywords" v-if="orderList.includes('user')"></User>
      </div>
      <PageErrorInfo :info="info" :keywords="keywords"></PageErrorInfo>
    </div>
    <PageLoading v-show="load"></PageLoading>
  </div>
</template>

<script>
import PageLoading from '@/base/pageLoading'
import PageErrorInfo from '@/base/pageErrorInfo'
import Song from './components/song'
import PlayList from './components/playList'
import Video from './components/video'
import SimQuery from './components/simQuery'
import Artist from './components/artist'
import Album from './components/album'
import DjRadio from './components/djRadio'
import User from './components/user'
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
    Song,
    PlayList,
    Video,
    SimQuery,
    Artist,
    Album,
    DjRadio,
    User,
    PageErrorInfo,
    PageLoading
  },
  data () {
    return {
      // 这个搜索结果都包含哪些部分
      orderList: [],
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
      userList: {},
      info: false,
      load: true
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
          this.load = false
          // 没有信息展示
          if (this.orderList.length === 0) {
            this.info = true
          }
        }
      }).catch(error => {
        this.load = false
        this.info = true
        console.log(error)
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~@/assets/styles/global.less');
</style>
