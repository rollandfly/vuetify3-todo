<template>
      <v-btn 
        @click="$store.dispatch('validTasksOrders')"
        class="button-done-sorting"
        color="primary"
        
      > Validate</v-btn>

</template>

<script>

</script>

<style lang="sass">
    .button-done-sorting
        position: fixed
        bottom: 20px !important
        left: 50%
        transform: translateX(-50%)
</style>