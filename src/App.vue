<template>
  <div id="app" class="container">
    <main-menu v-on:logout="logout()" :authenticated="authenticated" :year="year"></main-menu>
    <router-view :authenticated="authenticated" :user="user" :year="year"></router-view>
  </div>
</template>

<script>
import firebase from 'firebase'
import MainMenu from './components/MainMenu.vue'

export default {
  name: 'app',
  props: ['authenticated', 'user', 'year'],
  data () {
    return {}
  },
  components: {
    MainMenu
  },
  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('out');
        })
    }
  }
}
</script>

<style src="../node_modules/firebaseui/dist/firebaseui.css"></style>
<style></style>
