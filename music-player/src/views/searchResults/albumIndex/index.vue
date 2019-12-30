<!-- 专辑页面 -->
<template>
  <div class="wrapper pd23">
    <div v-show="!load">
      <Interchangeable v-for="(item, index) in allAlbumList" :key="index" :album="true" :ImgUrl="item.blurPicUrl"
      :name="item.name" :artists="item.artists" :durationms="item.publishTime"
      ></Interchangeable>
      <PageErrorInfo :info="info" :keywords="keywords"></PageErrorInfo>
    </div>
    <PageLoading v-show="load"></PageLoading>
  </div>
</template>

<script>
import api from '@/api'
import PageErrorInfo from '@/base/pageErrorInfo'
import Interchangeable from '@/base/interchangeable'
import PageLoading from '@/base/pageLoading'
export default {
  name: 'AlbumIndex',
  components: {
    PageErrorInfo,
    Interchangeable,
    PageLoading
  },
  data () {
    return {
      allAlbumList: [],
      info: false,
      load: true
    }
  },
  props: {
    // 搜索关键字
    keywords: {
      type: String
    }
  },
  created () {
    this.getAllAlbumList(this.keywords)
  },
  methods: {
    getAllAlbumList (key) {
      api.searchFn(key, undefined, undefined, 10).then((res) => {
        const data = res.data
        if (data.code === 200) {
          if (this.allAlbumList.length) {
            this.allAlbumList = [this.allAlbumList, ...data.result.albums]
          } else {
            this.allAlbumList = data.result.albums
          }
          this.load = false
          if (res.result.albumCount === 0) {
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
