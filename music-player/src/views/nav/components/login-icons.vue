<template>
  <div class="container border-bottom">
    <ul class="icons-wrapper">
      <li class="icon-list" v-for="(item, index) in loginIcons" :key="index">
        <div class="icon">
          <i class="login" :class="item.icon"></i>
        </div>
        <span class="icon-text">{{item.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { loginIcons } from '@/getInfos/getData.js'
export default {
  name: 'LoginIcons',
  data () {
    return {
      loginIcons
    }
  },
  mounted () {
    this.iniData()
  },
  methods: {
    async iniData () {
      this.loginIcons = loginIcons()
    }
  }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/styles/global.less");
.icons-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 0.13rem 0.5rem;
  .flex-around();
  .icon-list {
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: @iconWidth * 0.72;
      height: @iconWidth * 0.72;
      line-height: @iconWidth * 0.72;
      .login {
        font-size: 0.4rem;
        color: @bgcolor;
      }
    }
    .icon-text {
      font-size: @iconText - 0.04;
    }
  }
}
</style>
