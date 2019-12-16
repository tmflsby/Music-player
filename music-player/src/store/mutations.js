import * as mutationTypes from './mutation-types'

// 实现侧边栏显示时底部不跟随滚动
import ModalHelper from '@/assets/utils/modalScroll'

export default {
  // 显示左侧侧边栏页面
  [mutationTypes.SHOW_LOGIN] (state) {
    state.loginPage = true
    ModalHelper.afterOpen()
  },
  // 隐藏左侧侧边栏页面
  [mutationTypes.HIDE_LOGIN] (state) {
    state.loginPage = false
    ModalHelper.beforeClose()
  },
  // 从日间模式切换到夜间模式
  [mutationTypes.TO_YUE] (state) {
    console.log('切换到夜间')
    state.iconyueliang1 = false
    state.icontaiyang = true
    this._mutations.TOGGLE_MODE_TEXT[0](state)
  },
  // 从夜间模式切换到日间模式
  [mutationTypes.TO_SUN] (state) {
    console.log('切换到日间')
    state.iconyueliang1 = true
    state.icontaiyang = false
    this._mutations.TOGGLE_MODE_TEXT[0](state)
  },
  // 切换夜间 日间模式
  [mutationTypes.TOGGLE_MODE] (state) {
    if (state.iconyueliang1) {
      this._mutations.TO_YUE[0](state)
    } else {
      this._mutations.TO_SUN[0](state)
    }
  },
  // 切换夜间 日间模式文本
  [mutationTypes.TOGGLE_MODE_TEXT] (state) {
    if (state.icontaiyang) {
      state.modeText = '日'
    } else {
      state.modeText = '夜'
    }
  },
  // 设置用户登陆状态
  [mutationTypes.LOGIN_STATE] (state) {
    state.loginState = 1
  },
  // 存取用户 uid
  [mutationTypes.ACCOUNT_UID] (state, id) {
    state.accountUid = id
  }
}