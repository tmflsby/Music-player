<!-- 视频页面 -->
<template>
  <div class="wrapper pd23">
    <Interchangeable v-for="(item, index) in allVideoList" :key="index" :videoList="true" :ImgUrl="item.coverUrl"
    :name="item.title" :durationms="item.durationms" :nicknames="item.creator" :playTime="item.playTime"
    ></Interchangeable>
    <PageErrorInfo :info="info" :keywords="keywords"></PageErrorInfo>
  </div>
</template>

<script>
import api from '@/api'
import PageErrorInfo from '@/base/pageErrorInfo'
import Interchangeable from '@/base/interchangeable'
export default {
  name: 'VideoIndex',
  components: {
    Interchangeable,
    PageErrorInfo
  },
  data () {
    return {
      allVideoList: [],
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
    this.getAllVideoList(this.keywords)
  },
  methods: {
    getAllVideoList (key) {
      api.searchFn(key, undefined, undefined, 1014).then((res) => {
        const data = res.data
        if (data.code === 200) {
          if (this.allVideoList.length) {
            this.allVideoList = [this.allVideoList, ...data.result.videos]
          } else {
            this.allVideoList = data.result.videos
          }
          this.$store.commit('SET_LOAD')
          // 当没有视频信息的时候
          if (data.result.videoCount === 0) {
            this.info = true
          }
        }
      }).catch(error => {
        this.$store.commit('SET_LOAD')
        this.info = true
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
