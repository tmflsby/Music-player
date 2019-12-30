<!-- find页面推荐歌单组件 -->
<template>
  <div class="wrapper pd23">
    <div class="title">
      <div class="recommended">推荐歌单</div>
      <div class="square">歌单广场</div>
    </div>
    <ul class="song-group">
      <li class="song-list" v-for="(item, index) in songList" :key="index">
        <div class="list-img">
          <img :src="item.picUrl" alt />
          <span class="play-count">
            <i class="find bofang"></i>
            {{item.playcount | playCount}}
          </span>
          <router-link class="cover" :to="'/songListPage/'+item.id"></router-link>
        </div>
        <div class="list-con">{{item.name}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/api'
import { mapGetters } from 'vuex'
export default {
  name: 'PersonalizedSongList',
  data () {
    return {
      songList: []
    }
  },
  filters: {
    playCount (val) {
      if (!val) {
        return ''
      }
      if (val > 100000000) {
        val = ((val / 100000000).toFixed(1)) + '亿'
      } else if (val > 10000) {
        val = Math.floor(val / 10000) + '万'
      }
      return val
    }
  },
  computed: {
    ...mapGetters({ loginState: 'LOGIN_STATE' })
  },
  methods: {
    /**
     * 在用户没有登陆的情况下随机取出6项进行展示
     */
    getSongListInfo () {
      api.recSongListFn().then(this.setSongListInfo).catch(err => console.log(err))
    },
    setSongListInfo (res) {
      if (res.status === 200 && res.statusText === 'OK') {
        res = res.data.result
        this.songList = this.getRandomArrayElements(res, 6)
      }
    },
    /**
     * 随机取出数组中的几项
     */
    getRandomArrayElements (arr, count) {
      let shuffled = arr.slice(0)
      // 克隆一个数组，为了不影响外边的数据
      let i = arr.length
      let min = i - count
      // 存下来数组信息  数组的长度
      // 通过改变数组项的位置 输出后边的几位
      while (--i > min) {
        // 随机生成出一个索引
        let index = Math.floor((i + 1) * Math.random())
        // 将随机索引项暂存
        // 将数组后边的项与随机项调换
        let temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
      }
      return shuffled.slice(min)
    },
    /**
     * 在用户登陆情况下执行这个函数获取每日推荐歌单
     */
    loadGetSongListInfo () {
      api.dateRecSongListFn()
        .then(res => {
          const data = res.data
          if (data.code === 200) {
            const arr = data.recommend
            console.log(arr)
            this.songList = this.getRandomArrayElements(arr, 6)
          }
        })
    }
  },
  activated () {
    let getFlag = localStorage.getItem('loginState')
    if (this.loginState || getFlag) {
      // 用户已经登录
      this.loadGetSongListInfo()
    } else {
      this.getSongListInfo()
    }
  }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/styles/global.less");
.wrapper {
  .title {
    width: 100%;
    height: 1.2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    .recommended {
      font-size: 0.3rem;
      font-weight: 700;
    }
    .square {
      .smallTag();
      margin-left: auto;
    }
  }
  .song-group {
    .flex-between();
    flex-wrap: wrap;
    .song-list {
      flex: 0 0 30%;
      display: flex;
      flex-direction: column;
      .list-img {
        position: relative;
        width: 2.1rem;
        height: 0;
        padding-bottom: 2.1rem;
        background-color: #aaa;
        border-radius: @imgBorderRadius;
        overflow: hidden;
        img {
          width: 100%;
        }
        .play-count {
          position: absolute;
          top: 0.11rem;
          right: 0.11rem;
          font-size: 0.2rem;
          color: #fff;
          .bofang {
            font-size: 0.18rem;
          }
        }
      }
      .list-con {
        margin: 0.2rem 0 0.3rem;
        font-size: 0.24rem;
        line-height: 0.3rem;
        letter-spacing: 1px;
        .twoLinesEllipsis();
      }
    }
  }
}
</style>
