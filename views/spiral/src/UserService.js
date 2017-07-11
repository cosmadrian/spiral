import Vue from 'vue'
import localforage from 'localforage'

export default new Vue({
	data() {
		return {
			loggedIn: false,
			jwt: ""
		}
	},
	methods: {
		isLoggedIn() {
			if(this.jwt) return true;
			return localforage.getItem('jwt').then((token) => {
				if(token) {
					this.loggedIn = true
					this.$http.headers.common['Authorization'] = 'Basic ' + token
				}
				return !!token;
		  });
		},
		setToken(token) {
			return localforage.setItem('jwt', token).then(() => {
			  return localforage.getItem('key');
			}).then((value) => {
			 	this.jwt = value
			 	this.loggedIn = true
			 	return Promise.resolve
			}).catch((err) => {
				console.warn(err);
				return Promise.reject
			});
		},

		login(nickname, password) {
			return this.authenticate({nickname, password}, 'login')
		},

		register(nickname, password) {
			return this.authenticate({nickname, password}, 'register')
		},

		authenticate(credentials, route){
			return this.$http.post(route, credentials)
				.then(result => result.json().then(body => this.setToken(body.jwt)))
				.catch(error => error.json().then(body => Promise.reject(body.error)))
		}
	}
});
