<template>
  <div class="wrapper">
    <i class="audio audioshoucang1"></i>
    <i class="audio audioxiazai"></i>
    <span class="pinglun-icon">
      <i class="audio audiopinglun"></i>
      <i class="com-num">1w</i>
    </span>
    <i class="audio audiocaidan"></i>
  </div>
</template>

<script>
export default {
  name: 'PlayIcons'
}
</script>

<style lang='less' scoped>
  .wrapper{
    display: flex;
    justify-content: space-around;
    align-items: center;
    .pinglun-icon{
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
      &.audio-shoucang{
        color:#e74c3c;
      }
    }
  }
</style>
