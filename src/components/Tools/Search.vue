<template>
    <v-text-field
        v-model = "search"
        @input = "$store.commit('setSearch', search)"
        @focus="searchClosed = false"
        @blur="searchClosed = true"
        :disabled="$store.state.sorting"
        class="expending-search mt-1 "
        :class="{'closed' : searchClosed && !$store.state.search}"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search"
        variant="outlined"
        filled
        dense
    ></v-text-field>

</template>

<script>
export default{
    data(){
        return{
            search: null,
            searchClosed : true
        }
    }
}
</script>

<style lang="sass">
.expending-search
    transition: max-width 1s
    cursor: pointer !important
    .v-input_slot
        &:before, &:after
            border-color: transparent !important
    &.closed
        max-width: 45px !important
        .v-input_slot
            background: transparent !important
</style>