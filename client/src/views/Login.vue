<template>
	<div class="home pt-40">
		<h2 class="text-center text-2xl mb-28">Login</h2>
		<form
			class="w-1/4 mx-auto bg-gray-300 rounded-lg shadow-lg p-6"
			@submit.prevent="formSub"
		>
			<div class="w-full mb-6">
				<label class="block mb-2" for="username">Username</label>
				<input
					class="border-2 w-full outline-none py-1 px-3"
					v-model="username"
					type="text"
					name="username"
					required
					autocomplete="off"
					placeholder="Username..."
				/>
			</div>
			<div class="w-full mb-6">
				<label class="block mb-2" for="password">Password</label>
				<input
					class="border-2 w-full outline-none py-1 px-3"
					v-model="password"
					type="password"
					name="password"
					required
					autocomplete="off"
					placeholder="Password"
				/>
			</div>
			<div class="flex justify-center mb-4">
				<button
					type="submit"
					class="bg-blue-400 py-1 px-3 rounded-lg shadow-lg"
				>
					Submit
				</button>
			</div>
			<div class="flex justify-between">
				<p>Don't you have an account yet?</p>
				<router-link class="text-purple-600" to="/signup">
					Sign Up
				</router-link>
			</div>
		</form>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		name: 'Home',
		data() {
			return {
				username: '',
				password: '',
			};
		},
		methods: {
			async formSub() {
				let body = {
					u_name: this.username.toString(),
					pass: this.password.toString(),
				};
				const { data } = await axios.post(
					'http://localhost:4000/login',
					body
				);

				let access_token = localStorage.getItem('access_token');
				if (data && data.token && access_token && access_token.length) {
					location.href = '/main';
				} else {
					localStorage.setItem('access_token', data.token);

					location.href = '/main';
				}
			},
		},
	};
</script>
