<!-- 用户页面 -->
<template>
  <div class="wrapper pd23">
    <div v-show="!load">
      <Interchangeable v-for="(item, index) in allUserList" :key="index" :circle="true" :ImgUrl="item.avatarUrl"
      :name="item.nickname" :gender="item.gender" :nickname="item.signature"
      ></Interchangeable>
      <PageErrorInfo :info="info" :keywords="keywords"></PageErrorInfo>
    </div>
    <PageLoading v-show="load"></PageLoading>
  </div>
</template>

<script>
import api from '@/api'
import PageErrorInfo from '@/base/pageErrorInfo'
import Interchangeable from '@/base/interchangeable'
import PageLoading from '@/base/pageLoading'
export default {
  name: 'UserIndex',
  components: {
    PageErrorInfo,
    Interchangeable,
    PageLoading
  },
  data () {
    return {
      allUserList: [],
      info: false,
      load: true
    }
  },
  props: {
    // 搜索关键字
    keywords: {
      type: String
    }
  },
  created () {
    this.getAllUserList(this.keywords)
  },
  methods: {
    getAllUserList (key) {
      api.searchFn(key, undefined, undefined, 1002).then((res) => {
        const data = res.data
        if (data.code === 200) {
          this.allUserList = data.result.userprofiles
          if (data.result.userprofileCount === 0) {
            this.info = true
          }
          this.load = false
        }
      }).catch(error => {
        this.load = false
        this.info = true
        console.log(error)
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~@/assets/styles/global.less');

</style>
