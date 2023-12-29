<template>
	<main>
		<form v-on:submit.prevent="submitForm">
			<div>
				<label for="username">id: </label>
				<input id="username" type="text" v-model="username">
			</div>
			<div>
				<label for="password">pw: </label>
				<input id="password" type="password" v-model="password">
			</div>
			<button type="submit">login</button>
		</form>
	</main>
</template>
  
<script>
import axios from 'axios';

export default {
	data: function () {
		return {
			username: '',
			password: '',
		}
	},
	methods: {
		submitForm: function () {
			// event.preventDefault();
			console.log(this.username, this.password);
			const url = 'jdbc:oracle:thin:@116.122.37.100:1521:xe';
			const data = {
				username: this.username,
				password: this.password
			}
			axios.post(url, data)
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}
}
</script>
  
<style></style>