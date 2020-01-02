import * as mutationsTypes from './mutation-types'

export default {
  selectPlay ({ commit, state }, { list, index }) {
    console.log(list)
    commit(mutationsTypes.SET_AUDIO_LIST, list)
    commit(mutationsTypes.SET_AUDIO_INDEX, index)
    commit(mutationsTypes.SET_PLAY_SATE, true)
    commit(mutationsTypes.SET_FULL_SCREEN, true)
  }
}
