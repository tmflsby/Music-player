<template>
  <div class="audioPage">
    <div class="full pd23" v-show="isFull">
      <GeneralNav class="color" @returnPage="returnPage">
        <div>
          <p class="title">{{name}}</p>
          <p class="text">
            <span class="art" v-for="(item, index) in artist" :key="index">
              {{item.name}}
            </span>
          </p>
        </div>
      </GeneralNav>
      <Playing :imgUrl="imgUrl" v-show="playingShow" @click.native="setPlayingShow(false)"></Playing>
      <LyricPage :lyricArray="ruleLyric" :nowLyricIndex="nowLyricIndex" ref="lyric" :noLyric="noLyric"
                  v-show="!playingShow" @click.native="setPlayingShow(true)">
      </LyricPage>
      <PlayIcons></PlayIcons>
      <Bar :allTime="allTime" :time="playTime" :width="progressWidth" @time="changeTime"></Bar>
      <FunctionButton @play="toggle" @prev="prevSong" @next="nextSong"
                      @changeMode="changeMode" :mode="mode">
      </FunctionButton>
    </div>
    <SmallAudio class="small border-top pd23" v-show="!isFull" :imgUrl="imgUrl"
                @returnFull="returnFull" :name="name" :lyric="nowLyric">
    </SmallAudio>
    <audio :src="url" ref="audio" autoplay @canplay="ready" @error="error"
           preload="auto" @ended="end">
    </audio>
  </div>
</template>

<script>
import api from '@/api'
import GeneralNav from '@/base/generalNav'
import Playing from '@/views/audioIndex/components/playing'
import PlayIcons from '@/views/audioIndex/components/playIcons'
import Bar from '@/views/audioIndex/components/bar'
import FunctionButton from '@/views/audioIndex/components/functionButton'
import SmallAudio from '@/views/audioIndex/components/smallAudio'
import LyricPage from '@/views/audioIndex/components/lyricPage'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: '',
  components: {
    GeneralNav,
    Playing,
    PlayIcons,
    Bar,
    FunctionButton,
    SmallAudio,
    LyricPage
  },
  data () {
    return {
      url: '',
      playTime: '00:00',
      allTime: 0,
      progressWidth: 0,
      artist: [],
      imgUrl: '',
      readySong: false,
      canSong: true,
      name: '',
      lyric: '',
      nowLyric: '',
      nowLyricIndex: -1,
      ruleLyric: [],
      noLyric: false
    }
  },
  computed: {
    ...mapGetters({
      audioSong: 'AUDIO_ING_SONG',
      state: 'PLAY_STATE',
      index: 'AUDIO_ING_INDEX',
      list: 'AUDIO_LIST',
      isFull: 'FULL_SCREEN',
      mode: 'MODE',
      playList: 'PLAY_LIST',
      offsetLyric: 'OFFSET_LYRIC',
      playingShow: 'PLAYING_SHOW'
    })
  },
  watch: {
    /**
     * 当前歌曲变化，首先查看能不能播放
     * 将一些歌曲信息设置
     */
    audioSong (val, oldVal) {
      if (val.id === oldVal.id) {
        return
      }
      this.$nextTick(() => {
        this.checkSong(val.id)
        this.allTime = val.duration ? val.duration : val.dt ? val.dt : ''
        this.artist = val.album ? val.album.artists : val.ar ? val.ar : ''
        this.imgUrl = val.album ? val.album.picUrl : val.al ? val.al.picUrl : ''
        this.name = val.name
      })
    }
  },
  methods: {
    /**
     * 获取音乐url
     */
    getSongUrl (id) {
      api.songUrlFn(id).then(res => {
        const data = res.data
        if (data.code === 200) {
          this.url = data.data[0].url
          this.audioTimeUpdate()
          this.toPlay()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 获取歌曲歌词
     */
    getSongLyric (id) {
      api.songLyricFn(id).then(res => {
        const data = res.data
        if (data.nolyric) {
          // 当前歌曲没有歌词
          this.ruleLyric = []
          this.nowLyric = ''
          this.noLyric = true
          return
        }
        this.noLyric = false
        this.lyric = data.lrc.lyric
        this.ruleLyric = this.createLrcArray(this.lyric)
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 查看歌曲是否可以播放
     */
    checkSong (id) {
      api.checkSongFn(id).then(res => {
        const data = res.data
        // 当可以播放的时候请求歌曲url
        if (data.success) {
          this.canSong = true
          this.getSongUrl(id)
          this.getSongLyric(id)
        }
      }).catch(err => {
        if (err) {
          console.log(err)
          // 不能播放的时候选择下一首进行播放
          this.canSong = false
          this.readySong = true
          this.nextSong()
          this.readySong = true
        }
      })
    },
    /**
     * 创建歌词数组
     * 通过换行符分割字符串，形成数组，数组的每一项是一个对象，对象返回格式如下
     * {time：， word：}
     * @param {String} lrc 歌词字符串
     */
    createLrcArray (lrc) {
      const parts = lrc.split('\n')
      for (let index = 0; index < parts.length; index++) {
        const element = parts[index]
        parts[index] = this.changeToObject(element)
      }
      return parts
    },
    /**
     * 根据一行歌词 转换为对象
     * @param {string} str 一行歌词
     */
    changeToObject (str) {
      const words = str.split(']')[1]
      // 这个正则返回时间信息
      const reg = /\w{0,}:\w{0,}.\w{0,}/g
      let timeArray = reg.exec(str)
      if (!timeArray) {
        return
      }
      timeArray = timeArray[0].split(':')
      const minute = parseInt(timeArray[0]) // 分钟数
      const second = parseFloat(timeArray[1]) // 秒数
      const time = minute * 60 + second
      return {
        time,
        words
      }
    },
    ...mapMutations({
      setState: 'SET_PLAY_SATE',
      setIndex: 'SET_AUDIO_INDEX',
      setFull: 'SET_FULL_SCREEN',
      setMode: 'SET_AUDIO_MODE',
      setPlayList: 'SET_PLAY_LIST',
      setPlayingShow: 'SET_PLAYING_SHOW'
    }),
    /**
     * 播放暂停事件
     */
    toggle () {
      if (this.state) {
        this.toPause()
      } else {
        this.toPlay()
      }
    },
    /**
     * 改变歌曲播放模式
     */
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setMode(mode)
      let shufflePlayList
      if (mode === 2) {
        shufflePlayList = this.shuffle(this.list)
      } else {
        shufflePlayList = this.list
      }
      this.resetCurrentIndex(shufflePlayList)
      this.setPlayList(shufflePlayList)
    },
    /**
     * 设置当前播放索引
     * 当在切换随机播放时，通过寻找原来的歌曲id来实现不会切换歌曲index
     */
    resetCurrentIndex (list) {
      const index = list.findIndex(item => {
        return item.id === this.audioSong.id
      })
      this.setIndex(index)
    },
    /**
     * 获取随机值
     */
    getRandomIndex (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    /**
     * 打乱一个数组
     */
    shuffle (arr) {
      const _arr = arr.slice()
      for (let i = 0; i < _arr.length; i++) {
        const j = this.getRandomIndex(0, i)
        const t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
      }
      return _arr
    },
    /**
     * 当改变进度条时改变歌曲播放时间
     */
    changeTime (time) {
      const audio = this.$refs.audio
      audio.currentTime = time * audio.duration / 100
    },
    /**
     * 上一首歌曲切换
     */
    prevSong () {
      if (!this.readySong) {
        return
      }
      let nowIndex = this.index - 1
      if (nowIndex === -1) {
        nowIndex = this.list.length - 1
      }
      this.setIndex(nowIndex)
      this.readySong = false
    },
    /**
     * 下一首歌曲切换
     */
    nextSong () {
      if (!this.readySong) {
        return
      }
      let nowIndex = this.index + 1
      if (nowIndex === this.list.length) {
        nowIndex = 0
      }
      this.setIndex(nowIndex)
      this.readySong = false
    },
    /**
     * 播放歌曲
     */
    toPlay () {
      this.$refs.audio.play()
      this.setState(true)
    },
    /**
     * 暂停歌曲
     */
    toPause () {
      this.$refs.audio.pause()
      this.setState(false)
    },
    /**
     *  当浏览器可以播放资源时
     */
    ready () {
      this.readySong = true
    },
    /**
     * 当在资源加载期间发生错误时
     */
    error () {
      this.readySong = true
    },
    /**
     * 当歌曲播放完成之后
     */
    end () {
      switch (this.mode) {
        case 0:
          this.nextSong()
          break
        case 1:
          this.loop()
          break
        case 2:
          this.nextSong()
          break
      }
    },
    /**
     * 单曲循环模式
     */
    loop () {
      this.$refs.audio.currentTime = 0
      this.toPlay()
    },
    /**
     * 添加歌曲时间更新事件
     */
    audioTimeUpdate () {
      this.$refs.audio.addEventListener('timeupdate', this.setTime)
    },
    /**
     * 设置当前播放时长
     */
    setTime () {
      // 首先我们计算到当前的播放时间
      const audio = this.$refs.audio
      let minutes = Math.floor(audio.currentTime / 60)
      let seconds = Math.floor(audio.currentTime - minutes * 60)
      let minuteValue
      let secondValue
      // 进行格式转换，当分钟小于10的时候，在前面加0
      if (minutes < 10) {
        minuteValue = '0' + minutes
      } else {
        minuteValue = minutes
      }
      // 秒数的格式设置
      if (seconds < 10) {
        secondValue = '0' + seconds
      } else {
        secondValue = seconds
      }
      // 进行时间值拼接，展示到页面
      let audioTime = minuteValue + ':' + secondValue
      this.playTime = audioTime
      // // 进度条的长度计算
      let barLength = audio.currentTime / audio.duration * 100
      this.setProgress(barLength)
      // 设置歌词偏移
      const playTime = audio.currentTime + this.offsetLyric
      const index = this.getCurrentIndex(playTime, this.ruleLyric)
      this.nowLyricIndex = index
      // 设置歌词显示
      this.showLyric(index, this.ruleLyric)
      // 设置歌词页面的显示规则,传入当前歌词索引信息
      this.$refs.lyric.setCurrent(this.nowLyricIndex)
    },
    /**
     * 获取当前歌词索引
     */
    getCurrentIndex (time, lyricArray) {
      for (let i = lyricArray.length - 2; i >= 0; i--) {
        const element = lyricArray[i].time
        if (time > element) {
          return i
        }
        if (!element) {
          return -1
        }
      }
      return -1
    },
    /**
     * 设置当前歌词显示信息
     */
    showLyric (index, array) {
      if (index !== -1) {
        this.nowLyric = array[index].words
      }
    },
    /**
     * 设置进度条长度
     */
    setProgress (val) {
      if (val < 0 || val > 100) {
        return
      }
      this.progressWidth = val
    },
    /**
     * 转换为小播放器
     */
    returnPage () {
      this.setFull(false)
    },
    /**
     * 转换为大播放器
     */
    returnFull () {
      this.setFull(true)
    }
  }
}
</script>

<style lang='less' scoped>
  @import url('//at.alicdn.com/t/font_1410851_1kpmn0o6bx5.css');
  @import url('~@/assets/styles/global.less');
  .full{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    background-color: #7f8c8d;
    .color{
      color: #fff;
    }
    .title{
      color: #fff;
      line-height: 1.5;
    }
    .text{
      font-size: 0.24rem;
      color: #bdc3c7;
      .art{
        &::after{
          content: "/";
        }
        &:last-child::after{
          content:''
        }
      }
    }
  }
  .small{
    position: fixed;
    width: 100vw;
    height: 1rem;
    bottom: 0;
    z-index: 9999;
    background-color: #fff;
  }
</style>
