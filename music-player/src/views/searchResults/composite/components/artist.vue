<!-- 展示全部歌手 -->
<template>
  <TitleFooter title="歌手" :more="artist.more" :moreText="artist.moreText">
    <Interchangeable v-for="(item, index) in artist.artists" :key="index" :circle="true"
    :ImgUrl="item.img1v1Url" :name="item.name" :isIn="item.accountId"
    ></Interchangeable>
  </TitleFooter>
</template>

<script>
import TitleFooter from '../titleFooter'
import Interchangeable from '../interchangeable'
export default {
  name: 'Aritist',
  components: {
    TitleFooter,
    Interchangeable
  },
  props: {
    artist: {
      type: Object
    }
  }
}
</script>

<style lang='less' scoped>

</style>
