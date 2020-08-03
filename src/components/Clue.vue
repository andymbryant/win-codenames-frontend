<template>
  <div class='clue-ctr'>
    {{word}}
  </div>
</template>

<script>
export default {
  name: 'Clue',
  props: {
    word: String
  }
}
</script>

<style>
  .clue-ctr {
    width: 200px;
    padding: .5rem;
    border: 1px solid;
    margin-bottom: .2rem;
  }

</style>