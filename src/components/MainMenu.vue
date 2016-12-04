<template>
	<div class="main-menu">
		<router-link to="/">List</router-link>
		<router-link to="/vote">Vote</router-link>
		<button v-if="authenticated" v-on:click="logout">Logout</button>
	</div>
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