<template><span>
    <div v-if="!loading">
      <router-view v-if="loggedIn"></router-view>
      <login v-else/>
    </div>
    <div v-else><div class="custom-loader"></div></div>

</span></template>

<script>
import UserService from './UserService'
import Login from './components/Login'

export default {
  name: 'app',
  components: { Login },
  data() {
  	return {
      loading: false,
      loggedIn: false
  	}
  },
  mounted() {
    this.loading = true;
    UserService.checkLogin()

    UserService.$on("login", result => {
      this.loggedIn = result
      this.loading = false
    })
  },
  methods: {},
}
</script>

<style>
body {
  margin: 0;
}

</style>
