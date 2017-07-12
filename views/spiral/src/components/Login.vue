<template><span>
	<section class="hero">
	  <div class="hero-body">
	    <div class="container">
	      <h1 class="title">
	       <span class="icon is-medium">
	       	<i class="fa fa-dot-circle-o" aria-hidden="true"></i>
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
		<div class="column is-4 is-offset-2 box">
		<section>
			<div class="columns">
				<div class="column">
					<h1 class="title">Log In</h1>
				</div>
			</div>
				<div class="columns">
					<div class="column ">
						<div class="field">
						  <label class="label">Nickname</label>
						  <p class="control">
						    <input
						    	v-model="login_credentials.nickname"
						    	v-validate="{rules: {required: true}}"
						    	data-vv-delay="1000"
						    	v-bind:class="{
							    		'input':true,
							    		'is-success': !errors.has('login nickname'),
							    		'is-danger': errors.has('login nickname')
						    		}"
						    	name="login nickname"
						    	type="text"
						    	placeholder="e.g. JonDoe">
						    	 <span
							    	v-show="errors.has('login nickname')"
							    	class="help is-danger">
							    		{{ errors.first('login nickname') }}
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
						    <input
						    	v-model="login_credentials.password"
						    	data-vv-delay="1000"
						    	v-bind:class="{
							    		'input': true,
							    		'is-success': !errors.has('login password'),
							    		'is-danger': errors.has('login password')
						    		}"
						    	v-validate="{rules: {required: true, min: 6}}"
						    	name="login password"
						    	type="password"
						    	placeholder="At least 6 characters.">
						    	 <span
							    	v-show="errors.has('login password')"
							    	class="help is-danger">
							    		{{ errors.first('login password') }}
							    </span>
						  </p>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div class="columns">
					<div class="column">
						<button
							v-on:click="login()"
							v-bind:class="{'button is-success': true, 'is-loading': loginIsLoading}"
							v-bind:disabled="loginIsDisabled">
						Log In
						</button>
					</div>
				</div>
			</section>
		</div>
		<div class="column is-4 box">
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
					    <input
					    v-model="register_credentials.nickname"
					    v-validate="{rules: {required: true}}"
					    data-vv-delay="1000"
					    v-bind:class="{
						    	'input': true,
						    	'is-success': !errors.has('register nickname'),
					    	 	'is-danger': errors.has('register nickname')
					    	 }"
					    type="text"
					    name="register nickname"
					    placeholder="e.g. JonDoe1337">
					    <span
					    	v-show="errors.has('register nickname')"
					    	class="help is-danger">
					    		{{ errors.first('register nickname') }}
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
					    <input
					    	v-model="register_credentials.password"
					    	v-bind:class="{
						    		'input': true,
						    		'is-success': !errors.has('register password'),
						    		'is-danger': errors.has('register password')
					    		}"
					    	v-validate="{rules: {required: true, min: 6}}"
					    	data-vv-delay="1000"
					    	name="register password"
					    	type="password"
					    	placeholder="At least 6 characters">
					    	<span
						    	v-show="errors.has('register password')"
						    	class="help is-danger">
						    		{{ errors.first('register password') }}
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
					    <input
					    	v-model="register_credentials.confirm_password"
					    	data-vv-delay="1000"
					    	v-bind:class="{
						    		'input': true,
						    		'is-success': !errors.has('confirm register password'),
						    		'is-danger': errors.has('confirm register password')
					    		}"
					    	v-validate="{rules: {required: true, min: 6, confirmed: 'register password'}}"
					    	name="confirm register password"
					    	type="password"
					    	placeholder="Still at least 6 characters">
					    	<span
						    	v-show="errors.has('confirm register password')"
						    	class="help is-danger">
						    		{{ errors.first('confirm register password') }}
						    </span>
					  </p>
					</div>
				</div>
			</div>
		</section>
		<section>
			<div class="columns">
				<div class="column is-offset-9">
					<button
							v-on:click="register()"
							v-bind:class="{'button is-success' : true, 'is-loading': registerIsLoading}"
							v-bind:disabled="registerIsDisabled">
						Register
						</button>
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
			},
			loginIsLoading: false,
			registerIsLoading: false,
		}
	},
	methods: {
		login() {
			if(this.loginIsLoading || this.loginIsDisabled)
				return
			if(this.login_credentials.nickname === "" ||
				this.login_credentials.password === '')
				return

			this.loginIsLoading = true

			UserService.login(this.login_credentials.nickname, this.login_credentials.password)
			.then(() => {
				this.loginIsLoading = false
			}).catch((error) => {
				this.loginIsLoading = false
				this.errorMessage = error;
			})
		},

		register() {
			if(this.registerIsLoading || this.registerIsDisabled)
				return
			if(this.register_credentials.nickname === "" ||
				this.register_credentials.password === '' ||
				this.register_credentials.confirm_password === "")
				return

			this.registerIsLoading = true

			UserService.register(this.register_credentials.nickname,
				this.register_credentials.password,
				this.register_credentials.confirm_password)
			.then(() => {
				this.registerIsLoading = false
			}).catch((error) => {
				this.registerIsLoading = false
				this.errorMessage = error;
			})
		},
	},
	computed: {
		loginIsDisabled() {
			return this.errors.has('login nickname') ||
					this.errors.has('login password');
		},
		registerIsDisabled() {
			return this.errors.has('register nickname') ||
				this.errors.has('register password') ||
				this.errors.has('register confirm password');
		}
	}
}
</script>

<style scoped>

</style>