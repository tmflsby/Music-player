<!-- 登录电话路由组件 -->
<template>
  <div class="wrapper">
    <LoginNav></LoginNav>
    <router-view></router-view>
  </div>
</template>

<script>
import LoginNav from '@/base/generalNav'
export default {
  name: 'AccountLogin',
  components: {
    LoginNav
  }
}
</script>

<style lang="less" scoped>
.wrapper{
  box-sizing: border-box;
  padding: 0.23rem;
}
</style>
