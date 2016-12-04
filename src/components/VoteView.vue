<template>
  <div class="vote">
    <search v-on:selectAlbum="addAlbum" :enabled="albums.length < maxAlbums"></search>
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