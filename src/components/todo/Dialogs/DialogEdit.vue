<template>
    <v-dialog
      v-model="showTrue"
      
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit title of this task</span>
        </v-card-title>
        <v-text-field
          v-model="taskTitle"
          @keyup.enter="saveTask"
        ></v-text-field>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="$emit('close')"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="saveTask"
            :disabled="!taskTitle || taskTitle === task.title"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props: ['task'],
    data(){
      return{
        showTrue : true,
        taskTitle : null,
        disabled : false
      }
    },
    mounted(){
        this.taskTitle = this.task.title
    },
    computed:{
      taskTitleInvalid(){
        return !thistaskTitle || this.taskTitle === this.task.title
      }
    },
    methods:{
        saveTask(){
          //add Verification of the format or reformating
          if(!this.taskTitleInvalid){
            let payload = {
                id: this.task.id,
                title: this.taskTitle
            }
            this.$store.dispatch('updateTaskTitle', payload)
            this.$emit('close')
          }
        }
    },
    
  }
</script>