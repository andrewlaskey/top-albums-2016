import firebase from 'firebase'
import {CONFIG} from '../private.config.js'

var fbApp = firebase.initializeApp(CONFIG.FIREBASE);

export function firebaseInit(func) {
	

	firebase.auth().onAuthStateChanged(function (user) {
	  if (user) {
	    func(true, user)
	  } else {
	    func(false)
	  }
	}, function(error) {
	  console.log(error)
	})
}