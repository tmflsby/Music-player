<!-- 单曲页面 -->
<template>
  <div class="wrapper pd23" @scroll="handleScroll">
    <div v-show="!load">
      <div v-if="!info">
        <div class="title">
          <span @click="startPlay">
            <i class="result cbofang"></i>
            播放全部
          </span>
        </div>
        <div class="song-group">
          <SongList v-for="(item, index) in allSongList" :key="index"
                    :songName="item.name" :artists="item.artists" :albumName="item.album.name"
                    @beginSong="setAudioList(item, index)" :nowSong="item.id === audioSong.id">
          </SongList>
        </div>
        <PageLoading v-show="scroll"></PageLoading>
      </div>
      <PageErrorInfo :info="info" :keywords="keywords"></PageErrorInfo>
    </div>
    <PageLoading v-show="load"></PageLoading>
  </div>
</template>

<script>
import api from '@/api'
import PageErrorInfo from '@/base/pageErrorInfo'
import PageLoading from '@/base/pageLoading'
import SongList from '@/base/songList'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'SongIndex',
  components: {
    PageLoading,
    PageErrorInfo,
    SongList
  },
  data () {
    return {
      allSongList: [],
      offset: 0,
      scroll: false,
      info: false,
      load: true
    }
  },
  props: {
    // 搜索关键字
    keywords: {
      type: String
    }
  },
  computed: {
    ...mapGetters({ audioSong: 'AUDIO_ING_SONG' })
  },
  created () {
    this.getAllSongList(this.keywords)
  },
  methods: {
    ...mapActions(['selectPlay', 'startPlayAll']),
    getAllSongList (key, offset) {
      api.searchFn(key, undefined, offset, 1).then((res) => {
        const data = res.data
        if (data.code === 200) {
          if (this.allSongList.length) {
            this.allSongList = [this.allSongList, ...data.result.songs]
          } else {
            this.allSongList = data.result.songs
          }
          this.load = false
          this.scroll = false
          if (data.result.songCount === 0) {
            this.info = true
          }
        }
      }).catch(error => {
        this.load = false
        this.info = true
        console.log(error)
      })
    },
    /**
     * 滚动触底
     */
    handleScroll () {
      // if (this.$el.scrollTop + this.$el.offsetHeight > this.$el.scrollHeight) {
      //   this.scroll = true
      //   const offset = this.offset += 1
      //   this.getAllSongList(this.keywords, offset)
      // }
    },
    setAudioList (item, index) {
      this.selectPlay({
        list: this.allSongList,
        index
      })
    },
    startPlay () {
      this.startPlayAll({
        list: this.allSongList
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~@/assets/styles/global.less');
.wrapper{
  .title{
    margin: 0.23rem 0 ;
    font-size: 0.3rem;
  }
  .song-group{
    margin-top: 0.16rem;
    .list-item{
      .flex-between();
      align-items: center;
      height: 1rem;
      .song-info{
        display: flex;
        flex-direction: column;
        .song-name{
          width: 6rem;
          height: 0.4rem;
          line-height: 0.4rem;
          .ellipsis();
        }
        .song-art{
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.23rem;
          color: #dacdcd;
          .artist{
            &::after{
            content: "/";
            }
            &:last-child::after{
              content: "";
            }
          }
          .album-name{
            &::before{
              content: "-"
            }
          }
        }
      }
      .icon{
        color: #ccc;
      }
    }
  }
}
</style>
