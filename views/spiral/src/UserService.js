import Vue from 'vue'
import localforage from 'localforage'

export default new Vue({
	data() {
		return {
			user: {}
		}
	},

	methods: {

		checkLogin() {
			return localforage.getItem('jwt').then((token) => {
				if(!token) {
					console.log("User is not logged in.")
					this.$emit('login', false);
				} else {
					console.log("Token found in localforage. Getting user data.")
					Vue.http.headers.common['Authorization'] = 'Basic ' + token;
					this.getUserData().then(() => {
						this.$emit('login', true)
						console.log("Got user data")
					})
				}
		  });
		},

		setToken(token) {
			console.log("Settting token as:", token)
			return localforage.setItem('jwt', token).then(() => {
			  return localforage.getItem('key');
			})
		},

		logout() {
			return localforage.removeItem('jwt').then(() => {
				return localforage.removeItem('user').then(() => {
					this.user = {}
					this.$emit('login', false);
					delete Vue.http.headers.common['Authorization'];
					return Promise.resolve("You have been logged out.");
				})
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
				.then(result => result.json().then(body => {
					return this.setToken(body.jwt).then(() => {
						Vue.http.headers.common['Authorization'] = 'Basic ' + body.jwt;
						return this.getUserData().then(() => {
							this.$emit('login', true);
							return Promise.resolve
						})
					})
				}))
				.catch(error => error.json().then(body => Promise.reject(body.error)))
		},

		getUserData() {
			return localforage.getItem('user')
			.then((data, err) => {
				if (err) return Promise.reject(err);
				if (data) {
					console.log("User data was found in localstorage.", data)
					this.user = data;
					this.requestUserData().then((value) => {}).catch(error => console.warn(error))
					return Promise.resolve(data)
				} else {
					console.log("User data NOT was found in localstorage. Requesting ... ")
					return this.requestUserData().then(value => {
						this.user = value
						return Promise.resolve(value)
					})
				}
			})
		},

		requestUserData() {
			return this.$http.get("user/data")
				.then(result => result.json().then(body => {
					return localforage.setItem('user', body).then(() => {
						return localforage.getItem('user')
					})
				}))
				.catch(error => error.json().then(body => {
					return Promise.reject(body)
				}))
		}
	}
});
