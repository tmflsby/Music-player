<template>
  <div id="app">
    <DefaultNav></DefaultNav>
    <router-view />
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
