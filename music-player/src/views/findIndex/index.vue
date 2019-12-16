<!-- find页面组件 -->
<template>
  <div class="container">
    <DefaultNav></DefaultNav>
    <FindSwiper></FindSwiper>
    <FindIcon></FindIcon>
    <PersonalizedSongList></PersonalizedSongList>
    <NewDish></NewDish>
  </div>
</template>

<script>
import DefaultNav from '@/views/nav'
import FindSwiper from './components/swiper'
import FindIcon from './components/icons'
import PersonalizedSongList from './components/personalizedSongList'
import NewDish from './components/newDish'
export default {
  name: 'FindIndex',
  components: {
    DefaultNav,
    FindSwiper,
    FindIcon,
    PersonalizedSongList,
    NewDish
  }
}
</script>

<style lang="less" scoped>
@import url('//at.alicdn.com/t/font_1295705_v7ick88icjn.css');
</style>
