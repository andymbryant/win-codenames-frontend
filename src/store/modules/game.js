import {shuffle} from '@/helpers.js'

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
};

const actions = {
  async fetchGameData({ commit }) {
    const data = require(`../../data/round1.json`);
    commit('loadGameData', data)
  }
}

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