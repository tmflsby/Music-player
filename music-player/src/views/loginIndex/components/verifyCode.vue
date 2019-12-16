<!-- 验证码 -->
<template>
  <div class="code">
    <div class="v-number"></div>
    <div class="v-number"></div>
    <div class="v-number"></div>
    <div class="v-number"></div>
  </div>
</template>

<script>
export default {
  name: 'VerifyCode'
}
</script>

<style lang="less" scoped>
.code{
  display: flex;
  justify-content: center;
  align-items: center;
  .v-number{
    width: 0.7rem;
    height: 1rem;
    margin-left: 10px;
    font-size: 0.5rem;
    text-align: center;
    line-height: 1rem;
    border-bottom: 1.3px solid #000;
  }
}
</style>
