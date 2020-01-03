<!-- 歌单展示的通用组件 -->
<template>
  <!-- 通过传递参数给子组件，标题，加载样式，图片链接，歌单名称，作者头像，作者昵称，歌单介绍，评论数，分享数，歌单歌曲数，收藏数，是否收藏 -->
  <SongListPage title="歌单" :load="load" :imgUrl="albumInfo.coverImgUrl" :albumTitle="albumInfo.name"
                :creatorImgUrl="albumInfo.creator ? albumInfo.creator.avatarUrl : ''"
                :author="albumInfo.creator ? albumInfo.creator.nickname : ''"
                :description="albumInfo.description" :commentCount="albumInfo.commentCount"
                :shareCount="albumInfo.shareCount" :trackCount="albumInfo.trackCount"
                :subscribedCount="albumInfo.subscribedCount" :subscribed="albumInfo.subscribed"
                @startPlayAll="startPlay">
    <!-- 这是一个通用的用来展示歌曲列表的组件，通过for循环组件进行渲染  这里使用 index+1 展示了页面的索引值 -->
    <SongList v-for="(item, index) in albumInfo.tracks" :key="index" :songName="item.name"
              :artists="item.ar" :albumName="item.al.name" :num="index + 1"
              @beginSong="setAudioList(item, index)" :nowSong="item.id === audioSong.id">
    </SongList>
  </SongListPage>
</template>

<script>
import SongList from '@/base/songList'
import SongListPage from '@/base/songListPage'
import api from '@/api'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AlbumPage',
  data () {
    return {
      albumInfo: [], // 存储信息的数组
      load: true // 用来定义是否显示load加载组件
    }
  },
  components: {
    SongList,
    SongListPage
  },
  computed: {
    ...mapGetters({ audioSong: 'AUDIO_ING_SONG' })
  },
  /**
   * 生命钩子函数在实例创建完成后被立即调用
   */
  created () {
    this.getInfoId()
  },
  activated () {
    this.load = true
    let id = this.$route.params.id
    if (id > 50) {
      this.getInfo(id)
      return
    }
    if (!Number(id)) {
      this.$router.go(-1)
      return
    }
    this.getRankInfo(id)
  },
  methods: {
    /**
     * 获取页面的动态id信息
     */
    getInfoId () {
      const id = this.$route.params.id
      if (id > 50) {
        console.log(id)
        this.getInfo(id)
      } else {
        this.getRankInfo(id)
      }
    },
    /**
     * 根据传入的id获取歌单信息
     *
     * 这里需要增加 catch 方法！！！
     */
    getInfo (id) {
      // 这里使用的是定义的接口信息，详情查看 api 文件夹
      api.albumDetailFn(id).then(res => {
        // 接受数据
        const data = res.data
        // 查看返回数据的 code 状态，如果是 200 的话进行使用
        if (data.code === 200) {
          // 将请求回来的数据使用，将load 样式关闭l
          this.albumInfo = data.playlist
          this.load = false
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 获取排行榜信息
     */
    getRankInfo (id) {
      api.rankListFn(id).then(res => {
        const data = res.data
        if (data.code === 200) {
          this.albumInfo = data.playlist
          this.load = false
        }
      }).catch(error => {
        console.log(error)
      })
    },
    setAudioList (item, index) {
      this.selectPlay({
        list: this.albumInfo.tracks,
        index
      })
    },
    startPlay () {
      this.startPlayAll({
        list: this.albumInfo.tracks
      })
    },
    ...mapActions(['selectPlay', 'startPlayAll'])
  },
  destroyed () {
    // 存储信息的数组
    this.albumInfo = []
    // 用来定义是否显示load加载组件
    this.load = true
  }
}
</script>

<style lang='less' scoped>

</style>
