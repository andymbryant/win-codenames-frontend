<template>
  <div class='game-ctr'>
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
    width: 100%;
    height: 100%;
  }
</style>