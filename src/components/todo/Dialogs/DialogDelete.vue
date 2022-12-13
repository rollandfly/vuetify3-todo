<template>
      <v-dialog
        v-model="showTrue"
        persistent
        activator="parent"
      >
        <v-card>
          <v-card-title class="headline">
            Delete Task
          </v-card-title>
          <v-card-text>
            Confirm you want to delete?
          </v-card-text>
          <v-card-actions>
            
            <v-btn 
              color="primary"  
              @click="$emit('close')"
              >
              No
            </v-btn>
            <v-btn 
              color="red darken-1"
              @click="$store.dispatch('deleteTask',task.id)"
              >
              Yes
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
        showTrue : true
      }
    }
    
  }
</script>