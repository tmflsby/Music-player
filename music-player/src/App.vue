<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
    <!-- 通过查看播放列表的length来看看播放页面是否可以显示 -->
    <AudioIndex v-show="AUDIO_LIST.length"></AudioIndex>
  </div>
</template>

<script>
import AudioIndex from '@/base/audioIndex'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    AudioIndex
  },
  computed: {
    ...mapGetters(['AUDIO_LIST'])
  }
}
</script>

<style lang="less">
#app {
  height: 100vh;
  width: 100vw;
}
</style>
