import firebase from 'firebase'
import {CONFIG} from '../private.config.js'

export var fbApp = firebase.initializeApp(CONFIG.FIREBASE);