<template>
  <div id="app">
  	<main-menu v-on:logout="logout()" :authenticated="authenticated"></main-menu>
  	<login :authenticated="authenticated" :user="user"></login>
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase'
import MainMenu from './components/MainMenu.vue'
import Login from './components/Login.vue'

export default {
	name: 'app',
	props: ['authenticated', 'user'],
	data () {
		return {}
	},
	components: {
		MainMenu,
		Login
	},
	methods: {
		logout: function () {
			firebase.auth().signOut().then(function () {
				console.log('out');
			});
		}
	}
}
</script>
