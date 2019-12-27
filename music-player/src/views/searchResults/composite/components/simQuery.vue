<!-- 展示相关搜索 -->
<template>
  <TitleFooter title="相关搜索" :more="simQuery.more" :moreText="simQuery.moreText">
    <ul class="sim-group">
      <li class="sim-list"
          v-for="(item, index) in simQuery.sim_querys"
          :key="index">
          {{item.keyword}}
      </li>
    </ul>
 </TitleFooter>
</template>

<script>
import TitleFooter from '@/base/titleFooter'
export default {
  name: 'SimQuery',
  components: {
    TitleFooter
  },
  props: {
    simQuery: {
      type: Object
    }
  }
}
</script>

<style lang='less' scoped>
.sim-group{
  display: flex;
  flex-wrap: wrap;
  .sim-list{
    height: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.24rem;
    box-sizing: border-box;
    padding: 0.2rem;
    background-color: #ddd;
    border-radius: 0.3rem;
    margin-right: 0.3rem;
    margin-top: 0.2rem;
  }
}
</style>
