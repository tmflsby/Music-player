<template>
  <div class="container">
    <FindSwiper :swiperList="swiperList"></FindSwiper>
    <FindIcon></FindIcon>
  </div>
</template>

<script>
import FindSwiper from './components/swiper'
import FindIcon from './components/icons'
import axios from 'axios'
export default {
  name: 'FindIndex',
  components: {
    FindSwiper,
    FindIcon
  },
  data () {
    return {
      swiperList: []
    }
  },
  methods: {
    getFindInfo () {
      axios.get('http://140.143.128.100:3000/banner?type=1').then(this.getFindInfoSuc)
    },
    getFindInfoSuc (res) {
      console.log(res)
      res = res.data.banners
      this.swiperList = res
    }
  },
  mounted () {
    this.getFindInfo()
  }
}
</script>

<style lang="less" scoped></style>
