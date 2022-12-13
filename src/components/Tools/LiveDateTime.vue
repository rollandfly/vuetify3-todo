<template>
    <p>{{date}}</p>
</template>
<script>
  import { format } from 'date-fns'

  export default{
    data(){
        return{
            date:''
        }
    },
    methods:{
        getDate(){
            this.date = format(new Date(), 'MMMM d, H:mm:ss')
            setTimeout(this.getDate, 1000)
        }
    },
    mounted(){
        this.getDate()
    }
  }
</script>