<!-- 登录电话路由组件 -->
<template>
  <div class="wrapper">
    <LoginNav>
      <span class="text">{{text}}</span>
    </LoginNav>
    <router-view></router-view>
  </div>
</template>

<script>
import LoginNav from '@/base/generalNav'
export default {
  name: 'AccountLogin',
  components: {
    LoginNav
  },
  data () {
    return {
      text: '手机号登录'
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper{
  box-sizing: border-box;
  padding: 0.23rem;
}
.text{
  font-size: 0.4rem;
  vertical-align: 5px;
}
</style>
