<!-- 展示全部专辑 -->
<template>
  <TitleFooter title="专辑" :more="album.more" :moreText="album.moreText" linkPage="album" :keyW="keyword">
    <Interchangeable v-for="(item, index) in album.albums " :key="index" :album="true" :ImgUrl="item.blurPicUrl"
    :name="item.name" :artists="item.artists" :durationms="item.publishTime"
    ></Interchangeable>
  </TitleFooter>
</template>

<script>
import TitleFooter from '@/base/titleFooter'
import Interchangeable from '@/base/interchangeable'
export default {
  name: 'Album',
  components: {
    TitleFooter,
    Interchangeable
  },
  props: {
    album: {
      type: Object
    },
    keyword: {
      type: String
    }
  }
}
</script>

<style lang='less' scoped>

</style>
