<template>
  <div class="board-ctr">
    <Card v-for="card in cards" :word="card.word" :type="card.type" :key="card.word"></Card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'Board',
  components: {
    Card
  },
  computed: {
    ...mapGetters(['cards', 'spymaster'])
  },
  mounted() {
    console.log(this.cards)
  }
}
</script>

<style>
  .board-ctr {
    margin: 0 auto;
    width: 700px;
    height: 500px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

  }
</style>