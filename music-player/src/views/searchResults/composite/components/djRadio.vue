<!-- 展示全部电台 -->
<template>
  <TitleFooter title="电台" :more="djRadio.more" :moreText="djRadio.moreText">
    <Interchangeable v-for="(item, index) in djRadio.djRadios" :key="index" :dj="true"
    :ImgUrl="item.picUrl" :name="item.name" :nicknames="item.dj"
    ></Interchangeable>
  </TitleFooter>
</template>

<script>
import TitleFooter from '../titleFooter'
import Interchangeable from '../interchangeable'
export default {
  name: 'DjRadio',
  components: {
    TitleFooter,
    Interchangeable
  },
  props: {
    djRadio: {
      type: Object
    }
  }
}
</script>

<style lang='less' scoped>

</style>
