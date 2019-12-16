<!-- 侧边栏页面组件 -->
<template>
  <div class="login-menu">
    <LoginTop></LoginTop>
    <LoginIcons></LoginIcons>
    <LoginIconsTop></LoginIconsTop>
    <LoginIconsBottom></LoginIconsBottom>
    <LoginBottom></LoginBottom>
  </div>
</template>

<script>
import LoginTop from './login-top'
import LoginIcons from './login-icons'
import LoginIconsTop from './login-icons-top'
import LoginIconsBottom from './login-icons-bottom'
import LoginBottom from './login-bottom'
export default {
  name: 'login',
  components: {
    LoginTop,
    LoginIcons,
    LoginIconsTop,
    LoginIconsBottom,
    LoginBottom
  }
}
</script>

<style lang="less" scoped>
@import url('//at.alicdn.com/t/font_1322263_fy4q7rzis3b.css');
.login-menu {
  // 左侧侧边栏 宽度设置为6rem
  position: absolute;
  z-index: 11;
  height: 100vh;
  overflow-y:auto;
  top: 0;
  left: 0;
  width: 6rem;
  background: #fff;
}
</style>
