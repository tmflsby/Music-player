<!--  find页面新碟组件 -->
<template>
  <div class="wrapper pd23">
    <div class="title">
      <div class="recommended">新碟</div>
      <div class="square">更多新碟</div>
    </div>
    <div class="img-col">
      <ImgCard v-for="(item, index) in dishList" :key="index" :imgUrl="item.picUrl"
               :dec="item.name" :albumId="item.id">
      </ImgCard>
    </div>
  </div>
</template>

<script>
import ImgCard from '@/base/imgCard'
import api from '@/api'
export default {
  name: 'NewDish',
  data () {
    return {
      dishList: []
    }
  },
  components: {
    ImgCard
  },
  methods: {
    getDishListInfo () {
      api.newDishFn().then(this.setDishListInfo).catch(err => console.log(err))
    },
    setDishListInfo (res) {
      if (res.status === 200 && res.statusText === 'OK') {
        res = res.data.albums
        this.dishList = this.getRandomArrayElements(res, 3)
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
  .img-col {
    .flex-between;
    flex-wrap: wrap;
  }
}
</style>
