import * as mutationsTypes from './mutation-types'

/**
 * 获取随机值
 */
const getRandomIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
/**
 * 打乱一个数组
 */
const shuffle = (arr) => {
  const _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    const j = getRandomIndex(0, i)
    const t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

const findIndex = (list, song) => {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

export default {
  selectPlay ({ commit, state }, { list, index }) {
    commit(mutationsTypes.SET_AUDIO_LIST, list)
    if (state.mode === 2) {
      const randomList = shuffle(list)
      commit(mutationsTypes.SET_PLAY_LIST, randomList)
      index = findIndex(randomList, state.audioList[index])
    } else {
      commit(mutationsTypes.SET_PLAY_LIST, list)
    }
    commit(mutationsTypes.SET_AUDIO_INDEX, index)
    commit(mutationsTypes.SET_PLAY_SATE, true)
    commit(mutationsTypes.SET_FULL_SCREEN, true)
  },
  startPlayAll ({ commit }, { list }) {
    commit(mutationsTypes.SET_AUDIO_LIST, list)
    commit(mutationsTypes.SET_AUDIO_INDEX, 0)
    commit(mutationsTypes.SET_PLAY_LIST, list)
    commit(mutationsTypes.SET_PLAY_SATE, true)
    commit(mutationsTypes.SET_FULL_SCREEN, true)
    commit(mutationsTypes.SET_AUDIO_MODE, 0)
  }
}
