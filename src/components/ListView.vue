<template>
  <div class="list row">
    <div class="col-md-4">
      <login :authenticated="authenticated" :user="user" :year="year"></login>
    </div>
    <div class="col-md-8">
      <ul class="list-group">
            <li v-for="(album, index) in albums" :key="album.id" class="list-group-item">
              <div class="row">
                  <div class="col-sm-3">
                    <img v-bind:src="album.image" class="img-responsive img-rounded">
                  </div>
                  <div class="col-sm-9">
                    <h3><a v-bind:href="album.url">{{index + 1}}. <span>{{album.artist}}</span> - <span>{{album.name}}</span></a></h3>
                    <h4>Score: {{album.score}}</h4>
                    <h4>Votes: {{album.votes}}</h4>
                  </div>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue'
import firebase from 'firebase'

let albumRef = {}
let votesRef = {}

export default {
  name: 'list-view',
  props: ['authenticated', 'user', 'year'],
  data () {
    return {
      albums: []
    }
  },
  components: {
    Login
  },
  created () {
    this.loadAlbumList();
  },
  watch: {
    // call again the method if the route changes
    '$route': 'loadAlbumList'
  },
  methods: {
    loadAlbumList () {
      // reset
      this.albums = [];

      albumRef = firebase.database().ref(this.year + '/albums')
      votesRef = firebase.database().ref(this.year + '/votes')

      // Get all album votes
      votesRef.child('album').once('value')
        .then(snapshot => {

          snapshot.forEach(childSnapshot => {
            childSnapshot.forEach(vote => {
              let voteKey = vote.key

              // Get vote data (albumId and vote score)
              votesRef.child('all/' + voteKey).once('value', voteSnapshot => {
                let vote = voteSnapshot.val()
                let albumId = vote.album

                // Get album data
                albumRef.child(albumId).once('value', albumSnapshot => {
                  let album = albumSnapshot.val()
                  let found = false

                  // Search album array for existing album
                  for (var i = this.albums.length - 1; i >= 0; i--) {
                    if (this.albums[i].id === albumId) {
                      found = i
                    }
                  };

                  if (found !== false) {
                    // If album exists already, update score
                    let temp = this.albums[found]
                    temp.score += parseInt(vote.score, 10)
                    temp.votes++
                    this.albums.splice(found, 1, temp)
                  } else {
                    // If album not in array, add
                    this.albums.push({
                      id: albumId,
                      name: album.name,
                      artist: album.artist,
                      image: album.image,
                      url: album.url,
                      voteId: voteKey,
                      score: parseInt(vote.score, 10),
                      votes: 1
                    })
                  }

                  // Resort album list by score after getting data from firebase
                  if (this.albums.length > 1) {
                    this.albums.sort((a, b) => {
                      return parseInt(b.score, 10) - parseInt(a.score, 10)
                    })
                  }
                })
              })
            })
          })
        })
      }
  }
}

</script>

<style>
  .img-responsive {
    width: 100%;
  }
</style>