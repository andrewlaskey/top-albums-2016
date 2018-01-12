<template>
  <div class="album-search">
    <form v-on:submit.prevent="searchSpotify" class="form-inline">
      <div class="form-group">
        <label class="sr-only" for="albumName">Album Name</label>
        <input class="form-control" type="text" v-model="search.album" name="albumName" placeholder="Album Name">
      </div>
      <div class="form-group">
        <label class="sr-only" for="artistName">Artist Name</label>
        <input class="form-control" type="text" v-model="search.artist" name="artistName" placeholder="Artist">
      </div>
      <button type="submit" class="btn btn-primary">Search</button>
    </form>
    <div class="search-results">
      <ul class="list-unstyled">
        <li v-for="album in albumResults" class="row">
          <div class="col-sm-4">
            <img v-bind:src="album.image" class="img-responsive img-rounded">
          </div>
          <div class="col-sm-8">
            <h3><span>{{album.artist}}</span> - <span>{{album.name}}</span></h3>
            <button v-on:click="selectAlbum(album)" class="btn btn-default">Select</button>
          </div>
        </li>
      </ul>
      <p v-if="noResults">Sorry, there are no matching albums.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {CONFIG} from '../../private.config.js'

export default {
  name: 'search',
  props: ['enabled'],
  data () {
    return {
      search: {
        album: '',
        artist: ''
      },
      albumResults: [],
      noResults: false,
    }
  },
  methods: {
    searchSpotify: function () {
      var _this = this;
      var query = this.search.album;

      axios.get('https://ws.audioscrobbler.com/2.0/',{
        params: {
          method: 'album.search',
          album: this.search.album,
          api_key: CONFIG.LAST_FM.apiKey,
          format: 'json'
        }
      })
      .then(function (response) {
        if (response.status === 200) {
          if (response.data.results.albummatches.album.length === 0) {
            _this.noResults = true;
          } else {
            console.log(response);
            _this.noResults = false;
            _this.albumResults = response.data.results.albummatches.album.map( album => {
              let s = album.name + album.artist
              s = s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")

              return {
                artist: album.artist,
                name: album.name,
                image: album.image[0]['#text'],
                id: encodeURI(s),
                url: album.url
              }
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    selectAlbum: function (album) {
      if (this.enabled) {
        this.$emit('selectAlbum', album);
      }
    }
  }
}
</script>