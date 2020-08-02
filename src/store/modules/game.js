import {shuffle} from '@/helpers.js'
import axios from 'axios'

const ROOT_URL = process.env.VUE_APP_FLASK

function getDefaultState() {
  return {
    cards: [],
    spymaster: {}
  }
}

const state = getDefaultState()

const getters = {
  cards: state => state.cards,
  spymaster: state => state.spymaster
}

const actions = {
  async fetchGameData({ commit }) {
    const url = `${ROOT_URL}/games/`
    const game = await axios.get(url)

    return axios.get(url, {headers: {Authorization: `${store.getters.authHeaderValue}`}})
    console.error(error)
    commit('loadGameData', game)
  }
}

// const game = require(`../../data/round1.json`);
const mutations = {
  loadGameData(state, {cards, spymaster}) {
    state.cards = shuffle(cards)
    state.spymaster = spymaster
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};