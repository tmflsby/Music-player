<!-- search页面 -->
<template>
  <div>
    <SearchInp ref="search"></SearchInp>
    <History></History>
    <HotSearch @returnKey = "setKey"></HotSearch>
  </div>
</template>

<script>
import SearchInp from './components/searchInp'
import History from './components/history'
import HotSearch from './components/hotSearch'
export default {
  name: 'search',
  data () {
    return {
      hotSearchKey: ''
    }
  },
  components: {
    SearchInp,
    History,
    HotSearch
  },
  created () {
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
    }
  }
}
</script>

<style lang="less" scoped>
@import url('//at.alicdn.com/t/font_1371990_nz4220l62x.css');
</style>
