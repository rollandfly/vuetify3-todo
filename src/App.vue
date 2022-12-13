<template>
  <v-app id="inspire">
    <v-navigation-drawer 
      v-model="drawer"
      :width="200"
      app>

      <template v-slot:prepend>
          <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            title="Jane Smith"
            subtitle="Logged in"
          ></v-list-item>
        </template>


      <v-divider></v-divider>

      <v-list density="compact" nav
        v-for="item in items"
        :key="item.title"
        :to="item.to">
        
        <v-list-item :prepend-icon="item.icon" :title="item.title" :to="item.to" link></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        color="teal-darken-4"
        image="https://picsum.photos/1920/1080?random"
        density="prominent"
        :height="$route.path === '/' ? '90' : '70'"
      >
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-container class="header-container pa-5">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </v-row>
        <v-row>
          <v-app-bar-title>
            {{$store.state.appTitle}}
          </v-app-bar-title>
        </v-row>
        <v-row>
          <div class="text-subtitle-1"><live-date-time /></div>
        </v-row>
        <v-row v-if="$route.path === '/'">
          <field-add-task />
        </v-row>
      </v-container>
      <v-spacer></v-spacer>

      <search />

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <!--  -->
      <snackbar />
    </v-main>
  </v-app>
</template>

<script>
  import Snackbar from '@/components/shared/Snackbar.vue';
  import Search from '@/components/Tools/Search.vue';
  import LiveDateTime from'@/components/Tools/LiveDateTime.vue';
  import FieldAddTask from '@/components/todo/FieldAddTask.vue';

  export default {
    data: () => ({ 
      drawer: null,
      items: [
          { title: 'ToDo', icon: 'mdi-format-list-checks', to:'/' },
          { title: 'About', icon: 'mdi-help-box', to:'/about' },
        ], 
      }),
    mounted(){
      this.$store.dispatch('getTasks')
    },
    components : {
      'snackbar' : Snackbar,
      'search' : Search,
      'live-date-time' : LiveDateTime,
      'field-add-task' : FieldAddTask,
    },
  }
</script>