<template>
  <div class="vote row">
    <div class="col-md-6">
      <h2>Search</h2>
      <p>Search for and add albums on Spotify</p>
      <search v-on:selectAlbum="addAlbum" :enabled="albums.length < maxAlbums"></search>
    </div>
    <div class="col-md-6">
      <h2>Vote</h2>
      <p>Sort and submit your favorite albums</p>
      <ul class="list-group">
        <li v-for="(album, index) in albums" class="list-group-item">
          <div class="row">
            <div class="col-sm-3">
              <img v-bind:src="album.image" class="img-responsive img-rounded">
            </div>
            <div class="col-sm-9">
              <h3>{{index + 1}}. <span>{{album.artist}}</span> - <span>{{album.name}}</span></h3>
              <button class="btn btn-danger btn-sm">Remove</button>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import Search from './Search.vue'

export default {
  name: 'vote-view',
  data () {
    return {
      maxAlbums: 10,
      albums: []
    }
  },
  components: {
    Search
  },
  methods: {
    addAlbum: function(album) {
      let duplicate = false

      this.albums.forEach(check => {
        if (check.id === album.id) {
          duplicate = true
        }
      })

      if (!duplicate) {
        this.albums.push(album)
      }
    }
  }
}

</script>