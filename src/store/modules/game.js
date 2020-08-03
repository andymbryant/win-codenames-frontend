import {shuffle} from '@/helpers.js'
import axios from 'axios'

const ROOT_URL = process.env.VUE_APP_FLASK

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getDefaultState() {
  return {
    isAppLoading: false,
    gameId: "",
    clueId: "",
    processConfig: {},
    words: [],
    clues: []
  }
}

const state = getDefaultState()

const getters = {
  isAppLoading: state => state.isAppLoading,
  gameId: state => state.gameId,
  clueId: state => state.clueId,
  words: state => state.words,
  clues: state => state.clues.slice(0, 6),
  numTopFriends: state => state.words.filter(w => w.is_top && w.type === 'friend').length
}

const actions = {
  async fetchGameData({ commit, dispatch }, payload) {
    commit('toggleAppLoading')
    let url = `${ROOT_URL}/games/`
    if (payload && Object.prototype.hasOwnProperty.call(payload, 'id')) {
      url = url + payload.id + '/'
    }
    try {
      const game = await axios.get(url).then(res => res.data[0])
      await commit('loadGameData', game)
      await dispatch('fetchClueData', {clueId: game.clue_id})
    } catch(error) {
      console.error(error)
    }
    await sleep(1000)
    commit('toggleAppLoading')
  },
  async fetchClueData({ commit }, payload) {
    let url = `${ROOT_URL}/clues/`
    if (payload && Object.prototype.hasOwnProperty.call(payload, 'clueId')) {
      url = url + payload.clueId + '/'
    }
    try {
      const clue = await axios.get(url).then(res => res.data[0])
      // const game = require(`../../data/round1.json`);
      commit('loadClueData', clue)
    } catch(error) {
      console.error(error)
    }
  },
  async submitReview({getters, dispatch}, {selectedClue}) {
    let url = `${ROOT_URL}/reviews`
    const data = {
      clue_id: getters.clueId,
      user_choice: selectedClue
    }
    await axios.post(url, data)
      .catch(error => console.error(error))
    await dispatch('fetchGameData')
  }
}

const mutations = {
  toggleAppLoading(state) {
    state.isAppLoading = !state.isAppLoading
  },
  loadGameData(state, payload) {
    const {words, id, clue_id, process_config} = payload
    state.words = shuffle(words)
    state.gameId = id
    state.clueId = clue_id
    state.processConfig = process_config
  },
  loadClueData(state, {clues}) {
    state.clues = clues
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};