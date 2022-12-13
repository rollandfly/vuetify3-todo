import { createStore } from 'vuex'
import Localbase from 'localbase'
import { VueElement } from 'vue'
import { sr } from 'date-fns/locale'



let db = new Localbase('db')
db.config.debug = true 

export default createStore({
  state: {
    appTitle : process.env.VUE_APP_TITLE,
    search: null,
    tasks:[
    ],
    snackbar:{ text:'', timeout: 1000, show: false},
    sorting: false,
  },
  getters: {
  },
  mutations: {
    setSearch(state, value){
      console.log('value',value)
      state.search = value
    },
    addTask(state, newTask){
      state.tasks.push(newTask)
    },
    doneTask(state, id){
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done  
    },
    updateTaskTitle(state, payload){
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.title = payload.title
    },
    updateTaskDueDate(state, payload){
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.dueDate = payload.dueDate
    },
    deleteTask(state, id){
      state.tasks = state.tasks.filter(task => task.id !== id )
    },
    setTasks(state, tasks){
      console.log('valid')
      state.tasks = tasks
    },
    showSnackbar(state, text, timeout = 1000){
      let timeBetweenSnackbar = 0
      if(state.snackbar.show){
        state.snackbar.show = false
        timeBetweenSnackbar = 300
      }
      setTimeout(()=>{
        state.snackbar.show = true
        state.snackbar.text = text
        state.snackbar.timeout = timeout
      }, timeBetweenSnackbar)
    },
    updateSorting(state){
      state.sorting = !state.sorting
    }
  },
  actions: {
    addTask({commit}, newTaskTitle){
      if(this.newTaskTitle != ""){
        let newTask ={
          id:Date.now(),
          title:newTaskTitle,
          done:false,
          dueDate:null
        }
        db.collection('tasks').add(newTask).then(()=>{
          commit('addTask', newTask)
          commit('showSnackbar', 'New task added',500)
        })

      }
      else{
        commit('showSnackBar','task not added')
      }
    },
    doneTask({state, commit}, id){
      let task = state.tasks.filter(task => task.id === id)[0]

      db.collection('tasks').doc({id:id}).update({
        done : !task.done
      }).then(()=>{
        commit('doneTask',id)
    })
    },
    updateTaskTitle({commit},payload){
      db.collection('tasks').doc({id:payload.id}).update({
        title : payload.title
      }).then(()=>{
        commit('updateTaskTitle',payload)
        commit('showSnackbar', 'Task Updated',100)
      })
    },
    updateTaskDueDate({commit}, payload){
      db.collection('tasks').doc({id:payload.id}).update({
        dueDate : payload.dueDate
      }).then(()=>{
        commit('updateTaskDueDate', payload)
        commit('showSnackbar', 'Date Updated',100)   
      })
    },
    deleteTask({commit}, id){
      db.collection('tasks').doc({id : id}).delete().then(
        ()=>{
          commit('deleteTask', id)
          commit('showSnackbar', 'Task Deleted',100)  
        }
      )    
    },
    validTasksOrders({state, commit}){
      //db.collection('tasks').set(state.tasks)
      commit('updateSorting')

    },
    getTasks({commit}){
      db.collection("tasks").get().then(tasks=>{
        commit('setTasks', tasks)
      })
    },


  },
  getters:{
    tasksFiletered(state){
      if(!state.search){
        return state.tasks
      }
      else{
        return state.tasks.filter(task => 
          task.title.toLowerCase().includes(state.search.toLowerCase())
        )
      }
    }
  },
})
