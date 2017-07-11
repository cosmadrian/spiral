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
					Log-in to start connecting with your buddies!
				</h1>
				<h1 class="subtitle columns">
					<div class="column is-offset-2">
						... or register if you don't have an account.
					</div>
				</h1>
			</div>
		</div>
	</section>
	<div class="columns" v-if="errorMessage">
		<div class="column is-4 is-offset-4">
			<article class="message is-danger">
			  <div class="message-body">
			  {{errorMessage}}
			  </div>
			</article>
		</div>
	</div>
	<div class="columns">
		<div class="column is-4 is-offset-2">
		<section>
			<div class="columns">
				<div class="column">
					<h1 class="title">Login</h1>
				</div>
			</div>
				<div class="columns">
					<div class="column ">
						<div class="field">
						  <label class="label">Nickname</label>
						  <p class="control">
						    <input v-model="login_credentials.nickname" class="input is-success" type="text" placeholder="e.g. JonDoe">
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
					<div class="column">
						<div class="field">
						  <label class="label">Password</label>
						  <p class="control">
						    <input v-model="login_credentials.password" class="input is-success" type="password" placeholder="At least 6 characters.">
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
					<div class="column">
						<button v-on:click="login()" class="button is-primary">Log In</button>
					</div>
				</div>
			</section>
		</div>
		<div class="column is-4">
		<section>
			<div class="columns">
				<div class="column ">
					<h1 class="title">Register</h1>
				</div>
			</div>
			<div class="columns">
				<div class="column ">
					<div class="field">
					  <label class="label">Desired Nickname</label>
					  <p class="control ">
					    <input v-model="register_credentials.nickname" class="input is-success" type="text" placeholder="e.g. JonDoe1337">
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
				<div class="column ">
					<div class="field">
					  <label class="label">Desired Password</label>
					  <p class="control ">
					    <input v-model="register_credentials.password" class="input is-success" type="password" placeholder="At least 6 characters">
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
				<div class="column ">
					<div class="field">
					  <label class="label">Confirm password</label>
					  <p class="control ">
					    <input v-model="register_credentials.confirm_password" class="input is-success" type="password" placeholder="Still at least 6 characters">
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
				<div class="column is-offset-9">
					<button v-on:click="register()" class="button is-primary">Register</button>
				</div>
			</div>
		</section>
		</div>
	</div>

</span></template>

<script>
import UserService from '../UserService'

export default {
	name: 'login',
	data() {
		return {
			errorMessage: "",
			login_credentials: {
				nickname: "",
				password: ""
			},
			register_credentials: {
				nickname: "",
				password: "",
				confirm_password: ""
			}
		}
	},
	methods: {
		login() {
			let validation = this.validate(this.login_credentials)
			if(validation) {
				this.errorMessage = validation;
				return;
			}
			UserService.login(this.login_credentials.nickname, this.login_credentials.password)
			.then(() => {
				console.log('logged in');
			}).catch((error) => {
				this.errorMessage = error;
			})
		},

		register() {
			let validation = this.validate(this.register_credentials)
			if(validation) {
				this.errorMessage = validation;
				return;
			}
			UserService.register(this.register_credentials.nickname, this.register_credentials.password)
			.then(() => {
				console.log('registerd');
			}).catch((error) => {
				this.errorMessage = error;
			})
		},
		validate(credentials) {
			if(!credentials.nickname) return "Nickname cannot be empty.";
			if(!credentials.password) return "Password cannot be empty.";
			if(credentials.password.length < 6) return "Password is too small.";
			if('confirm_password' in credentials) {
				if(!credentials.confirm_password) return "Password cannot be empty.";
				if(credentials.password !== credentials.confirm_password)
					return "Passwords do not match.";
			}
		}
	}
}
</script>

<style scoped>

</style>