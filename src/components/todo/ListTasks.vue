<template>
    <v-list 
        flat
      class="pt-0">

      <draggable
        v-model="myList"
        :list="this.$store.getters.tasksFiletered"
        handle=".handle" 
      >
        <template #item="{element, index}">
          <task 
            :key="element.id"
            :value="element.title"
            :task="element"
            />
        </template>       
      </draggable>
    </v-list>


      
</template>

<script>
import Task from '@/components/todo/Task.vue';
import draggable from "vuedraggable";


export default{
  data() {
    return {
      enabled: true,
      dragging: false
    };
  },  
  components : {
      'task' : Task,
      draggable,
  },
  computed:{
    myList:{
      get(){
        return this.$store.getters.taskFiltered
      },
      set(value){
        this.$store.dispatch("setTasks",value)
      }
    }
  }
}
</script>