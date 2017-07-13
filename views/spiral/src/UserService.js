import Vue from 'vue'
import localforage from 'localforage'

export default new Vue({
	data() {
		return {
			loggedIn: false,
			jwt: "",
			user: {}
		}
	},

	methods: {
		isLoggedIn() {
			if(this.jwt) return true;
			return localforage.getItem('jwt').then((token) => {
				if(token) {
					this.loggedIn = true
					Vue.http.headers.common['Authorization'] = 'Basic ' + token
				}
				return !!token;
		  });
		},

		setToken(token) {
			console.log("Settting token as:", token)
			return localforage.setItem('jwt', token).then(() => {
			  return localforage.getItem('key');
			}).then((value) => {
			 	this.jwt = value
			 	this.loggedIn = true
			 	Vue.http.headers.common['Authorization'] = 'Basic ' + token
			 	return Promise.resolve
			}).catch((err) => {
				console.warn(err);
				return Promise.reject
			});
		},

		logout() {
			return localforage.removeItem('jwt').then(() => {
				this.jwt = null
				this.loggedIn = false
				delete Vue.http.headers.common['Authorization']
				return Promise.resolve("You have been logged out.")
			}).catch(error => {
				return Promise.reject(error)
			})
		},

		login(nickname, password) {
			return this.authenticate({nickname, password}, 'user/login')
		},

		register(nickname, password, confirm_password) {
			return this.authenticate({nickname, password}, 'user/register')
		},

		authenticate(credentials, route){
			return this.$http.post(route, credentials)
				.then(result => result.json().then(body => this.setToken(body.jwt)))
				.catch(error => error.json().then(body => Promise.reject(body.error)))
		},

		getUserData() {
			return this.$http.get("user/data")
				.then(result => result.json().then(body => {
					this.user = body
					return Promise.resolve
				}))
				.catch(error => error.json().then(body => {
					return Promise.reject(body)
				}))
		}
	}
});
