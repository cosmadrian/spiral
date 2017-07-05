import Vue from 'vue'
import localforage from 'localforage'

export default new Vue({
	data() {
		return {
			loggedIn: false,
			jwt: ""
		}
	},
	// TODO save token
	// login if token present
	// when registered, save token and login
	methods: {
		isLoggedIn() {
			if(this.jwt) return true;
			return localforage.getItem('jwt').then((err, value) => {
				if(err) {
					return false;
				}
				return value !== undefined;
		  });
		},
		login(username, password) {
			return this.$http.post('login', {username, password}).then(result => {
				result.json().then(body => {
					localforage.setItem('jwt', body.jwt).then(() => {
					  return localforage.getItem('key');
					}).then((value) => {
					 	this.jwt = value
					 	this.loggedIn = true
					}).catch((err) => {
						console.warn(err);
					});
				})
			}).catch(err => {
				console.warn(err);
			});
		},

		register(user, pass) {
			return this.$http.post('register');
		}
	}
});
