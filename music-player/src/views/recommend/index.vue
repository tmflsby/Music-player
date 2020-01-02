<!-- 歌单页面 -->
<template>
  <div class="wrapper">
    <GeneralNav class="pd23" @returnPage="returnPage">
      <span class="text">歌单广场</span>
    </GeneralNav>
    <NavList></NavList>
    <keep-alive>
      <router-view style="height: 87vh; overflow-y: scroll;"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import NavList from '@/views/recommend/navIndex'
import GeneralNav from '@/base/generalNav'
export default {
  name: 'Recommend',
  components: {
    NavList,
    GeneralNav
  },
  methods: {
    returnPage () {
      this.router.go(-1)
    }
  }
}
</script>

<style lang='less' scoped>
@import url('//at.alicdn.com/t/font_1396524_tr1owjj5u5.css');
@import url('~@/assets/styles/global.less');
.wrapper{
  .text{
    font-size: 0.4rem;
    vertical-align: 5px;
  }
}
</style>
