<template>
	<div class="login">
		<span>{{authenticated}}</span>
	  	<div v-if="authenticated">
	  		{{ user }}
	  	</div>
	  	<div id="firebaseauth-widget"></div>
	</div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'

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
	name: 'login',
	props: ['authenticated', 'user'],
	data () {
		return {}
	},
	mounted: function () {
		ui.start('#firebaseauth-widget', uiConfig);
	},
	updated: function () {
		if (!this.authenticated) {
			ui.start('#firebaseauth-widget', uiConfig);
		}
	}
}
</script>