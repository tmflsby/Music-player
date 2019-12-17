<!-- 手机号验证 -->
<template>
  <div class="wrapper">
    <VerifyInfo></VerifyInfo>
    <VerifyCode></VerifyCode>
  </div>
</template>

<script>
import VerifyInfo from './verifyInfo'
import VerifyCode from './verifyCode'
export default {
  name: 'PhoneVerify',
  components: {
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
