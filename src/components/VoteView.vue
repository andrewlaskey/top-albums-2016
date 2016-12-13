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
        <li v-for="(album, index) in albums" :key="albums.id" class="list-group-item">
          <div class="row">
            <div class="col-sm-3">
              <img v-bind:src="album.image" class="img-responsive img-rounded">
            </div>
            <div class="col-sm-9">
              <h3>{{index + 1}}. <span>{{album.artist}}</span> - <span>{{album.name}}</span></h3>
              <button class="btn btn-danger btn-sm" v-on:click="removeAlbum(index)">Remove</button>
              <button type="button" class="btn btn-default" aria-label="Move Up" v-if="index !== 0" v-on:click="moveUp(index)">
                <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
              </button>
              <button type="button" class="btn btn-default" aria-label="Move Down" v-if="index !== albums.length - 1" v-on:click="moveDown(index)">
                <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
              </button>
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
    },
    removeAlbum: function (index) {
      this.albums.splice(index, 1)
    },
    moveUp: function (index) {
      if (index !== 0) {
        let temp = this.albums[index]
        this.albums.splice(index, 1, this.albums[index - 1])
        this.albums.splice(index - 1, 1, temp)
      }
    },
    moveDown: function (index) {
      if (index !== this.albums.length - 1) {
        let temp = this.albums[index]
        this.albums.splice(index, 1, this.albums[index + 1])
        this.albums.splice(index + 1, 1, temp)
      }
    }
  }
}

</script>