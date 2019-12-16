<!-- 手机号登录页面，下一步button按钮 -->
<template>
  <div class="btn">
    <button id="btn"></button>
    <label for="btn" ref="btnText">{{ title }}</label>
  </div>
</template>

<script>
export default {
  name: 'LoginBtn',
  // 定义默认的 button 内容为下一步
  props: {
    title: {
      type: String,
      default: '下一步'
    }
  }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/styles/global.less");
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  #btn {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
  label {
    box-sizing: border-box;
    margin-top: 30px;
    padding: 8px;
    border-radius: 20px;
    line-height: 20px;
    width: 80%;
    color: #fff;
    background: @bgcolor;
  }
}
</style>
