<!-- 展示全部视频 -->
<template>
  <TitleFooter title="视频" :more="videoList.more" :moreText="videoList.moreText">
    <Interchangeable  :videoList="true" v-for="(item, index) in videoList.videos" :key="index" :ImgUrl="item.coverUrl"
    :name="item.title" :durationms="item.durationms" :nicknames="item.creator" :playTime="item.playTime"
    ></Interchangeable>
  </TitleFooter>
</template>

<script>
import TitleFooter from '../titleFooter'
import Interchangeable from '../interchangeable'
export default {
  name: 'Video',
  components: {
    TitleFooter,
    Interchangeable
  },
  props: {
    videoList: {
      type: Object
    }
  }
}
</script>

<style lang='less' scoped>
.video-list{
  margin-top: 0.26rem;
  .title{
    height: 0.3rem;
      line-height: 0.3rem;
  }
  .more{
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.26rem;
    color: #ccc;
    .youjiantou{
      color: #aaa;
    }
  }
}
</style>
