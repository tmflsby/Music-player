<!-- home页面icon组件 -->
<template>
  <div class="wrapper border-bottom">
    <div class="container ">
      <ul class="icons-group">
        <!-- <li class="icon-list" v-for="(item, index) in homeIcons" :key="index">
          <div class="icon">
            <el-button type="danger" :class="item.icon" class="home" size="small" circle></el-button> -->
            <!-- <i class="home" :class="item.icon"></i> -->
          <!-- </div>
          <span class="icon-text">{{item.text}}</span>
        </li>
        <li class="icon-list">
          <div class="icon exit-icon">
            <i class="home icontoggle"></i>
          </div>
          <span class="icon-text">编辑</span>
        </li> -->
        <li v-for="(item, index) in homeIcons"
            :icons="item"
            :key="index"
            is="Icon"
            :width="width"
            :bgcolor="bgcolor"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { homeIcons } from '@/getInfos/getData.js'
import Icon from '@/base/icon'
export default {
  name: 'HomeIcons',
  data () {
    return {
      homeIcons,
      width: 'width',
      bgcolor: 'bgcolor'
    }
  },
  components: {
    Icon
  },
  mounted () {
    this.iniData()
  },
  methods: {
    async iniData () {
      this.homeIcons = homeIcons()
    }
  }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/styles/global.less");
.wrapper {
  box-sizing: border-box;
  padding: 0.2rem 0 0;
  overflow: hidden;
  height: 1.8rem;
  // 定义可左右滑动的图标组
  .container {
    // 横向滚动条
    overflow-x: scroll;
    .icons-group {
      // flex布局  溢出不换行
      height: 1.5rem;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      white-space: nowrap;
      width: auto;
      min-width: 100%;
      // .icon-list {
      //   // 每项icon样式
      //   min-width: 1.6rem;
      //   height: 100%;
      //   .flex-around();
      //   flex-direction: column;
      //   align-items: center;
      //   .icon {
      //     width: @iconWidth * 0.72;
      //     height: @iconWidth * 0.72;
      //     line-height: @iconWidth * 0.72;
      //     // .icons();
      //     .home {
      //       font-size: 0.4rem;
      //     }
      //   }
      //   .exit-icon {
      //     background: #ccc;
      //   }
      //   .icon-text {
      //     font-size: @iconText;
      //   }
      // }
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
