<template>
  <div>
    <SearchInput :keyword="key"></SearchInput>
    <NavIndex></NavIndex>
    <router-view v-show="!load" :keywords="key"></router-view>
    <PageLoading v-show="load"></PageLoading>
  </div>
</template>

<script>
import NavIndex from './navIndex'
import SearchInput from '@/base/searchInput'
import PageLoading from '@/base/pageLoading'
import { mapGetters } from 'vuex'
export default {
  name: 'SearchResults',
  data () {
    return {
      key: ''
    }
  },
  components: {
    SearchInput,
    PageLoading,
    NavIndex
  },
  computed: {
    ...mapGetters({ 'load': 'LOAD' })
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      this.key = to.params.id
    }
  },
  created () {
    this.setKey()
  },
  methods: {
    setKey () {
      this.key = this.$route.params.id
    }
  }
}
</script>

<style lang='less' scoped>
@import url('//at.alicdn.com/t/font_1380711_5p2kgyidw5.css');
@import url('~@/assets/styles/global.less');
.el-button--info{
  background: #fff;
  color: #000
}
.btn{
  width: 100px;
  height: 50px;
}
.button{
    position: relative;
    overflow: hidden;
    user-select: none;
}
.button:after{
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
     //设置径向渐变
    background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .3s, opacity .5s;
}
.button:active:after{
    transform: scale(0, 0);
    opacity: .3;
    //设置初始状态
    transition: 0s;
}
</style>
