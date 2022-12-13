<template>
  <div>
    <v-menu>
        <template v-slot:activator="{ props }">
        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>

        <v-list>
        <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click = "handleClick(i)"
        >
            <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        </v-list>
    </v-menu>

    <dialog-delete
      v-if="dialogs.delete"
      @close="dialogs.delete = false"
      :task="task"
    />
    <dialog-duedate
      v-if="dialogs.dueDate"
      @close="dialogs.dueDate= false"
      :task="task"
    />

    <dialog-edit
      v-if="dialogs.edit"
      @close="dialogs.edit= false"
      :task="task"
    />
    </div>

  </template>

<script>
  import DialogDelete from '@/components/todo/Dialogs/DialogDelete.vue';
  import DialogEdit from '@/components/todo/Dialogs/DialogEdit.vue';
  import DialogDueDate from '@/components/todo/Dialogs/DialogDueDate.vue';

  export default {
    props:['task'],
    data() {
        return{
            items: [
        { 
            title: 'Edit', 
            icon:'mdi-pencil',
            click(){
                console.log('Edit')
                this.dialogs.edit = true
            }
         },
        { 
            title: 'Due date', 
            icon:'mdi-calendar',
            click(){
              console.log('Open due Date')
                this.dialogs.dueDate = true
            }        
        },
        { 
            title: 'Delete', 
            icon:'mdi-delete',
            click(){
                this.dialogs.delete = true
            }
        },
        { 
            title: 'Sorting', 
            icon:'mdi-drag-horizontal-variant',
            click(){
              if(!this.$store.state.search ){
                this.$store.commit('updateSorting')
              }
              else{
                this.$store.commit('showSnackbar','You can not sort tasks if you filter tasks')
              }
              
            }
        },
      ],
        dialogs: {
          delete: false,
          edit : false,
          dueDate : false,
        },
        }
      },
    methods:{
        handleClick(index){
            this.items[index].click.call(this)
        }
    },
    components : {
      'dialog-delete' : DialogDelete,
      'dialog-edit' : DialogEdit,
      'dialog-duedate' : DialogDueDate,
    }
  }
</script>  