<!-- find页面icon组件 -->
<template>
  <div class="container border-bottom">
    <!-- <div class="icon-wrapper" v-for="(item, index) in findIcons" :key="index">
      <div class="icon"> -->
        <!-- 当图标文字是 每日推荐 则显示这一行 -->
        <!-- <el-button type="danger" :class="item.icon" class="find" size="small" circle></el-button>
        <span class="today" v-if="item.text === '每日推荐'">{{today}}</span> -->
        <!-- <i class="find" :class="item.icon"></i> -->
      <!-- </div>
      <span class="icon-text">{{item.text}}</span>
    </div> -->
    <Icon v-for="(item, index) in findIcons" :key="index"
          :linkTo="item.linkTo" :icons="item" :bgcolor="bgcolor">
      <span class="today" v-if="item.text === '每日推荐'" >{{today}}</span>
    </Icon>
  </div>
</template>

<script>
import { findIcons } from '@/getInfos/getData.js'
import Icon from '@/base/icon'
export default {
  name: 'FindIcon',
  data () {
    return {
      findIcons,
      bgcolor: 'bgcolor'
    }
  },
  components: {
    Icon
  },
  computed: {
    today () {
      return new Date().getDate()
    }
  },
  mounted () {
    this.iniData()
  },
  methods: {
    async iniData () {
      this.findIcons = findIcons()
    }
  }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/styles/global.less");
.container {
  .flex-around();
  width: 100%;
  height: 1.6rem;
  align-items: center;
  padding: 0.2rem 0 0.3rem;
    .today{
      position: absolute;
      top: 0.1rem;
      left: 0.3rem;
      font-size: 0.2rem;
    }
}
</style>
