<template>
  <SongListPage title="每日推荐" :load="load" :isAlbum="false"
                height="3.6rem" @startPlayAll="startPlay">
    <SongList v-for="(item, index) in songLists" :key="index"
              :songName="item.name" :artists="item.artists"
              :albumName="item.album.name" :imgUrl="item.album.blurPicUrl"
              @beginSong="setAudioList(item, index)"
              :nowSong="item.id === audioSong.id">
    </SongList>
  </SongListPage>
</template>

<script>
import api from '@/api'
import SongList from '@/base/songList'
import SongListPage from '@/base/songListPage'
import { mapActions, mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters({ audioSong: 'AUDIO_ING_SONG' })
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
    startPlay () {
      this.startPlayAll({
        list: this.songLists
      })
    },
    setAudioList (item, index) {
      this.selectPlay({
        list: this.songLists,
        index
      })
    },
    ...mapActions(['selectPlay', 'startPlayAll'])
  }
}
</script>

<style lang='less' scoped>

</style>
