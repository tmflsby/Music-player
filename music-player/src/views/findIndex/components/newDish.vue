<!--  find页面新碟组件 -->
<template>
  <div class="wrapper pd23">
    <div class="title">
      <div class="recommended">新碟</div>
      <div class="square">更多新碟</div>
    </div>
    <ul class="song-group">
      <li class="song-list" v-for="(item, index) in dishList" :key="index">
        <div class="list-img">
          <img :src="item.picUrl" alt />
          <!-- 跳转到专辑详情页 -->
          <router-link class="cover" :to="'/album?id='+item.id"></router-link>
        </div>
        <div class="list-con">{{item.name}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'NewDish',
  data () {
    return {
      dishList: []
    }
  },
  methods: {
    getDishListInfo () {
      axios.get('http://140.143.128.100:3000/top/album?offset=0&limit=20').then(this.setDishListInfo)
    },
    setDishListInfo (res) {
      if (res.status === 200 && res.statusText === 'OK') {
        console.log(res)
        res = res.data.albums
        this.dishList = this.getRandomArrayElements(res, 3)
        console.log(this.dishList)
      }
    },
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
    }
  },
  mounted () {
    this.getDishListInfo()
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
    .flex-between;
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
