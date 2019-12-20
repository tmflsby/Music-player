<!-- 手机号登陆页面，顶部nav -->
<template>
  <nav class="phone-nav">
    <i class="phone iconzuojiantou" @click="returnPage"></i>
    <!-- 作用域插槽 -->
    <slot :text="nav"></slot>
    <!-- <span class="text">{{ nav }}</span> -->
  </nav>
</template>

<script>
export default {
  name: 'LoginNav',
  props: {
    nav: {
      type: String,
      default: '手机号登录'
    }
  },
  methods: {
    returnPage () {
      // 这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步
      // 类似 window.history.go(n)。
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('//at.alicdn.com/t/font_1351323_oxqdjg3rufq.css');
.phone-nav{
  .phone{
    font-size: 0.7rem;
    margin-right: 5px;
  }
  .text{
    font-size: 0.4rem;
    vertical-align: 5px;
  }
}
</style>
