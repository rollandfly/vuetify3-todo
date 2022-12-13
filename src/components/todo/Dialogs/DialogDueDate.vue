<template>
  <v-dialog
    v-model="showTrue"
  >
 <!--<v-date-picker
      v-model="date"
      scrollable
    >
    </v-date-picker>--> 

      <v-card>
        <v-card-title>
          <span class="text-h5">Edit the date</span>
        </v-card-title>
        <v-text-field
          v-model="dueDate"
          @keyup.enter="saveDueDate"
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
            @click="saveDueDate"
            :disabled="!dueDate || dueDate === task.dueDate"
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
        dueDate : null,
        disabled : false
      }
    },
    mounted(){
        this.dueDate = this.task.dueDate
    },
    computed:{
      taskDueDateInvalid(){
        return !this.dueDate || this.dueDate === this.task.dueDate
      }
    },

    methods:{
        saveDueDate(){
          if(!this.taskDueDateInvalid){
            let payload = {
                id: this.task.id,
                dueDate: this.dueDate
            }
            this.$store.dispatch('updateTaskDueDate', payload)
            this.$emit('close')
          }
        }
    },
    
  }
</script>