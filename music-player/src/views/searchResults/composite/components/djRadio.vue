<!-- 展示全部电台 -->
<template>
  <TitleFooter title="电台" :more="djRadio.more" :moreText="djRadio.moreText" linkPage="djRadio" :keyW="keyword">
    <Interchangeable v-for="(item, index) in djRadio.djRadios" :key="index" :dj="true"
    :ImgUrl="item.picUrl" :name="item.name" :nicknames="item.dj"
    ></Interchangeable>
  </TitleFooter>
</template>

<script>
import TitleFooter from '@/base/titleFooter'
import Interchangeable from '@/base/interchangeable'
export default {
  name: 'DjRadio',
  components: {
    TitleFooter,
    Interchangeable
  },
  props: {
    djRadio: {
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
