<template><span>
	<div class="section">
		<div class="columns">
			<div class="column">
				<h1 class="title">
				   <span class="icon is-medium">
				   	<i class="fa fa-dot-circle-o" aria-hidden="true"></i>
				   </span>
				   	Spiral Messenger - {{ user.nickname }}
			  </h1>
			</div>
			<div class="column">
				<button class="button is-success is-pulled-right" v-on:click="logout()">Log Out</button>
			</div>
		</div>
	<div class="tile is-ancestor">
	  <div class="tile is-vertical is-8">
	    <div class="tile is-parent">
	      <div class="tile is-child notification ">
	        <p class="title">Conversations</p>
	        <p class="subtitle">Click on a conversation to start using Spiral!</p>
	      </div>
	    </div>
	  </div>
	  <div class="tile is-parent">
	    <article class="tile is-child notification">
	      <div class="content">
	        <p class="title">Online Users</p>
	        <p class="subtitle">Here are the currently online users of Spiral.</p>
	        <div class="content">
	          <!-- Content -->
	        </div>
	      </div>
	    </article>
	  </div>
	</div>
	</div>

</span></template>
<script>
import UserService from '../UserService'

export default {
	name: 'dashboard',
	data() {
		return {
			message: ""
		}
	},
	mounted() {
	},

	methods: {
		logout() {
			UserService.logout().then(result => {
				console.log(result)
			}).catch(error => {
				console.log(error)
			})
		},
		test() {
			this.$http.get('conversations').then(r => {
				console.log('x');
			}).catch(e => {
				console.log('xxx');
			})
		}
	},
	computed: {
		user() {
			return UserService.user;
		}
	}
}
</script>

<style scoped>

</style>