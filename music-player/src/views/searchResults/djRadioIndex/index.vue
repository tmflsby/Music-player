<!-- 电台页面 -->
<template>
  <div class="wrapper pd23">
    <div v-show="!load">
      <Interchangeable v-for="(item, index) in allDjRadioList" :key="index" :dj="true"
      :ImgUrl="item.picUrl" :name="item.name" :nicknames="item.dj"
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
  name: 'DjRadioIndex',
  components: {
    PageErrorInfo,
    Interchangeable,
    PageLoading
  },
  data () {
    return {
      allDjRadioList: [],
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
    this.getAllDjRadioList(this.keywords)
  },
  methods: {
    getAllDjRadioList (key) {
      api.searchFn(key, undefined, undefined, 1009).then((res) => {
        const data = res.data
        if (data.code === 200) {
          if (this.allDjRadioList.length) {
            this.allDjRadioList = [this.allDjRadioList, ...data.result.djRadios]
          } else {
            this.allDjRadioList = data.result.djRadios
          }
          this.load = false
          /**
             * 这里使用Es6 判断一个对象是否为空
             */
          if (Object.keys(data.result).length === 0) {
            this.info = true
          }
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
