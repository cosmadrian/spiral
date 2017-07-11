<template><span>
    <router-view v-if="loggedIn"></router-view>
    <login v-else/>

</span></template>

<script>
import UserService from './UserService'
import Login from './components/Login'

export default {
  name: 'app',
  components: { Login },
  data() {
  	return {
  	}
  },
  mounted() {
  	UserService.isLoggedIn().then((result) => {
      if(!result) {
        console.log("User is not logged in.");
      }
    })
  },
  methods: {},
  computed: {
    loggedIn() {
      return UserService.loggedIn;
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

</style>
