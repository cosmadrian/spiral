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

		login(nickname, password) {
			return this.authenticate({nickname, password}, 'login')
		},

		register(nickname, password, confirm_password) {
			return this.authenticate({nickname, password}, 'register')
		},

		authenticate(credentials, route){
			return this.$http.post(route, credentials)
				.then(result => result.json().then(body => this.setToken(body.jwt)))
				.catch(error => error.json().then(body => Promise.reject(body.error)))
		},

		test_req() {
			return this.$http.get('notpula');
		},
		test_req2() {
			return this.$http.get('pula');
		}
	}
});
