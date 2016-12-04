<template>
  <div id="app">
  	<main-menu v-on:logout="logout()" :authenticated="authenticated"></main-menu>
  	<login :authenticated="authenticated" :user="user"></login>
    <hello></hello>
  </div>
</template>

<script>
import firebase from 'firebase'
import MainMenu from './components/MainMenu.vue'
import Login from './components/Login.vue'
import Hello from './components/Hello.vue'

export default {
	name: 'app',
	data () {
		return {
			authenticated: false,
			user: {}
		}
	},
	components: {
		Hello,
		MainMenu,
		Login
	},
	created: function () {
		var _this = this;

		// set up listener to for user login and logout
		firebase.auth().onAuthStateChanged(_this.handleAuthStateChange);
	},
	methods: {
		handleAuthStateChange: function (user) {
			if (user) {
				this.authenticated = true;
				this.user = {
					uid: user.uid,
					displayName: user.displayName,
					email: user.email
				}
			} else {
				this.authenticated = false;
				this.user = {};
			}
		},
		logout: function () {
			firebase.auth().signOut().then(function () {
				console.log('out');
			});
		}
	}
}
</script>
