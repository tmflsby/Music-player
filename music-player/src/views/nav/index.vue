<!-- 顶部导航+侧边栏导航 -->
<template>
  <div>
    <!-- 顶部导航条 -->
    <nav class="nav-wrapper">
      <div class="nav-left">
        <i class="nav iconnav ripple" @click="SHOW_LOGIN"></i>
      </div>
      <ul class="nav-center">
        <router-link tag="li" class="nav-title ripple" to="/home">我的</router-link>
        <router-link tag="li" class="nav-title ripple" to="/find">发现</router-link>
        <router-link tag="li" class="nav-title ripple" to="/friend">朋友</router-link>
        <router-link tag="li" class="nav-title ripple" to="/video">视频</router-link>
      </ul>
      <div class="nav-right">
        <router-link to="search" tag="i" class="nav iconsousuo ripple"></router-link>
      </div>
      <transition name="mask-show">
        <div class="mask" v-show="loginPage" @click="HIDE_LOGIN" @touchmove.prevent></div>
      </transition>
      <transition name="login-show" mode="out-in">
        <Login v-if="loginPage" @touchmove.prevent></Login>
      </transition>
    </nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Login from './components/login'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'DefaultNav',
  components: {
    Login
  },
  computed: {
    ...mapGetters({ loginPage: 'LOGIN_PAGE' })
  },
  methods: {
    ...mapMutations(['SHOW_LOGIN', 'HIDE_LOGIN'])
  }
}
</script>

<style lang="less" scoped>
@import url("//at.alicdn.com/t/font_1298894_8b2aso7zegl.css");
@import url('~@/assets/styles/global.less');
@height: 0.8rem;
.navIcon {
  width: @height;
  height: @height;
  border-radius: 50%;
  text-align: center;
}
//遮罩层动画
.mask-show-enter,
.mask-show-leave-to {
  opacity: 0;
}
.mask-show-enter-active,
.mask-show-leave-active {
  transition: opacity linear 0.3s;
}

// 左侧侧边栏显示隐藏动画
.login-show-enter,
.login-show-leave-to {
  transform: translateX(-6rem);
}
.login-show-enter-active,
.login-show-leave-active {
  transition: transform linear 0.3s;
}

// 顶部的导航条
.nav-wrapper {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: @height;
  padding: 0 0.23rem;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #fff;
  line-height: @height;
  .nav-left {
    flex: 2;
    display: flex;
    justify-content: left;
    align-items: center;
    .iconnav {
      .navIcon()
    }
  }
  .nav-center {
    flex: 6;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #999;
    font-size: 0.24rem;
    .nav-title{
      .navIcon();
    }
  }
  .nav-right {
    flex: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .iconsousuo{
      .navIcon()
    }
  }

  // 遮罩层
  .mask {
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
  }
}
</style>
