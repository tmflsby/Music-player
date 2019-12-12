<template>
  <div class="container">
    <FindSwiper></FindSwiper>
    <FindIcon></FindIcon>
    <PersonalizedSongList></PersonalizedSongList>
    <NewDish></NewDish>
  </div>
</template>

<script>
import FindSwiper from './components/swiper'
import FindIcon from './components/icons'
import PersonalizedSongList from './components/personalizedSongList'
import NewDish from './components/newDish'
export default {
  name: 'FindIndex',
  components: {
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
