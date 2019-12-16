<!-- home页面组件 -->
<template>
  <div class="container">
    <DefaultNav></DefaultNav>
    <HomeIcons></HomeIcons>
    <HomeList :num="homeListNum"></HomeList>
    <div class="split"></div>
    <SongList :index="songListNum"></SongList>
  </div>
</template>

<script>
import DefaultNav from '@/views/nav'
import HomeIcons from './components/icons'
import HomeList from './components/homeList'
import SongList from './components/songList'
import api from '@/api'
export default {
  name: 'HomeIndex',
  data () {
    return {
      // 我的页面上部列表
      homeListNum: {
        // 播放记录
        recordNum: 0,
        // 我的电台
        djNum: 0
      },
      songListNum: {
        // 创建的歌单
        createNum: 0,
        // 收藏的歌单
        favoritesNum: 0
      }
    }
  },
  components: {
    DefaultNav,
    HomeIcons,
    HomeList,
    SongList
  },
  methods: {
    /**
     * 获取用户播放记录
     * @param id 用户 uid
     */
    getRecord (id) {
      api
        .userRecordFn(id)
        .then(res => {
          this.homeListNum.recordNum = res.data.allData.length
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取用户信息
     * 更新我的电台、创建的歌单、收藏的歌单数
     */
    getInfo () {
      api.userInfoFn().then(res => {
        let data = res.data
        if (data.code === 200) {
          // 更新我的电台数
          this.homeListNum.djNum = data.djRadioCount
          // 更新创建的歌单数
          this.songListNum.createNum = data.createdPlaylistCount
          // 更新收藏的歌单数
          this.songListNum.favoritesNum = data.subPlaylistCount
        }
      })
    }
  },
  created () {
    // 获取登陆状态
    api.loginStatusFn()
      .then(res => {
        let userId = res.data.profile.userId
        if (res.data.code === 200) {
          // 成功登陆
          // 修改状态为 1
          this.$store.commit('LOGIN_STATE')
          // 存取用户 uid信息
          this.$store.commit('ACCOUNT_UID', userId)
          // 获取用户信息
          this.getInfo()
          // 获取用户播放记录
          this.getRecord(userId)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
@import url('//at.alicdn.com/t/font_1322300_au86cqimtlb.css');
@import url('~@/assets/styles/global.less');
</style>
