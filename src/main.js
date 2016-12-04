// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import VueRouter from 'vue-router'
import {firebaseInit} from './firebaseInit.js'
import App from './App.vue'
import ListView from './components/ListView.vue'
import VoteView from './components/VoteView.vue'

Vue.use(VueRouter)

var authenticated = false

firebaseInit(userStatus)

const routes = [
	{ 
		path: '/',
		component: ListView
	},
	{
		path: '/vote',
		component: VoteView,
		meta: {
			requiresAuth: true
		}
	}
]

const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!authenticated) {
			next('/')
		} else {
			next()
		}
	} else {
	    next()
	}
})


var vm = new Vue({ // eslint-disable-line no-new
  el: '#app',
  data () {
  	return {
	  	authenticated: authenticated,
	  	user: {}
	}
  },
  router,
  methods: {
  	updateUserStatus: function (loggedIn, user) {
  		this.authenticated = loggedIn
  		this.user = user
  	}
  },
  template: '<app :authenticated="authenticated" :user="user"></app>',
  components: {
  	App
  }
})

function userStatus(loggedIn, user) {
	if (loggedIn) {
		authenticated = loggedIn;
		vm.updateUserStatus(loggedIn, user)
	} else {
		authenticated = loggedIn;
		vm.updateUserStatus(loggedIn, {})
	}
}