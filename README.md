# top-albums-2016

For the past few years I have been building an app where myself and my friends can vote on our favorite albums of the past year. [The first version](http://andrewlaskey.github.io/top5-albums/) was a simple app I built with Angular and Firebase in a few hours back in 2013. [The next version](http://andrewlaskey.github.io/top5-best-albums/) which also used Angular was used and reused in 2014 and 2015.

In 2016 I rewrote the app to use Vue.js instead of Angular. I also added Firebase authentication so that users could log in and update their albums after submitting. Finally in 2017, due to changes with the Spotify API, I changed the album search to use the Last.fm API.

## What went into this app

* [Vue.js](https://vuejs.org/v2/guide/)
* [Vue Router](https://router.vuejs.org/en/)
* [Vueify](https://github.com/vuejs/vueify) as project base
* [Firebase](https://firebase.google.com/) Realtime Database and Authentication
* [Last.fm API](https://www.last.fm/api)
