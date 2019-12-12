import * as mutationTypes from './mutation-types'

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
  // 切换夜间 日间模式
  [mutationTypes.TOGGLE_MODE] (state) {
    state.iconyueliang1 = !state.iconyueliang1
    state.icontaiyang = !state.icontaiyang
    this._mutations.TOGGLE_MODE_TEXT[0](state)
  },
  // 切换夜间 日间模式文本
  [mutationTypes.TOGGLE_MODE_TEXT] (state) {
    if (state.icontaiyang) {
      state.modeText = '日'
    } else {
      state.modeText = '夜'
    }
  }
}
