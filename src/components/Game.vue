<template>
  <div class='game-ctr'>
    <h1>You are the Spymaster for the <span class="red-text">Red Team</span></h1>
    <Board/>
  </div>
</template>

<script>
import Board from '@/components/Board'
import {mapActions} from 'vuex'

export default {
  name: 'Game',
  components: {
    Board
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions(['fetchGameData'])
  },
  created() {
    this.loading = true
  },
  mounted() {
    this.fetchGameData()
      .then(() => this.loading = false)
  }
}
</script>

<style>
  .game-ctr {
    width: 80%;
    margin: 0 auto;
  }
  .red-text {
    color: #d13030;
    font-weight: 700;
  }
</style>