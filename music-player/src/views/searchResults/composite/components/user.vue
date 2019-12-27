<!-- 展示全部用户 -->
<template>
  <TitleFooter title="用户" :more="user.more" :moreText="user.moreText" linkPage="user" :keyW="keyword">
    <Interchangeable v-for="(item, index) in user.users" :key="index" :circle="true" :ImgUrl="item.avatarUrl"
    :name="item.nickname" :gender="item.gender" :nickname="item.signature"
    ></Interchangeable>
 </TitleFooter>
</template>

<script>
import TitleFooter from '@/base/titleFooter'
import Interchangeable from '@/base/interchangeable'
export default {
  name: 'User',
  components: {
    TitleFooter,
    Interchangeable
  },
  props: {
    user: {
      type: Object
    },
    keyword: {
      type: String
    }
  }
}
</script>

<style lang='less' scoped>

</style>
