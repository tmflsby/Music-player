<!-- search页面 -->
<template>
  <div>
    <SearchInp ref="search" page="search" Right="1rem"></SearchInp>
    <History v-show="!loading"></History>
    <!-- 父组件在组件上定义了一个自定义事件childFn，事件名为parentFn用于接受子组件传过来的message值。 -->
    <HotSearch v-show="!loading" @returnKey = "setKey" @childFn="parentFn"></HotSearch>
    <PageLoading v-if="loading"></PageLoading>
  </div>
</template>

<script>
import PageLoading from '@/base/pageLoading'
import SearchInp from '@/base/searchInput'
import History from './components/history'
import HotSearch from './components/hotSearch'
export default {
  name: 'search',
  data () {
    return {
      hotSearchKey: '',
      loading: true
    }
  },
  components: {
    SearchInp,
    History,
    HotSearch,
    PageLoading
  },
  activated  () {
    this.setKey()
  },
  methods: {
    setKey (key) {
      if (key) {
        // 父组件调用子组件方法
        // console.log(this.$children)
        // console.log(this.$refs.search)
        this.$refs.search.searchKey(key)
      }
    },
    parentFn (result) {
      this.loading = result
    }
  }
}
</script>

<style lang="less" scoped>
@import url('//at.alicdn.com/t/font_1371990_3libmbu82og.css');
</style>
