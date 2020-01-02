<template>
  <div class="wrapper">
    <i class="audio audioxunhuan"></i>
    <i class="audio audioxiayishou1" @click.self="prev"></i>
    <i class="audio" @click="play" :class="{audiobofang1: isPlay, audiobofang: !isPlay}"></i>
    <i class="audio audioxiayishou" @click.self="next"></i>
    <i class="audio audioliebiao"></i>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FunctionButton',
  computed: {
    ...mapGetters({ isPlay: 'PLAY_STATE' })
  },
  methods: {
    play () {
      this.$emit('play')
    },
    prev () {
      this.$emit('prev')
    },
    next () {
      this.$emit('next')
    }
  }
}
</script>

<style lang='less' scoped>
  .wrapper{
    display: flex;
    justify-content: space-around;
    align-items: center;
    .pinglun{
      position: relative;
      .com-num{
        position: absolute;
        top: 0;
        right: 0;
        font-size: 0.24rem;
        padding: 0.03rem;
        box-sizing: border-box;
        background-color: #7f8c8d;
        color: #bdc3c7;
      }
    }
    .audio{
      font-size: 0.5rem;
      color: #bdc3c7;
      &:nth-of-type(3){
        font-size: 1rem;
      }
    }
  }
</style>
