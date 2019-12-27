<!-- 用户页面 -->
<template>
  <div class="wrapper pd23">
    <Interchangeable v-for="(item, index) in allUserList" :key="index" :circle="true" :ImgUrl="item.avatarUrl"
    :name="item.nickname" :gender="item.gender" :nickname="item.signature"
    ></Interchangeable>
    <PageErrorInfo :info="info" :keywords="keywords"></PageErrorInfo>
  </div>
</template>

<script>
import api from '@/api'
import PageErrorInfo from '@/base/pageErrorInfo'
import Interchangeable from '@/base/interchangeable'
export default {
  name: 'UserIndex',
  components: {
    PageErrorInfo,
    Interchangeable
  },
  data () {
    return {
      allUserList: [],
      info: false
    }
  },
  props: {
    // 搜索关键字
    keywords: {
      type: String
    }
  },
  created () {
    this.getAllVideoList(this.keywords)
  },
  methods: {
    getAllUserList (key) {
      api.searchFn(key, undefined, undefined, 1002).then((res) => {
        const data = res.data
        if (data.code === 200) {
          if (this.allUserList.length) {
            this.allUserList = [this.allUserList, ...data.result.userprofiles]
          } else {
            this.allUserList = data.result.userprofiles
          }
          if (data.result.userprofileCount === 0) {
            this.info = true
          }
          this.$store.commit('SET_LOAD')
        }
      }).catch(error => {
        this.$store.commit('SET_LOAD')
        this.info = true
        console.log(error)
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import url('~@/assets/styles/global.less');
.wrapper{
  height: 87vh;
  overflow-y: scroll;
}
</style>
