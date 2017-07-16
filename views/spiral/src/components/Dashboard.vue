<template><span>
	<div class="section">
		<div class="columns">
			<div class="column">
				<div class="columns">
					<div class="column">
						<h1 class="title">
						   <span class="icon is-medium">
						   		<i class="fa fa-dot-circle-o" aria-hidden="true"></i>
						   </span>
						   Spiral Messenger
						    <span v-if="!loading"> - <strong>{{ user.nickname }}</strong></span>
					  	</h1>
					</div>
				</div>
				<div class="columns">
					<div class="column is-offset-2">
					  	<h2 class="subtitle">
						   <span>Your status: <strong>{{user.status}} </strong></span>
					  	</h2>
					</div>
				</div>
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
	        <p class="title">Online Contacts</p>
	        <p class="subtitle is-hidden-mobile">Here are the currently online contacts of your Spiral account.</p>
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
			loading: true,
			message: "",
			user: {}
		}
	},

	mounted() {
		this.user = UserService.user
		this.loading = false
	},

	methods: {
		logout() {
			UserService.logout().then(result => {
				console.log(result)
			}).catch(error => {
				console.log(error)
			})
		},
	},
}
</script>

<style scoped>

</style>