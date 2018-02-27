<template>
  <div class="login">
      <div v-if="authenticated">
        <p>You are logged in as {{user.displayName}} ({{user.email}}).</p>
      </div>
      <p v-if="!authenticated">Sign in with email or the Googly to vote!</p>
      <div id="firebaseauth-widget" v-if="!authenticated"></div>
  </div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'

let userRef = {}

const uiConfig = {
  'callbacks': {
      // Called when the user has been successfully signed in.
      'signInSuccess': function (user, credential, redirectUrl) {
      // Do not redirect.
      console.log('in')

      // Add user data to database on login
      userRef.child(user.uid).once('value', snapshot => {
            if (snapshot.val() === null) {
              userRef.child(user.uid).set({
                displayName: user.displayName
              })
            }
          })

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
}

const ui = new firebaseui.auth.AuthUI(firebase.auth())

export default {
  name: 'login',
  props: ['authenticated', 'user', 'year'],
  data () {
    return {}
  },
  methods: {
    setupAuthUI: function () {
      if (!this.authenticated) {
        ui.start('#firebaseauth-widget', uiConfig)
      }
    }
  },
  created: function () {
    userRef = firebase.database().ref(this.year + '/user')
  },
  mounted: function () {
    this.setupAuthUI()
  },
  updated: function () {
    this.setupAuthUI()  
  }
}
</script>