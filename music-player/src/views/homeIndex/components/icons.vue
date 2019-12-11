<template>
  <div class="wrapper border-bottom">
    <div class="container ">
      <ul class="icons-group">
        <li class="icon-list" v-for="(item, index) in homeIcons" :key="index">
          <div class="icon">
            <i class="iconfont" :class="item.icon"></i>
          </div>
          <span class="icon-text">{{item.text}}</span>
        </li>
        <li class="icon-list">
          <div class="icon exit-icon">
            <i class="iconfont iconnav"></i>
          </div>
          <span class="icon-text">编辑</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HomeIcons',
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['homeIcons'])
  }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/styles/global.less");
@import url("https://at.alicdn.com/t/font_1301440_eoa9vxvejgq.css");
.wrapper {
  box-sizing: border-box;
  padding: 0.2rem 0 0;
  overflow: hidden;
  height: 1.8rem;
  .container {
    overflow-x: scroll;
    .icons-group {
      height: 1.5rem;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      white-space: nowrap;
      width: auto;
      min-width: 100%;
      .icon-list {
        min-width: 1.6rem;
        height: 100%;
        .flex-around();
        flex-direction: column;
        align-items: center;
        .icon {
          width: @iconWidth * 0.72;
          height: @iconWidth * 0.72;
          line-height: @iconWidth * 0.72;
          .icons();
          .iconfont {
            font-size: 0.4rem;
          }
        }
        .exit-icon {
          background: #ccc;
        }
        .icon-text {
          font-size: @iconText;
        }
      }
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
