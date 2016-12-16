<template>
	<div class="list row">
		<div class="col-md-4">
			<login :authenticated="authenticated" :user="user"></login>
		</div>
		<div class="col-md-8">
			<p>List view</p>
		</div>
	</div>
</template>

<script>
import Login from './Login.vue'

export default {
	name: 'list-view',
	props: ['authenticated', 'user'],
	data () {
		return {
			albums: []
		}
	},
	components: {
		Login
	}
}

</script>