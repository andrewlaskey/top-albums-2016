<template>
	<ul class="main-menu nav nav-pills">
		<router-link tag="li" to="/" active-class="active" v-bind:exact="true">
			<a>List</a>
		</router-link>
		<router-link tag="li" to="/vote" active-class="active" v-bind:exact="true">
			<a>Vote</a>
		</router-link>
		<router-link tag="li" to="/users" active-class="active" v-bind:exact="true">
			<a>User Votes</a>
		</router-link>
		<li v-if="authenticated" v-on:click="logout"><a href="#">Logout</a></li>
	</ul>
</template>

<script>

export default {
	name: 'main-menu',
	props: ['authenticated'],
	data () {
		return {}
	},
	methods: {
		logout: function () {
			this.$emit('logout');
		}
	}
}

</script>