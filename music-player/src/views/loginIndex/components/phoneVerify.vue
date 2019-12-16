<!-- 手机号验证 -->
<template>
  <div class="wrapper">
    <LoginNav nav="手机号验证"></LoginNav>
    <VerifyInfo></VerifyInfo>
    <VerifyCode></VerifyCode>
  </div>
</template>

<script>
import LoginNav from '@/base/generalNav'
import VerifyInfo from './verifyInfo'
import VerifyCode from './verifyCode'
export default {
  name: 'PhoneVerify',
  components: {
    LoginNav,
    VerifyInfo,
    VerifyCode
  }
}
</script>

<style lang="less" scoped>
.wrapper{
  box-sizing: border-box;
  padding: 0.23rem
}
</style>
