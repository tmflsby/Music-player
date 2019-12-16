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
import { mapGetters } from 'vuex'
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
      // 当用户刷新页面时 vuex 状态失效，采用本地存储
      let uid = localStorage.getItem('accountUid')
      id = id || uid
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
  computed: {
    ...mapGetters({
      loginState: 'LOGIN_STATE',
      accountUid: 'ACCOUNT_UID'
    })
  },
  activated () {
    /**
     *
     * 需要增加判断，要不然每次跳转到这个路由都会有事件
     *
     */
    // 获取用户登录成功后储存的登录标志
    let getFlag = localStorage.getItem('loginState')
    if (this.loginState || getFlag) {
      // 用户已经登录
      // 获取用户信息
      this.getInfo()
      // 获取用户播放记录
      this.getRecord(this.accountUid)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('//at.alicdn.com/t/font_1322300_au86cqimtlb.css');
@import url('~@/assets/styles/global.less');
</style>
