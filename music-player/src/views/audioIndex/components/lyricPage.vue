<template>
  <div class="wrapper">
    <div class="full" v-if="noLyric">
      纯音乐，请欣赏
    </div>
    <ul :style="{marginTop: marginTop}">
      <li v-for="(item, index) in lyricArray"
          :key="index"
          :class="{active: index === nowLyricIndex}">
        {{ item | setWords }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    lyricArray: {
      type: Array
    },
    // 当前播放的歌词索引
    nowLyricIndex: {
      type: Number
    },
    noLyric: {
      type: Boolean
    }
  },
  data () {
    return {
      marginTop: '0rem'
    }
  },
  filters: {
    setWords (val) {
      if (val && val.words) {
        return val.words
      }
    }
  },
  methods: {
    setCurrent (index) {
      // 这里求出中线的位置为 8.3 rem
      // 通过 歌词容器的高度 / 2 - 每个 li 的高度 / 2
      const midHeight = 4
      // 每次移动是移动一行歌词的高度，一行歌词高度是 0.6 rem
      let top = midHeight - index * 0.6
      if (top > 0) {
        // top 不能为正数
        top = 0
      }
      this.marginTop = top + 'rem'
    }
  }
}
</script>

<style lang='less' scoped>
  @import url('~@/assets/styles/global.less');
  .wrapper{
    height: 8.6rem;
    margin-top: 8px;
    color: #ccc;
    overflow: hidden;
    ul{
      margin: 0;
      padding: 0;
      list-style: none;
      text-align: center;
      /* ul元素的margin-top值变化，在0.7秒内完成 */
      transition: margin-top 0.7s;
      li{
        height: 0.6rem;
        line-height: 1.5;
        .ellipsis();
        &.active{
          color: #fff;
        }
      }
    }
    .full{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
