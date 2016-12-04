<template>
	<div class="vote">
		<search v-on:selectAlbum="addAlbum"></search>
		<ol>
			<li v-for="album in albums">
				{{album}}
			</li>
		</ol>
	</div>
</template>

<script>
import Search from './Search.vue'

export default {
	name: 'vote-view',
	data () {
		return {
			albums: []
		}
	},
	components: {
		Search
	},
	methods: {
		addAlbum: function(album) {
			this.albums.push(album)
		}
	}
}

</script>