<template>
  <div id="app">
  	<span>{{authenticated}}</span>
  	<div v-if="authenticated">
  		{{ user }}
  	</div>
  	<div id="firebaseauth-widget" v-if="!authenticated"></div>
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import {CONFIG} from '../private.config.js'

firebase.initializeApp(CONFIG.FIREBASE)

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
		firebase.auth().onAuthStateChanged(_this.handleUserSignIn);
	},
	mounted: function () {
		var uiConfig = {
			'callbacks': {
			    // Called when the user has been successfully signed in.
			    'signInSuccess': function(user, credential, redirectUrl) {
					// Do not redirect.
					return false;
			    }
			},
			// Opens IDP Providers sign-in flow in a popup.
			'signInFlow': 'popup',
			'signInOptions': [
				firebase.auth.EmailAuthProvider.PROVIDER_ID
			],
			// Terms of service url.
			'tosUrl': 'https://www.google.com'
		};

		if (this.authenticated) {
			var ui = new firebaseui.auth.AuthUI(firebase.auth());
			// The start method will wait until the DOM is loaded.
			ui.start('#firebaseauth-widget', uiConfig);
		}
	},
	methods: {
		handleUserSignIn: function (user) {
			if (user) {
				this.authenticated = true;
				this.user = {
					uid: user.uid,
					displayName: user.displayName,
					email: user.email
				}
			}
		}
	}
}
</script>
