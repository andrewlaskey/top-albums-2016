<template>
  <ul class="main-menu nav nav-pills">
    <router-link tag="li" to="/2016" active-class="active" v-bind:exact="false">
      <a>2016</a>
    </router-link>
    <router-link tag="li" to="/2017" active-class="active" v-bind:exact="false">
      <a>2017</a>
    </router-link>
    <router-link tag="li" to="/2018" active-class="active" v-bind:exact="false">
      <a>2018</a>
    </router-link>
    <router-link tag="li" :to="'/' + year + '/vote'" active-class="active" v-bind:exact="true">
      <a>Vote</a>
    </router-link>
    <router-link tag="li" :to="'/' + year + '/users'" active-class="active" v-bind:exact="true">
      <a>User Votes</a>
    </router-link>
    <li v-if="authenticated" v-on:click="logout"><a href="#">Logout</a></li>
  </ul>
</template>

<script>

export default {
  name: 'main-menu',
  props: ['authenticated','year'],
  data () {
    return {}
  },
  methods: {
    logout: function () {
      this.$emit('logout')
    }
  }
}

</script>