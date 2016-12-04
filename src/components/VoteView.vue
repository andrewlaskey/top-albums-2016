<template>
	<div class="vote">
		<form v-on:submit.prevent="searchSpotify">
			<input type="text" v-model="search.album" placeholder="Album Name">
			<input type="text" v-model="search.artist" placeholder="Artist">
			<button type="submit">Search</button>
		</form>
		<div class="search-results">{{searchResults}}
			<ul>
				<li v-for="album in albumResults">
					<img v-bind:src="album.image" width="250" height="250">
					<p><span>{{album.artist}}</span> - <span>{{album.name}}</span></p>
				</li>
			</ul>
			<p v-if="noResults">Sorry, there are no matching albums.</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'vote-view',
	data () {
		return {
			search: {
				album: '',
				artist: ''
			},
			albumResults: [],
			noResults: false,
			albums: []
		}
	},
	methods: {
		searchSpotify: function () {
			var _this = this;
			var query = 'album:' + this.search.album + ' artist:' + this.search.artist;

			axios.get('https://api.spotify.com/v1/search',{
				params: {
					type: 'album',
					q: query
				}
			})
			.then(function (response) {
				if (response.status === 200) {
					if (response.data.albums.items.length === 0) {
						_this.noResults = true;
					} else {
						_this.noResults = false;
						_this.albumResults = response.data.albums.items.map( album => {
							return {
								artist: album.artists.name,
								name: album.name,
								image: album.images[0].url,
								id: album.id,
								url: album.external_urls.spotify
							}
						});
					}
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}
}

</script>