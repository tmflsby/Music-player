<!-- 歌单页面 -->
<template>
  <div class="wrapper pd23">
    <Interchangeable v-for="(item, index) in allSongListList" :key="index" :songList="true" :ImgUrl="item.coverImgUrl"
    :name="item.name" :trackCount="item.trackCount" :nickname="item.creator.nickname" :playCount="item.playCount"
    ></Interchangeable>
    <PageErrorInfo :info="info" :keywords="keywords"></PageErrorInfo>
 </div>
</template>

<script>
import api from '@/api'
import PageErrorInfo from '@/base/pageErrorInfo'
import Interchangeable from '@/base/interchangeable'
export default {
  name: 'PlayListIndex',
  components: {
    PageErrorInfo,
    Interchangeable
  },
  data () {
    return {
      allSongListList: [],
      info: false
    }
  },
  props: {
    // 搜索关键字
    keywords: {
      type: String
    }
  },
  created () {
    this.getAllSongListList(this.keywords)
  },
  methods: {
    getAllSongListList (key) {
      api.searchFn(key, undefined, undefined, 1000).then((res) => {
        const data = res.data
        if (data.code === 200) {
          if (data.result.playlistCount === 0) {
            // 没有内容，展示提示信息
            this.info = true
          }
          if (this.allSongListList.length) {
            // 这里的歌单获取有问题
            this.allSongListList = [this.allSongListList, ...data.result.playlists]
          } else {
            this.allSongListList = data.result.playlists
          }
          this.$store.commit('SET_LOAD')
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
.wrapper{
  height: 87vh;
  overflow-y: scroll;
}
</style>
