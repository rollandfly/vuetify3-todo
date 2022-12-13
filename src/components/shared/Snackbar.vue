<template>
    <v-snackbar
      v-model="$store.state.snackbar.show"
    >
    {{ $store.state.snackbar.text }}

    <template v-slot:actions>
      <v-btn
          variant="text"
          @click="$store.state.snackbar.show = false"
      >
          Close
      </v-btn>
    </template>
    </v-snackbar>
</template>
<script>
export default{
  
}
</script>
<style lang="sass">
  div.v-snack:not(.v-snack--absolute)
    height:100%
</style>