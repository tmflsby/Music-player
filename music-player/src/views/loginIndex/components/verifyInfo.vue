<!-- 验证信息 -->
<template>
  <div class="container">
    <div class="info">
      <p>验证码已发送至</p>
      <p>
        <span>+86</span>
        <span>
          {{phone1}}
          <span class="middle">****</span>
          {{phone2}}
        </span>
      </p>
    </div>
    <div class="renew">重新获取</div>
  </div>
</template>

<script>
import { getPhone } from '@/assets/utils/getPhone'
import api from '@/api'
export default {
  name: 'VerifyInfo',
  // 通过 url 传过来的手机号，存取后进行验证码发送操作
  data () {
    return {
      phone1: Number,
      phone: Number
    }
  },
  methods: {
    /**
     * 发送验证码
     */
    sendVerify () {
      let phone = getPhone()
      // 截取手机号码进行页面显示
      this.phone1 = Array.from(phone).slice(0, 3).join('')
      this.phone2 = Array.from(phone).slice(-4).join('')
      // 发送验证码
      api.sendVerifyFn(phone).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 验证验证码
     */
    verify () {
      let phone = getPhone()
      let captcha = '111'
      api.verifyFn(phone, captcha).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.sendVerify()
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  p:first-child {
    margin-bottom: 0.3rem;
  }
  span {
    color: #ccc;
    .middle {
      vertical-align: -3px;
    }
  }
  .renew{
    color: #1A73E8;
    cursor: pointer;
  }
}
</style>
