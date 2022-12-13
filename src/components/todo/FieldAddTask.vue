<template>
    <v-text-field
      class="pa-3"
      outlined
      label="Add task"
      placeholder="Add Task"
      hide-details
      clearable
      v-model="newTaskTitle"      
      @keyup.enter="addTask" 
    >
    <template v-slot:append>
      <v-icon
      @click="addTask"
      color="primary"
      :disabled="!newTaskTitle"
      >
        mdi-plus
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  data(){
    return{
      newTaskTitle:"",
    }
  },
  methods:{
    addTask(){
      if(!this.newTaskTitleInvalid){
        this.$store.dispatch('addTask',this.newTaskTitle)
        this.newTaskTitle = ""
      }
    },
  },
  computed:{
    newTaskTitleInvalid(){
      return !this.newTaskTitle
    }
  }
}
</script>