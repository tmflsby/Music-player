<template>
  <div class="wrapper pd23" ref="navs">
      <!-- 使用 replace 它不会向 history 添加新记录 -->
    <router-link class="nav-list" v-for="(item, index) in list" :key="index" :to="item.path" replace>
      {{ item.text }}
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Bus from '@/assets/Bus'
export default {
  name: 'NavIndex',
  data () {
    return {
      linkPage: '',
      list: [],
      toLink: ['composite', 'song', 'video', 'artist', 'album', 'playList', 'djRadio', 'user']
    }
  },
  computed: {
    ...mapGetters({ page: 'LINK_PAGE' })
  },
  mounted () {
    // 页面刷新时通过 params 获取关键字
    this.setLinkPage()
    // 通过Bus传值获取
    this.getKey()
  },
  methods: {
    /**
     * 页面刷新时使用 params 获取
     */
    setLinkPage () {
      let id = this.$route.params.id
      this.linkPage = id
    },
    /**
     * 获取Bus传过来的值
     */
    getKey () {
      Bus.$on('push', key => {
        this.linkPage = key
      })
    },
    handleScroll (index) {
      this.$refs.navs.scrollLeft = index * 85
    },
    getPage (val) {
      let index = this.toLink.indexOf(val)
      this.handleScroll(index)
    }
  },
  /**
   * 监听linkPage变化，对循环的list数组进行改变赋值
   */
  watch: {
    linkPage (newKey) {
      /**
       * 循环遍历数组，渲染标签导航
       */
      this.list = [
        {
          path: `/composite/${newKey}`,
          text: '综合'
        }, {
          path: `/song/${newKey}`,
          text: '单曲'
        }, {
          path: `/video/${newKey}`,
          text: '视频'
        }, {
          path: `/artist/${newKey}`,
          text: '歌手'
        }, {
          path: `/album/${newKey}`,
          text: '专辑'
        }, {
          path: `/playList/${newKey}`,
          text: '歌单'
        }, {
          path: `/djRadio/${newKey}`,
          text: '主播电台'
        }, {
          path: `/user/${newKey}`,
          text: '用户'
        }
      ]
    },
    page (val) {
      /**
       * 获取到当前要跳转的路由页
       * 寻找下标
       * 0 : 0
       * 1 : 85
       * 2 : 170
       */
      this.getPage(val)
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~@/assets/styles/global.less');
.wrapper{
  display: flex;
  margin-top: 0.16rem;
  overflow-x: auto;
  flex-wrap: nowrap;
  border-bottom: 1px solid #ddd;
  .nav-list{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 1.2rem;
    height: 0.7rem;
    box-sizing: border-box;
    padding: 0.03rem;
    margin: 0 0.2rem;
    color: #000;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: @bgcolor;
      transform-origin: bottom right;
      transform: scaleX(0);
      transition: transform 0.5s ease;
    }
    &.ac{
      color: @bgcolor;
    }
    &.ac::before{
      transform-origin: bottom left;
      transform: scaleX(1);
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
