<!-- 验证信息 -->
<template>
  <div class="container">
    <div class="info">
      <p>验证码已发送至</p>
      <p>
        <span>+86</span>
        <span>
          198
          <span class="middle">****</span>
          0799
        </span>
      </p>
    </div>
    <div class="renew">重新获取</div>
  </div>
</template>

<script>
export default {
  name: 'VerifyInfo'
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  p:first-child {
    margin-bottom: 0.3rem;
  }
  span {
    color: #ccc;
    .middle {
      vertical-align: -3px;
    }
  }
  .renew{
    color: #1A73E8;
    cursor: pointer;
  }
}
</style>
