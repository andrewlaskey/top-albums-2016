<template>
  <div id="app">
  	<span>{{authenticated}}</span>
  	<div v-if="authenticated">
  		{{ user }}
  	</div>
  	<button v-if="authenticated" v-on:click="logout()">Log out</button>
  	<div id="firebaseauth-widget"></div>
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import {CONFIG} from '../private.config.js'

firebase.initializeApp(CONFIG.FIREBASE)

var uiConfig = {
	'callbacks': {
	    // Called when the user has been successfully signed in.
	    'signInSuccess': function(user, credential, redirectUrl) {
			// Do not redirect.
			console.log('in');
			return false;
	    }
	},
	// Opens IDP Providers sign-in flow in a popup.
	'signInFlow': 'popup',
	'signInOptions': [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	'tosUrl': 'https://www.google.com'
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());

export default {
	name: 'app',
	data () {
		return {
			authenticated: false,
			user: {}
		}
	},
	components: {
		Hello
	},
	created: function () {
		var _this = this;
		firebase.auth().onAuthStateChanged(_this.handleAuthStateChange);
	},
	mounted: function () {
		this.setupLoginUI();
	},
	methods: {
		setupLoginUI: function () {
			ui.start('#firebaseauth-widget', uiConfig);
		},
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
				this.setupLoginUI();
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
