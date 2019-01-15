<template>
  <div class="users row">
    <div v-for="user in users" class="col-md-4" >
      <h4>{{user.displayName}}</h4>
      <ul class="list-group">
        <li v-for="(album, index) in user.votes" :key="album.id" class="list-group-item">
          <div class="row">
              <div class="col-sm-3">
                <img v-bind:src="album.image" class="img-responsive img-rounded">
              </div>
              <div class="col-sm-9">
                <a v-bind:href="album.url">{{index + 1}}. <span>{{album.artist}}</span> - <span>{{album.name}}</span></a>
              </div>
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  let albumRef = {}
  let votesRef = {}
  let userRef = {}

  export default {
    name: 'users-view',
    props: ['year'],
    data () {
      return {
        users: []
      }
    },
    created () {
      this.getUsersVotes();
    },
    watch: {
      // call again the method if the route changes
      '$route': 'getUsersVotes'
    },
    methods: {
      getUsersVotes () {
        albumRef = firebase.database().ref(this.year + '/albums')
        votesRef = firebase.database().ref(this.year + '/votes')
        userRef = firebase.database().ref(this.year + '/user')

        // Get all users who voted
        votesRef.child('user').once('value')
          .then(snapshot => {
            
            if (snapshot.val() !== null) {

              // Loop through each user
              snapshot.forEach(userSnapshot => {
                let uid = userSnapshot.key

                // Create a new user list
                this.users.push({
                  uid: uid,
                  displayName: '',
                  votes: []
                })

                // Save user's index in users array
                let userIndex = this.users.length - 1

                userRef.child(uid).once('value', userDataSnapshot => {
                  let userData = userDataSnapshot.val()

                  this.users[userIndex].displayName = userData.displayName
                })
                
                // Loop through all of user's votes
                votesRef.child('user/' + userSnapshot.key).once('value')
                  .then(childSnapshot => {
                    
                    childSnapshot.forEach(vote => {
                      let voteKey = vote.key

                      // Get vote data (albumId and vote score)
                      votesRef.child('all/' + voteKey).once('value', voteSnapshot => {
                        let vote = voteSnapshot.val()
                        let albumId = vote.album

                        // Get album data
                        albumRef.child(albumId).once('value', albumSnapshot => {
                          let album = albumSnapshot.val()

                          // Add album/vote to user vote list
                          this.users[userIndex].votes.push({
                            id: albumId,
                            name: album.name,
                            artist: album.artist,
                            image: album.image,
                            url: album.url,
                            score: parseInt(vote.score, 10)
                          })

                          // Resort album list by score after getting data from firebase
                          if (this.users[userIndex].votes.length > 1) {
                            this.users[userIndex].votes.sort((a, b) => {
                              return parseInt(b.score, 10) - parseInt(a.score, 10)
                            })
                          }
                        })
                      })
                    })
                  })
              })
            }
          })
      }
    }
  }

</script>