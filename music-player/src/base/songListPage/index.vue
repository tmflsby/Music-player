<!--这是一个用来展示歌曲列表的基础组件-->
<template>
  <!-- 页面需要监听滚动事件，滚动到某个位置时标题栏要固定 -->
  <!-- 这里需要增加动态的改变样式信息，不是只有显示隐藏！！！！！！！！！ -->
  <div class="wrapper" @scroll="scrollList">
    <!-- 由于歌单页和今日推荐页面的顶部展示区域高度不同，所以通过动态的 height 进行设置 -->
    <div class="container-top" :style="{height}">
      <!-- 通过传值 isAlbum 的布尔值进行判断，因为在今日推荐页面的页面标题是通过滚动显示隐藏的 -->
      <GeneralNav class="fixed pd23" v-if="!isAlbum" @returnPage="returnPage">
        <!-- 通过改变 listFixed 来控制 title 的显示与否-->
        <span class="text" v-show="listFixed">{{iTitle}}</span>
      </GeneralNav>
      <!-- 这里是在歌单页面时，页面标题是一直显示的 -->
      <GeneralNav class="fixed pd23" v-if="isAlbum" @returnPage="returnPage">
        <span class="text" >{{iTitle}}</span>
      </GeneralNav>
      <!-- 这里包裹的是每日推荐页面额外显示的日期信息 -->
      <div class="date pd23"  v-if="!isAlbum">
        <span class="day">{{day}}</span><span class="month">{{month}}</span>
      </div>
      <div class="info pd23"  v-if="!isAlbum">查收属于您的今日推荐</div>
      <!-- 这里包裹的是歌单页面的图片，作者，介绍等信息 -->
      <div class="album-info pd23" v-if="isAlbum">
      <div class="info-top">
        <div class="img-info">
          <img :src="imgUrl" alt="">
        </div>
        <div class="info-con">
          <p class="album-title">{{iAlbumTitle}}</p>
          <div class="creator">
            <div class="img-info">
              <img :src="creatorImgUrl" alt="">
            </div>
            <span>{{author}}<i class="date-song iconfontjiantou5"></i></span>
          </div>
          <div class="desc-wrapper">
            <span class="desc">{{description}}</span>
            <i class="date-song iconfontjiantou5"></i>
          </div>
        </div>
      </div>
      <div class="icons">
        <div class="comments">
          <i class="date-song pinglun"></i>
          <span>{{commentCount | setNum}}</span>
        </div>
        <div class="comments">
          <i class="date-song fenxiang"></i>
          <span>{{shareCount | setNum}}</span>
        </div>
        <div class="comments">
          <i class="date-song xiazai"></i>
          <span>下载</span>
        </div>
        <div class="comments">
          <i class="date-song duoxuankuang"></i>
          <span>多选</span>
        </div>
      </div>
    </div>
    </div>
    <div class="title pd23" :class="{listFixed}">
      <span>
        <span @click="beginAudio">
          <i class="date-song cbofang"></i>
          播放全部
        </span>
        <span class="count" v-if="isAlbum">(共{{trackCount}}首)</span>
      </span>
      <span v-if="!isAlbum">
        <i class="date-song caidan"></i>
        多选
      </span>
      <span class="collection" v-if="isAlbum">
        + 收藏({{subscribedCount | setNum}})
      </span>
    </div>
    <div class="list-info" v-show="!load" :style="{ marginTop: top}">
    <slot></slot>
  </div>
    <PageLoading v-show="load"></PageLoading>
  </div>
</template>

<script>
import GeneralNav from '@/base/generalNav'
import PageLoading from '@/base/pageLoading'
export default {
  name: 'SongListPage',
  components: {
    GeneralNav,
    PageLoading
  },
  /**
   * 这里使用 data 把 props 接收的值进行存储，因为 vue 不允许子组件直接修改父组件传过来的值
   */
  data () {
    return {
      iTitle: this.title,
      iAlbumTitle: this.albumTitle,
      listFixed: false,
      top: '0.5rem'
    }
  },
  /**
   * 当已经加载了一次页面后，再次进入页面时标题信息不能更新
   *
   * 这里需要监听 props 的改变，如果改变了将新值接受进行改变
   */
  watch: {
    title (val) {
      this.iTitle = val
    },
    albumTitle (val) {
      this.iAlbumTitle = val
    }
  },
  /**
   * 所有的 props 值信息
   */
  props: {
    height: { // 顶部展示区域高度
      type: String,
      default: '6rem'
    },
    subscribedCount: {
      type: Number
    },
    subscribed: {
      type: Boolean
    },
    trackCount: {
      type: Number
    },
    shareCount: {
      type: Number
    },
    commentCount: {
      type: Number
    },
    description: {
      type: String
    },
    author: {
      type: String
    },
    creatorImgUrl: {
      type: String
    },
    albumTitle: {
      type: String
    },
    imgUrl: {
      type: String
    },
    title: {
      type: String
    },
    isAlbum: {
      type: Boolean,
      default: true
    },
    load: {
      type: Boolean,
      default: true
    }
  },
  // 对日期信息提取展示
  computed: {
    /**
     * 返回日
     */
    day () {
      const day = new Date().getDate() < 10
        ? '0' + new Date().getDate()
        : new Date().getDate()
      return day
    },
    /**
     * 返回月份
     */
    month () {
      const month = new Date().getMonth() + 1 < 10
        ? '0' + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1
      return month
    }
  },
  filters: {
    setNum (val) {
      if (!val) {
        return ''
      }
      if (val > 100000000) {
        val = ((val / 100000000).toFixed(1)) + '亿'
      } else if (val > 10000) {
        val = ((val / 10000).toFixed(1)) + '万'
      }
      return val
    }
  },
  methods: {
    beginAudio () {
      this.$emit('startPlayAll')
    },
    /**
     * 返回上一页
     */
    returnPage () {
      this.$router.go(-1)
    },
    /**
     * 定义页面滚动事件，
     * 这里需要添加在滚动过程中样式的变化
     */
    scrollList (e) {
      // 获取到 top 值
      let top = this.$el.scrollTop
      // 当当前组件不是歌单组件时，就是每日推荐页面
      if (!this.isAlbum) {
        if (top >= 148) {
          this.listFixed = true
          this.top = '1.3rem'
        } else {
          this.listFixed = false
          this.top = '0.5rem'
        }
      } else {
        // 当是歌单组件时，当页面滚动到一定位置的时候顶部的标题会变
        if (top >= 148) {
          // 这里使用data存下了props的值进行修改，子组件不能直接修改props传过来的值
          this.iTitle = this.albumTitle
        } else {
          this.iTitle = this.title
        }
        // 当 top 到了 250 的时候会改变标题行的是否固定样式
        if (top >= 250) {
          this.listFixed = true
          this.top = '1.3rem'
        } else {
          this.listFixed = false
          this.top = '0.5rem'
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import url('//at.alicdn.com/t/font_1394963_wydqsjlp9ms.css');
@import url('~@/assets/styles/global.less');
.topFixed {
  position: fixed;
  width: 100%;
  height: 0.8rem;
  background-color: #ee5253;
  z-index: 999;
}
@textColor: #ccc;

.fixed {
  .topFixed();
  top: 0;
}
.listFixed {
  .topFixed();
  top: 0.8rem;
}
.wrapper {
  height: 100vh;
  position: relative;
  overflow: scroll;
  // 组件的title
  .title {
    font-size: 0.3rem;
    height: 0.8rem;
    line-height: 0.8rem;
    .flex-between();
    background-color: #fff;
    .count {
      color: #999;
      font-size: small;
    }
    .collection {
      background-color: @bgcolor;
      .pd23();
      font-size: smaller;
      margin-top: 3px;
      height: 0.7rem;
      line-height: 0.7rem;
      color: #fff;
      border-radius: 0.4rem;
    }
  }
  .container-top {
    width: 100%;
    color: #fff;
    background-color: #ee5253;
    .date {
      padding-top: 1.5rem;
      .day {
        font-size: 0.7rem;
      }
      .month {
        font-size: 0.4rem;
        color: #c8d6e5;
        &::before {
          content: "/"
        }
      }
    }
    .info {
      margin-top: 0.7rem;
    }
    .text {
      font-size: 0.4rem;
      vertical-align: 5px;
      width: 8rem;
      .ellipsis();
    }
    .album-info {
      padding-top: 1.5rem;
      .info-top {
        height: 3rem;
        .flex-between();
        overflow: hidden;
        .img-info {
          @size: 2.6rem;
          width: @size;
          height: 0;
          padding-bottom: @size;
          border-radius: @imgBorderRadius;
          overflow: hidden;
          img {
            width: @size;
            height: @size;
          }
        }
        .info-con {
          width: 3.6rem;
          height: 2.6rem;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          .album-title {
            font-size: 0.36rem;
            line-height: 1.5;
            .twoLinesEllipsis();
          }
          .creator {
            height: 1rem;
            color: @textColor;
            display: flex;
            align-items: center;
            .img-info {
              @size: 0.6rem;
              width: @size;
              height: 0;
              padding-bottom: @size;
              margin-right: 8px;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: @size;
                height: @size;
              }
            }
          }
          .desc-wrapper {
            display: flex;
            align-items: center;
            color: @textColor;
            .desc {
              width: 3rem;
              line-height: 1.2;
              .twoLinesEllipsis();
            }
          }
        }
      }
      .icons {
        margin-top: 8px;
        .flex-around();
        width: 100%;
        .comments {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .date-song {
            font-size: 0.4rem;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
  .list-info {
    width: 100%;
    box-sizing: border-box;
    padding: 0.1rem 0.23rem;
    background-color: #fff;
    transform: translate3d(0, -0.5rem, 0);
  }
}
</style>
