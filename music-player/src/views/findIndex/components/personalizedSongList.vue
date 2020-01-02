<!-- find页面推荐歌单组件 -->
<template>
  <div class="wrapper pd23">
    <div class="title">
      <div class="recommended">推荐歌单</div>
      <router-link to="recommend" tag="div" class="square">歌单广场</router-link>
    </div>
    <div class="img-col">
      <ImgCard v-for="(item, index) in songList" :key="index"
               :imgUrl="item.picUrl || item.coverImgUrl"
               :dec="item.name" :playCount="item.playcount || item.playCount"
               :albumId="item.id">
      </ImgCard>
    </div>
  </div>
</template>

<script>
import ImgCard from '@/base/imgCard'
import api from '@/api'
import { mapGetters } from 'vuex'
export default {
  name: 'PersonalizedSongList',
  data () {
    return {
      songList: []
    }
  },
  components: {
    ImgCard
  },
  computed: {
    ...mapGetters({ loginState: 'LOGIN_STATE' })
  },
  methods: {
    /**
     * 在用户没有登陆的情况下随机取出6项进行展示
     */
    getSongListInfo () {
      api.recSongListFn().then(res => {
        const data = res.data
        if (data.code === 200) {
          this.songList = this.getRandomArrayElements(data.playlists, 6)
        }
      }).catch(error => console.log(error))
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
  .img-col{
  .flex-between();
  flex-wrap: wrap;
  }
}
</style>
