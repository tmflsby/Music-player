<template>
  <div class="container">
    <HomeIcons></HomeIcons>
    <HomeList></HomeList>
    <div class="split"></div>
    <SongList></SongList>
  </div>
</template>

<script>
import HomeIcons from './components/icons'
import HomeList from './components/homeList'
import SongList from './components/songList'
export default {
  name: 'HomeIndex',
  components: {
    HomeIcons,
    HomeList,
    SongList
  }
}
</script>

<style lang="less" scoped></style>
