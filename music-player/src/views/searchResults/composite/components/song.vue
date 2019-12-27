<!-- 展示全部歌曲 -->
<template>
  <TitleFooter title="单曲" :songList="true" :more="songList.more"
  :moreText="songList.moreText" linkPage="song" :keyW="keyword">
    <ul class="song-group">
      <li class="list-item" v-for="(item, index) in songList.songs" :key="index">
        <div class="song-info">
          <p class="song-name">{{item.name}}</p>
          <p class="song-art">
            <span class="artist" v-for="(item, index) in item.ar" :key="index">
              {{ item.name }}
            </span>
          </p>
        </div>
        <div class="icon">
            <i class="result diandiandian"></i>
        </div>
      </li>
    </ul>
  </TitleFooter>
</template>

<script>
import TitleFooter from '@/base/titleFooter'
export default {
  name: 'Song',
  props: {
    songList: {
      type: Object
    },
    keyword: {
      type: String
    }
  },
  components: {
    TitleFooter
  }
}
</script>

<style lang='less' scoped>
@import url('~@/assets/styles/global.less');
.song-group {
  margin-top: 0.16rem;
  .list-item {
    .flex-between();
    align-items: center;
    height: 1rem;
    .song-info {
      display: flex;
      flex-direction: column;
      .song-name {
        height: 0.4rem;
        width: 6rem;
        line-height: 0.4rem;
        .ellipsis();
      }
      .song-art {
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.23rem;
        color: #dacdcd;
        .artist {
          &::after {
          content: "/";
          }
          &:last-child::after {
            content: "";
          }
        }
      }
    }
    .icon {
      color: #ccc;
    }
  }
}
.more {
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.26rem;
  color: #ccc;
  .youjiantou{
    color: #aaa;
  }
}
</style>
