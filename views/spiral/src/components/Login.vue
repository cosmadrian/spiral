<template><span>
	<section class="hero">
	  <div class="hero-body">
	    <div class="container">
	      <h1 class="title">
	       <span class="icon">
	       	<i class="fa fa-fighter-jet" aria-hidden="true"></i>
	       </span>
	       	Spiral Messenger
	      </h1>
	      <h2 class="subtitle">
	        Made by Adrian Cosma
	      </h2>
	    </div>
	  </div>
	</section>
	<section class="hero">
		<div class="hero-body">
			<div class="container">
				<h1 class="subtitle">
					Please log-in to start connecting with your buddies!
				</h1>
			</div>
		</div>
	</section>
	<section>
		<div class="columns">
			<div class="column is-one-third is-offset-one-quarter">
				<div class="field">
				  <label class="label">Nickname</label>
				  <p class="control has-icons-left has-icons-right">
				    <input v-model="username" class="input is-success" type="text" placeholder="e.g. JonDoe">
				    <span class="icon is-small is-left">
				      <i class="fa fa-user"></i>
				    </span>
				    <span class="icon is-small is-right">
				      <i class="fa fa-check"></i>
				    </span>
				  </p>
				</div>
			</div>
		</div>
		<div class="columns">
			<div class="column is-4 is-offset-one-quarter">
				<div class="field">
				  <label class="label">Password</label>
				  <p class="control has-icons-left has-icons-right">
				    <input v-model="password" class="input is-success" type="password" placeholder="At least 6 characters.">
				    <span class="icon is-small is-left">
				      <i class="fa fa-user"></i>
				    </span>
				    <span class="icon is-small is-right">
				      <i class="fa fa-check"></i>
				    </span>
				  </p>
				</div>
			</div>
		</div>
	</section>
	<section>
		<div class="columns">
			<div class="column is-one-third is-offset-6">
				<button v-on:click="login()" class="button is-primary">Log In</button>
			</div>
		</div>
	</section>

</span></template>

<script>
import UserService from '../UserService'

export default {
	name: 'login',
	data() {
		return {
			username: "",
			password: ""
		}
	},
	methods: {
		login() {
			UserService.login(this.username, this.password);
		}
	}
}
</script>

<style scoped>

</style>