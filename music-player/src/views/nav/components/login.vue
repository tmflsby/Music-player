<template>
  <div class="login-menu">
    <LoginTop></LoginTop>
    <LoginIcons></LoginIcons>
    <LoginList></LoginList>
  </div>
</template>

<script>
import LoginTop from './login-top'
import LoginIcons from './login-icons'
import LoginList from './login-list'
export default {
  name: 'login',
  components: {
    LoginTop,
    LoginIcons,
    LoginList
  },
  props: {
    left: [String, Number]
  }
}
</script>

<style lang="less" scoped>
.login-menu {
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
