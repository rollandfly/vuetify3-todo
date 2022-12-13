<template>
    <v-list-item
        @click="$store.dispatch('doneTask', task.id)"
        :class="{'bg-blue-lighten-2' : task.done}"
        class="white"
        :ripple="false"
        >
        <template v-slot:prepend>
          <v-list-item-action>
            <v-checkbox-btn 
              :model-value="task.done"
              color="primary">
            </v-checkbox-btn>
          </v-list-item-action>
        </template>

        <v-list-item-title
          :class="{'text-decoration-line-through' : task.done}"
        >{{task.title}}
        </v-list-item-title>
        

        <v-list-item-subtitle
          v-if="task.dueDate"
          :class="{'text-decoration-line-through' : task.done}"
        >
          <v-icon size="small">mdi-calendar</v-icon>
          {{ niceDate }}
          
        
        </v-list-item-subtitle>


        <template v-slot:append>
          <v-list-item-action v-if="!$store.state.sorting">
            <task-menu 
              :task="task"
            />
          </v-list-item-action>
          <v-list-item-action v-else>
            <v-btn  
              icon>
              <v-icon class="handle">mdi-drag-horizontal-variant</v-icon>
            </v-btn>
          </v-list-item-action>
        </template>



      </v-list-item> 
      
</template>

<script>
  import TaskMenu from'@/components/todo/TaskMenu.vue'
  import { format } from 'date-fns'
  export default {
    props: ['task'],
    computed: {
      niceDate() {   
        return format(new Date(this.task.dueDate), 'MMM d')
      }
    },
    components : {
      'task-menu' : TaskMenu
    },  
  };
</script>

<style lang="sass">
  .sortable-ghost
    opacity:0
  .sortable-drag
    box-shadow: 0 0 10px rgba(0,0,0,0.3)
</style>