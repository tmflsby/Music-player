<template>
  <SongListPage title="每日推荐" :load="load" :isAlbum="false" height="3.6rem">
    <SongList v-for="(item, index) in songLists" :key="index"
              :songName="item.name" :artists="item.artists"
              :albumName="item.album.name" :imgUrl="item.album.blurPicUrl"
              @click.native="setAudioList(item, index)">
    </SongList>
  </SongListPage>
</template>

<script>
import api from '@/api'
import SongList from '@/base/songList'
import SongListPage from '@/base/songListPage'
import { mapActions } from 'vuex'
export default {
  name: 'DateRecommend',
  components: {
    SongList,
    SongListPage
  },
  data () {
    return {
      songLists: [],
      load: ''
    }
  },
  created () {
    this.getRecSongs()
  },
  methods: {
    getRecSongs () {
      api.recSongsFn().then(res => {
        const data = res.data
        if (data.code === 200) {
          this.songLists = data.recommend
          this.load = false
        }
      })
    },
    ...mapActions(['selectPlay']),
    setAudioList (item, index) {
      console.log(111)
      this.selectPlay({
        list: this.songLists,
        index
      })
    }
  }
}
</script>

<style lang='less' scoped>

</style>
