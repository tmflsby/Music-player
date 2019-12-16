import axios from 'axios'

import * as apiConfig from './config'

export default {
  /**
   * 检测手机号码是否已注册
   * @param {*} phone 手机号
   */
  phoneRegisteredFn (phone) {
    return axios.get(apiConfig.phoneRegistered, {
      params: {
        phone
      }
    })
  },
  /**
   * 用户通过手机登录
   * @param {number} phone 手机号
   * @param {String} password 密码
   */
  phoneLoginFn (phone, password) {
    return axios.get(apiConfig.phoneLogin, {
      params: {
        phone: phone || '',
        password: password || ''
      }
    })
  },
  /**
   * 获取当前登录状态
   */
  loginStatusFn () {
    return axios.get(apiConfig.loginStatus)
  },
  /**
   * 获取用户播放记录
   * 登陆后调用此接口 , 传入用户 id, 可获取用户播放记录
   * @param {*} uid 用户id
   * @param {*} type type=1 时只返回 weekData, type=0 时返回 allData
   */
  userRecordFn (uid, type = 0) {
    return axios.get(apiConfig.userRecord, {
      params: {
        uid,
        type
      }
    })
  },
  /**
   * 获取用户信息 , 歌单，收藏，mv, dj 数量
   * 登陆后调用此接口 , 可以获取用户信息
   * artistCount: 2 我的收藏中的歌手
   * code: 200
   * createDjRadioCount: 0
   * createdPlaylistCount: 2 创建的歌单数
   * djRadioCount: 1 我的电台
   * mvCount: 0
   * newProgramCount: 0
   * programCount: 0
   * subPlaylistCount: 3 收藏的歌单数
   */
  userInfoFn () {
    return axios.get(apiConfig.userInfo)
  },
  /**
   * 登陆后调用此接口 , 传入用户 id, 可以获取用户歌单
   * @param {*} uid 用户id
   */
  playlistFn (uid) {
    return axios.get(apiConfig.playlist, {
      params: {
        uid
      }
    })
  },
  /**
  * 登陆后调用此接口 , 传入用户 id, 可以获取用户电台
  * @param {*} uid 用户 id
  */
  userDjFn (uid) {
    return axios.get(apiConfig.userDj, {
      params: {
        uid
      }
    })
  }
}
