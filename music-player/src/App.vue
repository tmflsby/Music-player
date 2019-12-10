<template>
  <div id="app">
    <DefaultNav></DefaultNav>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import DefaultNav from '@/views/nav/index'
export default {
  name: 'App',
  components: {
    DefaultNav
  }
}
</script>

<style lang="less">
#app {
  box-sizing: border-box;
  padding: 0.13rem;
}
</style>
