<!-- 展示全部歌单 -->
<template>
  <TitleFooter title="歌单" :more="playList.more" :moreText="playList.moreText" linkPage="playList" :keyW="keyword">
    <Interchangeable  :songList="true" v-for="(item, index) in playList.playLists" :key="index" :ImgUrl="item.coverImgUrl"
    :name="item.name" :trackCount="item.trackCount" :nickname="item.creator.nickname" :playCount="item.playCount"
    ></Interchangeable>
  </TitleFooter>
</template>

<script>
import TitleFooter from '@/base/titleFooter'
import Interchangeable from '@/base/interchangeable'
export default {
  name: 'PlayList',
  components: {
    TitleFooter,
    Interchangeable
  },
  props: {
    playList: {
      type: Object
    },
    keyword: {
      type: String
    }
  },
  data () {
    return {
      lists: this.playList.playLists
    }
  }
}
</script>

<style lang='less' scoped>

</style>
