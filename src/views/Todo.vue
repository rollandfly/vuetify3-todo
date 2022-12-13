<template>
  <div class="home pa-6">

    

    <list-tasks
      v-if="$store.state.tasks.length" 
    />

    <no-task v-else />

    <button-done-sorting v-if="$store.state.sorting" />

  </div>
</template>

<script>
// Components

import ListTasks from '@/components/todo/ListTasks.vue';
import NoTask from '@/components/todo/NoTask.vue';
import ButtonDoneSorting from '@/components/todo/ButtonDoneSorting.vue';

export default ({
  name: 'Todo',
  components:{
    
    'list-tasks': ListTasks,
    'no-task' : NoTask,
    'button-done-sorting' : ButtonDoneSorting,
  }
});
</script>


