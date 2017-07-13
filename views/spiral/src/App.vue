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
      loading: false
  	}
  },
  mounted() {
    this.loading = true;
  	UserService.isLoggedIn().then((result) => {
      if(!result) {
        this.loading = false
      } else {
        UserService.getUserData().then(() => {
          this.loading = false;
        }).catch(error => {
          this.loading = false;
          console.log(error)
        })
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
